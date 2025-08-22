import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useLocaleStoreProps } from "../types/useLocaleStore";
import { LocaleCodeProps } from "@/constants/Locale";

export const useLocaleStore = create<useLocaleStoreProps>()(
  persist(
    (set) => ({
      locale: "en-US",
      setLocale: (locale: LocaleCodeProps) => {
        document.cookie = `SYSTATUM_LOCALE=${locale}; path=/`;
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
