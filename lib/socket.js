// lib/socket.js

export function createGameSocket(sessionId) {
  return new WebSocket(`ws://localhost:8000/ws/${sessionId}`);
}
