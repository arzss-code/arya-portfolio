"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const scheduleWhenIdle = (callback: () => void): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback(idleId);
  }

  const timerId = globalThis.setTimeout(callback, 1500);
  return () => globalThis.clearTimeout(timerId);
};

function PostHogPageView({ isReady }: { isReady: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isReady || !pathname || typeof window === "undefined") return;

    import("posthog-js").then(({ default: posthog }) => {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    });
  }, [isReady, pathname, searchParams]);

  return null;
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!posthogKey) return;

    return scheduleWhenIdle(() => {
      import("posthog-js").then(({ default: posthog }) => {
        posthog.init(posthogKey, {
          api_host: "/ingest",
          ui_host: "https://us.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: false, // disable auto-capture because we capture manually using PostHogPageView
          capture_pageleave: true, // Enable automatic pageleave capture for accurate session duration
        });
        setIsReady(true);
      });
    });
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView isReady={isReady} />
      </Suspense>
      {children}
    </>
  );
}
