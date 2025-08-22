import { NextRequest, NextResponse } from "next/server";
import { LOCALES } from "./constants/Locale";

export default function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get("SYSTATUM_LOCALE")?.value;

  const url = request.nextUrl;
  const isProd = process.env.NEXT_PUBLIC_TINA_MODE !== "admin";

  if (url.pathname.startsWith("/admin") && isProd) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  const acceptLanguage = request.headers.get("Accept-Language");
  const fallbackLocale = acceptLanguage
    ? acceptLanguage.split(",")[0]
    : LOCALES.EN_US.id;

  const locale = localeCookie || fallbackLocale;

  const response = NextResponse.next();
  response.headers.set("X-SYSTATUM-LOCALE", locale);

  if (!localeCookie) {
    response.cookies.set("SYSTATUM_LOCALE", locale, { path: "/" });
  }

  return response;
}

export const config = {
  matcher: ["/:path*"],
};
