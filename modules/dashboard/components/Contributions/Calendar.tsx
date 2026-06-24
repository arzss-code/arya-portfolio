"use client";

import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

interface Contribution {
  date: string;
  contributionCount: number;
  color: string;
}

interface Month {
  name: string;
  firstDay: string;
  totalWeeks: number;
  contributionsCount: number;
}

interface CalendarProps {
  data?: {
    weeks: {
      firstDay: string;
      contributionDays: Contribution[];
    }[];
    months: Month[];
    colors: string[];
  };
}

const Calendar = ({ data }: CalendarProps) => {
  const [selectContribution, setSelectContribution] = useState<{
    count: number | null;
    date: string | null;
  }>({
    count: null,
    date: null,
  });

  const t = useTranslations("DashboardPage.github");
  const locale = useLocale();

  const weeks = data?.weeks ?? [];
  const months =
    data?.months?.map((month: Month) => {
      const filterContributionDay = weeks
        .filter(
          (week) => week.firstDay.slice(0, 7) === month.firstDay.slice(0, 7),
        )
        .map((item) => item.contributionDays)
        .flat(1);
      const getContributionsByMonth = filterContributionDay.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.contributionCount,
        0,
      );

      return {
        ...month,
        contributionsCount: getContributionsByMonth,
      };
    }) ?? [];

  const contributionColors = data?.colors ?? [];

  return (
    <div className="mt-6 flex w-full flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900/50 sm:p-6">
      <div className="relative flex flex-col">
        <ul className="flex justify-end gap-[3px] overflow-x-auto w-full text-xs dark:text-neutral-400 md:justify-start">
          {months.map((month) => (
            <li
              key={month.firstDay}
              className={clsx(`${month.totalWeeks < 2 ? "invisible" : ""}`)}
              style={{
                minWidth: 14.3 * month.totalWeeks,
                flexGrow: month.totalWeeks,
                flexBasis: 0,
              }}
            >
              {month.name}
            </li>
          ))}
        </ul>

        <div className="flex justify-start gap-[3px] overflow-x-auto w-full pb-3 pt-1 px-1 -mx-1">
          {weeks?.map((week, weekIndex) => (
            <motion.div 
              key={week.firstDay} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: weekIndex * 0.02, duration: 0.3 }}
              className="flex flex-1 flex-col gap-[3px] min-w-[12px]"
            >
              {week.contributionDays.map((contribution) => {
                const backgroundColor =
                  contribution.contributionCount > 0 && contribution.color;

                return (
                  <span
                    key={contribution.date}
                    className="aspect-square w-full rounded-[2px] bg-neutral-200/70 outline-none transition-all duration-200 hover:ring-2 hover:ring-blue-500/50 hover:dark:ring-blue-400/50 dark:bg-neutral-800"
                    style={backgroundColor ? { backgroundColor } : undefined}
                    onMouseEnter={() =>
                      setSelectContribution({
                        count: contribution.contributionCount,
                        date: contribution.date,
                      })
                    }
                    onMouseLeave={() =>
                      setSelectContribution({ count: null, date: null })
                    }
                  />
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
        <div className="flex items-center gap-2 text-sm">
          <span className="dark:text-neutral-400">
            {t("title_less_contribution")}
          </span>
          <ul className="flex gap-1">
            <li className="h-[10px] w-[10px] rounded-[2px] bg-neutral-200/70 dark:bg-neutral-800" />
            {contributionColors.map((item, index) => (
              <motion.li
                key={item}
                initial="initial"
                animate="animate"
                variants={{
                  initial: { opacity: 0 },
                  animate: {
                    opacity: 1,
                    transition: { delay: index * 0.3 },
                  },
                }}
                className="h-[10px] w-[10px] rounded-sm"
                style={{ backgroundColor: item }}
              />
            ))}
          </ul>
          <span>{t("title_more_contribution")}</span>
        </div>

        <div
          className={clsx(
            `${selectContribution?.date ? "opacity-100" : "opacity-0"}`,
            "rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 transition-opacity duration-300 dark:bg-neutral-800 dark:text-neutral-300",
          )}
        >
          {selectContribution?.count}{" "}
          {locale == "en" ? "contributions on" : "kontribusi pada"}{" "}
          {selectContribution?.date}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
