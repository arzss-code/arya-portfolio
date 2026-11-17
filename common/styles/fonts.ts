import { Plus_Jakarta_Sans } from "next/font/google";

// Variable font mode (omitting explicit weight array) serves static .woff2 files
// covering weights 200-800 without dynamic `?kit=...&skey=...` URLs that break
// Next.js 16 Turbopack font import-map resolution on Vercel builds, while avoiding
// unused multi-family font preloads.
export const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Legacy exports kept for backward compatibility
export const manrope = plusJakartaSans;
export const dmSans = plusJakartaSans;
export const soraSans = plusJakartaSans;
export const onestSans = plusJakartaSans;
