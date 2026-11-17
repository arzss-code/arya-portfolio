"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import NextImage from "next/image";

import { getButtonClasses } from "@/common/components/elements/Button";
import { MENU_ITEMS } from "@/common/constants/menu";
import { MenuItemProps } from "@/common/types/menu";
import { useMenu } from "@/common/stores/menu";

import ThemeToggle from "./ThemeToggle";
import IntlToggle from "./IntlToggle";

interface NavItemProps {
  item: MenuItemProps;
  compact?: boolean;
  isActive: boolean;
  translateLabel: (key: string) => string;
}

const NavItem = ({
  item,
  compact = false,
  isActive,
  translateLabel,
}: NavItemProps) => {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        compact ? "w-full" : "",
        isActive
          ? "font-semibold text-blue-600 dark:text-blue-400"
          : "text-neutral-600 hover:bg-white/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white",
      )}
    >
      {isActive && !compact && (
        <motion.span
          layoutId="header-nav-active"
          className="surface-tactile-pill absolute inset-0 rounded-lg"
          transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
        />
      )}
      <span
        aria-hidden="true"
        className={clsx(
          "relative z-10",
          isActive && "text-blue-600 dark:text-blue-400",
        )}
      >
        {item.icon}
      </span>
      <span className="relative z-10">{translateLabel(item.title)}</span>
    </Link>
  );
};

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        hideMenu();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hideMenu]);

  return (
    <>
      <a
        href="#main-content"
        className={getButtonClasses({
          variant: "primary",
          size: "sm",
          className: "skip-link",
        })}
      >
        Skip to content
      </a>

      <header
        className={clsx(
          "fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
          isScrolled
            ? "border-b border-neutral-200/70 bg-white/80 shadow-lg shadow-black/[0.03] backdrop-blur-2xl dark:border-neutral-800/70 dark:bg-neutral-950/80 dark:shadow-black/25"
            : "border-b border-transparent bg-white/55 backdrop-blur-xl dark:bg-neutral-950/55",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between sm:h-20">
            {/* Logo & Brand */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              <div className="relative h-10 w-10 shrink-0 sm:h-11 sm:w-11">
                <NextImage
                  src="/images/icon.webp"
                  alt="Atsiila Arya Nabiih logo"
                  fill
                  sizes="44px"
                  priority
                  className="rounded-full border-2 border-blue-500/20 object-cover transition-colors duration-300 group-hover:border-blue-500/45"
                />
              </div>
              <span
                translate="no"
                className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white"
              >
                Arya
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Primary"
              className="surface-tactile-track hidden items-center gap-1 rounded-xl p-1 backdrop-blur-sm lg:flex"
            >
              {filteredMenu.map((item: MenuItemProps) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                  translateLabel={(key) => t(key)}
                />
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 lg:hidden">
                <IntlToggle />
                <ThemeToggle />
              </div>

              <div className="hidden items-center gap-2 rounded-xl p-1 lg:flex">
                <IntlToggle />
                <div
                  aria-hidden="true"
                  className="h-6 w-px bg-neutral-300/60 dark:bg-neutral-700/60"
                />
                <ThemeToggle />
              </div>

              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="btn-tactile btn-tactile-secondary h-10 w-10 rounded-xl p-0 lg:hidden"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X
                      size={20}
                      aria-hidden="true"
                      className="text-neutral-700 dark:text-neutral-200"
                    />
                  ) : (
                    <Menu
                      size={20}
                      aria-hidden="true"
                      className="text-neutral-700 dark:text-neutral-200"
                    />
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm dark:bg-black/45 lg:hidden"
              onClick={hideMenu}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "top right" }}
              className="fixed left-4 right-4 top-20 z-50 sm:left-auto sm:w-80 lg:hidden"
            >
              <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 p-3 shadow-2xl backdrop-blur-2xl dark:border-neutral-800 dark:bg-neutral-900/95">
                <nav
                  aria-label="Mobile"
                  className="flex max-h-[65vh] flex-col gap-1 overflow-y-auto overscroll-contain"
                >
                  {filteredMenu.map((item: MenuItemProps) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={hideMenu}
                        aria-current={isActive ? "page" : undefined}
                        className={clsx(
                          "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
                          isActive
                            ? "surface-tactile-pill font-semibold text-blue-600 dark:text-blue-400"
                            : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-white",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={
                            isActive ? "text-blue-600 dark:text-blue-400" : ""
                          }
                        >
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
