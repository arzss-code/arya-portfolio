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
          kind: "HogQLQuery",
          query: `
            SELECT
              toStartOfMonth(timestamp) AS month,
              count(if(event = '$pageview', 1, NULL)) AS pageviews,
              count(DISTINCT if(event = '$pageview', distinct_id, NULL)) AS visitors
            FROM events
            WHERE timestamp >= now() - INTERVAL 6 MONTH
            GROUP BY month
            ORDER BY month ASC
          `,
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

export const getPostHogStats = async () => {
  if (!posthog.project_id || !posthog.api_key) {
    return { status: 400, data: null };
  }

  const url = `${posthog.base_url}/${posthog.project_id}/query/`;
  const hogqlQuery = `
    SELECT
      count(if(event = '$pageview', 1, NULL)) AS pageviews,
      count(DISTINCT if(event = '$pageview', distinct_id, NULL)) AS visitors,
      count(DISTINCT if(event = '$pageview', properties.$session_id, NULL)) AS visits,
      count(DISTINCT properties.$geoip_country_code) AS countries,
      count() AS total_events
    FROM events
    WHERE timestamp >= now() - INTERVAL 30 DAY
  `;

  try {
    const response = await axios.post(
      url,
      {
        query: {
          kind: "HogQLQuery",
          query: hogqlQuery,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${posthog.api_key}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: 500, data: null };
  }
};
