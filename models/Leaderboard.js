import mongoose, { Schema, models, model } from "mongoose";

const LeaderboardSchema = new Schema(
  {
    discord_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
    },

    avatar_url: {
      type: String,
      default: "",
    },

    total_points: {
      type: Number,
      default: 0,
    },

    wins: {
      type: Number,
      default: 0,
    },

    losses: {
      type: Number,
      default: 0,
    },

    games_played: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Leaderboard =
  models.Leaderboard || model("Leaderboard", LeaderboardSchema);

export default Leaderboard;
