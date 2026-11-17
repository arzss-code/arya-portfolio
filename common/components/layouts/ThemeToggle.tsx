"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLightMode = resolvedTheme === "light";

  if (!mounted) {
    return (
      <>
        <div className="surface-tactile-track hidden items-center rounded-full p-1 lg:flex">
          <div className="h-8 w-10" />
          <div className="h-8 w-10" />
        </div>
        <div className="btn-tactile btn-tactile-secondary h-10 w-10 rounded-xl p-0 lg:hidden" />
      </>
    );
  }

  return (
    <>
      {/* Desktop - Tactile Segmented Switch */}
      <div
        role="group"
        aria-label="Theme switcher"
        className="surface-tactile-track relative hidden items-center rounded-full p-1 backdrop-blur-xl lg:flex"
      >
        <motion.div
          aria-hidden="true"
          className="thumb-tactile-primary absolute h-8 w-10 rounded-full"
          style={{ top: "4px", left: "4px" }}
          animate={{
            x: isLightMode ? 0 : 40,
          }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 28,
          }}
        />

        <button
          type="button"
          aria-pressed={isLightMode}
          className="relative z-10 flex h-8 w-10 items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          onClick={() => setTheme("light")}
          aria-label="Switch to light theme"
        >
          <Sun
            size={17}
            strokeWidth={2}
            aria-hidden="true"
            className={
              isLightMode
                ? "text-white"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            }
          />
        </button>

        <button
          type="button"
          aria-pressed={!isLightMode}
          className="relative z-10 flex h-8 w-10 items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          onClick={() => setTheme("dark")}
          aria-label="Switch to dark theme"
        >
          <Moon
            size={17}
            strokeWidth={2}
            aria-hidden="true"
            className={
              !isLightMode
                ? "text-white"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            }
          />
        </button>
      </div>

      {/* Mobile - Tactile Keycap Button */}
      <button
        type="button"
        className="btn-tactile btn-tactile-secondary h-10 w-10 rounded-xl p-0 lg:hidden"
        onClick={() => setTheme(isLightMode ? "dark" : "light")}
        aria-label={
          isLightMode ? "Switch to dark theme" : "Switch to light theme"
        }
      >
        <motion.div
          key={isLightMode ? "to-dark" : "to-light"}
          initial={{ rotate: -25, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center text-neutral-800 dark:text-neutral-100"
        >
          {isLightMode ? (
            <Moon size={18} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Sun size={18} strokeWidth={2} aria-hidden="true" />
          )}
        </motion.div>
      </button>
    </>
  );
};

export default ThemeToggle;
