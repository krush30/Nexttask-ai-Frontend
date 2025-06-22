import HeroText from "./HeroText";
import ParallelBG from "./ParallelBG";

const Hero = () => {
  return (
    <section
      className="flex items-start justify-center 
               min-h-screen overflow-hidden md:items-center md:justify-start
               c-space"
    >
      <HeroText />
      <ParallelBG />
    </section>
  );
};

export default Hero;
