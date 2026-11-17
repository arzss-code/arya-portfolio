"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import EmptyState from "@/common/components/elements/EmptyState";
import { AchievementItem } from "@/common/types/achievements";
import { fetcher } from "@/services/fetcher";

import AchievementCard from "./AchievementCard";
import AchievementDetailModal from "./AchievementDetailModal";
import AchievementSkeleton from "./AchievementSkeleton";
import FilterHeader from "./FilterHeader";

interface AchievementsProps {
  initialData?: AchievementItem[];
}

const Achievements = ({ initialData }: AchievementsProps) => {
  const t = useTranslations("AchievementsPage");
  const hasInitialData = Boolean(initialData && initialData.length > 0);

  const params = useSearchParams();
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementItem | null>(null);
  const category = params.get("category")?.toLowerCase() || "";
  const search = params.get("search")?.toLowerCase() || "";
  const sort = params.get("sort") || "newest";

  const { data, isLoading, error } = useSWR<AchievementItem[]>(
    "/api/achievements",
    fetcher,
    {
      fallbackData: hasInitialData ? initialData : undefined,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: !hasInitialData,
      dedupingInterval: 60000,
    },
  );

  const categoryOptions = useMemo(() => {
    const values = (data ?? [])
      .filter((item: AchievementItem) => item?.is_show)
      .map((item: AchievementItem) => item?.category?.trim())
      .filter((value): value is string => !!value);

    const unique = new Map<string, string>();
    values.forEach((value) => {
      const key = value.toLowerCase();
      if (!unique.has(key)) unique.set(key, value);
    });

    return Array.from(unique.values()).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filteredAchievements: AchievementItem[] = (data ?? [])
    .filter((item: AchievementItem) => item?.is_show)
    .filter(
      (item: AchievementItem) =>
        !category || item?.category?.toLowerCase() === category,
    )
    .filter((item: AchievementItem) => {
      if (!search) return true;
      const nameMatch = item?.name?.toLowerCase().includes(search);
      const credentialMatch = item?.credential_id
        ?.toLowerCase()
        .includes(search);
      return nameMatch || credentialMatch;
    })
    .sort((a: AchievementItem, b: AchievementItem) => {
      if (sort === "oldest") return a.id - b.id;
      if (sort === "name_asc") return a.name.localeCompare(b.name);
      if (sort === "name_desc") return b.name.localeCompare(a.name);
      return b.id - a.id;
    });

  const allVisibleAchievements = (data ?? []).filter(
    (item: AchievementItem) => item?.is_show,
  );
  const showSkeleton = isLoading && !data;
  const showError = Boolean(error && !data);
  const hasData = filteredAchievements.length > 0;

  return (
    <section className="space-y-4">
      {!showSkeleton && !showError && allVisibleAchievements.length > 0 && (
        <FilterHeader
          totalData={allVisibleAchievements.length}
          totalFiltered={filteredAchievements.length}
          categories={categoryOptions}
        />
      )}

      {showSkeleton && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <AchievementSkeleton key={i} />
          ))}
        </div>
      )}

      {showError && <EmptyState message={t("error")} />}

      {!showSkeleton && !showError && !hasData && (
        <EmptyState message={t("no_data")} />
      )}

      {!showSkeleton && !showError && filteredAchievements.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {filteredAchievements?.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
            >
              <AchievementCard
                {...item}
                onClick={() => setSelectedAchievement(item)}
              />
            </motion.div>
          ))}
        </div>
      )}

      <AchievementDetailModal
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        achievement={selectedAchievement}
      />
    </section>
  );
};

export default Achievements;
