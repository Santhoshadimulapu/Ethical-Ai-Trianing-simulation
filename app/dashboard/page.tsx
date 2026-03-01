"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy, Target, BarChart3, Clock, CheckCircle, XCircle,
  AlertTriangle, Star, Award, Brain, TrendingUp, LogIn,
  RotateCcw, ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { getUser } from "@/lib/auth";

// Dynamic import to avoid SSR issues with recharts
const RLAgentChart = dynamic(() => import("./RLAgentChart"), { ssr: false });

// ── Types ─────────────────────────────────────────────────────────────────────
interface RecentDecision {
  scenario: string;
  category: string;
  choice: string;
  outcome: "positive" | "negative" | "mixed";
  date: string;
  points: number;
}

interface BadgeData {
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface DashboardData {
  points: number;
  level: number;
  scenariosCompleted: number;
  totalScenarios: number;
  badges: BadgeData[];
  recentDecisions: RecentDecision[];
  aiDecisions?: RecentDecision[];   // AI agent answers stored at simulation time
  successRate: number;
  userName?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Star, Brain, Target, Award, Trophy, CheckCircle,
};

/** Build cumulative reward series from a decision list (stored or per-decision) */
function buildRewardSeries(decisions: RecentDecision[]): number[] {
  return decisions.reduce((arr, d, i) => {
    const prev = i > 0 ? arr[i - 1] : 0;
    const reward = d.outcome === "positive" ? 1 : d.outcome === "mixed" ? 0.4 : 0;
    return [...arr, Number((prev + reward).toFixed(3))];
  }, [] as number[]);
}

// ── Default data (shown when no localStorage) ─────────────────────────────────
const EMPTY_DATA: DashboardData = {
  points: 0,
  level: 1,
  scenariosCompleted: 0,
  totalScenarios: 15,
  badges: [
    { name: "First Steps", description: "Complete your first scenario", icon: "Star", earned: false },
    { name: "Ethical Thinker", description: "Make 5 positive ethical decisions", icon: "Brain", earned: false },
    { name: "Bias Detector", description: "Encounter 2+ bias scenarios", icon: "Target", earned: false },
    { name: "Privacy Advocate", description: "Choose a privacy-positive solution", icon: "Award", earned: false },
    { name: "Ethics Champion", description: "Complete 10 scenarios", icon: "Trophy", earned: false },
    { name: "Perfect Scorer", description: "All positive decisions in a session", icon: "CheckCircle", earned: false },
  ],
  recentDecisions: [],
  successRate: 0,
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData>(EMPTY_DATA);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user && user.role === "admin") {
      router.replace("/admin");
      return;
    }
    if (user) {
      setUserName(user.name);
      setIsLoggedIn(true);
    }

    try {
      const raw = localStorage.getItem("simulatorUserData");
      if (raw) setData(JSON.parse(raw));
    } catch {
      /* use defaults */
    }
  }, [router]);

  // ── Chart data (fixed — read from stored AI decisions, never re-simulated) ──
  const { userRewards, aiRewards } = useMemo(() => ({
    userRewards: buildRewardSeries(data.recentDecisions),
    aiRewards: buildRewardSeries(data.aiDecisions ?? []),
  }), [data.recentDecisions, data.aiDecisions]);

  // ── Ethics metrics ────────────────────────────────────────────────────────
  const total = data.recentDecisions.length;
  const fairness =
    total > 0
      ? Math.round(
          (data.recentDecisions.filter((d) => /fair|inclusive|diverse/i.test(d.choice)).length / total) * 100
        )
      : 0;
  const transparency =
    total > 0
      ? Math.round(
          (data.recentDecisions.filter((d) => /transparen|explain|disclose|audit/i.test(d.choice)).length / total) * 100
        )
      : 0;
  const biasScore =
    total > 0
      ? Math.round(
          (data.recentDecisions.filter((d) => /bias|discrim/i.test(d.scenario)).length / total) * 100
        )
      : 0;

  const progress = data.totalScenarios
    ? (data.scenariosCompleted / data.totalScenarios) * 100
    : 0;
  const earnedBadges = data.badges.filter((b) => b.earned).length;

  // ── User status header ────────────────────────────────────────────────────
  const headerLabel = userName ?? data.userName ?? null;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Ethics Dashboard</h1>
            <p className="text-muted-foreground">
              {headerLabel
                ? `Tracking progress for ${headerLabel}`
                : "Complete scenarios to see your results here"}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button asChild size="sm" variant="outline" className="bg-transparent">
              <Link href="/simulator">
                <RotateCcw className="mr-1 h-4 w-4" /> Continue Simulation
              </Link>
            </Button>
            {!isLoggedIn && (
              <Button size="sm" asChild>
                <Link href="/login">
                  <LogIn className="mr-1 h-4 w-4" /> Login to Save
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {data.scenariosCompleted === 0 && (
          <Card className="mb-8 border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Brain className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No simulation data yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Complete at least one scenario in the simulator to populate your dashboard with real data.
              </p>
              <Button asChild>
                <Link href="/simulator">Start Simulation</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── AI Agent Chart ── */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-600" />
              You vs AI Agent
            </CardTitle>
            <CardDescription>
              Blue = your cumulative reward · Green dashed = AI agent (ethical best-pick).
              If your line is above the AI agent, you made better ethical choices!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RLAgentChart
              userRewards={userRewards}
              aiRewards={aiRewards}
            />
            {data.scenariosCompleted > 0 && (
              <div className="mt-3 p-3 bg-muted/40 rounded-lg text-xs text-muted-foreground">
                <strong>Interpretation:</strong> Each point represents a completed scenario.
                A reward of 1.0 = positive choice, 0.4 = mixed, 0 = negative.
                The AI agent picks the ethically best option for each scenario.
                {userRewards.length > 0 && aiRewards.length > 0 &&
                  userRewards[userRewards.length - 1] > aiRewards[aiRewards.length - 1] && (
                    <span className="text-green-600 dark:text-green-400 font-semibold ml-1">
                      ✓ You scored higher than the AI agent!
                    </span>
                  )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="text-center py-4">
            <CardContent className="p-0">
              <Trophy className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-2xl font-bold">{data.points.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Points</div>
            </CardContent>
          </Card>
          <Card className="text-center py-4">
            <CardContent className="p-0">
              <ShieldCheck className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <div className="text-2xl font-bold">Lv.{data.level}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Level</div>
            </CardContent>
          </Card>
          <Card className="text-center py-4">
            <CardContent className="p-0">
              <Target className="h-5 w-5 text-accent mx-auto mb-1" />
              <div className="text-2xl font-bold">{data.scenariosCompleted}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Scenarios</div>
            </CardContent>
          </Card>
          <Card className="text-center py-4">
            <CardContent className="p-0">
              <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <div className="text-2xl font-bold">{data.successRate}%</div>
              <div className="text-xs text-muted-foreground mt-0.5">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="text-center py-4">
            <CardContent className="p-0">
              <Award className="h-5 w-5 text-secondary mx-auto mb-1" />
              <div className="text-2xl font-bold">{earnedBadges}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Badges</div>
            </CardContent>
          </Card>
          <Card className="text-center py-4">
            <CardContent className="p-0">
              <BarChart3 className="h-5 w-5 text-orange-500 mx-auto mb-1" />
              <div className="text-2xl font-bold">{fairness}%</div>
              <div className="text-xs text-muted-foreground mt-0.5">Fairness</div>
            </CardContent>
          </Card>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: progress + ethics metrics + decisions */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Progress through all available scenarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Overall</span>
                  <span className="text-muted-foreground">
                    {data.scenariosCompleted}/{data.totalScenarios}
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(progress)}% complete · Keep going to unlock more badges!
                </p>
              </CardContent>
            </Card>

            {/* Ethics Metrics Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  Ethics Quality Metrics
                </CardTitle>
                <CardDescription>
                  Derived from keywords in your submitted answers
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{fairness}%</div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium">Fairness</div>
                  <Progress value={fairness} className="h-1.5 mt-2" />
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{transparency}%</div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium">Transparency</div>
                  <Progress value={transparency} className="h-1.5 mt-2" />
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-xl">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{biasScore}%</div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium">Bias Exposure</div>
                  <p className="text-xs text-muted-foreground">(lower = fewer bias topics)</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Decisions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Decisions
                </CardTitle>
                <CardDescription>Your latest choices and their ethical outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                {data.recentDecisions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No decisions recorded yet. Start the simulator!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {[...data.recentDecisions].reverse().slice(0, 8).map((d, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                        <div className="flex-shrink-0 mt-0.5">
                          {d.outcome === "positive" && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {d.outcome === "negative" && <XCircle className="h-5 w-5 text-red-500" />}
                          {d.outcome === "mixed" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{d.scenario}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{d.choice}</p>
                          <div className="flex items-center justify-between mt-1.5">
                            <span className="text-xs text-muted-foreground">{d.date}</span>
                            <Badge
                              variant={
                                d.outcome === "positive"
                                  ? "default"
                                  : d.outcome === "negative"
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              +{d.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: badges + actions */}
          <div className="space-y-6">

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Badges
                </CardTitle>
                <CardDescription>
                  {earnedBadges}/{data.badges.length} earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.badges.map((badge, i) => {
                    const Icon = ICON_MAP[badge.icon] ?? Star;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          badge.earned
                            ? "bg-primary/5 border-primary/20"
                            : "opacity-45 border-border"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            badge.earned ? "bg-primary/10" : "bg-muted"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${badge.earned ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{badge.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{badge.description}</p>
                        </div>
                        {badge.earned && (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/simulator">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Continue Learning
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>

            {/* Performance tip */}
            {data.successRate < 50 && data.scenariosCompleted > 0 && (
              <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                <CardContent className="pt-4 pb-4">
                  <div className="flex gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-yellow-800 dark:text-yellow-300">
                      Your success rate is below 50%: focus on choosing answers that mention
                      auditing, fairness, transparency, and human oversight.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {data.successRate >= 80 && data.scenariosCompleted > 0 && (
              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardContent className="pt-4 pb-4">
                  <div className="flex gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800 dark:text-green-300">
                      Excellent! You are demonstrating strong ethical reasoning.
                      Challenge yourself with harder scenarios.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
