import { useTranslations } from "next-intl";
import { format, parseISO } from "date-fns";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";

import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { AchievementItem } from "@/common/types/achievements";

interface AchievementCardProps extends AchievementItem {
  onClick?: () => void;
}

const AchievementCard = ({
  credential_id,
  name,
  issuing_organization,
  issue_date,
  image,
  onClick,
}: AchievementCardProps) => {
  const issueDate = issue_date
    ? (() => {
        try {
          return format(parseISO(issue_date), "MMMM yyyy");
        } catch {
          return "Unknown date";
        }
      })()
    : "Unknown date";

  const t = useTranslations("AchievementsPage");

  return (
    <div className="group flex h-full cursor-pointer" onClick={onClick}>
      <SpotlightCard className="relative flex h-full w-full flex-col p-2 hover:shadow-md">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-xl border border-neutral-200/50 dark:border-neutral-700/50">
          <Image
            src={image}
            alt={name}
            width={594}
            height={420}
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ aspectRatio: "297/210" }}
          />
        </div>
        
        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-3 px-3 py-4">
          {credential_id && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {credential_id}
            </p>
          )}
          
          <div className="space-y-1.5">
            <h3 className="flex items-center justify-between gap-4 text-lg font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-blue-500 dark:text-neutral-100 dark:group-hover:text-blue-400">
              <span className="line-clamp-2 leading-snug">{name}</span>
              <ViewIcon
                size={20}
                className="shrink-0 -translate-x-2 text-neutral-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-blue-500 group-hover:opacity-100"
              />
            </h3>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {issuing_organization}
            </p>
          </div>

          <div className="mt-auto pt-2">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 dark:border-neutral-700/80 dark:bg-neutral-800/80">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Issued
              </span>
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                {issueDate}
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default AchievementCard;
