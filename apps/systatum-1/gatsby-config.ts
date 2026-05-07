import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://systatum.com`,
  },
  graphqlTypegen: true,
  plugins: [`gatsby-plugin-postcss`],
};

export default config;
