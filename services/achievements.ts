import { AchievementItem } from "@/common/types/achievements";
import { createPublicSupabaseClient } from "@/common/utils/publicSupabase";
import { createClient } from "@/common/utils/server";

interface GetAchievementsDataProps {
  category?: string;
  search?: string;
}

const ACHIEVEMENT_COLUMNS =
  "id, credential_id, slug, name, issuing_organization, category, url_credential, issue_date, expiration_date, image, is_show";

export const getAchievementsData = async ({
  category,
  search,
}: GetAchievementsDataProps): Promise<AchievementItem[]> => {
  const supabase = await createClient();

  let query = supabase.from("achievements").select(ACHIEVEMENT_COLUMNS);

  if (category) {
    query = query.ilike("category", category);
  }

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[Achievements] Supabase error:", error.message);
    throw new Error(error.message);
  }

  return (data as AchievementItem[] | null) ?? [];
};

export const getPublicAchievementsData = async (): Promise<
  AchievementItem[]
> => {
  const supabase = createPublicSupabaseClient();
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("achievements")
      .select(ACHIEVEMENT_COLUMNS)
      .eq("is_show", true);

    if (error) {
      console.error("[Achievements Public] Supabase error:", error.message);
      return [];
    }

    return (data as AchievementItem[] | null) ?? [];
  } catch (error) {
    console.error("[Achievements Public] Unexpected error:", error);
    return [];
  }
};
