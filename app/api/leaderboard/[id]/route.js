import { NextResponse } from "next/server";
import Leaderboard from "@/models/Leaderboard";
import { connectDB } from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const leaderboard = await Leaderboard.findOne({ discord_id: id }).lean();

    if (!leaderboard) {
      return NextResponse.json(
        { message: "Leaderboard not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("GET /api/leaderboard/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to fetch leaderboard stats" },
      { status: 500 },
    );
  }
}
