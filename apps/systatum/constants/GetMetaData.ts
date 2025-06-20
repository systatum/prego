import { Metadata } from "next";

const BASE_TITLE = "Systatum";
const BASE_DESCRIPTION =
  "Systatum empowers institutions, organizations, and builders with systems that matter.";

export function createMetadata(title?: string, description?: string): Metadata {
  return {
    title: title ? `${title} | ${BASE_TITLE}` : BASE_TITLE,
    description: description ? description : BASE_DESCRIPTION,
  };
}

export const DEFAULT_METADATA = createMetadata();
