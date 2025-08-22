import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DEFAULT_METADATA } from "@/constants/GetMetaData";
import { Toaster } from "react-hot-toast";
import { TinaUrlFixer } from "@/helper/tina-url-fixer";
import { NextIntlClientProvider } from "next-intl";
import { headers } from "next/headers";
import { LOCALES } from "@/constants/Locale";
import { VideoDialogProvider } from "../../../packages/components/ui/video-dialog-context";

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
  const headersList = await headers();

  const locale = headersList.get("X-SYSTATUM-LOCALE") || LOCALES.EN_US.id;

  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/messages/${locale}.json`);
  const messages = await res.json();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TinaUrlFixer />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <VideoDialogProvider>{children}</VideoDialogProvider>
          <Toaster position="top-right" reverseOrder={false} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
