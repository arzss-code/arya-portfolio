import { createClient } from "@/common/utils/server";

interface GetAchievementsDataProps {
  category?: string;
  search?: string;
}

export const getAchievementsData = async ({
  category,
  search,
}: GetAchievementsDataProps) => {
  const supabase = await createClient();

  let query = supabase
    .from("achievements")
    .select(
      "id, credential_id, slug, name, issuing_organization, category, url_credential, issue_date, expiration_date, image, is_show",
    );

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

  return data ?? [];
};
