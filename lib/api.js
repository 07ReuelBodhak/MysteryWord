import {
  currentUser,
  activeSessions,
  leaderboardUsers,
  recentGames,
} from "./dummyData";

// Dummy API functions
export async function getCurrentUser() {
  return new Promise((resolve) => setTimeout(() => resolve(currentUser), 500));
}

export async function getLeaderboardStats(id) {
  const res = await fetch(`/api/leaderboard/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(
      errorData?.message ||
        errorData?.error ||
        "Failed to fetch leaderboard stats",
    );
  }

  return res.json();
}
export async function getActiveSessions() {
  const res = await fetch("/api/sessions/active", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.log("Error data from active sessions API:", errorData);
    throw new Error(errorData?.message || "Failed to fetch active sessions");
  }
  return res.json();
}

export async function getLeaderboard() {
  const res = await fetch("/api/leaderboard", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch profile");
  }

  return res.json();
}

export async function getProfile() {
  const res = await fetch("/api/profile", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch profile");
  }

  return res.json();
}

export async function startGame({ discord_id, username }) {
  const res = await fetch("/api/game/create", {
    method: "POST",

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      discord_id,
      username,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(errorData?.error || "Failed to start game");
  }

  return res.json();
}

export async function getGameSession(sessionId, discord_id) {
  const res = await fetch(
    `/api/game/session/${sessionId}?discord_id=${discord_id}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to fetch game session");
  }

  return res.json();
}

export async function askQuestion(sessionId, question) {
  // Real AI question answering must happen on backend.
  const res = await fetch(`/api/game/session/${sessionId}/ask`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to ask question");
  }

  const data = await res.json();
  return data.answer;
}

export async function submitFinalGuess(sessionId, guess) {
  const res = await fetch(`/api/game/session/${sessionId}/guess`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      guess,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(errorData?.error || "Failed to submit final guess");
  }

  return res.json();
}

export async function getRecentGames(discord_id) {
  try {
    const res = await fetch(`/api/recent-games/${discord_id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("error fetching recent games");
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch recent games:", error);

    return [];
  }
}

export async function sendSpectatorMessage(sessionId, message) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 200),
  );
}
