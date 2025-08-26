import { NextResponse } from "next/server";
import RSS from "rss";
import client from "@/tina/__generated__/client";
import { requestConfig } from "@/i18n/request";
import { BASE_DESCRIPTION, BASE_TITLE } from "@/constants/GetMetaData";

export async function GET() {
  const { locale } = await requestConfig();

  let posts = await client.queries.postConnection({
    sort: "date",
    last: 10,
  });
  const allPosts = posts;

  while (posts.data.postConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.postConnection({
      sort: "date",
      before: posts.data.postConnection.pageInfo.endCursor,
    });

    if (!posts.data.postConnection.edges) break;

    allPosts.data.postConnection.edges.push(
      ...posts.data.postConnection.edges.reverse()
    );
  }

  const filteredEdges = allPosts.data.postConnection.edges.filter((edge) => {
    const filename = edge.node._sys.relativePath;
    return filename.startsWith(locale);
  });

  const feed = new RSS({
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
    feed_url: "https://systatum.com/rss",
    site_url: "https://systatum.com",
    language: locale,
  });

  filteredEdges.forEach((edge) => {
    const post = edge.node;
    if (!post) return;

    feed.item({
      title: post.title ? `${post.title} - ${BASE_TITLE}` : BASE_TITLE,
      description:
        post.excerpt && typeof post.excerpt !== "string"
          ? post.excerpt.children[0].children[0].text
          : typeof post.excerpt === "string"
            ? post.excerpt
            : BASE_DESCRIPTION,
      date: post.date,
      author: post.author.name,
      categories: post.tags,
      enclosure: post.heroImg
        ? { url: post.heroImg, type: "image/jpeg" }
        : undefined,
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
