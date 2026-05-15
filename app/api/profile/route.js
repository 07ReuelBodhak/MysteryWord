import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Leaderboard from "@/models/Leaderboard";

export async function GET() {
  try {
    const session = await auth();
    console.log("Session data:", session);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const discordId = session.user.discord_id;

    const user = await User.findOne({ discord_id: discordId }).lean();
    const leaderboard = await Leaderboard.findOne({
      discord_id: discordId,
    }).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const rank = leaderboard
      ? (await Leaderboard.countDocuments({
          total_points: { $gt: leaderboard.total_points },
        })) + 1
      : null;

    return NextResponse.json({
      user: {
        rank,
        discord_id: user.discord_id,
        username: user.username,
        avatar_url: user.avatar_url,
        email: user.email,
        created_at: user.createdAt,
      },

      stats: {
        total_points: leaderboard?.total_points || 0,
        wins: leaderboard?.wins || 0,
        losses: leaderboard?.losses || 0,
        games_played: leaderboard?.games_played || 0,
        win_rate:
          leaderboard?.games_played > 0
            ? Math.round((leaderboard.wins / leaderboard.games_played) * 100)
            : 0,
      },

      recent: [],
    });

    return NextResponse.json({ user: session.user });
  } catch (err) {
    console.error("Error fetching profile data:", err);
    return NextResponse.json(
      { error: "Failed to load profile data" },
      { status: 500 },
    );
  }
}
