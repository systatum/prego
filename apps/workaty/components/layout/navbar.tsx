"use client";

import { WorkatyLogo } from "@/public/workatyLogo";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import MobileNavbar from "./section/mobile-navbar";
import DesktopNavbar from "./section/dekstop-navbar";
import { Button } from "./../../../../packages/components/ui/button";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("navigation.authModal");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenIndex(null), 200);
  };

  const handleMouseEnterHover = (subIndex: string) => {
    setIsHovered(subIndex);
  };

  const handleMouseLeaveHover = () => {
    setIsHovered(null);
  };

  const handleSwipeUp = () => setIsOpen(false);

  const swipeHandlers = useSwipeable({
    onSwipedUp: handleSwipeUp,
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div className="sticky inset-0 top-0 z-50 w-full bg-white shadow-md transition-shadow duration-300">
      <MobileNavbar
        handleMouseEnterHover={handleMouseEnterHover}
        handleMouseLeaveHover={handleMouseLeaveHover}
        isHovered={isHovered}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        swipeHandlers={swipeHandlers}
      />

      <div
        className={`relative ${isMobile ? "z-30" : ""} mx-auto flex h-full w-full max-w-[1400px] flex-row items-center justify-between gap-2 bg-white px-4 py-2 shadow-md md:bg-none md:shadow-none`}
      >
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href={"/"}
        >
          <Image width={40} alt="Workaty Logo" src={WorkatyLogo} />
        </Link>

        <div className="hidden w-full flex-row justify-between md:flex">
          <DesktopNavbar
            handleMouseEnterHover={handleMouseEnterHover}
            handleMouseLeaveHover={handleMouseLeaveHover}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isHovered={isHovered}
            openIndex={openIndex}
          />
          <div className="flex w-full flex-col items-end justify-end gap-3 md:flex-row">
            <Link
              href={`https://app.workaty.com`}
              onClick={() => setIsOpen(false)}
            >
              <Button variant={"default"} className="w-full">
                {t("goToDashboard")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <motion.div
              key={isOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </motion.div>
          </Button>
        </div>
      </div>
    </div>
  );
}
