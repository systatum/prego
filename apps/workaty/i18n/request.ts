import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cookies } from "next/headers";
import { LocaleStateProps } from "@/hooks/types/useLocaleStore";
import { readFile } from "fs/promises";
import path from "path";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  let locale = (await cookieStore).get("WORKATY_LOCALE")?.value;

  if (!locale || !routing.locales.includes(locale as LocaleStateProps)) {
    locale = routing.defaultLocale;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/messages/${locale}.json`
  );
  const messages = await res.json();

  return {
    locale,
    messages,
  };
});
