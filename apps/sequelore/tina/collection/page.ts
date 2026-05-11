import type { Collection } from "tinacms";
import { heroBlockSchema } from "@/fragments/blocks/hero";
import { contentBlockSchema } from "@/fragments/blocks/content";
import { testimonialBlockSchema } from "@/fragments/blocks/testimonial";
import { featureBlockSchema } from "@/fragments/blocks/features";
import { videoBlockSchema } from "@/fragments/blocks/video";
import { calloutBlockSchema } from "@/fragments/blocks/callout";
import { statsBlockSchema } from "@/fragments/blocks/stats";
import { ctaBlockSchema } from "@/fragments/blocks/call-to-action";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
      ],
    },
  ],
};

export default Page;
