import path from "path";
import type { GatsbyNode } from "gatsby";
import client from "./tina/__generated__/client";
import fs from "fs";
import RSS from "rss";

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

// to create detail post inside of our content:
// -> /post/[locale]/[content]
export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions;

  const posts = await client.queries.postConnection();
  const edges = posts.data.postConnection.edges || [];

  for (const edge of edges) {
    const node = edge?.node;
    if (!node) continue;

    const relativePath = node._sys.relativePath;
    const parts = relativePath.split("/");
    const locale = parts[0];
    const slug = parts[1]?.split(".")[0];

    if (!locale || !slug) continue;

    const postData = await client.queries.post({ relativePath });
    const post = postData.data?.post;

    createPage({
      path: `/post/${locale}/${slug}`,
      component: path.resolve("./src/fragments/post/detail/index.tsx"),
      context: {
        locale,
        slug,
        relativePath,
        meta: {
          title: post?.title ?? "",
          description: post?.excerpt ?? "",
          image: post?.heroImg ?? "",
        },
      },
    });
  }
};

export const onPostBuild: GatsbyNode["onPostBuild"] = async () => {
  const feed = new RSS({
    title: "Sequelore",
    description:
      "Sequelore empowers institutions, organizations, and builders with systems that matter.",
    site_url: "https://sequelore.com",
    feed_url: "https://sequelore.com/rss.xml",
    language: "en",
  });

  const posts = await client.queries.postConnection();
  const edges = posts.data.postConnection.edges || [];

  for (const edge of edges) {
    const node = edge?.node;
    if (!node) continue;

    const relativePath = node._sys.relativePath;
    const parts = relativePath.split("/");
    const locale = parts[0];
    const slug = parts[1]?.split(".")[0];

    if (!locale || !slug) continue;

    const postData = await client.queries.post({ relativePath });
    const post = postData.data?.post;

    feed.item({
      title: post?.title ?? "",
      description: post?.excerpt ?? "",
      url: `https://sequelore.com/post/${locale}/${slug}`,
      date: post?.date ?? new Date().toISOString(),
    });
  }

  const outputPath = path.join(__dirname, "public", "rss.xml");

  fs.writeFileSync(outputPath, feed.xml({ indent: true }));
};

export const onCreateDevServer: GatsbyNode["onCreateDevServer"] = ({ app }) => {
  app.use("/admin", (req: any, res: any, next: any) => {
    const filePath = path.resolve(__dirname, "static/admin/index.html");

    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/html");
      res.end(fs.readFileSync(filePath));
      return;
    }

    next();
  });
};
