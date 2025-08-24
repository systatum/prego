"use client";

import { useLocaleStore } from "@/hooks/contents/useLocaleStore";

export default function LocaleProvider({ locale }: { locale: string }) {
  initializeLocale(locale);

  return null;
}

export const initializeLocale = (localeFromServer?: string) => {
  if (!localeFromServer) return;
  const code = localeFromServer;

  useLocaleStore.setState((prev) => ({
    ...prev,
    locale: {
      code,
      label:
        code === "en-US"
          ? "English"
          : code === "id-ID"
            ? "Bahasa Indonesia"
            : "日本語",
      flag: code === "en-US" ? "🇺🇸" : code === "id-ID" ? "🇮🇩" : "🇯🇵",
    },
  }));

  if (typeof document !== "undefined") {
    document.cookie = `SYSTATUM_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }
};
