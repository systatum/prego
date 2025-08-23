"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

interface TitleSectionProps {
  children: ReactNode;
  className?: string;
}

export default function TitleSection({
  children,
  className,
}: TitleSectionProps) {
  return (
    <motion.h2
      variants={fadeInUp}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "w-full px-10 text-white text-5xl items-start justify-center md:justify-start flex font-bold",
        className
      )}
    >
      {children}
    </motion.h2>
  );
}
