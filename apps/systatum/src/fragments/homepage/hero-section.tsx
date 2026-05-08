import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import FlagDropdown from "../translation/flag-dropdown";

export function Hero() {
  const { t } = useTranslation();

  const fullText = t("landingPage.heroSection.title");

  const [displayedText, setDisplayedText] = useState("");
  const [showOtherElements, setShowOtherElements] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastSection, setLastSection] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;

      setScrolled(window.scrollY > 130);

      const target = document.getElementById("email-section");

      if (target) {
        setLastSection(
          target.getBoundingClientRect().top <= window.innerHeight * 0.05,
        );
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    let currentIndex = 0;

    setDisplayedText("");
    setShowOtherElements(false);

    const typingInterval = setInterval(() => {
      currentIndex++;

      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
      } else {
        clearInterval(typingInterval);

        setTimeout(() => {
          setShowOtherElements(true);
        }, 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <div className="flex flex-col min-h-screen sm:min-h-195 lg:min-h-screen justify-start sm:pt-30 lg:pt-37.5 overflow-hidden gap-20 sm:gap-20 lg:gap-24 relative">
      {showOtherElements && (
        <div
          id="header"
          className={cn(
            "fixed top-0 left-0 w-full z-50 px-14 sm:px-12.5 md:px-6 lg:px-12.5 py-4",
            scrolled
              ? "bg-white backdrop-blur-md shadow-md md:bg-transparent md:backdrop-blur-none md:shadow-none"
              : "bg-transparent",
          )}
        >
          <div
            className={cn(
              "text-xl w-5 hidden absolute",
              scrolled && "flex md:hidden left-6 top-5",
            )}
          >
            <img
              alt="Systatum Logo"
              src="/systatum/256icon.png"
              width={300}
              height={300}
            />
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: -50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className={cn(
              "text-xl left-14 md:text-[36px] lg:text-[40px] montHeavy flex flex-row items-center gap-2",
              lastSection && "md:text-white",
            )}
          >
            Systatum
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {showOtherElements && (
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            aria-label="logo-systatum-medium-to-up"
            className="w-30 md:w-40 lg:w-52.2 md:left-8 lg:left-12 top-60 lg:top-70 md:fixed md:flex hidden"
          >
            <img
              alt="Systatum Logo"
              src="/systatum/256icon.png"
              width={300}
              height={300}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showOtherElements &&
        Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 min-h-15 w-0.75 bg-gray-600 font-light"
            style={{
              right: `${80 + i * 8}px`,
            }}
            initial={{
              opacity: 0,
              y: -20,
              scaleY: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scaleY: 1,
            }}
            transition={{
              duration: 0.6,
              delay: i * 0.2,
              ease: "easeOut",
            }}
            aria-label="strip for header-right"
          />
        ))}

      <div className="pt-52 sm:pt-32 flex sm:flex-row flex-col max-w-full relative gap-12 lg:gap-40 transform translate-x-15 md:translate-x-25 lg:translate-x-15">
        <AnimatePresence>
          {showOtherElements && (
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              aria-label="logo-systatum-mobile-to-small"
              className="w-30 md:w-40 lg:w-52.5 left-16 top-70 md:hidden"
            >
              <img
                alt="Systatum Logo"
                src="/systatum/256icon.png"
                width={300}
                height={300}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <h2
          className={cn(
            "font-light items-center w-full justify-start text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-87.5 sm:max-w-100 md:max-w-125 lg:max-w-150",
            showOtherElements
              ? "md:translate-x-50 lg:translate-x-80"
              : "absolute top-94 sm:top-32 sm:left-41.75 md:left-50 lg:left-80",
          )}
        >
          {displayedText}

          <motion.span
            className="w-px h-full inline-block"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            &nbsp;|
          </motion.span>
        </h2>
      </div>

      <AnimatePresence>
        {showOtherElements && (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.3,
            }}
            className="flex flex-row translate-x-15 sm:translate-x-57.5 md:translate-x-77.5 lg:translate-x-95 sm:mb-0 mb-10 max-w-82.5 md:max-w-100 lg:max-w-150 relative gap-3"
          >
            <span
              aria-label="divider-vertical"
              className="w-0.75 top-0.5 min-h-17.5 sm:min-h-22.5 lg:min-h-30 absolute border border-gray-600 bg-gray-600"
            />

            <span className="ml-4 md:ml-10 sm:max-w-full max-w-75 text-xl md:text-2xl lg:text-4xl">
              {t("landingPage.heroSection.subtitle")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {showOtherElements && (
        <div className="absolute top-4 right-4 z-50">
          <FlagDropdown />
        </div>
      )}
    </div>
  );
}
