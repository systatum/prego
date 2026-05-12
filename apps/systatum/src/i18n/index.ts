import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LOCALE_MAP, LOCALES } from "@/constants/locale";
import { I18N_RESOURCES } from "./resources";

const getInitialLocale = (): string => {
  if (typeof window === "undefined") return LOCALES.EN_US.id;

  const saved = localStorage.getItem("SYSTATUM_LOCALE");
  if (saved && LOCALE_MAP[saved]) return saved;

  const browser = navigator.language;
  return (
    LOCALE_MAP[browser] || LOCALE_MAP[browser.split("-")[0]] || LOCALES.EN_US.id
  );
};

i18n.use(initReactI18next).init({
  lng: getInitialLocale(),
  fallbackLng: LOCALES.EN_US.id,
  resources: I18N_RESOURCES,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});

export default i18n;
