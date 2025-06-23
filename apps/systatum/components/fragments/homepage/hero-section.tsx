"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [showOtherElements, setShowOtherElements] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 130);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fullText = "System behind you.";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowOtherElements(true);
        }, 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen sm:min-h-[780px] lg:min-h-screen justify-start sm:pt-[120px] lg:pt-[150px] overflow-hidden gap-20 sm:gap-20 lg:gap-24 relative">
      {showOtherElements && (
        <div
          id="header"
          className={cn(
            `fixed top-0 left-0 w-full z-50 px-14 sm:px-[50px] md:px-6 lg:px-[50px] py-4`,
            scrolled
              ? "bg-white backdrop-blur-md shadow-md md:bg-transparent md:backdrop-blur-none md:shadow-none"
              : "bg-transparent"
          )}
        >
          <div
            className={cn(
              "text-xl w-[20px] hidden absolute",
              scrolled && "flex md:hidden left-6 top-[19px]"
            )}
          >
            <img
              alt="Systatum Logo"
              src={"/systatum/2048icon.png"}
              width={300}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xl left-14 md:text-[36px] lg:text-[40px] montHeavy flex flex-row items-center gap-2"
          >
            Systatum
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {showOtherElements && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            aria-label="logo-systatum-medium-to-up"
            className="w-[120px] md:w-[160px] lg:w-[210px] md:left-8 lg:left-12 top-[240px] lg:top-[280px] md:fixed md:flex hidden"
          >
            <img
              alt="Systatum Logo"
              src={"/systatum/2048icon.png"}
              width={300}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showOtherElements &&
        Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 min-h-[60px] w-[3px] bg-gray-600 font-light"
            style={{ right: `${80 + i * 8}px` }}
            initial={{ opacity: 0, y: -20, scaleY: 0 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{
              duration: 0.6,
              delay: i * 0.2,
              ease: "easeOut",
            }}
            aria-label="strip for header-right"
          />
        ))}

      <div className="pt-52 sm:pt-32 flex sm:flex-row flex-col max-w-full relative gap-12 lg:gap-40 transform translate-x-[60px] md:translate-x-[100px] lg:translate-x-[60px]">
        <AnimatePresence>
          {showOtherElements && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              aria-label="logo-systatum-mobile-to-small"
              className="w-[120px] md:w-[160px] lg:w-[210px] left-16 top-[280px] md:hidden"
            >
              <img
                alt="Systatum Logo"
                src={"/systatum/2048icon.png"}
                width={300}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <h2
          className={cn(
            "font-light items-center w-full justify-start text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-[350px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]",
            showOtherElements
              ? "md:translate-x-[200px] lg:translate-x-[320px]"
              : "absolute top-[376px] sm:top-[128px] sm:left-[167px] md:left-[200px] lg:left-[320px]"
          )}
        >
          {displayedText}
          <motion.span
            className="w-px h-full inline-block"
            animate={{ opacity: [1, 0, 1] }}
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-row translate-x-[60px] sm:translate-x-[230px] md:translate-x-[310px] lg:translate-x-[380px] sm:mb-0 mb-10 max-w-[330px] md:max-w-[400px] lg:max-w-[600px] relative gap-3"
          >
            <span
              aria-label="divider-vertical"
              className="w-[3px] top-[2px] min-h-[70px] sm:min-h-[90px] lg:min-h-[120px] absolute border border-gray-600 bg-gray-600"
            ></span>
            <span className="ml-4 md:ml-10 sm:max-w-full max-w-[300px] text-xl md:text-2xl lg:text-4xl">
              We empower institutions, organizations, and builders with systems
              that matter.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
