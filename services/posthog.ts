import axios from "axios";
import { ANALYTICS_ACCOUNT } from "@/common/constants/analytics";

const { posthog } = ANALYTICS_ACCOUNT;

export const getPostHogTrends = async () => {
  if (!posthog.project_id || !posthog.api_key) {
    return {
      status: 400,
      data: null,
      error: "PostHog credentials not configured",
    };
  }

  const url = `${posthog.base_url}/${posthog.project_id}/query/`;

  try {
    const response = await axios.post(
      url,
      {
        query: {
          kind: "TrendsQuery",
          series: [
            {
              kind: "EventsNode",
              event: "$pageview",
              math: "total",
            },
            {
              kind: "EventsNode",
              event: "$pageview",
              math: "dau",
            },
          ],
          dateRange: {
            date_from: "-6m",
          },
          interval: "month",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${posthog.api_key}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      data: null,
      error: error?.message || "Unknown error",
    };
  }
};
