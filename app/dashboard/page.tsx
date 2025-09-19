"use client"

type RecentDecision = {
  scenario: string;
  choice: string;
  outcome: "positive" | "negative" | "mixed";
  date: string;
  points: number;
};
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Award,
  Brain,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Dynamically import RLAgentChart to avoid SSR issues
const RLAgentChart = dynamic(() => import("./RLAgentChart"), { ssr: false });

type DashboardUserData = {
  points: number;
  level: number;
  scenariosCompleted: number;
  totalScenarios: number;
  badges: { name: string; description: string; icon: any; earned: boolean }[];
  recentDecisions: RecentDecision[];
  successRate?: number;
};

const defaultUserData: DashboardUserData = {
  points: 0,
  level: 1,
  scenariosCompleted: 0,
  totalScenarios: 50,
  badges: [
    { name: "First Steps", description: "Completed your first scenario", icon: Star, earned: false },
    { name: "Ethical Thinker", description: "Made 5 positive ethical decisions", icon: Brain, earned: false },
    { name: "Bias Detector", description: "Identified bias in 3 scenarios", icon: Target, earned: false },
    { name: "Privacy Advocate", description: "Chose privacy-focused solutions", icon: Award, earned: false },
  ],
  recentDecisions: [],
};

function useDashboardUserData() {
  const [userData, setUserData] = useState<DashboardUserData>(defaultUserData);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("simulatorUserData");
      if (stored) {
        try {
          setUserData(JSON.parse(stored));
        } catch {
          setUserData(defaultUserData);
        }
      }
    }
  }, []);
  return userData;
}

export default function DashboardPage() {
  const mockUserData = useDashboardUserData();
  const progressPercentage = (mockUserData.scenariosCompleted / mockUserData.totalScenarios) * 100;
  const successRate = typeof mockUserData.successRate === "number"
    ? mockUserData.successRate
    : (mockUserData.scenariosCompleted > 0
        ? Math.round((mockUserData.recentDecisions.filter((d: any) => d.outcome === "positive").length / mockUserData.scenariosCompleted) * 100)
        : 0);
  // Predictive Analytics: Simple extrapolation for demo
  const remaining = mockUserData.totalScenarios - mockUserData.scenariosCompleted;
  // Predict future success rate as current rate (if any) or 0
  const predictedSuccessRate = successRate;
  // Predict future badges: if user keeps current rate, how many more badges?
  const badges = mockUserData.badges;
  const earned = badges.filter(b => b.earned).length;
  const possible = badges.length;
  // For demo, if user completes all scenarios at current rate, estimate badges
  const projectedEarned = Math.min(possible, Math.round((mockUserData.scenariosCompleted > 0 ? (earned / mockUserData.scenariosCompleted) : 0) * mockUserData.totalScenarios));

  // Calculate fairness, transparency, and bias metrics from user decisions
  const total = mockUserData.recentDecisions.length;
  // Fairness: % of decisions that mention 'fair' or 'unbiased' in scenario or choice
  const fairnessCount = mockUserData.recentDecisions.filter(d =>
    /fair|unbias/i.test(d.scenario) || /fair|unbias/i.test(d.choice)
  ).length;
  const fairness = total > 0 ? Math.round((fairnessCount / total) * 100) : 0;
  // Transparency: % of decisions that mention 'transparen' or 'explain' in scenario or choice
  const transparencyCount = mockUserData.recentDecisions.filter(d =>
    /transparen|explain/i.test(d.scenario) || /transparen|explain/i.test(d.choice)
  ).length;
  const transparency = total > 0 ? Math.round((transparencyCount / total) * 100) : 0;
  // Bias: % of decisions that mention 'bias' in scenario or choice (lower is better)
  const biasCount = mockUserData.recentDecisions.filter(d =>
    /bias/i.test(d.scenario) || /bias/i.test(d.choice)
  ).length;
  const bias = total > 0 ? Math.round((biasCount / total) * 100) : 0;

  // Simulate RL agent rewards (random policy)
  function simulateRLAgent(scenarios: number) {
    let rewards: number[] = [];
    let total = 0;
    for (let i = 0; i < scenarios; i++) {
      const r = Math.random();
      let reward = 0;
      if (r < 0.25) reward = 1; // positive
      else if (r < 0.75) reward = 0; // negative
      else reward = 0.5; // mixed
      total += reward;
      rewards.push(Number(total.toFixed(2)));
    }
    return rewards;
  }

  // User cumulative rewards
  const userRewards = mockUserData.recentDecisions.reduce((arr, d, i) => {
    const prev = arr[i - 1] || 0;
    return [...arr, prev + (d.outcome === "positive" ? 1 : d.outcome === "mixed" ? 0.5 : 0)];
  }, [] as number[]);
  // RL agent rewards (same length as user)
  const agentRewards = simulateRLAgent(userRewards.length || 1);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Your Ethics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress and see how your ethical reasoning skills are developing
          </p>
        </div>

        {/* Stats Overview */}
        {/* RL Agent vs User Reward Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              RL Agent vs User Reward Curve
            </CardTitle>
            <CardDescription>Compare your cumulative reward to a simulated RL agent (random policy)</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ minHeight: 380 ,maxHeight: 400}}>
              <RLAgentChart userRewards={userRewards} agentRewards={agentRewards} />
            </div>
            <div className="mt-4 text-xs text-muted-foreground border-t pt-3">
              <strong>Note:</strong> The blue line (“User”) shows your total reward (points for positive/mixed decisions) as you answer more scenarios.<br/>
              The purple line (“Agent”) shows how a random AI agent would perform on the same scenarios. If your line is above the agent’s, you’re making better ethical decisions than random chance. If the lines are close, your choices are similar to random guessing. If the agent’s line is above yours, you may want to reflect on your decision strategy.
            </div>
          </CardContent>
        </Card>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Fairness, Transparency, Bias Metrics Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ethics Metrics</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm mb-1">Fairness: <span className="font-bold">{fairness}%</span></div>
            <div className="text-sm mb-1">Transparency: <span className="font-bold">{transparency}%</span></div>
            <div className="text-sm mb-1">Bias: <span className="font-bold">{bias}%</span> <span className="text-xs text-muted-foreground">(lower is better)</span></div>
            <p className="text-xs text-muted-foreground mt-2">Calculated from your scenario choices and descriptions. Strive for high fairness and transparency, and low bias!</p>
          </CardContent>
        </Card>
        {/* Predictive Analytics Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predictive Analytics</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">{predictedSuccessRate}%</div>
          </CardContent>
        </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUserData.points.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Level {mockUserData.level} • +150 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scenarios Completed</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUserData.scenariosCompleted}</div>
              <p className="text-xs text-muted-foreground">of {mockUserData.totalScenarios} available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successRate}%</div>
              <p className="text-xs text-muted-foreground">Positive ethical decisions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUserData.badges.filter((b) => b.earned).length}</div>
              <p className="text-xs text-muted-foreground">of {mockUserData.badges.length} available</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Your journey through ethical AI scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {mockUserData.scenariosCompleted}/{mockUserData.totalScenarios} scenarios
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round(progressPercentage)}% complete • Keep going to unlock more badges!
                  </p>
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
                <CardDescription>Your latest ethical choices and their outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserData.recentDecisions.map((decision, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className="flex-shrink-0 mt-1">
                        {decision.outcome === "positive" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {decision.outcome === "negative" && <XCircle className="h-5 w-5 text-red-500" />}
                        {decision.outcome === "mixed" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{decision.scenario}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{decision.choice}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{decision.date}</span>
                          <Badge
                            variant={
                              decision.outcome === "positive"
                                ? "default"
                                : decision.outcome === "negative"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            +{decision.points} points
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Badges & Achievements
                </CardTitle>
                <CardDescription>Unlock badges by making ethical decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserData.badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        badge.earned ? "bg-primary/5 border-primary/20" : "opacity-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          badge.earned ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <badge.icon className={`h-5 w-5 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{badge.name}</h4>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                      {badge.earned && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button asChild className="w-full">
                <Link href="/simulator">Continue Learning</Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
