import { currentUser, activeSessions, leaderboardUsers, recentGames } from "./dummyData";

// Dummy API functions
export async function getCurrentUser() {
  return new Promise((resolve) => setTimeout(() => resolve(currentUser), 500));
}

export async function getActiveSessions() {
  return new Promise((resolve) => setTimeout(() => resolve(activeSessions), 500));
}

export async function getLeaderboard() {
  return new Promise((resolve) => setTimeout(() => resolve(leaderboardUsers), 500));
}

export async function getProfile() {
  return new Promise((resolve) => setTimeout(() => resolve({
    user: currentUser,
    recent: recentGames
  }), 500));
}

export async function startGame() {
  return new Promise((resolve) => setTimeout(() => resolve({ sessionId: "demo-session-player" }), 800));
}

export async function getGameSession(sessionId) {
  // HIDDEN WORD SHOULD NEVER BE SENT TO FRONTEND IN PRODUCTION.
  // Frontend dummy word is only for demo representation.
  return new Promise((resolve) => setTimeout(() => resolve({
    id: sessionId,
    isPlayer: sessionId.includes('player'),
    difficulty: "Medium",
    wordLength: 5,
    startsAt: Date.now(),
    durationSeconds: 300
  }), 400));
}

export async function askQuestion(sessionId, question) {
  // Real AI question answering must happen on backend.
  return new Promise((resolve) => setTimeout(() => {
    const answers = ["Yes", "No", "Maybe"];
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    resolve(randomAnswer);
  }, 1000));
}

export async function submitFinalGuess(sessionId, guess) {
  // Real final guess validation must happen on backend.
  return new Promise((resolve) => setTimeout(() => {
    const isCorrect = guess.toLowerCase() === "mango";
    resolve({ isCorrect, correctWord: "mango" });
  }, 1000));
}

export async function sendSpectatorMessage(sessionId, message) {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 200));
}
