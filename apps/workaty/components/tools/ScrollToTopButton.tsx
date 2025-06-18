"use client";

import React, { useEffect, useState } from "react";
import { scrollToId } from "./scroll-to-id";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={() => scrollToId("HeroSection")}
      className="fixed right-10 bottom-10 z-10 cursor-pointer rounded-lg bg-black px-4 py-2 text-white shadow-lg transition hover:bg-gray-900"
    >
      ↑
    </button>
  );
}
