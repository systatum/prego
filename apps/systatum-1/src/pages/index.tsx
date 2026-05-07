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

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="mx-auto w-full items-center justify-center gap-10">
      <LocaleProvider locale={i18n.language} />
      <Hero />
      <div className="md:ml-55 lg:ml-75">
        <Reason />
        <Product />
        <Collaborator />
      </div>
      <CollaborateAndEmail />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () =>
  createMetadata({
    title: "Systatum",
    description:
      "Systatum empowers institutions, organizations, and builders with systems that matter.",
  });
