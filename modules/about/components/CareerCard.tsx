"use client";

import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { BsBuildings as CompanyIcon } from "react-icons/bs";
import { HiChevronRight as ChevronIcon } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { differenceInMonths, differenceInYears, format } from "date-fns";
import { id, enUS } from "date-fns/locale";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { CareerProps } from "@/common/types/careers";

const CareerCard = ({
  position,
  company,
  logo,
  location,
  start_date,
  end_date,
  link,
  type,
  location_type,
  responsibilities,
  responsibilities_id,
  indexCareer,
}: CareerProps) => {
  const [isShowResponsibility, setIsShowResponsibility] = useState(false);

  const locale = useLocale();
  const dateLocale = locale === "id" ? id : enUS;

  const startDate = new Date(start_date);
  const endDate = end_date ? new Date(end_date) : new Date();

  // Handle present end_date appropriately for months
  const isPresent = !end_date;
  const durationYears = differenceInYears(endDate, startDate);
  
  // Calculate remaining months precisely
  const totalMonths = differenceInMonths(endDate, startDate);
  const durationMonths = totalMonths % 12;

  const yearText =
    locale == "en" ? `year${durationYears > 1 ? "s" : ""}` : "tahun";
  const monthText = locale == "en" ? `Month${durationMonths > 1 ? "s" : ""}` : "Bulan";

  let durationText = "";
  if (durationYears > 0) {
    durationText += `${durationYears} ${yearText} `;
  }
  if (durationMonths > 0 || durationYears === 0) {
    durationText += `${durationMonths} ${monthText}`;
  }

  const hideText = locale == "en" ? "Hide" : "Sembunyikan";
  const showText = locale == "en" ? "Show" : "Tampilkan";
  const responsibilityText =
    locale == "en" ? "responsibilities" : "tanggung jawab";

  const getTranslatedType = (type: string, locale: string) => {
    if (locale === "id") {
      if (type.toLowerCase() === "organization") return "Organisasi";
      if (type.toLowerCase() === "internship") return "Magang";
      if (type.toLowerCase() === "full-time") return "Purna Waktu";
    }
    return type;
  };

  const getTranslatedLocationType = (locType: string, locale: string) => {
    if (locale === "id") {
      if (locType.toLowerCase() === "onsite") return "Di Tempat";
      if (locType.toLowerCase() === "hybrid") return "Hybrid";
      if (locType.toLowerCase() === "remote") return "Jarak Jauh";
    }
    return locType;
  };

  return (
    <SpotlightCard className="flex flex-col items-start gap-5 p-5 sm:flex-row sm:p-6">
      <div className="shrink-0 rounded-xl border border-neutral-200/60 bg-white p-2 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-800">
        {logo ? (
          <Image
            width={55}
            height={55}
            src={logo}
            alt={company}
            className="aspect-square rounded-lg object-contain"
          />
        ) : (
          <CompanyIcon size={55} className="text-neutral-400" />
        )}
      </div>

      <div className="w-full space-y-4">
        <div className="space-y-1.5">
          <h4 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {position}
          </h4>
          
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <Link href={link || "#"} target="_blank">
              <span className="font-semibold text-neutral-800 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-200 dark:hover:text-neutral-100">
                {company}
              </span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">{location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1 font-medium">
              <span>{format(startDate, "MMM yyyy", { locale: dateLocale })}</span>
              <span>-</span>
              <span className={!end_date ? "text-neutral-900 dark:text-neutral-200" : ""}>
                {end_date ? format(endDate, "MMM yyyy", { locale: dateLocale }) : (locale === "id" ? "Saat ini" : "Present")}
              </span>
            </div>

            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <span>{durationText}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {getTranslatedType(type, locale)}
            </span>
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {getTranslatedLocationType(location_type, locale)}
            </span>
          </div>
        </div>

        {responsibilities != null && (
          <div className="pt-2">
            <button
              onClick={() => setIsShowResponsibility(!isShowResponsibility)}
              className="group flex items-center gap-x-1.5 text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <ChevronIcon
                size={16}
                className={clsx(
                  "transition-transform duration-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-200",
                  isShowResponsibility ? "rotate-90 text-neutral-900 dark:text-neutral-200" : ""
                )}
              />
              <span>
                {isShowResponsibility ? hideText : showText}{" "}
                {responsibilityText}
              </span>
            </button>
            <AnimatePresence>
              {isShowResponsibility && (
                <motion.ul
                  className="ml-[18px] mt-3 list-disc space-y-2 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-300"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {(locale === "id" && responsibilities_id ? responsibilities_id : responsibilities)?.map((responsibility, index) => (
                    <motion.li key={index} layout>
                      {responsibility}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
};

export default CareerCard;
