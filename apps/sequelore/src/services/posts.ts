import client from "@tina/__generated__/client";

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

    return {
      props: {
        tinaData: {
          ...posts,
          data: {
            ...posts.data,
            postConnection: {
              ...posts.data.postConnection,
              edges: allEdges,
            },
          },
        },
      },
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { props: { tinaData: null } };
  }
}
