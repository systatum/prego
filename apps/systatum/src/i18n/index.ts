import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "./messages/en-US.json";
import idID from "./messages/id-ID.json";
import jaJP from "./messages/ja-JP.json";

import { LOCALE_MAP, LOCALES } from "@/constants/locale";

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

  resources: {
    [LOCALES.EN_US.id]: {
      translation: enUS,
    },
    [LOCALES.ID_ID.id]: {
      translation: idID,
    },
    [LOCALES.JA_JP.id]: {
      translation: jaJP,
    },
  },

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: true,
  },
});

export default i18n;
