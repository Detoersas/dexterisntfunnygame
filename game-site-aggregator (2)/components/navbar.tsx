"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Gamepad2,
  Globe,
  AppWindow,
  Menu,
  X,
  Search,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language-context";

const navItemsBase = [
  { href: "/", key: "games", icon: Gamepad2 },
  { href: "/prox", key: "proxies", icon: Globe },
  { href: "/apps", key: "apps", icon: AppWindow },
];

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function Navbar({ onSearch, searchQuery = "" }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const { language, setLanguage, t } = useLanguage();

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearch?.(value);
  };

  const navItems = navItemsBase.map((it) => ({
    ...it,
    label: t(`nav.${it.key}`),
  }));

  return (
    <header className="sticky top-0 z-50">
      {/* Top Green Bar */}
      <div className="bg-[#00a651]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center justify-center rounded bg-white px-2 py-1">
              <span className="text-xl font-black tracking-tight text-[#00a651]">
                dexterisntfunny
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-lg mx-4 sm:flex">
            <div className="relative w-full flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-l-full bg-[#00a651] border-2 border-[#00a651]">
                <Search className="h-4 w-4 text-white" />
              </div>
              <input
                type="text"
                placeholder={t("search.placeholder")}
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1 rounded-none border-2 border-l-0 border-[#00a651] bg-white py-1.5 px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-r-full bg-white border-2 border-l-0 border-[#00a651] text-[#00a651] hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Auth Buttons + Language selector */}
          <div className="hidden items-center gap-2 sm:flex">
            {/* Language selector */}
            <div className="flex items-center gap-2">
              <select
                aria-label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "ru" | "es")}
                className="rounded-md bg-white px-2 py-1 text-sm font-medium text-gray-700"
              >
                <option value="en">EN</option>
                <option value="ru">RU</option>
                <option value="es">ES</option>
              </select>
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full bg-[#008c45] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#007a3d]">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-muted-foreground">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("auth.signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <button
                  onClick={() => router.push("/signin")}
                  className="flex items-center gap-1.5 rounded-full bg-[#008c45] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#007a3d]"
                >
                  <User className="h-4 w-4" />
                  {t("auth.signIn")}
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="rounded-full bg-[#f7c948] px-4 py-1.5 text-sm font-bold text-[#5a4a00] hover:bg-[#f0be2a]"
                >
                  {t("auth.signUp")}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-[#008c45] sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Secondary Nav */}
      <div className="bg-[#00a651] border-t border-[#008c45]">
        <nav className="mx-auto hidden max-w-7xl items-center justify-center gap-1 px-4 py-2 sm:flex sm:px-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-5 py-1.5 text-sm font-medium text-white/90 transition-colors hover:text-white",
                  isActive && "text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[#008c45] bg-[#00a651] px-4 py-3 sm:hidden">
          {/* Mobile Language + Search */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <select
                aria-label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "ru" | "es")}
                className="rounded-md bg-white px-2 py-1 text-sm font-medium text-gray-700"
              >
                <option value="en">EN</option>
                <option value="ru">RU</option>
                <option value="es">ES</option>
              </select>
            </div>

            <div className="relative flex-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-l-full bg-[#00a651] border-2 border-white/30">
                <Search className="h-4 w-4 text-white" />
              </div>
              <input
                type="text"
                placeholder={t("mobile.searchPlaceholder")}
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="ml-2 flex-1 rounded-r-full border-2 border-l-0 border-white/30 bg-white py-1.5 px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-[#008c45] hover:text-white",
                    isActive && "bg-[#008c45] text-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <div className="my-2 border-t border-white/20" />
            {user ? (
              <>
                <div className="px-4 py-2 text-sm text-white/70">
                  {t("auth.signedInAs")} {user.name}
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/80 hover:bg-[#008c45]"
                >
                  <LogOut className="h-5 w-5" />
                  {t("auth.signOut")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-[#008c45]"
                >
                  <User className="h-5 w-5" />
                  {t("auth.signIn")}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-lg bg-[#f7c948] px-4 py-3 text-sm font-bold text-[#5a4a00]"
                >
                  {t("auth.signUp")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
