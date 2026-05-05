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

  // Skeleton while mounting
  if (!mounted) {
    return (
      <>
        {/* Desktop Skeleton */}
        <div className="hidden lg:flex items-center rounded-full border border-neutral-200/50 dark:border-neutral-700/50 bg-white/60 dark:bg-neutral-800/60 p-1">
          <div className="h-9 w-10" />
          <div className="h-9 w-10" />
        </div>
        {/* Mobile Skeleton */}
        <div className="h-10 w-10 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 bg-white/60 dark:bg-neutral-800/60 lg:hidden" />
      </>
    );
  }

  return (
    <>
      {/* Desktop - Switch Style */}
      <div className="relative hidden items-center rounded-full border border-neutral-200/50 dark:border-neutral-700/30 bg-neutral-100/50 dark:bg-neutral-800/30 backdrop-blur-xl p-1 shadow-sm lg:flex">
        {/* Sliding Background */}
        <motion.div
          className="absolute h-9 w-10 rounded-full bg-blue-500 shadow-md shadow-blue-500/25"
          style={{ top: '4px', left: '4px' }}
          animate={{
            x: isLightMode ? 0 : 40,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        {/* Light Mode Button */}
        <motion.button
          className="relative z-10 h-9 w-10 flex items-center justify-center"
          onClick={() => setTheme("light")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              color: isLightMode ? "#FFFFFF" : "#737373",
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Sun size={18} strokeWidth={2} />
          </motion.div>
        </motion.button>

        {/* Dark Mode Button */}
        <motion.button
          className="relative z-10 h-9 w-10 flex items-center justify-center"
          onClick={() => setTheme("dark")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              color: !isLightMode ? "#FFFFFF" : "#737373",
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Moon size={18} strokeWidth={2} />
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile - Button Style */}
      <button
        className="h-10 w-10 flex items-center justify-center rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl shadow-sm transition-all duration-200 active:scale-95 lg:hidden"
        onClick={() => setTheme(isLightMode ? "dark" : "light")}
      >
        <motion.div
          key={isLightMode ? "to-dark" : "to-light"}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center text-neutral-700 dark:text-neutral-200"
        >
          {isLightMode ? (
            <Moon size={18} strokeWidth={2} />
          ) : (
            <Sun size={18} strokeWidth={2} />
          )}
        </motion.div>
      </button>
    </>
  );
};

export default ThemeToggle;
