"use client";

import useSWR from "swr";
import { IoAnalytics as AnalyticsIcon } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import AnalyticsSkeleton from "./AnalyticsSkeleton";
import TrafficTrendsChart from "./TrafficTrendsChart";
import Overview from "./Overview";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import EmptyState from "@/common/components/elements/EmptyState";
import { fetcher } from "@/services/fetcher";
import { ANALYTICS_ACCOUNT } from "@/common/constants/analytics";

const Analytics = () => {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain");

  const key = "/api/analytics";

  const { data, isLoading, error } = useSWR(key, fetcher);

  const { is_active } = ANALYTICS_ACCOUNT;

  const t = useTranslations("DashboardPage");

  if (!is_active) return null;

  return (
    <section className="space-y-2">
      <SectionHeading title={t("analytics.title")} icon={<AnalyticsIcon />} />
      <SectionSubHeading>
        <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>{t("analytics.sub_title")} </p>
        </div>
      </SectionSubHeading>

      {error ? (
        <EmptyState message={t("error")} />
      ) : isLoading ? (
        <AnalyticsSkeleton />
      ) : (
        <div className="space-y-3">
          <Overview data={data} />
          <TrafficTrendsChart data={data} />
        </div>
      )}
    </section>
  );
};

export default Analytics;
