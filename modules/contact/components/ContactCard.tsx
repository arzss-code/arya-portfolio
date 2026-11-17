"use client";

import Link from "next/link";
import { MdArrowOutward as ArrowIcon } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { SocialMediaProps } from "@/common/types/socialMedia";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const ContactCard = ({
  name,
  href,
  icon,
  backgroundIcon,
  backgroundGradientColor,
  borderColor,
  colSpan,
}: SocialMediaProps) => {
  const t = useTranslations("ContactPage");
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`h-full ${colSpan ?? ""}`}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event={`click_contact_${name}`}
        className="group block h-full rounded-[2rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
      >
        <SpotlightCard
          className={`glass-card-hover relative flex h-full flex-col overflow-hidden !rounded-[2rem] border-2 p-6 dark:border-white/10 ${borderColor} ${backgroundGradientColor} !bg-opacity-85`}
        >
          {/* Decorative Background Icon */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 text-white/5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
          >
            {backgroundIcon}
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between gap-6">
            <div className="flex items-start justify-between">
              <div
                aria-hidden="true"
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 ${borderColor}`}
              >
                {icon}
              </div>
              <div
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-opacity duration-200 sm:opacity-75 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
              >
                <ArrowIcon size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {t(`social_media.${name}.title`)}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-white/80">
                {t(`social_media.${name}.description`)}
              </p>
            </div>

            <div className="mt-auto pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/75 transition-colors duration-200 group-hover:text-white">
                {locale === "en" ? "Open" : "Buka"} {name}
              </span>
            </div>
          </div>
        </SpotlightCard>
      </Link>
    </motion.div>
  );
};

export default ContactCard;
