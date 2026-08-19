/* ═══════════════════════════════════════════════════════════════
   Rafeeq Core — Safe Storage & Session Manager
   ═══════════════════════════════════════════════════════════════ */

const TOKEN_COOKIE_NAME = "rafeeq_session_token";
const USER_KEY = "rafeeq_user_state";

export const sessionManager = {
  getToken(): string | null {
    if (typeof document === "undefined") return null;
    
    const match = document.cookie.match(new RegExp(`(^|;\\s*)(${TOKEN_COOKIE_NAME})=([^;]*)`));
    return match ? decodeURIComponent(match[3]) : null;
  },

  setToken(token: string, maxAgeDays = 30): void {
    if (typeof document === "undefined") return;

    const expires = new Date(Date.now() + maxAgeDays * 24 * 60 * 60 * 1000).toUTCString();
    const isSecure = window.location.protocol === "https:";
    document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Lax${isSecure ? "; Secure" : ""}`;
  },

  clearSession(): void {
    if (typeof document === "undefined") return;
    document.cookie = `${TOKEN_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
    try {
      sessionStorage.removeItem(USER_KEY);
    } catch {
      // Ignore
    }
  },

  getUser<T>(): T | null {
    if (typeof window === "undefined") return null;
    try {
      const data = sessionStorage.getItem(USER_KEY);
      return data ? (JSON.parse(data) as T) : null;
    } catch {
      return null;
    }
  },

  setUser<T>(user: T): void {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      // Ignore
    }
  },
};
