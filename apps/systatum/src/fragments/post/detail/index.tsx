import React, { useEffect, useRef, useState } from "react";
import client from "@tina/__generated__/client";
import { Layout } from "./../../../../../../packages/components/layout/layout";
import PostClientPage from "@/fragments/post/detail/client-page";
import { HeadFC } from "gatsby";
import { createMetadata } from "@/seo/metadata";

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
  };
}

type FetchState =
  | { status: "ready"; tinaData: TinaData }
  | { status: "loading" }
  | { status: "error"; message: string };

export default function DetailPost({ pageContext }: DetailPostProps) {
  const { relativePath, tinaData: buildTimeTinaData } = pageContext;
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
      <PostClientPage
        data={tinaData.data}
        query={tinaData.query}
        variables={tinaData.variables}
      />
    </Layout>
  );
}

function PostSkeleton() {
  return (
    <div className="pt-2 pb-14 px-8">
      <div className="flex flex-col gap-10 md:max-w-4xl max-w-xl mx-auto animate-pulse">
        <div className="flex gap-2 w-fit mx-auto">
          {[80, 40, 60, 120].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 bg-gray-200 rounded" style={{ width: w }} />
              {i < 3 && <div className="h-3 w-3 bg-gray-100 rounded-full" />}
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-3 items-center">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="flex items-center justify-between max-w-100 mx-auto w-full">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-100 rounded w-20" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto" />
        <div className="flex flex-col gap-3 w-full">
          {[100, 90, 95, 80, 100, 70, 85].map((w, i) => (
            <div
              key={i}
              className="h-4 bg-gray-100 rounded"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-8">
      <p className="text-gray-400 text-sm max-w-sm">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Retry
      </button>
    </div>
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
