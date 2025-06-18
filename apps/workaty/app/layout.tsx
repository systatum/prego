import React, { ReactNode } from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";
import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";
import { headers } from "next/headers";
import { LOCALES } from "@/constants/Locale";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import path from "path";
import fs from "fs/promises";
import { TinaUrlFixer } from "@/helper/tina-url-fixer";
import { DEFAULT_METADATA } from "@/constants/GetMetaData";

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
  const locale = (await headers()).get("X-WORKATY-LOCALE") || LOCALES.EN_US.id;

  const messagesPath = path.resolve(
    process.cwd(),
    "messages",
    `${locale}.json`
  );
  const file = await fs.readFile(messagesPath, "utf-8");
  const messages = JSON.parse(file);

  return (
    <html
      lang={locale}
      className={cn(fontSans.variable, nunito.variable, lato.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <TinaUrlFixer />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <VideoDialogProvider>
            {children}
            <VideoDialog />
          </VideoDialogProvider>
          <TailwindIndicator />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
