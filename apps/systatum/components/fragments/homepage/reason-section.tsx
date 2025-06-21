"use client";

import { motion } from "framer-motion";

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

const REASON_DESCRIPTION_BOTTOM = [
  {
    description: (
      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
        You, thank you.
      </p>
    ),
  },
  {
    description: (
      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
        You are the reason why we do what we do.
      </p>
    ),
  },
  {
    description: (
      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
        Your people, business, and platform deserve a system that&apos;s{" "}
        powerful yet non-intrusive.
        Great, but not confusing.
      </p>
    ),
  },
  {
    description: (
      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
        Think of us as your multiplier. From Workaty, our smart HR operating
        system, to our open-sourced design language Coneto, each product we
        build enabled leaders, builders, and thinkers at all stage to do more.
      </p>
    ),
  },
  {
    description: (
      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
        We believe you are meant to rise, and we are here to
        empower you to do good. We are here for the sake of your progress.
      </p>
    ),
  },
];

export default function Reason() {
  return (
    <motion.div
      className="px-10 sm:px-16 md:px-20 lg:px-32 py-40 min-h-[460px] flex flex-col gap-10 border-b border-gray-100 bg-gray-50"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      {REASON_DESCRIPTION_BOTTOM.map((description, index) => (
        <motion.div
          className="max-w-3xl"
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          key={index}
        >
          {description.description}
        </motion.div>
      ))}
    </motion.div>
  );
}
