"use client";

import Link from "next/link";
import { MdArrowOutward as ArrowIcon } from "react-icons/md";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { BentoItemProps } from "@/common/types/bento";

const BentoCard = ({
  title,
  description,
  label,
  icon,
  visual,
  href,
  colSpan,
  className,
  isShow,
}: BentoItemProps) => {
  const content = (
    <SpotlightCard
      className={`glass-card-hover group relative flex h-full flex-col overflow-hidden !rounded-[2.5rem] border border-neutral-200/50 dark:border-white/5 bg-white/40 dark:bg-transparent ${className} transition duration-500`}
    >
      <div
        className={`relative z-10 flex flex-col p-6 sm:p-8 ${
          colSpan === 2 ? "md:flex-row md:items-center md:justify-between gap-6" : ""
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 dark:bg-white/10 text-neutral-900 dark:text-white shadow-inner backdrop-blur-md border border-neutral-200/80 dark:border-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {href && href !== "/" ? (
                  <Link href={href} className="flex h-full w-full items-center justify-center relative z-20" aria-label={title}>
                    {icon}
                  </Link>
                ) : (
                  icon
                )}
              </div>
            )}
            {href && href !== "/" && (
              <Link href={href} className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900/10 text-neutral-900 opacity-0 transition duration-300 hover:scale-110 group-hover:opacity-100 dark:bg-white/10 dark:text-white" aria-label={`View ${title}`}>
                <ArrowIcon size={20} />
              </Link>
            )}
          </div>
          
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {href && href !== "/" ? (
                <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-max relative z-20">
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
            <p className="text-sm font-medium leading-relaxed text-neutral-700 dark:text-white/70 relative z-10 pointer-events-none">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-auto w-full overflow-hidden px-5 pb-5">
        <div className="rounded-[1.5rem] bg-neutral-50/50 dark:bg-white/5 backdrop-blur-sm border border-neutral-200/50 dark:border-white/10 overflow-hidden">
          {visual}
        </div>
      </div>
    </SpotlightCard>
  );

  const spanClass = colSpan === 2 ? "md:col-span-2" : "md:col-span-1";

  return (
    <div className={`${spanClass} h-full`}>
      {content}
    </div>
  );
};

export default BentoCard;
