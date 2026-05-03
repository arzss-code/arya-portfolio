"use client";

import useSWR from "swr";

import Folder from "@/common/components/elements/Folder";
import Image from "@/common/components/elements/Image";
import { AchievementItem } from "@/common/types/achievements";
import { fetcher } from "@/services/fetcher";

const AchievementFolder = () => {
  const { data } = useSWR("/api/achievements", fetcher);

  const filteredAchievements = data
    ?.filter((item: AchievementItem) => item?.is_show)
    .sort((a: AchievementItem, b: AchievementItem) => b.id - a.id)
    .slice(0, 3);

  const items =
    filteredAchievements?.map((item: AchievementItem) => (
      <Image
        key={item.id}
        src={item.image}
        alt={item.name}
        width={320}
        height={180}
        className="h-full w-full rounded-md object-cover"
      />
    )) ?? [];

  return (
    <div className="flex h-full w-full items-center justify-center mb-8 mt-18">
      <Folder
        size={1}
        color="#facc15"
        items={items}
      />
    </div>
  );
};

export default AchievementFolder;
