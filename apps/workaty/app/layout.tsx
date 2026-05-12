import React, { ReactNode } from "react";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "./../../../packages/components/ui/video-dialog-context";
import VideoDialog from "./../../../packages/components/ui/video-dialog";
import "@/styles.css";
import { TailwindIndicator } from "./../../../packages/components/ui/breakpoint-indicator";
import { headers } from "next/headers";
import { LOCALES } from "@/constants/Locale";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { TinaUrlFixer } from "@/helper/tina-url-fixer";
import { DEFAULT_METADATA } from "@/constants/GetMetaData";
import StyledComponentsRegistry from "@/tools/styled-components-registry";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata = DEFAULT_METADATA;

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();

  const locale = headersList.get("X-WORKATY-LOCALE") || LOCALES.EN_US.id;

  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/messages/${locale}.json`);
  const messages = await res.json();

  return (
    <html
      lang={locale}
      className={cn(fontSans.variable, nunito.variable, lato.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <TinaUrlFixer />
        <StyledComponentsRegistry>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <VideoDialogProvider>
              {children}
              <VideoDialog />
            </VideoDialogProvider>
            <TailwindIndicator />
            <Footer />
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
