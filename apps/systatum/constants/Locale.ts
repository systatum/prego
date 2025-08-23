export type LocaleCodeProps = "en-US" | "id-ID" | "ja-JP";

export interface LocalesDataProps {
  id: LocaleCodeProps;
  name: string;
}

export const LOCALES = {
  EN_US: { id: "en-US", name: "English (US)" },
  ID_ID: { id: "id-ID", name: "Bahasa Indonesia" },
  JA_JP: { id: "ja-JP", name: "Japanese" },
} as const satisfies Record<string, LocalesDataProps>;

export const LOCALE_MAP: Record<string, string> = {
  en: "en-US",
  "en-US": "en-US",
  "en-GB": "en-US",
  "en-CA": "en-US",
  "en-AU": "en-US",
  "en-NZ": "en-US",
  "en-IN": "en-US",
  "en-SG": "en-US",
  "en-PH": "en-US",
  id: "id-ID",
  ja: "ja-JP",
};
