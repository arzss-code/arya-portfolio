import { parseISO } from "date-fns";
import { useLocale } from "next-intl";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";

import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { AchievementItem } from "@/common/types/achievements";

interface AchievementCardProps extends AchievementItem {
  onClick?: () => void;
}

const formatIssueDate = (rawDate: string | undefined, locale: string) => {
  if (!rawDate) return "—";
  try {
    const parsed = parseISO(rawDate);
    if (Number.isNaN(parsed.getTime())) return "—";
    return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
      month: "long",
      year: "numeric",
    }).format(parsed);
  } catch {
    return "—";
  }
};

const AchievementCard = ({
  credential_id,
  name,
  issuing_organization,
  issue_date,
  image,
  onClick,
}: AchievementCardProps) => {
  const locale = useLocale();
  const issueDate = formatIssueDate(issue_date, locale);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full cursor-pointer rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      <SpotlightCard className="relative flex h-full w-full flex-col p-2 transition-shadow duration-300 hover:shadow-md">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-700/60">
          <Image
            src={image}
            alt={name}
            width={594}
            height={420}
            sizes="(max-width: 768px) 100vw, 380px"
            className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ aspectRatio: "297/210" }}
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-3 px-3 py-4">
          {credential_id && (
            <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {credential_id}
            </p>
          )}

          <div className="space-y-1.5">
            <h3 className="flex items-center justify-between gap-3 text-lg font-bold tracking-tight text-neutral-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
              <span className="min-w-0 line-clamp-2 leading-snug">{name}</span>
              <ViewIcon
                size={20}
                aria-hidden="true"
                className="shrink-0 -translate-x-2 text-neutral-400 opacity-0 transition-[transform,opacity,color] duration-200 group-hover:translate-x-0 group-hover:text-blue-500 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              />
            </h3>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {issuing_organization}
            </p>
          </div>

          <div className="mt-auto pt-2">
            <div className="surface-tactile-pill inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5">
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
    </button>
  );
};

export default AchievementCard;
