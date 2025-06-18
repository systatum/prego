import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cookies } from "next/headers";
import { LocaleStateProps } from "@/hooks/types/useLocaleStore";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  let locale = (await cookieStore).get("WORKATY_LOCALE")?.value;

  if (!locale || !routing.locales.includes(locale as LocaleStateProps)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}`)).default,
  };
});
