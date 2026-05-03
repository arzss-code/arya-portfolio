import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "cqkstplcbucaqdbvmucx.supabase.co",
      },
    ],
    qualities: [75, 85, 90, 100],
  },
};

export default withNextIntl(nextConfig);
