import { type NextRequest, NextResponse } from "next/server";

import { getAchievementsData } from "@/services/achievements";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;

    const data = await getAchievementsData({ category, search });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[API /achievements] Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
};
