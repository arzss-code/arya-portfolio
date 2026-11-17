"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { parseISO } from "date-fns";
import { useLocale } from "next-intl";
import { HiX as CloseIcon } from "react-icons/hi";
import { HiOutlineArrowTopRightOnSquare as ExternalIcon } from "react-icons/hi2";

import { getButtonClasses } from "@/common/components/elements/Button";
import Image from "@/common/components/elements/Image";
import { AchievementItem } from "@/common/types/achievements";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  achievement: AchievementItem | null;
}

const formatDate = (date: string | undefined, locale: string) => {
  if (!date) return null;
  try {
    const parsed = parseISO(date);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
      month: "long",
      year: "numeric",
    }).format(parsed);
  } catch {
    return null;
  }
};

const AchievementDetailModal = ({ isOpen, onClose, achievement }: Props) => {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const titleId = useId();
  const descId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      previousActiveRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      document.body.style.overflow = "";
      previousActiveRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!mounted || !achievement) return null;

  const issueDate = formatDate(achievement.issue_date, locale);
  const expirationDate = formatDate(achievement.expiration_date, locale);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_25px_80px_-20px_rgba(0,0,0,0.6)] dark:border-neutral-800 dark:bg-neutral-900 md:flex-row"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* Tactile Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="btn-tactile btn-tactile-obsidian absolute right-3 top-3 z-20 h-9 w-9 rounded-full p-0"
              aria-label="Close certificate preview"
            >
              <CloseIcon size={17} aria-hidden="true" />
            </button>

            {/* Left: Certificate image */}
            <div className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain bg-neutral-100 p-2 dark:bg-neutral-950 md:w-2/3 md:flex-none">
              <Image
                src={achievement.image}
                alt={achievement.name}
                width={900}
                height={637}
                sizes="(max-width: 768px) 95vw, 660px"
                className="block w-full rounded-lg object-contain md:rounded-none"
              />
            </div>

            {/* Right: Details */}
            <div className="flex w-full shrink-0 flex-col justify-between gap-4 overflow-y-auto overscroll-contain p-4 sm:p-6 md:w-1/3 md:flex-1">
              <div className="space-y-4">
                <h2
                  id={titleId}
                  className="pr-8 text-xl font-bold leading-tight text-neutral-900 dark:text-neutral-100"
                >
                  {achievement.name}
                </h2>

                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 sm:text-base">
                  {achievement.issuing_organization}
                </p>

                <div id={descId} className="space-y-3 text-sm">
                  {achievement.credential_id && (
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        Credential ID
                      </p>
                      <p className="break-all text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {achievement.credential_id}
                      </p>
                    </div>
                  )}

                  {issueDate && (
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        Issue Date
                      </p>
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {issueDate}
                      </p>
                    </div>
                  )}

                  {expirationDate && (
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        Expiration Date
                      </p>
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {expirationDate}
                      </p>
                    </div>
                  )}

                  {achievement.category && (
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        Category
                      </p>
                      <span className="surface-tactile-pill inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
                        {achievement.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {achievement.url_credential && (
                <a
                  href={achievement.url_credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={getButtonClasses({
                    variant: "primary",
                    size: "md",
                    className: "w-full md:w-auto",
                  })}
                >
                  <span>Credential URL</span>
                  <ExternalIcon size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default AchievementDetailModal;
