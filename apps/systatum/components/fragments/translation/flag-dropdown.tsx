"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  OPTIONS_COUNTRY,
  useLocaleStore,
} from "@/hooks/contents/useLocaleStore";
import { OptionCountryProps } from "@/hooks/types/useLocaleStore";
import { cn } from "@/lib/utils";

export default function FlagDropdown() {
  const { setLocale, locale } = useLocaleStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: OptionCountryProps) => {
    setLocale(option);
    setIsOpen(false);
  };

  return (
    <div className="relative block">
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsOpen((prev) => !prev)}
        onMouseLeave={() => setIsOpen(false)}
        className={cn(
          "flex cursor-pointer items-center justify-center w-10 h-10 text-2xl rounded-xs hover:bg-gray-100",
          isOpen && "bg-gray-100"
        )}
      >
        {locale.flag}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => setIsOpen((prev) => !prev)}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute right-0 cursor-pointer mt-[2px] w-[180px] bg-white overflow-hidden z-10"
          >
            {OPTIONS_COUNTRY.map((option) => (
              <button
                key={option.code}
                onClick={() => handleSelect(option)}
                className="flex flex-row items-center cursor-pointer gap-2 w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200"
              >
                <span className="text-xl">{option.flag}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
