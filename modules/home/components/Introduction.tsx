import { useTranslations } from "next-intl";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { METADATA } from "@/common/constants/metadata";

const Introduction = () => {
  const t = useTranslations("HomePage");

  return (
    <section className="space-y-4 bg-cover bg-no-repeat">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <div className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </div>
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          Available for hire
        </span>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-5xl"
        >
          <h1>
            Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">{METADATA.creator}</span>
          </h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="text-lg font-medium text-neutral-600 dark:text-neutral-400 md:text-2xl"
        >
          <TypeAnimation
            sequence={[
              "Software Engineer",
              2000,
              "Fullstack Developer",
              2000,
              "UI/UX Enthusiast",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <ul className="flex list-disc flex-col gap-x-10 gap-y-2 pl-5 text-neutral-700 dark:text-neutral-400 md:flex-row">
          <li>{t("location")}</li>
          <li>{t("location_type")}</li>
        </ul>
        <p className="max-w-2xl leading-loose text-neutral-600 dark:text-neutral-300">
          {t("resume")}
        </p>
      </motion.div>
    </section>
  );
};

export default Introduction;
