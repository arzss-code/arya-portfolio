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

      <SpotlightCard className="glass-card-hover group relative flex h-full flex-col overflow-hidden !rounded-[2.5rem] border border-white/10 !bg-opacity-40 p-4 transition-all duration-500 dark:border-white/5 sm:p-8">
        <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:gap-6 md:flex-row md:items-center md:justify-between md:text-left">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200/50 bg-white/20 text-neutral-900 shadow-inner backdrop-blur-md transition-transform duration-300 dark:border-white/20 dark:bg-white/10 dark:text-white">
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
              <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white md:text-xl">
                {t("cta.title")}
              </h3>
            </div>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-neutral-700 dark:text-white/70">
              {t("cta.sub_title")}
            </p>
          </div>
          <Button
            className="mt-4 w-full bg-blue-600 text-white transition duration-300 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 sm:w-fit md:mt-0"
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
