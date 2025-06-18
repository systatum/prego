export type LocaleStateProps = "en-US" | "id";

export interface useLocaleStoreProps {
  locale: Locale;
  setLocale: (locale: LocaleStateProps) => void;
}
