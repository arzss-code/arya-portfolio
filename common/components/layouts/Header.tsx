"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { BadgeCheck, Menu, X } from "lucide-react";
import NextImage from "next/image";

import { MENU_ITEMS } from "@/common/constants/menu";
import { MenuItemProps } from "@/common/types/menu";
import { useMenu } from "@/common/stores/menu";

import Tooltip from "../elements/Tooltip";
import ThemeToggle from "./ThemeToggle";
import IntlToggle from "./IntlToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { isOpen, toggleMenu, hideMenu } = useMenu();
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const t = useTranslations("Navigation");

  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);



  const NavItem = ({ item, compact = false }: { item: MenuItemProps; compact?: boolean }) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}

        className={clsx(
          "relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
          compact ? "w-full" : "",
          isActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50"
        )}
      >
        {isActive && !compact && (
          <motion.span
            layoutId="header-nav-active"
            className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/15 rounded-lg"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className={clsx("relative z-10", isActive && compact && "text-blue-600 dark:text-blue-400")}>
          {item.icon}
        </span>
        <span className="relative z-10">{t(item.title)}</span>
      </Link>
    );
  };

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl shadow-xl shadow-black/[0.03] dark:shadow-black/20 border-b border-neutral-200/50 dark:border-neutral-800/50"
            : "bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 sm:h-20 items-center justify-between">
            {/* Logo & Brand - Always Visible */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
                <NextImage
                  src="/images/icon.webp"
                  alt="Arya"
                  fill
                  className="rounded-full object-cover border-2 border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300 shadow-lg"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900" />
              </div>
              {/* Name - Always visible including mobile */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-neutral-900 dark:text-white text-base">
                    Arya
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/50 dark:bg-neutral-800/30 backdrop-blur-sm rounded-xl p-1 border border-neutral-200/50 dark:border-neutral-700/30">
              {filteredMenu.map((item: MenuItemProps) => (
                <NavItem key={item.href} item={item} />
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile: IntlToggle + ThemeToggle visible in header */}
              <div className="flex lg:hidden items-center gap-2">
                <IntlToggle />
                <ThemeToggle />
              </div>

              {/* Desktop: Theme & Language Toggle */}
              <div className="hidden lg:flex items-center gap-2 rounded-xl p-1">
                <IntlToggle />
                <div className="w-px h-6 bg-neutral-300/50 dark:bg-neutral-600/50" />
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X size={20} className="text-neutral-700 dark:text-neutral-300" />
                  ) : (
                    <Menu size={20} className="text-neutral-700 dark:text-neutral-300" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Dropdown Style */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={hideMenu}
            />

            {/* Dropdown Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-20 right-4 left-4 sm:left-auto sm:w-80 z-50 lg:hidden"
            >
              <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-2xl p-3 overflow-hidden">
                <nav className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
                  {filteredMenu.map((item: MenuItemProps, index: number) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={hideMenu}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 hover:text-neutral-900 dark:hover:text-white"
                        )}
                      >
                        <span className={isActive ? "text-blue-600 dark:text-blue-400" : ""}>
                          {item.icon}
                        </span>
                        <span className="flex-1">{t(item.title)}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-18 sm:h-20" />
    </>
  );
};

export default Header;
