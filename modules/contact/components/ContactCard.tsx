"use client";

import Link from "next/link";
import { MdArrowOutward as ArrowIcon } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { SocialMediaProps } from "@/common/types/socialMedia";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const ContactCard = ({
  title,
  description,
  name,
  href,
  icon,
  backgroundIcon,
  backgroundGradientColor,
  backgroundColor,
  borderColor,
  textColor,
  colSpan,
}: SocialMediaProps) => {
  const t = useTranslations("ContactPage");
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`h-full ${colSpan}`}
    >
      <Link
        href={href}
        target="_blank"
        data-umami-event={`click_contact_${name}`}
        className="group block h-full"
      >
        <SpotlightCard
          className={`glass-card-hover relative flex h-full flex-col overflow-hidden p-6 !rounded-[2rem] border-2 dark:border-white/5 ${borderColor} ${backgroundGradientColor} !bg-opacity-80`}
        >
          {/* Decorative Background Icon */}
          <div className="absolute -right-8 -top-8 text-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
            {backgroundIcon}
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between gap-6">
            <div className="flex items-start justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${borderColor} border`}
              >
                {icon}
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                <ArrowIcon size={24} />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {t(`social_media.${name}.title`)}
              </h4>
              <p className="text-sm font-medium leading-relaxed text-white/70">
                {t(`social_media.${name}.description`)}
              </p>
            </div>

            <div className="mt-auto pt-2">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 transition-colors duration-300 group-hover:text-white">
                  {locale == "en" ? "Go to" : "Pergi ke"} {name}
                </span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </Link>
    </motion.div>
  );
};

export default ContactCard;
