"use client";

import React, { useTransition } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { Locale } from "@/config";
import { setUserLocale } from "@/services/locale";

const IntlToggle = () => {
  const currentLocale = useLocale();

  const locales = [
    { value: "id" as Locale, label: "ID" },
    { value: "en" as Locale, label: "EN" },
  ];

  const [isPending, startTransition] = useTransition();

  const currentIndex = locales.findIndex(
    (locale) => locale.value === currentLocale,
  );

  const handleLocaleChange = (locale: Locale) => {
    if (locale === currentLocale || isPending) return;

    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <>
      {/* Desktop - Tactile Segmented Switch */}
      <div
        role="group"
        aria-label="Language switcher"
        className={`surface-tactile-track relative hidden items-center rounded-full p-1 backdrop-blur-xl lg:flex ${
          isPending ? "pointer-events-none opacity-70" : ""
        }`}
      >
        <motion.div
          aria-hidden="true"
          className="thumb-tactile-primary absolute h-8 w-10 rounded-full"
          style={{ top: "4px", left: "4px" }}
          animate={{
            x: currentIndex * 40,
          }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 28,
          }}
        />

        {locales.map((locale, index) => {
          const isSelected = currentIndex === index;
          return (
            <button
              key={locale.value}
              type="button"
              aria-pressed={isSelected}
              className="relative z-10 flex h-8 w-10 items-center justify-center rounded-full text-xs font-bold leading-none transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              onClick={() => handleLocaleChange(locale.value)}
              disabled={isPending}
              aria-label={`Switch to ${locale.label} language`}
            >
              <span
                translate="no"
                className={
                  isSelected
                    ? "text-white"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                }
              >
                {locale.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile - Tactile Keycap Button */}
      <button
        type="button"
        className={`btn-tactile btn-tactile-secondary h-10 w-10 rounded-xl p-0 lg:hidden ${
          isPending ? "pointer-events-none opacity-70" : ""
        }`}
        onClick={() =>
          handleLocaleChange(locales[(currentIndex + 1) % locales.length].value)
        }
        disabled={isPending}
        aria-label={`Switch language, currently ${currentLocale.toUpperCase()}`}
      >
        <motion.span
          key={currentLocale}
          translate="no"
          initial={{ y: -4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-bold leading-none text-neutral-800 dark:text-neutral-100"
        >
          {currentLocale.toUpperCase()}
        </motion.span>
      </button>
    </>
  );
};

export default IntlToggle;
