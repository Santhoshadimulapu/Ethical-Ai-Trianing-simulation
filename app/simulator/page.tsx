"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain, RotateCcw, ArrowRight, CheckCircle, XCircle,
  AlertTriangle, LogIn, Trophy,
} from "lucide-react";
import Link from "next/link";
import { getUser } from "@/lib/auth";
import { getAllScenarios, type Scenario } from "@/lib/scenarios";

// ── Types ─────────────────────────────────────────────────────────────────────
interface UserDecision {
  scenario: string;
  category: string;
  choice: string;
  outcome: "positive" | "negative" | "mixed";
  date: string;
  points: number;
}

// ── Badge criteria ────────────────────────────────────────────────────────────
function computeBadges(decisions: UserDecision[]) {
  const numPositive = decisions.filter((d) => d.outcome === "positive").length;
  const biasRelated = decisions.filter(
    (d) => /bias/i.test(d.scenario) || /bias/i.test(d.category)
  ).length;
  const privacyPositive = decisions.some(
    (d) => /privacy|data/i.test(d.category) && d.outcome === "positive"
  );
  return [
    {
      name: "First Steps",
      description: "Completed your first scenario",
      icon: "Star",
      earned: decisions.length >= 1,
    },
    {
      name: "Ethical Thinker",
      description: "Made 5 positive ethical decisions",
      icon: "Brain",
      earned: numPositive >= 5,
    },
    {
      name: "Bias Detector",
      description: "Encountered 2+ bias-related scenarios",
      icon: "Target",
      earned: biasRelated >= 2,
    },
    {
      name: "Privacy Advocate",
      description: "Chose a privacy-positive solution",
      icon: "Award",
      earned: privacyPositive,
    },
    {
      name: "Ethics Champion",
      description: "Completed 10 scenarios",
      icon: "Trophy",
      earned: decisions.length >= 10,
    },
    {
      name: "Perfect Scorer",
      description: "All positive decisions in a session",
      icon: "CheckCircle",
      earned: decisions.length > 0 && decisions.every((d) => d.outcome === "positive"),
    },
  ];
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SimulatorPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [decisions, setDecisions] = useState<UserDecision[]>([]);
  const [finished, setFinished] = useState(false);
  const [isComputingAI, setIsComputingAI] = useState(false);

  // Load scenarios & check auth on mount
  useEffect(() => {
    const user = getUser();
    if (!user) {
      setUserName(null); // guest mode — still playable
    } else if (user.role === "admin") {
      router.replace("/admin");
      return;
    } else {
      setUserName(user.name);
    }
    setScenarios(getAllScenarios());
  }, [router]);

  // ── Derived values ────────────────────────────────────────────────────────
  const scenario: Scenario | undefined = scenarios[currentIndex];
  const progress = scenarios.length
    ? ((currentIndex + (showConsequence ? 1 : 0)) / scenarios.length) * 100
    : 0;
  const totalPoints = decisions.reduce((s, d) => s + d.points, 0);
  const correctCount = decisions.filter((d) => d.outcome === "positive").length;

  // ── Handlers ─────────────────────────────────────────────────────────────
  function handleChoiceSelect(choiceIndex: number) {
    if (!scenario || selectedChoice !== null) return;
    const choice = scenario.choices[choiceIndex];
    const decision: UserDecision = {
      scenario: scenario.title,
      category: scenario.category,
      choice: choice.text,
      outcome: choice.type,
      date: new Date().toLocaleString(),
      points: choice.type === "positive" ? 100 : choice.type === "mixed" ? 40 : 0,
    };
    setDecisions((prev) => [...prev, decision]);
    setSelectedChoice(choiceIndex);
    setShowConsequence(true);
  }

  async function handleNext() {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedChoice(null);
      setShowConsequence(false);
    } else {
      await persistAndFinish([...decisions]);
    }
  }

  async function persistAndFinish(allDecisions: UserDecision[]) {
    setIsComputingAI(true);
    const pts = allDecisions.reduce((s, d) => s + d.points, 0);
    const pos = allDecisions.filter((d) => d.outcome === "positive").length;
    const rate =
      allDecisions.length > 0 ? Math.round((pos / allDecisions.length) * 100) : 0;

    // Ask AI agent to answer the same scenarios
    let aiDecisions: unknown[] = [];
    try {
      const res = await fetch("/api/ai-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarios }),
      });
      const json = await res.json();
      aiDecisions = json.aiDecisions ?? [];
    } catch {
      // silently ignore — dashboard handles missing aiDecisions gracefully
    }

    localStorage.setItem(
      "simulatorUserData",
      JSON.stringify({
        points: pts,
        level: Math.max(1, Math.floor(pts / 300) + 1),
        scenariosCompleted: allDecisions.length,
        totalScenarios: scenarios.length,
        badges: computeBadges(allDecisions),
        recentDecisions: allDecisions,
        aiDecisions,
        successRate: rate,
        userName,
      })
    );
    setIsComputingAI(false);
    setFinished(true);
  }

  function handleReset() {
    setCurrentIndex(0);
    setSelectedChoice(null);
    setShowConsequence(false);
    setDecisions([]);
    setFinished(false);
  }

  async function handleSaveAndDashboard() {
    await persistAndFinish(decisions);
    router.push("/dashboard");
  }

  // ── Finished screen ──────────────────────────────────────────────────────
  if (finished) {
    const pts = decisions.reduce((s, d) => s + d.points, 0);
    const pos = decisions.filter((d) => d.outcome === "positive").length;
    const rate = Math.round((pos / decisions.length) * 100);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <Card className="max-w-lg w-full border-2 border-primary/20 shadow-xl text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">Simulation Complete!</CardTitle>
            <CardDescription className="text-base mt-2">
              {userName ? `Great work, ${userName}!` : "Great work!"} Here is your summary:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted/40 rounded-xl">
                <div className="text-2xl font-bold text-primary">{pts}</div>
                <div className="text-xs text-muted-foreground mt-1">Total Points</div>
              </div>
              <div className="p-4 bg-muted/40 rounded-xl">
                <div className="text-2xl font-bold text-green-500">{pos}</div>
                <div className="text-xs text-muted-foreground mt-1">Right Choices</div>
              </div>
              <div className="p-4 bg-muted/40 rounded-xl">
                <div className="text-2xl font-bold">{rate}%</div>
                <div className="text-xs text-muted-foreground mt-1">Success Rate</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full"
                onClick={() => router.push("/dashboard")}
              >
                View Full Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleReset} className="w-full bg-transparent">
                <RotateCcw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── AI computing screen ────────────────────────────────────────────────
  if (isComputingAI) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Brain className="h-12 w-12 text-primary mx-auto animate-pulse" />
          <p className="text-lg font-semibold">AI Agent is analyzing your answers…</p>
          <p className="text-sm text-muted-foreground">Comparing with ethical best practices</p>
        </div>
      </div>
    );
  }

  // ── Loading ─────────────────────────────────────────────────────────────
  if (scenarios.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground animate-pulse">Loading scenarios…</div>
      </div>
    );
  }

  // ── Main simulator UI ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Guest mode nudge */}
        {!userName && (
          <div className="mb-6 flex items-center justify-between gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-sm flex-wrap">
            <span className="text-muted-foreground">
              Guest mode — <strong>log in to save your progress</strong> and unlock the full dashboard.
            </span>
            <Button size="sm" asChild>
              <Link href="/login">
                <LogIn className="mr-1 h-3 w-3" /> Login
              </Link>
            </Button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Ethical AI Simulator</h1>
          </div>
          <p className="text-muted-foreground">
            {userName ? `Welcome, ${userName}! ` : ""}
            Practice making ethical decisions in real-world AI scenarios.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">
              Scenario {currentIndex + 1} of {scenarios.length}
            </span>
          </div>
          <Progress value={progress} className="h-2.5" />
          <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
            <span>{correctCount} correct</span>
            <span>{totalPoints} pts</span>
          </div>
        </div>

        {/* Scenario card */}
        {scenario && (
          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex gap-2">
                  <Badge variant="secondary">#{currentIndex + 1}</Badge>
                  <Badge variant="outline">{scenario.category}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4 mr-1" /> Restart
                </Button>
              </div>
              <CardTitle className="text-2xl mt-2">{scenario.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed mt-1">
                {scenario.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {!showConsequence ? (
                /* ── Choice buttons ── */
                <div className="space-y-3">
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                    What would you do?
                  </h3>
                  {scenario.choices.map((choice, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 bg-transparent hover:bg-primary/5 hover:border-primary/40 transition-all"
                      onClick={() => handleChoiceSelect(idx)}
                    >
                      <span className="font-bold mr-3 text-primary">
                        {String.fromCharCode(65 + idx)})
                      </span>
                      <span className="flex-1 text-start">{choice.text}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                /* ── Consequence reveal ── */
                <div className="space-y-6">
                  <div
                    className={`p-5 rounded-xl border-2 ${
                      scenario.choices[selectedChoice!].type === "positive"
                        ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                        : scenario.choices[selectedChoice!].type === "negative"
                        ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
                        : "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {scenario.choices[selectedChoice!].type === "positive" && (
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      )}
                      {scenario.choices[selectedChoice!].type === "negative" && (
                        <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      {scenario.choices[selectedChoice!].type === "mixed" && (
                        <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="font-bold text-sm">Your Choice:</span>
                          <Badge
                            className={`text-xs ${
                              scenario.choices[selectedChoice!].type === "positive"
                                ? "bg-green-600 text-white"
                                : scenario.choices[selectedChoice!].type === "negative"
                                ? "bg-red-600 text-white"
                                : "bg-yellow-500 text-white"
                            }`}
                          >
                            +
                            {scenario.choices[selectedChoice!].type === "positive"
                              ? 100
                              : scenario.choices[selectedChoice!].type === "mixed"
                              ? 40
                              : 0}{" "}
                            pts
                          </Badge>
                        </div>
                        <p className="text-sm mb-3 italic text-muted-foreground">
                          "{scenario.choices[selectedChoice!].text}"
                        </p>
                        <p className="font-semibold text-sm mb-1">Consequence:</p>
                        <p className="text-sm leading-relaxed">
                          {scenario.choices[selectedChoice!].consequence}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {currentIndex < scenarios.length - 1 ? (
                      <Button onClick={handleNext} className="flex-1">
                        Next Scenario
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Trophy className="mr-2 h-4 w-4" />
                        Finish &amp; View Dashboard
                      </Button>
                    )}
                    <Button variant="outline" size="icon" onClick={handleReset} className="bg-transparent">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Save & go to dashboard early (after ≥3 decisions) */}
                  {decisions.length >= 3 && currentIndex < scenarios.length - 1 && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleSaveAndDashboard}
                        className="text-xs text-muted-foreground hover:text-primary underline transition-colors"
                      >
                        Save progress and view dashboard now
                      </button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <Button variant="ghost" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
