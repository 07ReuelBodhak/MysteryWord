import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import RecentGame from "../../../../models/RecentGames";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { discord_id } = params;

    console.log("DISCORD ID:", discord_id);

    const games = await RecentGame.find({
      discord_id,
    })
      .sort({
        played_at: -1,
      })
      .limit(5)
      .lean();

    return NextResponse.json(games);
  } catch (error) {
    console.error("Failed to fetch recent games:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch recent games",
      },
      {
        status: 500,
      },
    );
  }
}
