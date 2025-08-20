export type LocaleStateProps = "en-US" | "id";

export interface useLocaleStoreProps {
  locale: LocaleStateProps;
  setLocale: (locale: LocaleStateProps) => void;
}
