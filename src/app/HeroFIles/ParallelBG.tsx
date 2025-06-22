import { useScroll, useSpring, useTransform } from "motion/react";
import React from "react";
import { motion } from "motion/react";

const ParallelBG = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 70 });
  const mountainlayer3 = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const plantes = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountainlayer2 = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountainlayer1 = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background sky */}

        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* mountain layer 3*/}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountainlayer3,
          }}
        />
        {/* planets */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: plantes,
          }}
        />
        {/* mountain layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountainlayer2,
          }}
        />
        {/* mountain layer 1 */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountainlayer1,
          }}
        />
      </div>
    </section>
  );
};

export default ParallelBG;
