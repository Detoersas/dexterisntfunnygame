"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeatureCards } from "@/components/feature-cards";
import { LinkCard } from "@/components/link-card";
import { VersionFooter } from "@/components/version-footer";
import { Gamepad2 } from "lucide-react";

// Customize your game links here
const games = [
  {
    name: "MY Seraph",
    url: "https://dexteristhegoat.vercel.app/",
    description: "BEST OF THE BEST",
  },
  {
    name: "Nexora 20",
    url: "https://notepad20.a.ssl.fastly.net/",
    description: "Fast-loading Nexora mirror with premium game collection",
  },
  {
    name: "Geometry dash my own site",
    url: "https://dexteristhegoat.vercel.app/games/gdlite/index.html",
    description: "FAST GEOMETRY DASH BY ME AND MY OWN URL",
  },
  {
    name: "LUNAR",
    url: "https://lunar-nu.vercel.app/projects",
    description: "Home of Retro Bowl and classic sports games",
  },
  {
    name: "ROMS",
    url: "https://gba.vercel.app/",
    description: "Play classic GBA and retro console games in your browser",
  },
  {
    name: "COPPER",
    url: "https://clever-schools.vercel.app/copper",
    description: "Clean interface with hand-picked quality games",
  },
  {
    name: "SELENITE",
    url: "https://selenite-beta.vercel.app/projects.html",
    description: "Huge library with hundreds of titles to explore",
  },
  {
    name: "MORE-LESS",
    url: "https://the-more-less-game-nuxt.vercel.app/",
    description: "Challenging number guessing game - test your intuition",
  },
  {
    name: "MINECRAFT",
    url: "https://supanoob.vercel.app/eagler-files/1.9/EaglercraftL_1.9.html",
    description: "Play Minecraft 1.9 directly in your browser via Eaglercraft",
  },
  {
    name: "BEANSITE",
    url: "https://mb7.vercel.app/",
    description: "Lightweight game portal with fast load times",
  },
  {
    name: "???",
    url: "https://rule34dle.vercel.app/",
    description: "Mystery guessing game with unique gameplay mechanics",
  },
  {
    name: "PETEZAH",
    url: "https://new-sandbox-program-2-16858891.codehs.me/index.html",
    description: "Community favorite with classic and modern games",
  },
  {
    name: "STRANGE ROPE POLICE",
    url: "https://amazing-strange-rope-police.vercel.app/",
    description: "Open-world action combining GTA gameplay with superhero powers",
  },
  {
    name: "VOTE",
    url: "https://solo.to/freegams",
    description: "Support the community - vote for your favorite games",
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter(
    (game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showHero = searchQuery === "";

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {showHero && (
        <>
          <HeroSection />
          <FeatureCards />
        </>
      )}
      
      <main className="flex-1 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Section Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#9c27b0]">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">All Games</h2>
              <p className="text-sm text-gray-500">{filteredGames.length} games available</p>
            </div>
          </div>
          
          {filteredGames.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGames.map((game) => (
                <LinkCard
                  key={game.name}
                  name={game.name}
                  url={game.url}
                  description={game.description}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-16 text-center">
              <Gamepad2 className="h-12 w-12 text-gray-300" />
              <p className="mt-4 text-lg font-medium text-gray-500">No games found</p>
              <p className="text-sm text-gray-400">Try a different search term</p>
            </div>
          )}
        </div>
      </main>
      
      <VersionFooter />
    </div>
  );
}
// --- Auth helper types ---
type User = {
  email: string;
};

// --- Login + Signup Page ---
function AuthPage({ onLogin, onSignup }: {
  onLogin: (data: { email: string; password: string; remember: boolean }) => void;
  onSignup: (data: { email: string; password: string }) => void;
}) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "login") {
      onLogin({ email, password, remember });
    } else {
      onSignup({ email: email.trim(), password });
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>
        {mode === "login" ? "Sign in" : "Create account"}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {mode === "login" && (
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember this device
          </label>
        )}

        <button type="submit">
          {mode === "login" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <button
        style={{ marginTop: 16 }}
        type="button"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
      >
        {mode === "login"
          ? "Need an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
}

// --- Account Settings ---
function AccountSettings({ user, onClose }: { user: User; onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const idx = accounts.findIndex((acc: any) => acc.email === user.email);

    if (idx === -1) {
      alert("Account not found");
      return;
    }

    if (accounts[idx].password !== currentPassword) {
      alert("Current password is incorrect");
      return;
    }

    accounts[idx].password = newPassword;
    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div style={{ background: "white", padding: 24, borderRadius: 8, minWidth: 320 }}>
        <h2>Account Settings</h2>
        <p>{user.email}</p>

        <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Change password</button>
        </form>

        <button style={{ marginTop: 12 }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
