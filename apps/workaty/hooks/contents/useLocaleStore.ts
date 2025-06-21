import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LocaleStateProps, useLocaleStoreProps } from "../types/useLocaleStore";

export const useLocaleStore = create<useLocaleStoreProps>()(
  persist(
    (set) => ({
      locale: "en-US",
      setLocale: (locale: LocaleStateProps) => {
        document.cookie = `WORKATY_LOCALE=${locale}; path=/`;
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
