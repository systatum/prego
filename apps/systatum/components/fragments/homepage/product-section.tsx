"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface DataProductProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

const DATA_PRODUCTS: DataProductProps[] = [
  {
    title: "Workaty",
    description: "Lorem ipsum...",
    image: "/product/workaty.png",
    link: "https://workaty.com",
  },
  {
    title: "Coneto",
    description: "Lorem ipsum...",
    image: "/systatum/2048icon.png",
    link: "https://coneto.systatum.com",
  },
  {
    title: "Gara",
    description: "Lorem ipsum...",
    image: "/product/gara.png",
    link: "https://kodegara.org",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export default function Product() {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <motion.div
      id="dark-section"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.3 }}
      className="cursor-pointer flex flex-col min-h-[700px] items-center justify-center gap-16 border-b lg:px-2 py-32 bg-black"
    >
      <motion.h2
        variants={fadeInUp}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl sm:text-4xl text-white md:text-5xl text-center max-w-[400px] sm:max-w-[600px] font-bold leading-tight"
      >
        What we did
      </motion.h2>
      <div className="flex flex-col items-center justify-center sm:grid md:grid-cols-2 px-10 lg:grid-cols-3 w-full h-full relative gap-6 sm:gap-8 md:gap-6">
        {DATA_PRODUCTS.map((product, index) => (
          <motion.a
            href={product.link}
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            className={cn(
              "flex bg-white transform duration-300 animate-in flex-col gap-10 sm:min-w-[400px] md:min-w-0 p-6 rounded-xs overflow-hidden relative border-2 w-full min-h-[400px] max-w-[400px] md:max-w-[450px]",
              isHovered === index && "border-blue-400"
            )}
            key={index}
          >
            {isHovered === index &&
              [...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.random() * 300 - 150,
                    y: Math.random() * 200 - 100,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                  }}
                />
              ))}
            <h2
              className={cn(
                "px-2 block text-2xl font-mono font-semibold hover-title-animation",
                isHovered === index && "is-hovered text-white"
              )}
            >
              {product.title}
            </h2>

            <p className="px-2">{product.description}</p>
            <div
              aria-label="logo"
              className={cn(
                "absolute -bottom-3 -right-3 lg:-bottom-6 lg:-right-4 w-[120px] md:w-[120px] lg:w-[120px]",
                isHovered !== index && "grayscale"
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
