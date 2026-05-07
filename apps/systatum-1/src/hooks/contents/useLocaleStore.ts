import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  OptionCountryProps,
  useLocaleStoreProps,
} from "../types/useLocaleStore";
import i18n from "@/i18n";

export const useLocaleStore = create<useLocaleStoreProps>()(
  persist(
    (set) => ({
      locale: { code: "en-US", label: "English", flag: "🇺🇸" },
      setLocale: (locale: OptionCountryProps) => {
        i18n.changeLanguage(locale.code);

        localStorage.setItem("SYSTATUM_LOCALE", locale.code);

        set({ locale });
        window.location.reload();
      },
    }),
    {
      name: "locale-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const OPTIONS_COUNTRY: OptionCountryProps[] = [
  { code: "en-US", label: "English", flag: "🇺🇸" },
  { code: "id-ID", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ja-JP", label: "日本語", flag: "🇯🇵" },
];
