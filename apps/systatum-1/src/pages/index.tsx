import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Hero } from "@/fragments/homepage/hero-section";
import { Reason } from "@/fragments/homepage/reason-section";
import { Product } from "@/fragments/homepage/product-section";
import { Collaborator } from "@/fragments/homepage/collaborator-section";
import { CollaborateAndEmail } from "@/fragments/homepage/collaborate-and-email-section";
import LocaleProvider from "@/i18n/LocalizeProvider";
import i18n from "@/i18n";
import { createMetadata } from "@/seo/metadata";
import { fetchPosts } from "@/services/posts";
import PostSection from "@/fragments/homepage/post-section";

export async function getServerData() {
  return await fetchPosts();
}

function IndexPage({
  serverData,
}: PageProps<object, object, unknown, { tinaData: any }>) {
  const tinaData = serverData?.tinaData;

  return (
    <main className="mx-auto w-full items-center justify-center gap-10">
      <LocaleProvider locale={i18n.language} />
      <Hero />
      <div className="md:ml-55 lg:ml-75">
        <Reason />
        <Product />
        <Collaborator />

        <PostSection
          data={tinaData.data}
          variables={tinaData.variables}
          query={tinaData.query}
        />
      </div>
      <CollaborateAndEmail />
    </main>
  );
}

export default IndexPage;

export const Head: HeadFC = () =>
  createMetadata({
    description:
      "Systatum empowers institutions, organizations, and builders with systems that matter.",
  });
