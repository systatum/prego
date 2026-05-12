import * as React from "react";
import { createMetadata } from "@/seo/metadata";
import { HeadFC } from "gatsby";
import { Layout } from "./../../../../../packages/components/layout/layout";
import { PostsClientPage } from "@/fragments/post/client-page";
import { fetchPosts } from "@/services/posts";

export default function Post() {
  const [tinaData, setTinaData] = React.useState<any>(null);

  React.useEffect(() => {
    fetchPosts().then((res) => {
      setTinaData(res.props?.tinaData);
    });
  }, []);

  if (!tinaData) return null;

  return (
    <Layout rawPageData={tinaData.data}>
      <PostsClientPage
        data={tinaData.data}
        variables={tinaData.variables}
        query={tinaData.query}
      />
    </Layout>
  );
}

export const Head: HeadFC = () =>
  createMetadata({
    title: "Post",
    description:
      "Systatum empowers institutions, organizations, and builders with systems that matter.",
  });
