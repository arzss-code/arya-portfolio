import Image from "next/image";
import { BsBuildings as CompanyIcon } from "react-icons/bs";

import { EducationProps } from "@/common/types/education";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const EducationCard = ({
  school,
  major,
  logo,
  degree,
  start_year,
  end_year,
  link,
  location,
}: EducationProps) => {
  return (
    <SpotlightCard className="flex flex-col items-start gap-5 p-5 sm:flex-row sm:p-6">
      <div className="shrink-0 rounded-xl border border-neutral-200/60 bg-white p-2 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-800">
        {logo ? (
          <Image
            width={55}
            height={55}
            src={logo}
            alt={school}
            className="aspect-square rounded-lg object-contain"
          />
        ) : (
          <CompanyIcon size={55} className="text-neutral-400" />
        )}
      </div>

      <div className="w-full space-y-4">
        <div className="space-y-1.5">
          <a href={link || "#"} target="_blank" className="group flex w-fit items-center gap-1">
            <h4 className="text-lg font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 group-hover:underline dark:text-neutral-100 dark:group-hover:text-neutral-300">
              {school}
            </h4>
          </a>
          
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              {degree}
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {major}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1 font-medium">
              <span>{start_year}</span>
              <span>-</span>
              <span>{end_year}</span>
            </div>
            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default EducationCard;
