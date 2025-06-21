import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import PostsClientPage from "./client-page";
import { BLOG_METADATA } from "@/constants/GetMetaData";

export const metadata = BLOG_METADATA;
export const revalidate = 300;

export default async function BlogsPage() {
  let posts = await client.queries.blogConnection({
    sort: "date",
    last: 1,
  });
  const allPosts = posts;

  if (!allPosts.data.blogConnection.edges) {
    return [];
  }

  while (posts.data?.blogConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.blogConnection({
      sort: "date",
      before: posts.data.blogConnection.pageInfo.endCursor,
    });

    if (!posts.data.blogConnection.edges) {
      break;
    }

    allPosts.data.blogConnection.edges.push(
      ...posts.data.blogConnection.edges.reverse()
    );
  }

  return (
    <Layout rawPageData={allPosts.data}>
      <PostsClientPage {...allPosts} />
    </Layout>
  );
}
