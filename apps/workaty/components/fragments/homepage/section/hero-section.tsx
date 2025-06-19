"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WorkatyHero } from "@/public/assets/landingPage";
import { DataHeroImage, useHeroSectionData } from "../data/landing-data";
import Image from "next/image";

export default function HeroSection() {
  const heroSectionData = useHeroSectionData();

  const [displayedImages, setDisplayedImages] = useState(DataHeroImage);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setDisplayedImages(DataHeroImage.slice(0, 4));
      } else if (window.innerWidth <= 768) {
        setDisplayedImages(DataHeroImage.slice(0, 3));
      } else {
        setDisplayedImages(DataHeroImage);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="HeroSection"
      className="flex h-full w-full flex-col gap-4 pt-[100px] sm:gap-6 sm:pt-[150px] md:gap-10 md:pt-[200px]"
    >
      <motion.div
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {heroSectionData?.map((data, index) => <h2 key={index}>{data}</h2>)}
      </motion.div>

      <motion.div
        className="flex w-full flex-row justify-between"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {displayedImages?.map((data, index) => (
          <motion.a
            className="w-[80px] sm:w-[120px] lg:w-[150px]"
            href={data?.link}
            target="_blank"
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <Image alt={data?.title} width={150} src={data?.image} />
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className="flex h-full w-full items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          className="w-full"
          src={WorkatyHero}
          alt={"Workaty image hero section"}
        />
      </motion.div>
    </div>
  );
}
