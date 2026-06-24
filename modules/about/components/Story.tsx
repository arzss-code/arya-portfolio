"use client";

import { useEffect, useState } from "react";
import Image from "@/common/components/elements/Image";
import { useTranslations } from "next-intl";

import { METADATA } from "@/common/constants/metadata";

const Story = () => {
  const t = useTranslations("AboutPage");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      });
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const paragrafData = [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }];

  return (
    <section className="flex flex-col items-center gap-10 md:flex-row md:items-start lg:gap-14">
      {/* Lanyard / Profile Card */}
      <div className="group relative w-full max-w-[280px] shrink-0 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
        {/* Lanyard Hole */}
        <div className="absolute -top-2 left-1/2 h-3 w-12 -translate-x-1/2 rounded-full border border-neutral-300 bg-neutral-100 shadow-inner dark:border-neutral-700 dark:bg-neutral-800" />
        <div className="absolute -top-6 left-1/2 h-5 w-2 -translate-x-1/2 rounded-t-sm bg-neutral-300 dark:bg-neutral-700" />

        <div className="mt-4 flex flex-col items-center text-center">
          <div className="relative mb-5 overflow-hidden rounded-full ring-4 ring-neutral-100 dark:ring-neutral-800">
            <Image
              src={METADATA.profile}
              alt={METADATA.creator}
              width={140}
              height={140}
              className="aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {METADATA.creator}
          </h3>
          <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Frontend Developer
          </p>

          <div className="mt-6 w-full border-t border-dashed border-neutral-200 pt-4 dark:border-neutral-800">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1.5">
                {time ? `${time} WIB` : "Indonesia"}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Text */}
      <div className="relative flex max-w-[75ch] flex-1 flex-col gap-6 text-[16px] leading-8 text-neutral-700 dark:text-neutral-300">
        {paragrafData.map((paragraph) => (
          <p key={paragraph.index} className="text-justify md:text-left">
            {t(`resume.paragraf_${paragraph.index}`)}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Story;
