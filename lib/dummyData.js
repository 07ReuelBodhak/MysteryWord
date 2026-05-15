export const currentUser = {
  id: "u1",
  username: "PlayerOne",
  avatar: "P",
  points: 1250,
  wins: 15,
  losses: 5,
  games: 20,
  bestStreak: 4,
};

export const activeSessions = [
  { id: "sess-1", username: "Reuel", avatar: "R", difficulty: "Medium", timeLeft: "03:42", questions: 6, spectators: 3 },
  { id: "sess-2", username: "Roy", avatar: "R", difficulty: "Hard", timeLeft: "01:18", questions: 14, spectators: 8 },
  { id: "sess-3", username: "Alex", avatar: "A", difficulty: "Easy", timeLeft: "04:21", questions: 2, spectators: 1 },
];

export const leaderboardUsers = [
  { rank: 1, user: "MasterGuesser", points: 5400, wins: 80, losses: 10, games: 90, bestStreak: 12 },
  { rank: 2, user: "ShadowNinja", points: 4200, wins: 65, losses: 15, games: 80, bestStreak: 8 },
  { rank: 3, user: "PlayerOne", points: 1250, wins: 15, losses: 5, games: 20, bestStreak: 4 },
  { rank: 4, user: "NoobMaster", points: 800, wins: 8, losses: 12, games: 20, bestStreak: 2 },
];

export const recentGames = [
  { id: "g1", date: "2 hrs ago", wordLength: 5, result: "won", difficulty: "Medium" },
  { id: "g2", date: "5 hrs ago", wordLength: 8, result: "lost", difficulty: "Hard" },
  { id: "g3", date: "1 day ago", wordLength: 4, result: "won", difficulty: "Easy" },
];

export const mockGuessHistory = [
  { type: 'question', text: "Is it a living thing?", answer: "Yes" },
  { type: 'question', text: "Is it an animal?", answer: "No" },
  { type: 'question', text: "Is it a plant?", answer: "Yes" },
];
