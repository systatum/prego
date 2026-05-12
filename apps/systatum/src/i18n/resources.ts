import { LOCALES } from "./../constants/locale";
import enUS from "./messages/en-US.json";
import idID from "./messages/id-ID.json";
import jaJP from "./messages/ja-JP.json";

export const I18N_RESOURCES = {
  [LOCALES.EN_US.id]: {
    translation: enUS,
  },

  [LOCALES.ID_ID.id]: {
    translation: idID,
  },

  [LOCALES.JA_JP.id]: {
    translation: jaJP,
  },
} as const;
