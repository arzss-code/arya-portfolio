"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import { FiSearch as SearchIcon } from "react-icons/fi";

const InputSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("search") || "";

  const [inputValue, setInputValue] = useState(initialSearch);
  const [debouncedValue] = useDebounceValue(inputValue, 1000);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchValue = inputValue.trim();
      if (searchValue) {
        router.push(`/achievements?search=${encodeURIComponent(searchValue)}`);
      } else {
        router.push("/achievements");
      }
    }
  };

  useEffect(() => {
    const searchValue = debouncedValue.trim();
    const currentSearch = searchParams.get("search") || "";

    if (searchValue !== currentSearch) {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      router.push(`/achievements?${params.toString()}`);
    }
  }, [debouncedValue, searchParams, router]);

  return (
    <div className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-neutral-300 bg-white px-3 shadow-sm transition-all duration-200 focus-within:border-blue-500/80 focus-within:ring-4 focus-within:ring-blue-500/20 dark:border-neutral-600 dark:bg-neutral-800/80 md:w-64">
      <SearchIcon className="text-neutral-500 dark:text-neutral-400" size={16} />
      <input
        type="search"
        placeholder="Search achievements..."
        value={inputValue}
        className="h-full w-full bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-500 dark:text-neutral-50 dark:placeholder:text-neutral-400"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        data-umami-event="input_search"
      />
    </div>
  );
};

export default InputSearch;
