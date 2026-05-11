import React from "react";
import type { HeadFC } from "gatsby";

export const BASE_TITLE = "Sequelore";

export const BASE_DESCRIPTION =
  "Sequelore is a modern database platform for building, managing, and shipping data-driven products with confidence.";

type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  image,
  keywords,
}: MetadataProps = {}): ReturnType<HeadFC> {
  const finalTitle = title ? `${title} - ${BASE_TITLE}` : BASE_TITLE;

  const finalDescription = description || BASE_DESCRIPTION;

  return (
    <>
      <html lang="en" />

      <title>{finalTitle}</title>

      <meta name="description" content={finalDescription} />

      <meta property="og:title" content={finalTitle} />

      <meta property="og:description" content={finalDescription} />

      <meta property="og:type" content="website" />

      {image && <meta property="og:image" content={image} />}

      {keywords?.length ? (
        <meta name="keywords" content={keywords.join(", ")} />
      ) : null}

      <link
        rel="alternate"
        type="application/rss+xml"
        href="https://systatum.com/rss"
      />
    </>
  );
}
