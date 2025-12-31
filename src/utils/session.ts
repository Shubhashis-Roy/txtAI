const SESSION_ID_KEY = "chat_session_id";

export const setSessionIdInLocalStorage = (sessionId: string): void => {
  if (!sessionId) return;
  localStorage.setItem(SESSION_ID_KEY, sessionId);
};

export const getSessionIdFromLocalStorage = (): string | null => {
  return localStorage.getItem(SESSION_ID_KEY);
};

export const clearSessionIdFromLocalStorage = (): void => {
  localStorage.removeItem(SESSION_ID_KEY);
};
