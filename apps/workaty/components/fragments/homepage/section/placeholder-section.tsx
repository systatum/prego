"use client";

import { ProfileAdam } from "@/public/assets/landingPage";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function PlaceholderSection() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden pt-28 sm:pt-32 md:pt-48">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex w-fit flex-row items-center gap-3 bg-red-950 px-4 py-3 font-mono font-semibold text-white"
      >
        <div className="h-0 w-0 border-r-[10px] border-b-[20px] border-l-[10px] border-r-transparent border-b-red-500 border-l-transparent"></div>
        <h2>Why we started Workaty</h2>
      </motion.div>

      <div className="relative flex w-full flex-col gap-2 md:gap-0">
        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-fit translate-x-0 transform bg-gray-100 p-10 pr-20 font-mono text-4xl font-bold md:max-w-[500px] md:translate-x-10 lg:translate-x-20"
        >
          Driven by curiosity, frustration and coffee
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute hidden h-full translate-x-0 transform border-l-[1px] md:flex md:translate-x-10 lg:translate-x-20"
        ></motion.div>

        <div className="relative flex h-full w-full flex-row items-end justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="right-0 flex w-fit transform flex-col gap-2 bg-gray-100 font-mono md:max-w-[800px] lg:max-w-[820px]"
          >
            <div className="p-8">
              <p>
                I started working on Workaty out of a mixture of frustration
                that type hints do nothing at runtime and curiosity as to
                whether they could be used to validate data.
              </p>
              <p>
                Turns out I was right (or lucky) and with Workaty&apos;s crazy
                growth, the maintainers behind it now get to build other
                products with the same principles - that the most powerful tools
                can still be easy to use.
              </p>
            </div>
            <div className="flex w-full flex-row items-center gap-3 bg-gray-300 px-10 py-4 font-sans">
              <div className="flex flex-row gap-3 overflow-hidden rounded-full">
                <Image
                  src={ProfileAdam}
                  width={40}
                  className="h-full w-full object-cover"
                  alt="Workaty placeholder"
                />
              </div>
              <div className="flex h-full w-full flex-col justify-between gap-1">
                <h2 className="text-sm">Adam Noto Hakarsa</h2>
                <p className="text-xs font-semibold text-purple-600">
                  @adamnoto
                </p>
              </div>
              <div></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
