"use client";

import useSWR from "swr";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import ProjectSkeleton from "./ProjectSkeleton";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";

import EmptyState from "@/common/components/elements/EmptyState";
import { fetcher } from "@/services/fetcher";
import { ProjectItem } from "@/common/types/projects";

const Projects = () => {
  const { data, isLoading, error } = useSWR<ProjectItem[]>("/api/projects", fetcher);
  const t = useTranslations("ProjectsPage");
  const searchParams = useSearchParams();

  // URL Params
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "newest";

  // Compute dynamic options
  const categoryOptions = useMemo(() => {
    if (!data) return [];
    const unique = new Set(
      data
        .filter((item) => item?.is_show && item?.project_type)
        .map((item) => item.project_type?.trim())
        .filter(Boolean) as string[]
    );
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const statusOptions = useMemo(() => {
    if (!data) return [];
    const unique = new Set(
      data
        .filter((item) => item?.is_show && item?.status)
        .map((item) => item.status?.trim())
        .filter(Boolean) as string[]
    );
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filteredProjects = useMemo(() => {
    let result = (data ?? []).filter((item) => item?.is_show);

    // Apply Filters
    if (search) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          item.stacks?.some((s) => s.toLowerCase().includes(search))
      );
    }

    if (category && category !== "all") {
      result = result.filter((item) => item.project_type === category);
    }

    if (status && status !== "all") {
      result = result.filter((item) => item.status === status);
    }

    // Apply Sorting
    result = result.sort((a, b) => {
      // is_featured always takes precedence
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;

      // Then apply selected sort
      switch (sort) {
        case "oldest":
          return a.id - b.id;
        case "name_asc":
          return a.title.localeCompare(b.title);
        case "name_desc":
          return b.title.localeCompare(a.title);
        case "newest":
        default:
          return b.id - a.id;
      }
    });

    return result;
  }, [data, search, category, status, sort]);

  const totalData = data?.filter((item) => item?.is_show).length || 0;

  if (error) {
    return <EmptyState message={t("error")} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(4)].map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {totalData > 0 && (
        <ProjectFilter
          totalData={totalData}
          totalFiltered={filteredProjects.length}
          categories={categoryOptions}
          statuses={statusOptions}
        />
      )}

      {filteredProjects.length === 0 ? (
        <EmptyState message={t("no_data")} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.1, 1) }} // cap delay at 1s for long lists
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
