import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DEFAULT_METADATA } from "@/constants/GetMetaData";
import { Toaster } from "react-hot-toast";
import { TinaUrlFixer } from "@/helper/tina-url-fixer";
import { NextIntlClientProvider } from "next-intl";
import { VideoDialogProvider } from "../../../packages/components/ui/video-dialog-context";
import LocaleProvider from "@/i18n/LocalizeProvider";
import { requestConfig } from "@/i18n/request";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = DEFAULT_METADATA;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, messages } = await requestConfig();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TinaUrlFixer />
        <LocaleProvider locale={locale} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <VideoDialogProvider>{children}</VideoDialogProvider>
          <Toaster position="top-right" reverseOrder={false} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
