"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export default function Reason() {
  const t = useTranslations("landingPage.reasonSection");

  const REASON_DESCRIPTION_BOTTOM = [
    {
      description: <span className="font-semibold text-3xl">{t("title")}</span>,
    },
    {
      description: <>{t("subtitle")}</>,
    },
    {
      description: <>{t("description1")}</>,
    },
    {
      description: <>{t("description2")}</>,
    },
    {
      description: <>{t("description3")}</>,
    },
  ];
  return (
    <motion.div
      className="px-10 sm:px-16 md:px-20 lg:px-32 py-40 min-h-[460px] flex flex-col gap-6 border-b border-gray-100 bg-gray-50"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      {REASON_DESCRIPTION_BOTTOM.map((data, index) => (
        <motion.div
          className="max-w-3xl"
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          key={index}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
            {data.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
