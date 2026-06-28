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

const Achievements = () => {
  const t = useTranslations("AchievementsPage");

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
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
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

  const allVisibleAchievements = (data ?? []).filter((item: AchievementItem) => item?.is_show);
  const hasData = filteredAchievements.length > 0;

  return (
    <section className="space-y-4">
      {!isLoading && !error && allVisibleAchievements.length > 0 && (
        <FilterHeader
          totalData={allVisibleAchievements.length}
          totalFiltered={filteredAchievements.length}
          categories={categoryOptions}
        />
      )}

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <AchievementSkeleton key={i} />
          ))}
        </div>
      )}

      {error && <EmptyState message={t("error")} />}

      {!isLoading && !error && !hasData && (
        <EmptyState message={t("no_data")} />
      )}

      {!isLoading && !error && filteredAchievements.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {filteredAchievements?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AchievementCard
                key={index}
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
