import React from "react";
import { FlipWords } from "./Flipwords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Trustable", "Correct", "Friendly"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div
      className="z-10 mt-20 flex
                    text-center md:mt-40
                    md:text-left rounded-3xl
                    bg-clip-text "
    >
      {/* Desktop  */}
      <div
        className="flex-col hidden 
      md:flex c-space"
      >
        <motion.h1
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="flex flex-col text-4xl items-start"
        >
          Hello and Welcome to the
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
            className="text-5xl font-medium 
            text-neutral-300 text-gray-500"
          >
            NextTask AI
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>
        </div>
      </div>
      {/* Mobile  */}
      <div className="flex flex-col space-y-6 md:hidden">
        <motion.p
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="text-4xl font-medium"
        >
          Hello and Welcome to the
        </motion.p>
        <div>
          <motion.p
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
            className="text-5xl font-black text-neutral-300"
          >
            NextTask AI
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
            className=""
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-7xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
