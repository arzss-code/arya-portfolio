import { NextResponse } from "next/server";
import { getPostHogTrends } from "@/services/posthog";

export const GET = async () => {
  try {
    const trends = await getPostHogTrends();

    if (trends.status >= 400 || !trends.data) {
      return NextResponse.json(
        { message: trends.error || "Failed to fetch PostHog data" },
        { status: trends.status },
      );
    }

    const result = trends.data.result || [];
    const pageviewsSeries = result.find((s: any) => s.math === "total") || result[0];
    const visitorsSeries = result.find((s: any) => s.math === "dau") || result[1];

    const totalPageviews =
      pageviewsSeries?.data?.reduce((a: number, b: number) => a + b, 0) || 0;
    const totalVisitors =
      visitorsSeries?.data?.reduce((a: number, b: number) => a + b, 0) || 0;

    // Map to frontend expected format
    const chartDataPageviews =
      pageviewsSeries?.labels?.map((label: string, index: number) => ({
        // PostHog labels are like '2024-06-13', we need ISO strings if chart uses parseISO
        x: new Date(label).toISOString(),
        y: pageviewsSeries.data[index],
      })) || [];

    const chartDataVisitors =
      visitorsSeries?.labels?.map((label: string, index: number) => ({
        x: new Date(label).toISOString(),
        y: visitorsSeries.data[index],
      })) || [];

    return NextResponse.json(
      {
        pageviews: chartDataPageviews,
        sessions: chartDataVisitors, // map visitors as sessions for chart
        websiteStats: {
          pageviews: { value: totalPageviews },
          visitors: { value: totalVisitors },
          visits: { value: 0 }, // Not available in basic posthog trend
          countries: { value: 0 },
          events: { value: 0 },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
