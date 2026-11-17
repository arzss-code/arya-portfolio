"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GiExtraTime as CTAIcon, GiTimeTrap as ServiceIcon } from "react-icons/gi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { getButtonClasses } from "@/common/components/elements/Button";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";

const SERVICES = [
  "Web Development",
  "UI/UX Design",
  "Mobile Apps",
  "AI Integration",
  "Machine Learning",
];

const Services = () => {
  const t = useTranslations("HomePage.services");

  return (
    <section className="space-y-8 sm:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
        className="space-y-3"
      >
        <SectionHeading
          title={t("title")}
          icon={<ServiceIcon size={24} aria-hidden="true" />}
        />
        <SectionSubHeading>{t("sub_title")}</SectionSubHeading>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <SpotlightCard
          className="group relative overflow-hidden !rounded-[2rem] border-neutral-200/80 !bg-opacity-10 transition-[border-color,box-shadow] duration-300 dark:border-white/10 sm:!rounded-[2.75rem]"
          spotlightColor="rgba(59, 130, 246, 0.14)"
        >
          <div className="relative z-10 flex flex-col gap-8 p-7 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 lg:max-w-[65%]">
              <div className="flex items-center gap-4">
                <div className="surface-tactile-pill flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-blue-600 dark:text-blue-400">
                  <CTAIcon size={28} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                  {t("cta.title")}
                </h3>
              </div>

              <div className="space-y-5">
                <p className="text-base font-medium leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
                  {t("cta.sub_title")}
                </p>

                <ul className="flex flex-wrap gap-2">
                  {SERVICES.map((service) => (
                    <li
                      key={service}
                      className="surface-tactile-pill rounded-full px-3.5 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
              <Link
                href="/contact"
                className={getButtonClasses({
                  variant: "primary",
                  size: "lg",
                  className: "group/btn h-13 w-full px-8 text-base font-semibold lg:w-fit",
                })}
              >
                <span>{t("cta.button")}</span>
                <HiOutlineArrowNarrowRight
                  size={20}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/btn:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </section>
  );
};

export default Services;
