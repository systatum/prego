import React, { useEffect, useState } from "react";
import client from "@tina/__generated__/client";
import { Layout } from "./../../../../../../packages/components/layout/layout";
import PostClientPage from "@/fragments/post/detail/client-page";
import { HeadFC } from "gatsby";
import { createMetadata } from "@/seo/metadata";

export interface DetailPostProps {
  pageContext: {
    relativePath: string;
    locale?: string;
    slug?: string;
    meta?: {
      title: string;
      description: string;
      image: string;
    };
  };
}

export default function DetailPost({ pageContext }: DetailPostProps) {
  const { relativePath } = pageContext;
  const [tinaData, setTinaData] = useState<any>(null);

  useEffect(() => {
    client.queries.post({ relativePath }).then((result) => {
      setTinaData(result);
    });
  }, [relativePath]);

  if (!tinaData) return <Layout rawPageData={null}>Loading...</Layout>;

  const { data, query, variables } = tinaData;

  return (
    <Layout rawPageData={tinaData}>
      <PostClientPage data={data} query={query} variables={variables} />
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
