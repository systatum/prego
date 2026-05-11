"use client";

import { useLocaleStore } from "@/hooks/contents/useLocaleStore";

export default function LocaleProvider({ locale }: { locale: string }) {
  initializeLocale(locale);

  return null;
}

const initializeLocale = (localeFromServer?: string) => {
  if (!localeFromServer) return;
  const code = "en-US";

  let label = "English";
  let flag = "🇺🇸";

  switch (localeFromServer) {
    case "en-US":
      label = "English";
      flag = "🇺🇸";
      break;
    case "id-ID":
      label = "Bahasa Indonesia";
      flag = "🇮🇩";
      break;
    case "ja-JP":
      label = "日本語";
      flag = "🇯🇵";
      break;
  }

  useLocaleStore.setState((prev) => ({
    ...prev,
    locale: {
      code,
      label,
      flag,
    },
  }));

  if (typeof document !== "undefined") {
    document.cookie = `SYSTATUM_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }
};
