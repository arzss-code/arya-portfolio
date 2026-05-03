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
    <SpotlightCard className="flex items-start gap-5 p-6">
      {logo ? (
        <Image
          width={60}
          height={60}
          src={logo}
          alt={company}
          className="aspect-square rounded-lg object-contain bg-neutral-100"
        />
      ) : (
        <CompanyIcon size={65} />
      )}

      <div className="space-y-1">
        <h5>{position}</h5>
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-col gap-2 md:flex-row">
            <Link href={link || "#"} target="_blank">
              <span className="cursor-pointer hover:text-neutral-900 hover:underline hover:dark:text-neutral-50">
                {company}
              </span>
            </Link>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span>{location}</span>
          </div>

          <div className="flex flex-col gap-2 text-[13px] md:flex-row">
            <div className="flex gap-1 text-neutral-600 dark:text-neutral-400">
              <span>{format(startDate, "MMM yyyy", { locale: dateLocale })}</span> -{" "}
              <span>{end_date ? format(endDate, "MMM yyyy", { locale: dateLocale }) : (locale === "id" ? "Saat ini" : "Present")}</span>
            </div>

            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span className="text-neutral-500">{durationText}</span>

            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {getTranslatedType(type, locale)}
            </span>

            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {getTranslatedLocationType(location_type, locale)}
            </span>
          </div>

          {responsibilities != null && (
            <>
              <button
                onClick={() => setIsShowResponsibility(!isShowResponsibility)}
                className="-ml-1 flex items-center justify-center gap-x-1 transition duration-300 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-300"
              >
                <ChevronIcon
                  size={18}
                  className={clsx({
                    "rotate-90 transition-all duration-300":
                      isShowResponsibility,
                  })}
                />
                <p className="text-sm">
                  {isShowResponsibility ? hideText : showText}{" "}
                  {responsibilityText}
                </p>
              </button>
              <AnimatePresence>
                {isShowResponsibility && (
                  <motion.ul
                    className="ml-[18px] list-disc space-y-1 pb-2 text-sm leading-normal text-neutral-600 dark:text-neutral-400"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ y: -20, opacity: 0 }}
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
            </>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default CareerCard;
