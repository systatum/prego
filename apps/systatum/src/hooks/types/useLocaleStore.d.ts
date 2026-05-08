export interface useLocaleStoreProps {
  locale: { code: string; label: string; flag: string };
  setLocale: (locale: OptionCountryProps) => void;
}

export type OptionCountryProps = {
  code: string;
  label: string;
  flag: string;
};
