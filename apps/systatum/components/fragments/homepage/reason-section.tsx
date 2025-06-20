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
        Your people, business, and platform deserve a system that&apos;s{" "}
        <strong className="text-gray-900">powerful yet non-intrusive</strong>.
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
        We believe you are meant to{" "}
        <strong className="text-gray-900">rise</strong>, and we are here to
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
      <motion.div
        className="max-w-4xl flex flex-col gap-4"
        variants={fadeInUp}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight"
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          You, thank you.
        </motion.h1>
        <motion.p
          className="text-2xl font-mono text-gray-600 font-light leading-relaxed"
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          You are the reason why we do what we do.
        </motion.p>
      </motion.div>

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
