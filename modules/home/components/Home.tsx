"use client";

import { motion } from "framer-motion";

import Breakline from "@/common/components/elements/Breakline";

import Introduction from "./Introduction";
import SkillList from "./SkillList";
import BentoGrid from "./Bento/BentoGrid";
import Services from "./Services";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <>
      <Introduction />

      <Breakline className="my-12" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.55, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <SkillList />
      </motion.div>

      <Breakline className="my-12" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.55, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <BentoGrid />
      </motion.div>

      <Breakline className="my-12" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.55, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <Services />
      </motion.div>
    </>
  );
};

export default Home;
