"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useId, useState } from "react";
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
  const searchInputId = useId();
  const filtersPanelId = useId();

  const SORT_OPTIONS: FilterOption[] = [
    { label: t("newest"), value: "newest" },
    { label: t("oldest"), value: "oldest" },
    { label: t("name_asc"), value: "name_asc" },
    { label: t("name_desc"), value: "name_desc" },
  ];

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const initialSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [debouncedSearch] = useDebounceValue(searchValue, 500);

  const currentCategory = searchParams.get("category") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `/projects?${query}` : "/projects", { scroll: false });
  };

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
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      updateQueryParams("search", searchValue.trim());
    }
  };

  const renderDropdown = (
    id: string,
    label: string,
    options: FilterOption[],
    currentValue: string,
  ) => {
    const isOpen = openDropdown === id;
    const activeLabel =
      options.find((opt) => opt.value === currentValue)?.label || t("all");

    return (
      <div className="dropdown-root relative flex flex-col gap-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </span>
        <Button
          type="button"
          variant="secondary"
          size="md"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className="w-full min-w-[160px] justify-between gap-3 px-3 md:w-[180px]"
        >
          <span className="min-w-0 truncate text-sm font-semibold">
            {activeLabel}
          </span>
          <ArrowIcon
            size={16}
            aria-hidden="true"
            className={cn(
              "shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400",
              isOpen && "rotate-180",
            )}
          />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="listbox"
              aria-label={label}
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.14 }}
              style={{ transformOrigin: "top left" }}
              className="absolute left-0 top-[72px] z-20 w-full rounded-xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
            >
              <div className="flex max-h-60 flex-col overflow-y-auto overscroll-contain p-1.5">
                {options.map((opt) => {
                  const isSelected = currentValue === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        const paramKey =
                          id === "Category" ? "category" : id === "Status" ? "status" : "sort";
                        updateQueryParams(paramKey, opt.value);
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500",
                        isSelected
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                          : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
                      )}
                    >
                      <span className="min-w-0 truncate">{opt.label}</span>
                      {isSelected && (
                        <ActiveIcon
                          size={16}
                          aria-hidden="true"
                          className="shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".dropdown-root")) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <search className="relative z-30 mb-8 flex flex-col gap-4">
      <div className="flex flex-col-reverse items-start justify-between gap-4 md:flex-row md:items-center">
        <span
          aria-live="polite"
          className="text-sm font-medium tabular-nums text-neutral-500 dark:text-neutral-400"
        >
          {t("showing_projects", { filtered: totalFiltered, total: totalData })}
        </span>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <div className="input-tactile flex h-10 w-full items-center gap-2.5 rounded-[10px] px-3 md:w-64">
            <label htmlFor={searchInputId} className="sr-only">
              {t("search_placeholder")}
            </label>
            <SearchIcon
              aria-hidden="true"
              className="shrink-0 text-neutral-500 dark:text-neutral-400"
              size={16}
            />
            <input
              id={searchInputId}
              name="search"
              type="search"
              autoComplete="off"
              spellCheck={false}
              placeholder={t("search_placeholder")}
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="h-full w-full bg-transparent text-base font-medium text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-500 sm:text-sm dark:text-neutral-50 dark:placeholder:text-neutral-400"
            />
          </div>

          <Button
            type="button"
            variant={isFiltersOpen ? "primary" : "secondary"}
            size="md"
            aria-expanded={isFiltersOpen}
            aria-controls={filtersPanelId}
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <FilterIcon size={16} aria-hidden="true" />
            <span>{t("filters")}</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            id={filtersPanelId}
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{
              height: "auto",
              opacity: 1,
              transitionEnd: { overflow: "visible" },
            }}
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-4 pb-2 pt-1 md:gap-6">
              {renderDropdown(
                "Category",
                t("category"),
                [{ label: t("all"), value: "all" }, ...categories.map((c) => ({ label: formatLabel(c), value: c }))],
                currentCategory || "all",
              )}
              {renderDropdown(
                "Status",
                t("status"),
                [{ label: t("all"), value: "all" }, ...statuses.map((s) => ({ label: formatLabel(s), value: s }))],
                currentStatus || "all",
              )}
              {renderDropdown("Sort", t("sort_by"), SORT_OPTIONS, currentSort)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </search>
  );
}
