import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { LOCALES } from "@/constants/Locale";

export const routing = defineRouting({
  locales: [LOCALES.EN_US.id, LOCALES.ID.id],
  defaultLocale: LOCALES.EN_US.id,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
