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
import StyledComponentRegistry from "@/lib/styled-component-registry";

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
      <StyledComponentRegistry>
        <Navbar />
        <Hero />
        <Features />
        <TrustedBy />
        <DownloadApps />
        <OurCompany />
      </StyledComponentRegistry>
    </main>
  );
}

export default IndexPage;

export const Head: HeadFC = () => createMetadata();
