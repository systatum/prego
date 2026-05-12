import path from "path";
import type { GatsbyNode } from "gatsby";
import client from "./tina/__generated__/client";
import fs from "fs";
import RSS from "rss";
import { generateDescription } from "./src/seo/metadata";
import { I18N_RESOURCES } from "./src/i18n/resources";

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

    let postData: Awaited<ReturnType<typeof client.queries.post>> | null = null;

    try {
      postData = await client.queries.post({ relativePath });
    } catch (err) {
      console.warn(`[createPages] Failed to fetch post: ${relativePath}`, err);
      continue; // skip broken posts instead of crashing the build
    }

    const post = postData?.data?.post;

    const categoryName = post?.category?.name ?? "";

    const CATEGORY_COLORS: Record<string, string> = {
      Info: "#3B82F6",
      Release: "#10B981",
      Event: "#F97316",
    };

    const categoryKeyMap: Record<string, string> = {
      Info: "postPage.info",
      Release: "postPage.release",
      Event: "postPage.event",
    };

    const categoryLabel = translatePost(
      locale,
      categoryKeyMap[categoryName] ?? categoryName,
    );

    createPage({
      path: `/post/${locale}/${slug}`,
      component: path.resolve("./src/fragments/post/detail/index.tsx"),
      context: {
        locale,
        slug,
        relativePath,
        tinaData: {
          data: postData.data,
          query: postData.query,
          variables: postData.variables,
        },
        meta: {
          title: post?.title ?? "",
          description: generateDescription(post?.excerpt, post?._body),
          image: post?.heroImg ?? "",
        },
        postMeta: {
          categoryLabel,
          categoryColor: CATEGORY_COLORS[categoryName],
          crumbItems: [
            { label: "Systatum", path: "/" },
            { label: translatePost(locale, "postPage.post"), path: "/post" },
            { label: categoryLabel, path: `/post?category=${categoryName}` },
            { label: post?.title ?? "", path: "#" },
          ],
        },
      },
    });
  }
};

function translatePost(locale: string, key: string): string {
  const resources = I18N_RESOURCES as Record<string, any>;
  const translation =
    resources[locale]?.translation ?? resources["en-US"]?.translation;

  return (
    key.split(".").reduce((obj: any, k: string) => obj?.[k], translation) ?? key
  );
}

export const onPostBuild: GatsbyNode["onPostBuild"] = async () => {
  const feed = new RSS({
    title: "Sequelore",
    description:
      "Sequelore is a modern database platform for building, managing, and shipping data-driven products with confidence.",
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
      description: generateDescription(post?.excerpt, post?._body),
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
