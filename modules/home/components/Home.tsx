"use client";

import { motion } from "framer-motion";

import Breakline from "@/common/components/elements/Breakline";

import Introduction from "./Introduction";
import SkillList from "./SkillList";
import BentoGrid from "./Bento/BentoGrid";
import Services from "./Services"; // Added Services as it might be missing or I should check if it was there.

const Home = () => {
  return (
    <>
      <Introduction />
      <Breakline className="my-8" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <SkillList />
      </motion.div>

      <Breakline className="my-8" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <BentoGrid />
      </motion.div>

      <Breakline className="my-8" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Services />
      </motion.div>
    </>
  );
};

export default Home;
