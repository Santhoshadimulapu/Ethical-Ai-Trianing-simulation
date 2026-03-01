"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Brain, ShieldCheck, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { setUser, ADMIN_SECRET } from "@/lib/auth";

type Role = "user" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("user");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (role === "admin") {
      if (password !== ADMIN_SECRET) {
        setError("Incorrect admin password. Hint: ask your instructor.");
        return;
      }
    }

    setLoading(true);
    setUser({ name: name.trim(), role });

    // Short delay for UX
    setTimeout(() => {
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/simulator");
      }
    }, 400);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="text-left">
            <div className="font-bold text-xl">AI Ethics Simulator</div>
            <div className="text-sm text-muted-foreground">Choose your role to continue</div>
          </div>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Join as a <strong>User</strong> to take the simulation, or as an{" "}
              <strong>Admin</strong> to manage scenarios.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            {/* Role selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => { setRole("user"); setError(""); }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  role === "user"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/30 hover:border-primary/40"
                }`}
              >
                <User className={`h-7 w-7 ${role === "user" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-semibold text-sm ${role === "user" ? "text-primary" : "text-muted-foreground"}`}>
                  User
                </span>
                <Badge variant="secondary" className="text-xs">Take Survey</Badge>
              </button>

              <button
                type="button"
                onClick={() => { setRole("admin"); setError(""); }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  role === "admin"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/30 hover:border-primary/40"
                }`}
              >
                <ShieldCheck className={`h-7 w-7 ${role === "admin" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-semibold text-sm ${role === "admin" ? "text-primary" : "text-muted-foreground"}`}>
                  Admin
                </span>
                <Badge variant="secondary" className="text-xs">Manage App</Badge>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              {role === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full text-base py-5 h-auto" disabled={loading}>
                {loading
                  ? "Signing in…"
                  : role === "admin"
                  ? "Enter Admin Panel"
                  : "Start Simulation"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              No account needed · Free to use · Educational purposes only
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
