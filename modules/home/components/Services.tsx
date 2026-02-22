"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GiExtraTime as CTAIcon } from "react-icons/gi";
import { GiTimeTrap as ServiceIcon } from "react-icons/gi";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import Button from "@/common/components/elements/Button";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";

const Services = () => {
  const t = useTranslations("HomePage.services");

  const router = useRouter();

  return (
    <section className="space-y-6 sm:space-y-10">
      <div className="space-y-3">
        <SectionHeading title={t("title")} icon={<ServiceIcon size={24} />} />
        <SectionSubHeading>{t("sub_title")}</SectionSubHeading>
      </div>

      <SpotlightCard
        className="glass-card-hover group relative flex h-full flex-col overflow-hidden !rounded-[2.5rem] border border-white/10 dark:border-white/5 !bg-opacity-40 transition-all duration-500 p-6 sm:p-8"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 dark:bg-white/10 text-neutral-900 dark:text-white shadow-inner backdrop-blur-md border border-neutral-200/50 dark:border-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <CTAIcon size={24} />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {t("cta.title")}
              </h3>
            </div>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-neutral-700 dark:text-white/70">
              {t("cta.sub_title")}
            </p>
          </div>
          <Button
            className="transition duration-300 hover:scale-105 active:scale-95 sm:w-fit w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
            onClick={() => router.push("/contact")}
          >
            {t("cta.button")}
          </Button>
        </div>
      </SpotlightCard>
    </section>
  );
};

export default Services;
