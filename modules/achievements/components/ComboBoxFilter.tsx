import { ChangeEvent, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuChevronsUpDown as ArrowIcon } from "react-icons/lu";
import { TiTick as ActiveIcon } from "react-icons/ti";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { motion } from "framer-motion";

import cn from "@/common/libs/clsxm";
import Button from "@/common/components/elements/Button";

interface dataComboBox {
  label: string;
  value: string;
}

interface ComboBoxFilterProps {
  categories?: string[];
}

const defaultData: dataComboBox[] = [
  {
    label: "Certificate",
    value: "certificate",
  },
  {
    label: "Badge",
    value: "badge",
  },
];

const formatLabel = (value: string) =>
  value.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const ComboBoxFilter = ({ categories }: ComboBoxFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValueSearch, setInputValueSearch] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category");

  const router = useRouter();
  const comboBoxRef = useRef<HTMLDivElement>(null);

  const normalizedCategories = (categories ?? [])
    .map((value) => value.trim())
    .filter(Boolean);

  const uniqueCategories = Array.from(
    new Map(
      normalizedCategories.map((value) => [value.toLowerCase(), value]),
    ).values(),
  );

  const data: dataComboBox[] = uniqueCategories.length
    ? uniqueCategories.map((value) => ({
        label: formatLabel(value),
        value,
      }))
    : defaultData;

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(inputValueSearch.toLowerCase()),
  );

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (newValue: string) => {
    setSelectValue((prevValue) => (prevValue === newValue ? "" : newValue));
    setIsOpen(false);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueSearch(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      comboBoxRef.current &&
      !comboBoxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (categoryParams) {
      setSelectValue(categoryParams);
    } else {
      setSelectValue("");
    }
  }, [categoryParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentCategory = params.get("category") || "";

    if (currentCategory === selectValue) return;

    if (selectValue) {
      params.set("category", selectValue);
    } else {
      params.delete("category");
    }

    const query = params.toString();
    router.push(query ? `/achievements?${query}` : "/achievements");
  }, [router, searchParams, selectValue]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={comboBoxRef} className="relative w-full md:w-[220px]">
      <Button
        className="flex h-10 w-full items-center justify-between gap-3 rounded-lg border border-neutral-300 bg-white px-3 text-neutral-800 shadow-sm transition-all duration-200 hover:bg-neutral-50 focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/20 dark:border-neutral-600 dark:bg-neutral-800/80 dark:text-neutral-100 dark:hover:bg-neutral-700"
        onClick={handleClickOpen}
        data-umami-event="click_filter_achievements"
      >
        <span className="text-sm font-semibold">
          {selectValue
            ? data.find((item) => item.value === selectValue)?.label ||
              formatLabel(selectValue)
            : `Filter categories`}
        </span>
        <ArrowIcon
          size={16}
          className={cn("text-neutral-500 dark:text-neutral-400 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-12 z-20 w-full"
        >
          <div className="w-full overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-xl dark:border-neutral-600 dark:bg-neutral-800">
            <div className="flex items-center gap-2.5 border-b border-neutral-200 px-3 py-2.5 dark:border-neutral-700">
              <SearchIcon size={16} className="text-neutral-500 dark:text-neutral-400" />
              <input
                type="search"
                className="w-full bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-500 dark:text-neutral-50 dark:placeholder:text-neutral-400"
                placeholder="Search category..."
                onChange={handleChangeInput}
                value={inputValueSearch}
              />
            </div>

            <div className="max-h-60 overflow-y-auto p-1.5">
              {filteredData.length === 0 && (
                <div className="px-3 py-4 text-center text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  No category found.
                </div>
              )}

              {filteredData.map((item, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium transition-colors",
                    item.value === selectValue
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                      : "text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  )}
                  onClick={() => handleSelect(item.value)}
                >
                  <span className="flex-1">{item.label}</span>
                  {item.value === selectValue && <ActiveIcon size={16} className="shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ComboBoxFilter;
