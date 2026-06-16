"use client";

import { BiCodeAlt as SkillsIcon } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import GlassIcon from "@/common/components/elements/GlassIcon";
import { STACKS } from "@/common/constants/stacks";

const CATEGORIES = [
  {
    title: "Frontend & Mobile",
    skills: [
      "HTML",
      "CSS",
      "TailwindCSS",
      "JavaScript",
      "React.js",
      "Next.js",
      "React Router",
      "Framer Motion",
      "Vite",
      "Flutter",
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      "Node.js",
      "PHP",
      "Laravel",
      "Python",
      "Prisma",
      "PostgreSql",
      "MySql",
      "Supabase",
      "Firebase",
    ],
  },
  {
    title: "Design & Tools",
    skills: [
      "Figma",
      "Photoshop",
      "Canva",
      "VS Code",
      "Docker",
      "Github",
      "bun",
      "Npm",
      "Yarn",
      "AI",
    ],
  },
];

const SkillList = () => {
  const t = useTranslations("HomePage");

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
    <section className="space-y-10">
      <div className="space-y-2">
        <SectionHeading title={t("skills.title")} icon={<SkillsIcon />} />
        <SectionSubHeading>
          <p>{t("skills.sub_title")}</p>
        </SectionSubHeading>
      </div>

      <div className="flex flex-col gap-12">
        {CATEGORIES.map((category, idx) => {
          // Hanya ambil skill yang aktif dari STACKS
          const activeSkills = category.skills.filter(
            (skillName) => STACKS[skillName]?.isActive
          );

          if (activeSkills.length === 0) return null;

          return (
            <div key={idx} className="flex flex-col gap-6">
              <h3 className="text-xl font-bold tracking-tight text-neutral-800 border-b border-neutral-200 pb-3 dark:border-neutral-800 dark:text-neutral-200">
                {category.title}
              </h3>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid w-full grid-cols-5 gap-x-[1em] gap-y-[3.5em] sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10"
              >
                {activeSkills.map((skillName, index) => {
                  const skill = STACKS[skillName];
                  return (
                    <motion.div key={index} variants={itemVariants} className="flex justify-center">
                      <GlassIcon
                        name={skillName}
                        icon={skill.icon}
                        background={skill.background}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillList;
