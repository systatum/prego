import { NextRequest, NextResponse } from "next/server";
import { LOCALES } from "./constants/Locale";

export default function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get("WORKATY_LOCALE")?.value;

  const acceptLanguage = request.headers.get("Accept-Language");
  const fallbackLocale = acceptLanguage
    ? acceptLanguage.split(",")[0]
    : LOCALES.EN_US.id;

  const locale = localeCookie || fallbackLocale;

  const response = NextResponse.next();
  response.headers.set("X-WORKATY-LOCALE", locale);

  if (!localeCookie) {
    response.cookies.set("WORKATY_LOCALE", locale, { path: "/" });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!admin|_next|api|favicon.ico|robots.txt|.*\\..*|.well-known).*)",
  ],
};
