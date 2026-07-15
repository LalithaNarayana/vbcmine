"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import "@/styles/admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((json) => setLogo(json?.logo || ""))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="admin-shell admin-login-screen">
      <div className="admin-login-card">
        <div
          className="admin-login-mark"
          style={logo ? { background: "#ffffff00", padding: 0 } : undefined}
        >
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="VBC" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          ) : (
            <Lock size={22} />
          )}
        </div>
        <h1 className="admin-login-title">Admin Login</h1><br/>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="admin-label">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              placeholder="Enter Email"
            />
          </div>

          <div>
            <label className="admin-label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              placeholder="Enter Password"
            />
          </div>

          {error && <p className="admin-alert-error">{error}</p>}<br/>

          <button type="submit" disabled={loading} className="admin-btn-primary w-full">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
