"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import Breakline from "@/common/components/elements/Breakline";

import Introduction from "./Introduction";
import SkillList from "./SkillList";

const BentoGrid = dynamic(() => import("./Bento/BentoGrid"));
const Services = dynamic(() => import("./Services"));

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <>
      <Introduction />

      <Breakline />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <SkillList />
      </motion.div>

      <Breakline />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <BentoGrid />
      </motion.div>

      <Breakline />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <Services />
      </motion.div>
    </>
  );
};

export default Home;
