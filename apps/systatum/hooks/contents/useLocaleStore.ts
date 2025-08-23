import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  OptionCountryProps,
  useLocaleStoreProps,
} from "../types/useLocaleStore";
import { LOCALE_MAP } from "@/constants/Locale";

function getInitialLocale(): OptionCountryProps {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/SYSTATUM_LOCALE=([^;]+)/);
    if (match) {
      const rawLocale = match[1];
      const code = LOCALE_MAP[rawLocale] ?? "en-US";

      return {
        code,
        label:
          code === "en-US"
            ? "United States"
            : code === "id-ID"
              ? "Indonesia"
              : "Japan",
        flag: code === "en-US" ? "🇺🇸" : code === "id-ID" ? "🇮🇩" : "🇯🇵",
      };
    }
  }

  return { code: "en-US", label: "United States", flag: "🇺🇸" };
}

export const useLocaleStore = create<useLocaleStoreProps>()(
  persist(
    (set) => ({
      locale: getInitialLocale(),
      setLocale: (locale: OptionCountryProps) => {
        document.cookie = `SYSTATUM_LOCALE=${locale.code}; path=/`;
        set({ locale });
        window.location.reload();
      },
    }),
    {
      name: "locale-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const OPTIONS_COUNTRY: OptionCountryProps[] = [
  { code: "en-US", label: "English", flag: "🇺🇸" },
  { code: "id-ID", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ja-JP", label: "日本語", flag: "🇯🇵" },
];
