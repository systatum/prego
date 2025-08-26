import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import PostClientPage from "./client-page";
import { POST_METADATA_CONTENT } from "@/constants/GetMetaData";
import { cookies, headers } from "next/headers";
import { LOCALE_MAP, LOCALES } from "@/constants/Locale";
import { requestConfig } from "@/i18n/request";

export const revalidate = 300;

interface PostPageParams {
  urlSegments: string[];
}

export default async function PostPage({
  params,
}: {
  params: Promise<PostPageParams>;
}) {
  const { locale } = await requestConfig();

  const resolvedParams = await params;

  const filepath = resolvedParams.urlSegments.join("/");

  const relativePath = `${locale}/${filepath}.mdx`;

  const data = await client.queries.post({
    relativePath,
  });

  return (
    <Layout rawPageData={data}>
      <PostClientPage {...data} />
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PostPageParams>;
}) {
  const headersList = await headers();
  const locale = headersList.get("X-SYSTATUM-LOCALE") || LOCALES.EN_US.id;

  const resolvedParams = await params;

  const filepath = resolvedParams.urlSegments.join("/");
  const localeSelected = LOCALE_MAP[locale];

  const { data } = await client.queries.post({
    relativePath: `${localeSelected}/${filepath}.mdx`,
  });

  const post = data.post;

  return POST_METADATA_CONTENT({
    title: post.title,
    excerpt: post.excerpt,
    heroImg: post.heroImg,
    author: post.author,
    category: post.category,
  });
}

export async function generateStaticParams() {
  let posts = await client.queries.postConnection();
  const allPosts = posts;

  if (!allPosts.data.postConnection.edges) {
    return [];
  }

  while (posts.data?.postConnection.pageInfo.hasNextPage) {
    posts = await client.queries.postConnection({
      after: posts.data.postConnection.pageInfo.endCursor,
    });

    if (!posts.data.postConnection.edges) {
      break;
    }

    allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges);
  }

  const params =
    allPosts.data?.postConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}
