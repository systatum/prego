import React, { Suspense, useEffect, useRef, useState } from "react";
import client from "@tina/__generated__/client";
import { Layout } from "./../../../../../../packages/components/layout/layout";
import PostClientPage from "@/fragments/post/detail/client-page";
import { HeadFC } from "gatsby";
import { createMetadata } from "@/seo/metadata";
import {
  PostSkeleton,
  PostError,
} from "./../../../../../../packages/components/loading-skeleton";

export interface TinaData {
  data: any;
  query: string;
  variables: { relativePath: string };
}

export interface DetailPostProps {
  pageContext: {
    relativePath: string;
    locale?: string;
    slug?: string;
    tinaData?: TinaData;
    meta?: {
      title: string;
      description: string;
      image: string;
    };
    postMeta?: PostMeta;
  };
}

export interface PostMeta {
  categoryLabel: string;
  categoryColor?: string;
  crumbItems: { label: string; path: string }[];
}

type FetchState =
  | { status: "ready"; tinaData: TinaData }
  | { status: "loading" }
  | { status: "error"; message: string };

export default function DetailPost({ pageContext }: DetailPostProps) {
  const { relativePath, tinaData: buildTimeTinaData, postMeta } = pageContext;
  const isMounted = useRef(true);

  const [state, setState] = useState<FetchState>(
    buildTimeTinaData
      ? { status: "ready", tinaData: buildTimeTinaData }
      : { status: "loading" },
  );

  useEffect(() => {
    isMounted.current = true;

    if (buildTimeTinaData) return;

    let timeout: ReturnType<typeof setTimeout>;

    function fetchPost() {
      timeout = setTimeout(function () {
        if (!isMounted.current) return;
        setState({
          status: "error",
          message: "Request timed out. Please refresh the page.",
        });
      }, 10000);

      client.queries
        .post({ relativePath })
        .then(function (result) {
          clearTimeout(timeout);
          if (!isMounted.current) return;

          if (!result?.data) {
            setState({
              status: "error",
              message: "No data returned from server.",
            });
            return;
          }

          setState({
            status: "ready",
            tinaData: {
              data: result.data,
              query: result.query,
              variables: result.variables,
            },
          });
        })
        .catch(function (err) {
          clearTimeout(timeout);
          if (!isMounted.current) return;
          setState({
            status: "error",
            message:
              err instanceof Error ? err.message : "Failed to load post.",
          });
        });
    }

    fetchPost();

    return function () {
      isMounted.current = false;
      clearTimeout(timeout);
    };
  }, [relativePath, buildTimeTinaData]);

  if (state.status === "loading") {
    return (
      <Layout rawPageData={null}>
        <PostSkeleton />
      </Layout>
    );
  }

  if (state.status === "error") {
    return (
      <Layout rawPageData={null}>
        <PostError message={state.message} />
      </Layout>
    );
  }

  const { tinaData } = state;

  return (
    <Layout rawPageData={tinaData}>
      <Suspense fallback={<PostSkeleton />}>
        <PostClientPage
          data={tinaData.data}
          query={tinaData.query}
          variables={tinaData.variables}
          postMeta={postMeta!}
        />
      </Suspense>
    </Layout>
  );
}

export const Head: HeadFC<{}, DetailPostProps["pageContext"]> = ({
  pageContext,
}) => {
  const { meta } = pageContext;
  return createMetadata({
    title: meta?.title,
    description: meta?.description,
    image: meta?.image,
  });
};
