// ─── Auth helpers (localStorage-based, client-side only) ─────────────────────

export type UserRole = "admin" | "user";

export interface AppUser {
  name: string;
  role: UserRole;
}

/** Hard-coded admin secret (UI-only demo app) */
export const ADMIN_SECRET = "admin123";

export function getUser(): AppUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("ethicsAppUser");
    return raw ? (JSON.parse(raw) as AppUser) : null;
  } catch {
    return null;
  }
}

export function setUser(user: AppUser): void {
  localStorage.setItem("ethicsAppUser", JSON.stringify(user));
}

export function logout(): void {
  localStorage.removeItem("ethicsAppUser");
  localStorage.removeItem("simulatorUserData");
}

export function requireRole(
  role: UserRole,
  redirect: () => void
): boolean {
  const user = getUser();
  if (!user || user.role !== role) {
    redirect();
    return false;
  }
  return true;
}
