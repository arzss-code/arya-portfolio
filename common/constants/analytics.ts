export const ANALYTICS_ACCOUNT = {
  is_active: true,
  posthog: {
    base_url: "https://app.posthog.com/api/projects",
    project_id: process.env.POSTHOG_PROJECT_ID,
    api_key: process.env.POSTHOG_API_KEY, // Personal API Key for fetching Insights
  },
};
