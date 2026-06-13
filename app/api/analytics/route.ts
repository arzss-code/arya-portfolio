import { NextResponse } from "next/server";
import { getPostHogTrends, getPostHogStats } from "@/services/posthog";

export const dynamic = "force-dynamic"; // Ensure real-time data instead of static build-time caching

export const GET = async () => {
  try {
    const [trends, stats] = await Promise.all([
      getPostHogTrends(),
      getPostHogStats(),
    ]);

    if (trends.status >= 400 || !trends.data) {
      return NextResponse.json(
        { message: trends.error || "Failed to fetch PostHog data" },
        { status: trends.status },
      );
    }

    // Generate the last 6 months labels (e.g. "2026-01-01") to ensure the chart always has a 6-month axis
    const last6MonthsDates: string[] = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      last6MonthsDates.push(`${year}-${month}-01`);
    }

    const mapPageviews = new Map<string, number>();
    const mapVisitors = new Map<string, number>();

    // Initialize all 6 months with 0
    last6MonthsDates.forEach((dateStr) => {
      mapPageviews.set(dateStr, 0);
      mapVisitors.set(dateStr, 0);
    });

    // Populate data from HogQL query results
    if (trends.data && trends.data.results) {
      trends.data.results.forEach((row: any[]) => {
        const dateStr = row[0]; // e.g., "2026-06-01"
        const pvs = row[1];
        const vsts = row[2];
        if (mapPageviews.has(dateStr)) {
          mapPageviews.set(dateStr, pvs);
          mapVisitors.set(dateStr, vsts);
        }
      });
    }

    // Format for the frontend chart (converting keys back to full ISO strings)
    const chartDataPageviews = last6MonthsDates.map((dateStr) => ({
      x: new Date(dateStr).toISOString(),
      y: mapPageviews.get(dateStr) || 0,
    }));
    
    const chartDataVisitors = last6MonthsDates.map((dateStr) => ({
      x: new Date(dateStr).toISOString(),
      y: mapVisitors.get(dateStr) || 0,
    }));

    // Parse real-time HogQL Stats for the Overview boxes
    let totalPageviews = 0;
    let totalVisitors = 0;
    let totalVisits = 0;
    let totalCountries = 0;
    let totalEvents = 0;

    if (stats.data && stats.data.results && stats.data.results.length > 0) {
      const row = stats.data.results[0]; // [pageviews, visitors, visits, countries, total_events]
      totalPageviews = row[0] || 0;
      totalVisitors = row[1] || 0;
      totalVisits = row[2] || 0;
      totalCountries = row[3] || 0;
      totalEvents = row[4] || 0;
    }

    return NextResponse.json(
      {
        pageviews: chartDataPageviews,
        sessions: chartDataVisitors,
        websiteStats: {
          pageviews: { value: totalPageviews },
          visitors: { value: totalVisitors },
          visits: { value: totalVisits },
          countries: { value: totalCountries },
          events: { value: totalEvents },
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
