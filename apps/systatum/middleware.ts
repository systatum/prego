import { NextRequest, NextResponse } from "next/server";
import { LOCALE_MAP, LOCALES } from "./constants/Locale";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localeCookie = request.cookies.get("SYSTATUM_LOCALE")?.value;

  const url = request.nextUrl;
  const isProd = process.env.NEXT_PUBLIC_TINA_MODE !== "admin";

  if (url.pathname.startsWith("/admin") && isProd) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  const acceptLanguage = request.headers.get("Accept-Language");
  const fallbackLocale = acceptLanguage.split(",")[0];
  const fallbackLocaleMap = LOCALE_MAP[fallbackLocale] ?? LOCALES.EN_US.id;

  const locale = localeCookie || fallbackLocaleMap;

  const response = NextResponse.next();

  if (!localeCookie || localeCookie !== locale) {
    response.cookies.set("SYSTATUM_LOCALE", locale, { path: "/" });
  }

  if (pathname.startsWith("/post")) {
    const localePath = pathname.split("/")[2];
    const isFilteringPath = LOCALE_MAP[localePath];

    if (localePath) {
      response.cookies.set("SYSTATUM_LOCALE", isFilteringPath, { path: "/" });
    }
  }

  return response;
}

export const config = {
  matcher: ["/:path*"],
};
