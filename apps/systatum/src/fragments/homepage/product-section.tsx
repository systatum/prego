"use client";

import { cn } from "@/lib/utils";
import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import TitleSection from "./../../../../../packages/components/layout/title";
import { useTranslation } from "react-i18next";

interface DataProductProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 300 - 150,
  y: Math.random() * 200 - 100,
  left: `${20 + i * 30}%`,
  top: `${30 + i * 20}%`,
  delay: i * 0.2,
}));

function ProductParticles() {
  return (
    <>
      {PARTICLES.map(({ id, x, y, left, top, delay }) => (
        <motion.div
          key={id}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x,
            y,
          }}
          transition={{
            duration: 2,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
          style={{ left, top }}
        />
      ))}
    </>
  );
}

export function Product() {
  const { t } = useTranslation();

  const tProduct = (key: string) => t(`landingPage.productSection.${key}`);

  const DATA_PRODUCTS: DataProductProps[] = useMemo(
    () => [
      {
        title: "bil-Quran",
        description: tProduct("bilquranDescription"),
        image: "/product/bil-quran.png",
        link: "https://bil-quran.com",
      },
      {
        title: "Workaty",
        description: tProduct("workatyDescription"),
        image: "/product/workaty.png",
        link: "https://workaty.com",
      },
      {
        title: "Coneto",
        description: tProduct("conetoDescription"),
        image: "/systatum/256icon.png",
        link: "https://coneto.systatum.com",
      },
      {
        title: "Gara",
        description: tProduct("garaDescription"),
        image: "/product/gara.png",
        link: "https://kodegara.org",
      },
    ],
    [t],
  );

  const [isHovered, setIsHovered] = useState<number | null>(null);

  const handleMouseEnter = useCallback(
    (index: number) => setIsHovered(index),
    [],
  );
  const handleMouseLeave = useCallback(() => setIsHovered(null), []);

  return (
    <motion.div
      id="dark-section"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.3 }}
      className="cursor-pointer flex flex-col min-h-175 items-center justify-center gap-16 border-b lg:px-2 pt-24 pb-32 bg-black"
    >
      <TitleSection>{tProduct("title")}</TitleSection>
      <div className="flex flex-col px-10 items-center justify-center sm:grid md:grid-cols-2 lg:grid-cols-3 w-full h-full relative gap-6 sm:gap-8 md:gap-6">
        {DATA_PRODUCTS.map((product, index) => (
          <motion.a
            href={product.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "flex bg-white transform duration-300 animate-in flex-col gap-10 sm:min-w-100 md:min-w-0 p-6 rounded-xs overflow-hidden relative border-2 w-full min-h-100 max-w-100 md:max-w-112.5",
              isHovered === index && "border-blue-400",
            )}
            key={index}
          >
            {isHovered === index && <ProductParticles />}

            <h2
              className={cn(
                "px-2 block text-2xl font-mono font-semibold hover-title-animation",
                isHovered === index && "is-hovered text-white",
              )}
            >
              {product.title}
            </h2>

            <p className="px-2">{product.description}</p>

            <div
              aria-label="logo"
              className={cn(
                "absolute -bottom-3 -right-3 lg:-bottom-6 lg:-right-4 w-30 md:w-30 lg:w-30",
                isHovered !== index && "grayscale",
              )}
            >
              <img alt="Systatum Logo" src={product.image} width={150} />
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
