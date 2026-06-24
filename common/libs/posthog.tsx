"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && typeof window !== "undefined") {
      import("posthog-js").then(({ default: posthog }) => {
        let url = window.origin + pathname;
        if (searchParams && searchParams.toString()) {
          url = url + `?${searchParams.toString()}`;
        }
        posthog.capture("$pageview", {
          $current_url: url,
        });
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("posthog-js").then(({ default: posthog }) => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: "/ingest",
          ui_host: "https://us.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: false, // disable auto-capture because we capture manually using PostHogPageView
          capture_pageleave: true, // Enable automatic pageleave capture for accurate session duration
        });
      });
    }
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  );
}
