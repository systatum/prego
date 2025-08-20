import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cookies, headers } from "next/headers";
import { LocaleStateProps } from "@/hooks/types/useLocaleStore";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  let locale = (await cookieStore).get("WORKATY_LOCALE")?.value;

  if (!locale || !routing.locales.includes(locale as LocaleStateProps)) {
    locale = routing.defaultLocale;
  }

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
