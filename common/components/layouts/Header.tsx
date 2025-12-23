"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { HiOutlineMenuAlt3 as MenuIcon } from "react-icons/hi";
import { IoClose as CloseIcon } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";

import { MENU_ITEMS } from "@/common/constants/menu";
import { MenuItemProps } from "@/common/types/menu";
import { useMenu } from "@/common/stores/menu";

import Image from "../elements/Image";
import Tooltip from "../elements/Tooltip";
import ThemeToggle from "./sidebar/ThemeToggle";
import IntlToggle from "./sidebar/IntlToggle";

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
    
    if (item.isExclusive) {
      return (
        <Link
          href={item.href}
          onClick={() => setShowMoreMenu(false)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
        >
          {item.icon}
          <span>{t(item.title)}</span>
        </Link>
      );
    }

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <Image
                  src="/images/satria-3.jpg"
                  width={36}
                  height={36}
                  alt="Arya"
                  className="border-2 border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300 shadow-lg"
                  rounded="rounded-full"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900" />
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-neutral-900 dark:text-white text-sm">
                    Arya
                  </span>
                  <Tooltip title="Verified">
                    <VerifiedIcon size={14} className="text-blue-500" />
                  </Tooltip>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-500">
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
                    <FiChevronDown 
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
              {/* Desktop: Theme & Language Toggle */}
              <div className="hidden md:flex items-center gap-2 bg-neutral-100/50 dark:bg-neutral-800/30 backdrop-blur-sm rounded-xl p-1 border border-neutral-200/50 dark:border-neutral-700/30">
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
                    <CloseIcon size={20} className="text-neutral-700 dark:text-neutral-300" />
                  ) : (
                    <MenuIcon size={20} className="text-neutral-700 dark:text-neutral-300" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={hideMenu}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 lg:hidden"
            >
              <div className="h-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-l border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl flex flex-col">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-200/50 dark:border-neutral-700/50">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/satria-3.jpg"
                      width={40}
                      height={40}
                      alt="Arya"
                      className="border-2 border-blue-500/20"
                      rounded="rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-neutral-900 dark:text-white text-sm">
                          Arya
                        </span>
                        <VerifiedIcon size={14} className="text-blue-500" />
                      </div>
                      <span className="text-xs text-neutral-500">@atsiilaarya</span>
                    </div>
                  </div>
                  <button
                    onClick={hideMenu}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <CloseIcon size={20} className="text-neutral-500" />
                  </button>
                </div>

                {/* Mobile Toggle Buttons */}
                <div className="flex items-center justify-center gap-3 p-4 border-b border-neutral-200/50 dark:border-neutral-700/50 md:hidden">
                  <IntlToggle />
                  <ThemeToggle />
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                  {filteredMenu.map((item: MenuItemProps, index: number) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          href={item.href}
                          onClick={hideMenu}
                          className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                            item.isExclusive &&
                              "bg-gradient-to-r from-blue-500 to-sky-500 text-white border-0 shadow-lg shadow-blue-500/20"
                          )}
                        >
                          <span className={clsx(
                            "p-2 rounded-lg",
                            isActive 
                              ? "bg-blue-500/20" 
                              : "bg-neutral-100 dark:bg-neutral-800",
                            item.isExclusive && "bg-white/20"
                          )}>
                            {item.icon}
                          </span>
                          <span className="flex-1">{t(item.title)}</span>
                          {isActive && !item.isExclusive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
                  <p className="text-xs text-neutral-500 text-center">
                    © 2024 Arya. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;
