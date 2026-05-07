import path from "path";
import type { GatsbyNode } from "gatsby";
import client from "./tina/__generated__/client";
import fs from "fs";

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

  edges.forEach((edge) => {
    const node = edge?.node;
    if (!node) return;

    const relativePath = node._sys.relativePath;
    const parts = relativePath.split("/");

    const locale = parts[0];
    const slug = parts[1]?.split(".")[0];

    if (!locale || !slug) return;

    createPage({
      path: `/post/${locale}/${slug}`,
      component: path.resolve("./src/fragments/post/detail/index.tsx"),
      context: {
        locale,
        slug,
        relativePath,
      },
    });
  });
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
