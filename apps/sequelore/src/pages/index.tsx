import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import LocaleProvider from "@/i18n/LocalizeProvider";
import i18n from "@/i18n";
import { createMetadata } from "@/seo/metadata";
import { fetchPosts } from "@/services/posts";
import { Hero } from "@/fragments/homepage/hero";
import { Features } from "@/fragments/homepage/features";
import { TrustedBy } from "@/fragments/homepage/trusted-by";
import { DownloadApps } from "@/fragments/homepage/download-apps";
import { OurCompany } from "@/fragments/homepage/our-company";
import { Navbar } from "@/fragments/homepage/navbar";

const IndexPage = (): React.JSX.Element => {
  return (
    <main className="mx-auto w-full items-center justify-center gap-10">
      <LocaleProvider locale={i18n.language} />
      <Navbar />
      <Hero />
      <Features />
      <TrustedBy />
      <DownloadApps />
      <OurCompany />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => createMetadata();
