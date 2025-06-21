import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import PostClientPage from "./client-page";

export const revalidate = 300;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join("/");
  const data = await client.queries.blog({
    relativePath: `${filepath}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <PostClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let posts = await client.queries.blogConnection();
  const allPosts = posts;

  if (!allPosts.data.blogConnection.edges) {
    return [];
  }

  while (posts.data?.blogConnection.pageInfo.hasNextPage) {
    posts = await client.queries.blogConnection({
      after: posts.data.blogConnection.pageInfo.endCursor,
    });

    if (!posts.data.blogConnection.edges) {
      break;
    }

    allPosts.data.blogConnection.edges.push(...posts.data.blogConnection.edges);
  }

  const params =
    allPosts.data?.blogConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}
