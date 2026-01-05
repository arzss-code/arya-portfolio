"use client";

import { BiCodeAlt as SkillsIcon } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import GlassIcon from "@/common/components/elements/GlassIcon";
import { STACKS } from "@/common/constants/stacks";

const SkillList = () => {
  const t = useTranslations("HomePage");

  const stacksInArray: Array<
    [string, { icon: JSX.Element; background: string }]
  > = Object.entries(STACKS)
    .filter(([, value]) => value.isActive)
    .map(([name, value]) => [
      name,
      { icon: value.icon, background: value.background },
    ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title={t("skills.title")} icon={<SkillsIcon />} />
        <SectionSubHeading>
          <p>{t("skills.sub_title")}</p>
        </SectionSubHeading>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid w-full grid-cols-6 gap-x-[1em] gap-y-[2.7em] py-2 md:grid-cols-10 lg:grid-cols-11"
      >
        {stacksInArray.map(([name, { icon, background }], index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassIcon
              name={name}
              icon={icon}
              background={background}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillList;
