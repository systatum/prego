import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import PostsClientPage from "./client-page";
import { POST_METADATA } from "@/constants/GetMetaData";
import { requestConfig } from "@/i18n/request";

export const metadata = POST_METADATA;
export const revalidate = 300;

export default async function PostsPage() {
  const { locale } = await requestConfig();

  let posts = await client.queries.postConnection({
    sort: "date",
    last: 1,
  });
  const allPosts = posts;

  if (!allPosts.data.postConnection.edges) {
    return [];
  }

  while (posts.data?.postConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.postConnection({
      sort: "date",
      before: posts.data.postConnection.pageInfo.endCursor,
    });

    if (!posts.data.postConnection.edges) {
      break;
    }

    allPosts.data.postConnection.edges.push(
      ...posts.data.postConnection.edges.reverse()
    );
  }

  const filteredEdges = allPosts.data.postConnection.edges.filter((edge) => {
    const filename = edge?.node?._sys?.relativePath;
    return filename.startsWith(locale);
  });

  const filteredData = {
    ...allPosts,
    data: {
      ...allPosts.data,
      postConnection: {
        ...allPosts.data.postConnection,
        edges: filteredEdges,
      },
    },
  };

  return (
    <Layout rawPageData={filteredData.data}>
      <PostsClientPage {...filteredData} />
    </Layout>
  );
}
