"use client";

import { SystatumLogo } from "@/public/systatum";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [showOtherElements, setShowOtherElements] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("dark-section");
      const textY = 16;

      if (section) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= textY && rect.bottom >= textY) {
          setIsDarkBackground(true);
        } else {
          setIsDarkBackground(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen sm:min-h-[780px] lg:min-h-screen justify-between sm:pt-[120px] lg:pt-[150px] overflow-hidden border-b gap-20 sm:gap-36 pb-[200px] sm:pb-[250px] lg:pb-[80px] lg:gap-0 relative">
      {showOtherElements && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "fixed text-xl montHeavy left-4 top-4 z-20",
            isDarkBackground ? "text-white title-shadow" : "title-shadow-white"
          )}
        >
          Systatum
        </motion.div>
      )}

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

      <div className="pt-32 flex sm:flex-row flex-col max-w-full relative gap-12 lg:gap-40 transform translate-x-[60px] md:translate-x-[100px] lg:translate-x-[60px]">
        <AnimatePresence>
          {showOtherElements && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[120px] md:w-[160px] lg:w-[210px] lg:translate-x-10"
            >
              <Image alt="Systatum Logo" src={SystatumLogo} width={300} />
            </motion.div>
          )}
        </AnimatePresence>

        <h2
          className={cn(
            "font-light items-center w-full justify-start text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-[350px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]",
            showOtherElements
              ? ""
              : "absolute top-[295px] sm:top-[128px] sm:left-[167px] md:left-[208px] lg:left-[370px]"
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
            className="flex flex-row translate-x-[60px] sm:translate-x-[230px] md:translate-x-[310px] lg:translate-x-[430px] sm:mb-0 mb-10 max-w-[330px] md:max-w-[400px] lg:max-w-[600px] relative gap-3"
          >
            <span
              aria-label="divider-vertical"
              className="w-[3px] top-[2px] min-h-[70px] sm:min-h-[90px] lg:min-h-[120px] absolute border border-gray-600 bg-gray-600"
            ></span>
            <span className="ml-4 md:ml-10 sm:max-w-full max-w-[300px] text-lg sm:text-xl md:text-2xl lg:text-4xl">
              We empower institutions, organizations, and builders with systems
              that matter.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
