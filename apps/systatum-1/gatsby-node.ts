import path from "path";
import type { GatsbyNode } from "gatsby";
import fs from "fs";
import RSS from "rss";
import client from "@tina/__generated__/client";
import i18n from "@/i18n";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@tina": path.resolve(__dirname, "tina"),
      },
    },
  });
};

export const onPostBuild: GatsbyNode["onPostBuild"] = async () => {
  const BASE_TITLE = "Systatum";
  const BASE_DESCRIPTION =
    "Systatum empowers institutions, organizations, and builders with systems that matter.";

  let posts = await client.queries.postConnection({
    sort: "date",
    last: 50,
  });

  const allPosts = {
    data: {
      postConnection: {
        edges: [...(posts.data.postConnection.edges || [])],
        pageInfo: posts.data.postConnection.pageInfo,
      },
    },
  };

  while (posts.data.postConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.postConnection({
      sort: "date",
      before: posts.data.postConnection.pageInfo.endCursor,
      last: 50,
    });

    if (!posts.data.postConnection.edges) break;

    allPosts.data.postConnection.edges.push(
      ...posts.data.postConnection.edges.reverse(),
    );
  }

  const feed = new RSS({
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
    feed_url: "https://systatum.com/rss.xml",
    site_url: "https://systatum.com",
    language: i18n.language,
  });

  allPosts.data.postConnection.edges.forEach((edge) => {
    const node = edge?.node;
    if (!node) return;

    const slug = node._sys.relativePath.split(".")[0];

    feed.item({
      title: node.title ? `${node.title} - ${BASE_TITLE}` : BASE_TITLE,
      description:
        typeof node.excerpt === "string"
          ? node.excerpt
          : node.excerpt?.children?.[0]?.children?.[0]?.text ||
            BASE_DESCRIPTION,
      date: node.date,
      url: `https://systatum.com/post/${slug}`,
      author: node.author?.name,
      categories: node.tags || [],
      enclosure: node.heroImg
        ? { url: node.heroImg, type: "image/jpeg" }
        : undefined,
    });
  });

  const outputPath = path.join(process.cwd(), "public", "rss.xml");

  fs.writeFileSync(outputPath, feed.xml({ indent: true }));

  console.log("✅ RSS generated at /public/rss.xml");
};
