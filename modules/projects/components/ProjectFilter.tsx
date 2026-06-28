"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import { FiSearch as SearchIcon, FiFilter as FilterIcon } from "react-icons/fi";
import { LuChevronsUpDown as ArrowIcon } from "react-icons/lu";
import { TiTick as ActiveIcon } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

import cn from "@/common/libs/clsxm";
import Button from "@/common/components/elements/Button";

interface FilterOption {
  label: string;
  value: string;
}

interface ProjectFilterProps {
  totalData: number;
  totalFiltered: number;
  categories: string[];
  statuses: string[];
}

const formatLabel = (value: string) =>
  value.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());



export default function ProjectFilter({
  totalData,
  totalFiltered,
  categories,
  statuses,
}: ProjectFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("ProjectsPage.filter");

  const SORT_OPTIONS: FilterOption[] = [
    { label: t("newest"), value: "newest" },
    { label: t("oldest"), value: "oldest" },
    { label: t("name_asc"), value: "name_asc" },
    { label: t("name_desc"), value: "name_desc" },
  ];

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Search state
  const initialSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [debouncedSearch] = useDebounceValue(searchValue, 500);

  // Filter states
  const currentCategory = searchParams.get("category") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentSort = searchParams.get("sort") || "newest";

  // Handle URL updates
  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  // Search effect
  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();
    if (trimmedSearch !== (searchParams.get("search") || "")) {
      updateQueryParams("search", trimmedSearch);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateQueryParams("search", searchValue.trim());
    }
  };

  const renderDropdown = (
    id: string,
    label: string,
    options: FilterOption[],
    currentValue: string
  ) => {
    const isOpen = openDropdown === id;
    const activeLabel =
      options.find((opt) => opt.value === currentValue)?.label || t("all");

    return (
      <div className="relative flex flex-col gap-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </span>
        <Button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className="flex h-10 w-full min-w-[160px] md:w-[180px] items-center justify-between gap-3 rounded-lg border border-neutral-300 bg-white px-3 text-neutral-800 shadow-sm transition-all hover:bg-neutral-50 focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <span className="truncate text-sm font-semibold">{activeLabel}</span>
          <ArrowIcon
            size={16}
            className={cn(
              "text-neutral-500 transition-transform duration-200 dark:text-neutral-400 shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-[72px] z-20 w-full rounded-lg border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
            >
              <div className="flex max-h-60 flex-col overflow-y-auto p-1.5">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      updateQueryParams(
                        id === "Category"
                          ? "category"
                          : id === "Status"
                          ? "status"
                          : "sort",
                        opt.value
                      );
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm font-medium transition-colors",
                      currentValue === opt.value
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                        : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {currentValue === opt.value && (
                      <ActiveIcon size={16} className="shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".relative")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-30 mb-8 flex flex-col gap-4">
      <div className="flex flex-col-reverse items-start justify-between gap-4 md:flex-row md:items-center">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {t("showing_projects", { filtered: totalFiltered, total: totalData })}
        </span>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <div className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-neutral-300 bg-white px-3 shadow-sm transition-all focus-within:border-blue-500/80 focus-within:ring-4 focus-within:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-900 md:w-64">
            <SearchIcon
              className="text-neutral-500 dark:text-neutral-400 shrink-0"
              size={16}
            />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="h-full w-full bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-500 dark:text-neutral-50 dark:placeholder:text-neutral-400"
            />
          </div>

          <Button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={cn(
              "flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-all shadow-sm focus:ring-4 focus:ring-blue-500/20 outline-none",
              isFiltersOpen
                ? "border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-500/50 dark:bg-blue-500/20 dark:text-blue-300 dark:hover:bg-blue-500/30"
                : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            )}
          >
            <FilterIcon size={16} />
            <span>{t("filters")}</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transitionEnd: { overflow: "visible" } 
            }}
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-4 pt-1 pb-2 md:gap-6">
              {renderDropdown(
                "Category",
                t("category"),
                [{ label: t("all"), value: "all" }, ...categories.map(c => ({ label: formatLabel(c), value: c }))],
                currentCategory || "all"
              )}
              {renderDropdown(
                "Status",
                t("status"),
                [{ label: t("all"), value: "all" }, ...statuses.map(s => ({ label: formatLabel(s), value: s }))],
                currentStatus || "all"
              )}
              {renderDropdown(
                "Sort",
                t("sort_by"),
                SORT_OPTIONS,
                currentSort
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
