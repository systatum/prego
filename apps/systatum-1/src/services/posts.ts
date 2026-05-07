import client from "@tina/__generated__/client";
import i18n from "@/i18n";

export async function fetchPosts() {
  try {
    let posts = await client.queries.postConnection({
      sort: "date",
      last: 1,
    });

    const allEdges = [...(posts.data.postConnection.edges ?? [])];

    while (posts.data?.postConnection.pageInfo.hasPreviousPage) {
      posts = await client.queries.postConnection({
        sort: "date",
        before: posts.data.postConnection.pageInfo.endCursor,
      });

      if (!posts.data.postConnection.edges) break;

      allEdges.push(...posts.data.postConnection.edges.reverse());
    }

    const filteredEdges = allEdges.filter((edge) => {
      const filename = edge?.node?._sys?.relativePath;
      return filename?.startsWith(i18n.language);
    });

    const tinaData = {
      ...posts,
      data: {
        ...posts.data,
        postConnection: {
          ...posts.data.postConnection,
          edges: filteredEdges,
        },
      },
    };

    return {
      props: { tinaData },
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { props: { tinaData: null } };
  }
}
