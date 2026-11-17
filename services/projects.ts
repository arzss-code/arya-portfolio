import { ProjectItem } from "@/common/types/projects";
import { createPublicSupabaseClient } from "@/common/utils/publicSupabase";
import { createClient } from "@/common/utils/server";

export const getProjectsData = async (): Promise<ProjectItem[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select();
  if (error) {
    console.error("[Projects] Supabase error:", error.message);
    return [];
  }

  return (data as ProjectItem[] | null) ?? [];
};

export const getPublicProjectsData = async (): Promise<ProjectItem[]> => {
  const supabase = createPublicSupabaseClient();
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("is_show", true);

    if (error) {
      console.error("[Projects Public] Supabase error:", error.message);
      return [];
    }

    return (data as ProjectItem[] | null) ?? [];
  } catch (error) {
    console.error("[Projects Public] Unexpected error:", error);
    return [];
  }
};

export const getProjectsDataBySlug = async (
  slug: string,
): Promise<ProjectItem | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(`[Projects] Failed to fetch slug "${slug}":`, error.message);
    return null;
  }

  return (data as ProjectItem | null) ?? null;
};
