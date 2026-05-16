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
      {/* Desktop - Switch Style */}
      <div
        className={`relative hidden items-center rounded-full border border-neutral-200/50 dark:border-neutral-700/30 bg-neutral-100/50 dark:bg-neutral-800/30 backdrop-blur-xl p-1 lg:flex ${
          isPending ? "pointer-events-none opacity-70" : ""
        }`}
      >
        {/* Sliding Background */}
        <motion.div
          className="absolute h-9 w-10 rounded-full bg-blue-500 shadow-md shadow-blue-500/25"
          style={{ top: '4px', left: '4px' }}
          animate={{
            x: currentIndex * 40,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        {/* Locale Buttons */}
        {locales.map((locale, index) => (
          <motion.button
            key={locale.value}
            className="relative z-10 h-9 w-10 flex items-center justify-center"
            onClick={() => handleLocaleChange(locale.value)}
            whileHover={{ scale: isPending ? 1 : 1.05 }}
            whileTap={{ scale: isPending ? 1 : 0.95 }}
            disabled={isPending}
            aria-label={`Switch to ${locale.label} language`}
          >
            <motion.span
              className="text-xs font-bold leading-none"
              animate={{
                color: currentIndex === index ? "#FFFFFF" : "#737373",
              }}
              transition={{ duration: 0.2 }}
            >
              {locale.label}
            </motion.span>
          </motion.button>
        ))}
      </div>

      {/* Mobile - Button Style */}
      <button
        className={`h-10 w-10 flex items-center justify-center rounded-xl border shadow-sm border-neutral-200/50 dark:border-neutral-700/50 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl transition-all duration-200 active:scale-95 lg:hidden ${
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
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-bold text-neutral-700 dark:text-neutral-200 leading-none"
        >
          {currentLocale.toUpperCase()}
        </motion.span>
      </button>
    </>
  );
};

export default IntlToggle;
