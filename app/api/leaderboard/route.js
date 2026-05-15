import { NextResponse } from "next/server";
import Leaderboard from "@/models/Leaderboard";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    const leaderboard = await Leaderboard.find({})
      .sort({ total_points: -1 })
      .limit(10)
      .lean();

    return NextResponse.json(leaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard data:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
