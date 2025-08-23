import { Metadata } from "next";

const BASE_TITLE = "Systatum";
const BASE_DESCRIPTION =
  "Systatum empowers institutions, organizations, and builders with systems that matter.";

export function createMetadata(title?: string, description?: string): Metadata {
  return {
    title: title ? `${title} - ${BASE_TITLE}` : BASE_TITLE,
    description: description ? description : BASE_DESCRIPTION,
  };
}

export const DEFAULT_METADATA = createMetadata();
export const POST_METADATA = createMetadata("Post");

export type ExcerptType =
  | string
  | {
      children: { children: { text: string }[] }[];
    };

export function POST_METADATA_CONTENT(post?: {
  title?: string;
  excerpt?: ExcerptType;
  heroImg?: string | null;
  author?: { name?: string };
  category?: { name?: string };
  tags?: string[];
}): Metadata {
  return {
    title: post.title ? `${post.title} - ${BASE_TITLE}` : BASE_TITLE,
    description:
      post.excerpt && typeof post.excerpt !== "string"
        ? post.excerpt.children[0]?.children[0]?.text
        : typeof post.excerpt === "string"
          ? post.excerpt
          : BASE_DESCRIPTION,
    openGraph: {
      title: post?.title || BASE_TITLE,
      description:
        post.excerpt && typeof post.excerpt !== "string"
          ? post.excerpt.children[0]?.children[0]?.text
          : typeof post.excerpt === "string"
            ? post.excerpt
            : BASE_DESCRIPTION,
      images: post?.heroImg ? [{ url: post.heroImg }] : [],
    },
    authors: post?.author?.name ? [{ name: post.author.name }] : undefined,
    keywords: post?.tags || [],
  };
}
