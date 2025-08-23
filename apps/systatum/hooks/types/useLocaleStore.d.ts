import { LocaleCodeProps } from "@/constants/Locale";

export interface useLocaleStoreProps {
  locale: LocaleCodeProps;
  setLocale: (locale: LocaleCodeProps) => void;
}
