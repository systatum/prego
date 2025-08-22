import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cookies, headers } from "next/headers";
import { LOCALE_MAP, LocaleCodeProps } from "@/constants/Locale";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  let rawLocale = (await cookieStore).get("SYSTATUM_LOCALE")?.value;

  if (!rawLocale || !routing.locales.includes(rawLocale as LocaleCodeProps)) {
    rawLocale = routing.defaultLocale;
  }

  let locale = LOCALE_MAP[rawLocale] ?? "en-US";

  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/messages/${locale}.json`);
  const messages = await res.json();

  return {
    locale,
    messages,
  };
});
