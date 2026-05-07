import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "./messages/en-US.json";
import idID from "./messages/id-ID.json";
import jaJP from "./messages/ja-JP.json";

import { LOCALES } from "@/constants/locale";

const savedLocale =
  typeof window !== "undefined"
    ? localStorage.getItem("SYSTATUM_LOCALE")
    : null;

const browserLocale =
  typeof navigator !== "undefined" ? navigator.language : LOCALES.EN_US.id;

const locale = savedLocale || browserLocale;

i18n.use(initReactI18next).init({
  lng: locale,
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
});

export default i18n;
