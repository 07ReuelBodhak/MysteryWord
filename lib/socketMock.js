// Fake WebSocket-style utility for dummy simulation
// Real WebSocket will replace this later for real-time updates.

const listeners = {};

export function subscribeToSession(sessionId, callback) {
  if (!listeners[sessionId]) {
    listeners[sessionId] = [];
  }
  listeners[sessionId].push(callback);

  return function unsubscribe() {
    listeners[sessionId] = listeners[sessionId].filter(cb => cb !== callback);
  };
}

export function sendMockEvent(sessionId, event) {
  if (listeners[sessionId]) {
    listeners[sessionId].forEach(cb => cb(event));
  }
}
