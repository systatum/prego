export type LocaleCodeProps = "en-US" | "id";

export interface LocalesDataProps {
  id: LocaleCodeProps;
  name: string;
}

export const LOCALES = {
  EN_US: { id: "en-US", name: "English (US)" },
  ID: { id: "id", name: "Bahasa Indonesia" },
} as const satisfies Record<string, LocalesDataProps>;
