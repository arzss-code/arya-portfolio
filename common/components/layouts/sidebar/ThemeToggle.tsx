import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  BsCloudMoon as DarkModeIcon,
  BsCloudSun as LightModeIcon,
} from "react-icons/bs";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Menunggu komponen mounted di client untuk menghindari hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLightMode = resolvedTheme === "light";

  // Render placeholder saat belum mounted untuk menghindari hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        {/* Desktop Skeleton */}
        <div className="relative hidden items-center gap-2 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800 lg:flex">
          <div className="h-8 w-8" />
          <div className="h-8 w-8" />
        </div>
        {/* Mobile Skeleton */}
        <div className="flex items-center gap-2 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {/* Desktop */}
      <div className="relative hidden items-center gap-2 rounded-full border border-white/30 dark:border-neutral-700/50 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl p-1 shadow-lg shadow-black/5 lg:flex">
        {/* Sliding Background */}
        <motion.div
          className="absolute bottom-1 top-1 w-8 rounded-full bg-white/80 dark:bg-neutral-600 shadow-md"
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
          className="relative z-10 flex h-8 w-8 items-center justify-center transition duration-200"
          onClick={() => setTheme("light")}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              color: isLightMode ? "#171717" : "#FFFFFF",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <LightModeIcon size={17} />
          </motion.div>
        </motion.button>

        {/* Dark Mode Button */}
        <motion.button
          className="relative z-10 flex h-8 w-8 items-center justify-center transition duration-200"
          onClick={() => setTheme("dark")}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              color: !isLightMode ? "#FFFFFF" : "#737373",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <DarkModeIcon size={17} />
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile */}
      <button
        className="flex items-center gap-2 rounded-full border border-white/30 dark:border-neutral-700/50 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl p-1 shadow-lg shadow-black/5 transition-all duration-200 hover:scale-110 hover:shadow-xl lg:hidden"
        onClick={() => setTheme(isLightMode ? "dark" : "light")}
      >
        <motion.div
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-neutral-600 shadow-md text-neutral-900 dark:text-neutral-50"
        >
          {isLightMode ? (
            <DarkModeIcon size={17} />
          ) : (
            <LightModeIcon size={17} />
          )}
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeToggle;

