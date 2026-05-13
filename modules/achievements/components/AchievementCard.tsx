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
    <div className="flex h-full cursor-pointer" onClick={onClick}>
      <SpotlightCard className="group flex h-full flex-col overflow-hidden">
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={594}
            height={420}
            className="w-full rounded-t-xl object-cover"
            style={{ aspectRatio: "297/210" }}
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 rounded-t-lg bg-black text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-80">
            <span>{t("show_credential")}</span>
            <ViewIcon size={20} />
          </div>
        </div>
        <div className="my-auto space-y-2 p-5">
          {credential_id && (
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              {credential_id}
            </p>
          )}
          <p className="text-lg font-medium leading-snug text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {issuing_organization}
          </p>
          <div className="space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
              Issued on
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {issueDate}
            </p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default AchievementCard;
