import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cookies, headers } from "next/headers";
import { LOCALE_MAP, LocaleCodeProps, LOCALES } from "@/constants/Locale";

export async function requestConfig() {
  const headersList = await headers();
  const cookieStore = await cookies();

  const acceptLang = headersList.get("Accept-Language").split(",")[0];
  let rawLocale = cookieStore.get("SYSTATUM_LOCALE")?.value || acceptLang;

  let locale = LOCALE_MAP[rawLocale] ?? LOCALES.EN_US.id;

  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/messages/${locale}.json`);
  const messages = await res.json();

  return {
    locale,
    messages,
  };
}

export default getRequestConfig(requestConfig);
