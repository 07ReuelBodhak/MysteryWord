import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
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

    email: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model("User", UserSchema);

export default User;
