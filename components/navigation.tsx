"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Moon, Sun, Menu, X, Brain, ShieldCheck, User, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUser, logout, type AppUser } from "@/lib/auth";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<AppUser | null>(null);

  // Sync user state on every route change
  useEffect(() => {
    setUser(getUser());
    setIsMobileOpen(false);
  }, [pathname]);

  // Sync initial dark-mode state from html class
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  function handleLogout() {
    logout();
    setUser(null);
    setIsMobileOpen(false);
    router.push("/");
  }

  // ── Build nav links based on role ──────────────────────────────────────────
  const guestLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const userLinks = [
    { name: "Home", href: "/" },
    { name: "Simulator", href: "/simulator" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/contact" },
  ];

  const adminLinks = [
    { name: "Home", href: "/" },
    { name: "Admin Panel", href: "/admin" },
  ];

  const navLinks =
    user?.role === "admin"
      ? adminLinks
      : user?.role === "user"
      ? userLinks
      : guestLinks;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden sm:block">AI Ethics Simulator</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Authenticated user indicator (desktop) */}
            {user && (
              <div className="hidden sm:flex items-center gap-2">
                {user.role === "admin" ? (
                  <Badge variant="outline" className="gap-1 border-primary text-primary">
                    <ShieldCheck className="h-3 w-3" />
                    {user.name}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1">
                    <User className="h-3 w-3" />
                    {user.name}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Login / Try Simulator CTA (guest) */}
            {!user && (
              <Button asChild size="sm" className="hidden sm:flex">
                <Link href="/login">Get Started</Link>
              </Button>
            )}

            {/* User: quick simulator shortcut */}
            {user?.role === "user" && pathname !== "/simulator" && (
              <Button asChild size="sm" className="hidden sm:flex">
                <Link href="/simulator">Try Simulator</Link>
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-9 h-9 p-0"
              onClick={() => setIsMobileOpen((v) => !v)}
            >
              {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMobileOpen && (
          <div className="md:hidden border-t py-4 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "block text-sm font-medium transition-colors hover:text-primary px-2 py-2 rounded-lg",
                  pathname === item.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:bg-muted/40"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-2 border-t mt-2">
              {user ? (
                <div className="flex items-center justify-between px-2 py-2">
                  <div className="flex items-center gap-2">
                    {user.role === "admin" ? (
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{user.name}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {user.role}
                    </Badge>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-destructive hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-sm font-medium text-primary px-2 py-2"
                >
                  Login / Get Started
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
