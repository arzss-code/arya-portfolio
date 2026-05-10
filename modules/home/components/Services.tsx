"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GiExtraTime as CTAIcon } from "react-icons/gi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { GiTimeTrap as ServiceIcon } from "react-icons/gi";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import Button from "@/common/components/elements/Button";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";

const Services = () => {
  const t = useTranslations("HomePage.services");
  const router = useRouter();

  const services = [ "Web Development", "UI/UX", "Mobile Apps", "AI Integration", "Machine Learning"];

  return (
    <section className="space-y-8 sm:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-3"
      >
        <SectionHeading title={t("title")} icon={<ServiceIcon size={24} />} />
        <SectionSubHeading>{t("sub_title")}</SectionSubHeading>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <SpotlightCard
          className="group relative overflow-hidden !rounded-[2.5rem] border-white/10 !bg-opacity-10 transition-all duration-500 sm:!rounded-[3.5rem]"
          spotlightColor="rgba(59, 130, 246, 0.15)"
        >

          <div className="relative z-10 flex flex-col gap-10 p-8 sm:p-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 lg:max-w-[65%]">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200/50 bg-white/20 text-neutral-900 shadow-inner backdrop-blur-md transition-transform duration-300 dark:border-white/20 dark:bg-white/10 dark:text-white">
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
                    <CTAIcon size={32} />
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                    {t("cta.title")}
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg font-medium leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-xl">
                  {t("cta.sub_title")}
                </p>

                <div className="flex flex-wrap gap-2">
                  {services.map((service, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-neutral-200 bg-neutral-100/50 px-4 py-1.5 text-xs font-semibold text-neutral-700 backdrop-blur-sm transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:flex-col xl:flex-row">
              <Button
                className="group/btn relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-[1.5rem] bg-blue-500 px-10 text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-[0.98] dark:bg-blue-600 dark:hover:bg-blue-700 lg:w-fit"
                onClick={() => router.push("/contact")}
              >
                <span className="relative z-10 text-lg font-bold">
                  {t("cta.button")}
                </span>
                <HiOutlineArrowNarrowRight
                  size={24}
                  className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2"
                />
                <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500 to-blue-700 transition-transform duration-500 group-hover/btn:translate-y-0" />
              </Button>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </section>
  );
};

export default Services;

