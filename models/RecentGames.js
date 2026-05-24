import mongoose, { Schema, models, model } from "mongoose";

const RecentGameSchema = new Schema(
  {
    discord_id: {
      type: String,
      required: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    result: {
      type: String,
      enum: ["win", "loss"],
      required: true,
    },

    word: {
      type: String,
      required: true,
    },

    played_at: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const RecentGame = models.RecentGame || model("RecentGame", RecentGameSchema);

export default RecentGame;
