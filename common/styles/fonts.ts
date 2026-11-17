import { Plus_Jakarta_Sans, Manrope, DM_Sans } from "next/font/google";

export const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Variable font mode (without explicit weight array) avoids dynamic `?kit=...&skey=...`
// Google Font URLs that break Next.js 16 Turbopack builds on Vercel.
export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

// Legacy exports for backward compatibility
export const soraSans = plusJakartaSans;
export const onestSans = plusJakartaSans;
