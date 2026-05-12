import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
  globalData?: any;
};

export function Layout({ children, rawPageData, globalData }: LayoutProps) {
  return (
    <LayoutProvider globalSettings={globalData?.global} pageData={rawPageData}>
      <main className="overflow-x-hidden w-full">{children}</main>
    </LayoutProvider>
  );
}
