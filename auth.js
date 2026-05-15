import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Leaderboard from "@/models/Leaderboard";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      authorization: {
        params: {
          scope: "identify email",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ profile }) {
      await connectDB();

      const discord_id = profile.id;

      const avatarUrl = profile.avatar
        ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
        : "";

      // 1. Create user if not exists, otherwise update latest Discord info
      await User.findOneAndUpdate(
        { discord_id },
        {
          discord_id,
          username: profile.username,
          avatar_url: avatarUrl,
          email: profile.email || "",
        },
        {
          upsert: true,
          new: true,
        },
      );

      await Leaderboard.findOneAndUpdate(
        { discord_id },
        {
          $setOnInsert: {
            discord_id,
            total_points: 0,
            wins: 0,
            losses: 0,
            games_played: 0,
          },
          $set: {
            username: profile.username,
            avatar_url: avatarUrl,
          },
        },
        {
          upsert: true,
          new: true,
        },
      );

      return true;
    },

    async jwt({ token, profile }) {
      if (profile) {
        token.discord_id = profile.id;
        token.username = profile.username;
        token.avatar_url = profile.avatar
          ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
          : "";
      }

      return token;
    },

    async session({ session, token }) {
      session.user.discord_id = token.discord_id;
      session.user.username = token.username;
      session.user.avatar_url = token.avatar_url;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
