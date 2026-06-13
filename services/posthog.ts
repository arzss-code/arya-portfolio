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

  const url = `${posthog.base_url}/${posthog.project_id}/insights/trend/`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${posthog.api_key}`,
      },
      params: {
        events: JSON.stringify([
          {
            id: "$pageview",
            type: "events",
            math: "total",
            name: "Pageviews",
          },
          {
            id: "$pageview",
            type: "events",
            math: "dau",
            name: "Unique Visitors",
          },
        ]),
        date_from: "-30d",
        display: "ActionsLineGraph",
      },
    });

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
