"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { LinkCard } from "@/components/link-card";
import { VersionFooter } from "@/components/version-footer";
import { AppWindow } from "lucide-react";

// Customize your app links here
const apps = [
  {
    name: "MOVIES",
    url: "https://dexterisntfunny.carrd.co/#movies",
    description: "Stream movies and shows for free - regularly updated library",
  },
  {
    name: "Music",
    url: "https://dexteristalentedmusic.vercel.app/",
    description: "Free music ported from spotify - no account required",
  }, 
  {
    name: "CHATGPT",
    url: "https://gptlite.vercel.app/chat",
    description: "Free AI chatbot alternative - no account required",
  },
  {
    name: "AI WRITER",
    url: "https://ahrefs.com/writing-tools/paragraph-rewriter",
    description: "Rewrite and improve paragraphs with AI-powered suggestions",
  },
  {
    name: "HUMANIZER",
    url: "https://www.summarizer.org/ai-humanizer",
    description: "Transform AI-generated text into natural human writing",
  },
];

export default function AppsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <PageHeader
          title="Apps"
          description="Discover useful applications and tools"
          icon={AppWindow}
          count={filteredApps.length}
        />
        {filteredApps.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app) => (
              <LinkCard
                key={app.name}
                name={app.name}
                url={app.url}
                description={app.description}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AppWindow className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">No apps found</p>
            <p className="text-sm text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </main>
      <VersionFooter />
    </div>
  );
}
