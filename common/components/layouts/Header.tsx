"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { BadgeCheck, Menu, X, ChevronDown } from "lucide-react";
import NextImage from "next/image";

import { MENU_ITEMS } from "@/common/constants/menu";
import { MenuItemProps } from "@/common/types/menu";
import { useMenu } from "@/common/stores/menu";

import Tooltip from "../elements/Tooltip";
import ThemeToggle from "./ThemeToggle";
import IntlToggle from "./IntlToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const { isOpen, toggleMenu, hideMenu } = useMenu();
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const t = useTranslations("Navigation");

  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  
  // Split menu: main items (first 5) and more items (rest)
  const mainMenuItems = filteredMenu.slice(0, 5);
  const moreMenuItems = filteredMenu.slice(5);

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

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavItem = ({ item, compact = false }: { item: MenuItemProps; compact?: boolean }) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        onClick={() => setShowMoreMenu(false)}
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
                  src="/images/satria-3.jpg"
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
                  <Tooltip title="Verified">
                    <BadgeCheck size={16} className="text-blue-500 fill-blue-500" />
                  </Tooltip>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-500 hidden sm:block">
                  Developer
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/50 dark:bg-neutral-800/30 backdrop-blur-sm rounded-xl p-1 border border-neutral-200/50 dark:border-neutral-700/30">
              {mainMenuItems.map((item: MenuItemProps) => (
                <NavItem key={item.href} item={item} />
              ))}
              
              {/* More Menu Dropdown */}
              {moreMenuItems.length > 0 && (
                <div ref={moreMenuRef} className="relative">
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className={clsx(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      showMoreMenu
                        ? "text-blue-600 dark:text-blue-400 bg-blue-500/10"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50"
                    )}
                  >
                    <span>More</span>
                    <ChevronDown 
                      size={14} 
                      className={clsx(
                        "transition-transform duration-300",
                        showMoreMenu && "rotate-180"
                      )} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {showMoreMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-48 py-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-xl shadow-black/10"
                      >
                        {moreMenuItems.map((item: MenuItemProps) => (
                          <NavItem key={item.href} item={item} compact />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile: IntlToggle + ThemeToggle visible in header */}
              <div className="flex lg:hidden items-center gap-2">
                <IntlToggle />
                <ThemeToggle />
              </div>

              {/* Desktop: Theme & Language Toggle */}
              <div className="hidden lg:flex items-center gap-2 bg-neutral-100/50 dark:bg-neutral-800/30 backdrop-blur-sm rounded-xl p-1 border border-neutral-200/50 dark:border-neutral-700/30">
                <IntlToggle />
                <div className="w-px h-6 bg-neutral-300/50 dark:bg-neutral-600/50" />
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
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

      {/* Mobile Menu Overlay - FULL SCREEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Full Screen Background */}
            <div 
              className="absolute inset-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl"
              onClick={hideMenu}
            />

            {/* Full Screen Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="relative h-full flex flex-col pt-20 pb-8 px-6"
            >
              {/* Profile Section */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-neutral-200/50 dark:border-neutral-700/50">
                <div className="relative w-16 h-16">
                  <NextImage
                    src="/images/satria-3.jpg"
                    alt="Arya"
                    fill
                    className="rounded-2xl object-cover border-2 border-blue-500/30 shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white dark:border-neutral-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-neutral-900 dark:text-white">
                      Arya
                    </span>
                    <BadgeCheck size={18} className="text-blue-500 fill-blue-500" />
                  </div>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    @atsiilaarya
                  </span>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                    Full Stack Developer
                  </p>
                </div>
              </div>

              {/* Mobile Navigation Links - Scrollable */}
              <nav className="flex-1 overflow-y-auto space-y-2">
                {filteredMenu.map((item: MenuItemProps, index: number) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={hideMenu}
                        className={clsx(
                          "flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-200",
                          isActive
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 active:scale-[0.98]"
                        )}
                      >
                        <span className={clsx(
                          "p-3 rounded-xl transition-colors",
                          isActive 
                            ? "bg-white/20 text-white" 
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        )}>
                          {item.icon}
                        </span>
                        <span className="flex-1">{t(item.title)}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="mobile-nav-indicator"
                            className="w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-6 mt-6 border-t border-neutral-200/50 dark:border-neutral-700/50 text-center"
              >
                <p className="text-sm text-neutral-500">
                  © 2024 Arya
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Made with 💙 in Indonesia
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-18 sm:h-20" />
    </>
  );
};

export default Header;
