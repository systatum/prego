import * as React from "react";
import { createMetadata } from "@/seo/metadata";
import { HeadFC, PageProps } from "gatsby";
import { Layout } from "@/fragments/layout/layout";
import { PostsClientPage } from "@/fragments/post/client-page";
import { fetchPosts } from "@/services/posts";

export async function getServerData() {
  return await fetchPosts();
}

export default function Post({
  serverData,
}: PageProps<object, object, unknown, { tinaData: any }>) {
  const { tinaData } = serverData ?? {};

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
