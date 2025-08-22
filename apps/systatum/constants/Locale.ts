export type LocaleCodeProps = "en-US" | "id-ID" | "ja-JP";

export interface LocalesDataProps {
  id: LocaleCodeProps;
  name: string;
}

export const LOCALES = {
  EN_US: { id: "en-US", name: "English (US)" },
  ID: { id: "id-ID", name: "Bahasa Indonesia" },
  JP: { id: "ja-JP", name: "Japanese" },
} as const satisfies Record<string, LocalesDataProps>;
