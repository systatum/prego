import React, { useEffect, useState } from "react";
import client from "@tina/__generated__/client";
import { Layout } from "@/fragments/layout/layout";
import PostClientPage from "@/fragments/post/detail/client-page";

export interface DetailPostProps {
  pageContext: {
    relativePath: string;
    locale?: string;
    slug?: string;
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
