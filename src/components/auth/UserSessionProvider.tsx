"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface SessionUser {
  id: string;
  name: string;
  mobile: string;
  accountId: string | null;
  connectionStatus: "pending" | "active";
}

interface UserSessionContextValue {
  /** null = not logged in, undefined = still checking */
  user: SessionUser | null;
  /** true only while the very first session check is in flight */
  loading: boolean;
  /** Re-fetch the session (call after login/logout/profile updates) */
  refresh: () => Promise<void>;
  /** Clears the session cookie server-side and updates local state */
  logout: () => Promise<void>;
}

const UserSessionContext = createContext<UserSessionContextValue | null>(null);

/**
 * App-wide provider that knows whether a customer is currently logged in.
 * Mounted once near the root (see RootLayout) so the Navbar, MobileMenu,
 * BottomTabBar, and the /login and /register pages can all agree on the
 * current session instead of each hardcoding a link to /login.
 */
export default function UserSessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/user/me", { cache: "no-store" });
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/user-logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Re-check the session whenever the tab regains focus/visibility. This
  // is what fixes the "still logged in, but My Account sends me to the
  // login page" issue when a session is created/expired in another tab
  // or the cookie has changed since this page first loaded.
  useEffect(() => {
    const onFocus = () => refresh();
    const onVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refresh]);

  const value = useMemo(
    () => ({ user, loading, refresh, logout }),
    [user, loading, refresh, logout]
  );

  return <UserSessionContext.Provider value={value}>{children}</UserSessionContext.Provider>;
}

export function useUserSession(): UserSessionContextValue {
  const ctx = useContext(UserSessionContext);
  if (!ctx) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return ctx;
}
