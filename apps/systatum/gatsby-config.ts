import type { GatsbyConfig, GatsbyNode } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://systatum.com`,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: "locale",
        languages: ["en-US", "id-ID", "ja-JP"],
        defaultLanguage: "en-US",
        siteUrl: "https://systatum.com",
        ns: ["common", "postPage"],
        defaultNS: "common",
        i18nextOptions: {
          interpolation: { escapeValue: false },
        },
      },
    },
  ],
};

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

export default config;
