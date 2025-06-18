"use client";
import { useEffect } from "react";

export function TinaUrlFixer() {
  useEffect(() => {
    if (!window.location.pathname.startsWith("/admin")) return;

    const { origin, pathname } = window.location;
    const cleanedPathname = pathname.replace(/(\/admin)+/, "/admin");
    const cleanedHash = "#/~/";

    const cleanedUrl = `${origin}${cleanedPathname}${cleanedHash}`;

    if (window.location.href !== cleanedUrl) {
      window.location.replace(cleanedUrl);
    }
  }, []);

  return null;
}
