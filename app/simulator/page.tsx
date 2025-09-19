"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, RotateCcw, ArrowRight, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

const scenarios = [
  {
    id: 1,
    category: "bias-in-hiring",
    title: "Bias in Hiring",
    description:
      "A company's AI-powered recruitment tool is found to favor resumes with traditionally male names and penalize gaps in employment, disproportionately affecting women and caregivers. What should the company do?",
    choices: [
      {
        text: "Continue using the tool as is, trusting the data.",
        consequence:
          "NEGATIVE: This perpetuates discrimination and could lead to legal and reputational risks.",
        type: "negative",
      },
      {
        text: "Audit and retrain the AI with more diverse, unbiased data.",
        consequence:
          "POSITIVE: This helps reduce bias and creates a fairer hiring process.",
        type: "positive",
      },
      {
        text: "Manually review all AI-rejected resumes.",
        consequence:
          "MIXED: This may catch some bias but is time-consuming and doesn't address the root cause in the AI.",
        type: "mixed",
      },
    ],
  },
  // --- 15 NEW SCENARIOS BELOW ---
  {
    id: 5,
    category: "autonomous-vehicles",
    title: "Autonomous Vehicle Dilemma",
    description:
      "A self-driving car must choose between swerving to avoid a pedestrian and risking the passenger, or staying on course and harming the pedestrian. What should the AI do?",
    choices: [
      { text: "Always protect the passenger.", consequence: "NEGATIVE: This may endanger pedestrians and is ethically questionable.", type: "negative" },
      { text: "Always protect the pedestrian.", consequence: "NEGATIVE: This may endanger passengers and reduce trust in AVs.", type: "negative" },
      { text: "Make a random choice.", consequence: "MIXED: This avoids bias but lacks transparency and accountability.", type: "mixed" },
      { text: "Follow a transparent, pre-defined ethical policy.", consequence: "POSITIVE: This is fair, transparent, and can be publicly debated.", type: "positive" },
    ],
  },
  {
    id: 6,
    category: "medical-ai",
    title: "Medical AI Diagnosis",
    description:
      "A hospital uses an AI to diagnose patients, but the AI is less accurate for certain minority groups. How should the hospital address this?",
    choices: [
      { text: "Deploy the AI for all patients.", consequence: "NEGATIVE: This risks harm to minority groups.", type: "negative" },
      { text: "Deploy with warnings about accuracy differences.", consequence: "MIXED: This is transparent but doesn't solve the bias.", type: "mixed" },
      { text: "Only use the AI for majority groups.", consequence: "NEGATIVE: This is discriminatory.", type: "negative" },
      { text: "Retrain the AI with more diverse data.", consequence: "POSITIVE: This improves fairness and accuracy for all.", type: "positive" },
    ],
  },
  {
    id: 7,
    category: "facial-recognition",
    title: "Facial Recognition Privacy",
    description:
      "A city plans to deploy facial recognition cameras in public spaces to improve security. What is the most ethical way to proceed?",
    choices: [
      { text: "Deploy without informing the public.", consequence: "NEGATIVE: This violates privacy and trust.", type: "negative" },
      { text: "Use facial recognition with clear signage and opt-out options.", consequence: "POSITIVE: This respects privacy and gives choice.", type: "positive" },
      { text: "Only use the system for serious crimes.", consequence: "MIXED: This limits misuse but may still raise concerns.", type: "mixed" },
      { text: "Ban facial recognition entirely.", consequence: "MIXED: This protects privacy but may reduce security.", type: "mixed" },
    ],
  },
  {
    id: 8,
    category: "ai-impact-jobs",
    title: "AI Impact on Jobs",
    description:
      "A company is automating many jobs with AI, leading to layoffs. What is the most ethical approach for the company?",
    choices: [
      { text: "Lay off workers with no support.", consequence: "NEGATIVE: This is harmful and irresponsible.", type: "negative" },
      { text: "Retrain workers for new roles.", consequence: "POSITIVE: This supports employees and society.", type: "positive" },
      { text: "Ignore the impact on employees.", consequence: "NEGATIVE: This damages morale and reputation.", type: "negative" },
      { text: "Automate as much as possible for profit.", consequence: "NEGATIVE: This prioritizes profit over people.", type: "negative" },
    ],
  },
  {
    id: 9,
    category: "deepfakes",
    title: "Deepfakes and Misinformation",
    description:
      "A politician's speech is manipulated using deepfake technology and spreads rapidly online. What should social media platforms do?",
    choices: [
      { text: "Allow all content for free speech.", consequence: "NEGATIVE: This spreads misinformation and harms democracy.", type: "negative" },
      { text: "Use AI to detect and label deepfakes.", consequence: "POSITIVE: This helps users identify false content.", type: "positive" },
      { text: "Remove all political content.", consequence: "NEGATIVE: This censors legitimate speech.", type: "negative" },
      { text: "Let users report suspicious videos.", consequence: "MIXED: This helps but may be too slow.", type: "mixed" },
    ],
  },
  {
    id: 10,
    category: "ai-in-criminal-justice",
    title: "AI in Criminal Justice",
    description:
      "An AI system is used to predict recidivism and inform parole decisions. Studies show it is less accurate for minority groups. What should be done?",
    choices: [
      { text: "Continue using the AI as is.", consequence: "NEGATIVE: This perpetuates injustice.", type: "negative" },
      { text: "Audit and improve the AI for fairness.", consequence: "POSITIVE: This promotes justice and equity.", type: "positive" },
      { text: "Ban AI from criminal justice.", consequence: "MIXED: This avoids bias but loses potential benefits.", type: "mixed" },
      { text: "Let judges override AI recommendations.", consequence: "MIXED: This adds oversight but may reintroduce human bias.", type: "mixed" },
    ],
  },
  {
    id: 11,
    category: "ai-in-healthcare",
    title: "AI in Healthcare Resource Allocation",
    description:
      "During a pandemic, an AI is used to allocate limited ventilators. It prioritizes younger, healthier patients. What is the ethical response?",
    choices: [
      { text: "Follow the AI's recommendations strictly.", consequence: "NEGATIVE: This may be unfair to vulnerable groups.", type: "negative" },
      { text: "Include human review for each case.", consequence: "POSITIVE: This adds compassion and context.", type: "positive" },
      { text: "Randomly allocate resources.", consequence: "MIXED: This is fair but may not save the most lives.", type: "mixed" },
      { text: "Prioritize based on social value.", consequence: "NEGATIVE: This is controversial and hard to justify.", type: "negative" },
    ],
  },
  {
    id: 12,
    category: "ai-in-finance",
    title: "AI in Credit Scoring",
    description:
      "A bank uses AI to determine credit scores. Some applicants are denied loans due to factors they can't control. What should the bank do?",
    choices: [
      { text: "Rely solely on the AI's decision.", consequence: "NEGATIVE: This may be unfair and opaque.", type: "negative" },
      { text: "Allow appeals and human review.", consequence: "POSITIVE: This adds fairness and transparency.", type: "positive" },
      { text: "Disclose all factors used in scoring.", consequence: "MIXED: This is transparent but may reveal proprietary info.", type: "mixed" },
      { text: "Ban AI from credit decisions.", consequence: "MIXED: This avoids bias but loses efficiency.", type: "mixed" },
    ],
  },
  {
    id: 13,
    category: "ai-in-marketing",
    title: "AI in Targeted Advertising",
    description:
      "A social media platform uses AI to target ads based on user behavior, including sensitive topics. Some users feel manipulated. What should the platform do?",
    choices: [
      { text: "Allow all targeting for maximum profit.", consequence: "NEGATIVE: This exploits users and erodes trust.", type: "negative" },
      { text: "Let users opt out of targeted ads.", consequence: "POSITIVE: This respects user autonomy.", type: "positive" },
      { text: "Limit targeting on sensitive topics.", consequence: "MIXED: This helps but may be hard to enforce.", type: "mixed" },
      { text: "Show only generic ads.", consequence: "MIXED: This protects privacy but reduces relevance.", type: "mixed" },
    ],
  },
  {
    id: 14,
    category: "ai-in-education-2",
    title: "AI-Generated Content in Schools",
    description:
      "Students use AI tools to generate essays and homework. Teachers struggle to assess genuine learning. What is the best approach?",
    choices: [
      { text: "Ban all AI tools in schools.", consequence: "NEGATIVE: This may stifle innovation and learning.", type: "negative" },
      { text: "Teach students to use AI responsibly.", consequence: "POSITIVE: This prepares students for the future.", type: "positive" },
      { text: "Ignore the issue.", consequence: "NEGATIVE: This undermines academic integrity.", type: "negative" },
      { text: "Use AI to detect AI-generated work.", consequence: "MIXED: This helps but may not be foolproof.", type: "mixed" },
    ],
  },
  {
    id: 15,
    category: "ai-in-creative-arts",
    title: "AI in Creative Arts",
    description:
      "An artist discovers their work was used to train an AI that now generates similar art. They were not asked for permission. What should the company do?",
    choices: [
      { text: "Do nothing; data is public.", consequence: "NEGATIVE: This disrespects creators and may be illegal.", type: "negative" },
      { text: "Compensate and credit original artists.", consequence: "POSITIVE: This is fair and ethical.", type: "positive" },
      { text: "Let artists opt out of training sets.", consequence: "MIXED: This helps but may limit AI capabilities.", type: "mixed" },
      { text: "Remove all AI-generated art.", consequence: "MIXED: This is drastic and may not be feasible.", type: "mixed" },
    ],
  },
  // ...scenarios after the 15th have been removed to keep only 15 dilemmas...
  {
    id: 2,
    category: "surveillance-ethics",
    title: "Surveillance Ethics",
    description:
      "A city government wants to deploy AI-powered surveillance cameras to reduce crime, but residents are concerned about constant monitoring and data misuse. How should the city proceed?",
    choices: [
      {
        text: "Deploy the cameras without public input for maximum effectiveness.",
        consequence:
          "NEGATIVE: This erodes public trust and may violate privacy rights.",
        type: "negative",
      },
      {
        text: "Hold public consultations and implement strict data privacy policies.",
        consequence:
          "POSITIVE: This builds trust and ensures ethical use of surveillance technology.",
        type: "positive",
      },
      {
        text: "Limit surveillance to high-crime areas only.",
        consequence:
          "MIXED: This reduces privacy concerns but may lead to unequal treatment of neighborhoods.",
        type: "mixed",
      },
    ],
  },
  {
    id: 3,
    category: "ai-in-education",
    title: "AI in Education",
    description:
      "A school district uses an AI system to predict which students are at risk of failing. Some parents worry the system will unfairly label students and limit their opportunities. What should the district do?",
    choices: [
      {
        text: "Rely solely on the AI's predictions for interventions.",
        consequence:
          "NEGATIVE: This risks reinforcing stereotypes and may unfairly impact students' futures.",
        type: "negative",
      },
      {
        text: "Use AI as one tool among many, with human oversight.",
        consequence:
          "POSITIVE: This allows for more balanced, fair decisions and reduces the risk of bias.",
        type: "positive",
      },
      {
        text: "Discontinue use of AI in student assessment.",
        consequence:
          "MIXED: This avoids AI bias but may miss opportunities for early support.",
        type: "mixed",
      },
    ],
  },
  {
    id: 4,
    category: "data-privacy",
    title: "Data Privacy",
    description:
      "A popular fitness app uses AI to analyze user health data and provide recommendations. Users are concerned about how their sensitive data is stored and shared. What should the company do?",
    choices: [
      {
        text: "Share data with third parties for profit, without explicit user consent.",
        consequence:
          "NEGATIVE: This violates user trust and privacy, risking legal action and loss of users.",
        type: "negative",
      },
      {
        text: "Implement strong encryption and give users control over their data.",
        consequence:
          "POSITIVE: This protects privacy and builds user trust.",
        type: "positive",
      },
      {
        text: "Anonymize data but keep it for internal AI training.",
        consequence:
          "MIXED: This reduces risk but may still concern privacy-focused users.",
        type: "mixed",
      },
    ],
  },
]


import { useSearchParams } from "next/navigation"

export default function SimulatorPage() {
  type UserDecision = {
    scenario: string;
    choice: string;
    outcome: "positive" | "negative" | "mixed";
    date: string;
    points: number;
  };
  const [userDecisions, setUserDecisions] = useState<UserDecision[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const initialIndex = category
    ? scenarios.findIndex((s) => s.category === category)
    : 0;

  const [currentScenario, setCurrentScenario] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState(0);

  const handleChoiceSelect = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setShowConsequence(true);
    // Record the decision
    const choice = scenarios[currentScenario].choices[choiceIndex];
    setUserDecisions((prev) => [
      ...prev,
      {
        scenario: scenarios[currentScenario].title,
        choice: choice.text,
        outcome: choice.type as "positive" | "negative" | "mixed",
        date: new Date().toLocaleString(),
        points: choice.type === "positive" ? 100 : 0,
      },
    ]);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
      setShowConsequence(false);
      setCompletedScenarios(completedScenarios + 1);
    }
  };

  const resetSimulator = () => {
    setCurrentScenario(initialIndex >= 0 ? initialIndex : 0);
    setSelectedChoice(null);
    setShowConsequence(false);
    setCompletedScenarios(0);
  };

  const scenario = scenarios[currentScenario];
  const progress = ((currentScenario + (showConsequence ? 1 : 0)) / scenarios.length) * 100;

  return (
  <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Ethical AI Simulator</h1>
          </div>
          <p className="text-muted-foreground">Practice making ethical decisions in real-world AI scenarios</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              Scenario {currentScenario + 1} of {scenarios.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Scenario Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">Scenario {currentScenario + 1}</Badge>
              <Button variant="ghost" size="sm" onClick={resetSimulator}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
            <CardTitle className="text-2xl">{scenario.title}</CardTitle>
            <CardDescription className="text-base leading-relaxed">{scenario.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {!showConsequence ? (
              <>
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">What would you do?</h3>
                  {scenario.choices.map((choice, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 bg-transparent"
                      onClick={() => handleChoiceSelect(index)}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)})</span>
                      {choice.text}
                    </Button>
                  ))}
                </div>
                {/* Submit Button: Only show if at least one scenario answered and not all completed */}
                {userDecisions.length > 0 && currentScenario < scenarios.length - 1 && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          const points = userDecisions.reduce((sum, d) => sum + d.points, 0);
                          const numCorrect = userDecisions.filter(d => d.outcome === "positive").length;
                          const successRate = userDecisions.length > 0 ? Math.round((numCorrect / userDecisions.length) * 100) : 0;
                          const badges = [
                            { name: "First Steps", description: "Completed your first scenario", icon: "Star", earned: userDecisions.length > 0 },
                            { name: "Ethical Thinker", description: "Made 5 positive ethical decisions", icon: "Brain", earned: numCorrect >= 5 },
                            { name: "Bias Detector", description: "Identified bias in 3 scenarios", icon: "Target", earned: userDecisions.filter(d => d.scenario.toLowerCase().includes("bias")).length >= 3 },
                            { name: "Privacy Advocate", description: "Chose privacy-focused solutions", icon: "Award", earned: userDecisions.some(d => d.scenario.toLowerCase().includes("privacy") && d.outcome === "positive") },
                          ];
                          window.localStorage.setItem("simulatorUserData", JSON.stringify({
                            points,
                            level: 1,
                            scenariosCompleted: userDecisions.length,
                            totalScenarios: scenarios.length,
                            badges,
                            recentDecisions: userDecisions,
                            successRate,
                          }));
                          window.location.href = "/dashboard";
                        }
                      }}
                      className="bg-primary text-white"
                    >
                      Submit & View Dashboard
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-6">
                <div className="p-6 rounded-lg border-2 border-dashed">
                  <div className="flex items-start gap-3 mb-4">
                    {scenario.choices[selectedChoice!].type === "positive" && (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    )}
                    {scenario.choices[selectedChoice!].type === "negative" && (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    {scenario.choices[selectedChoice!].type === "mixed" && (
                      <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-semibold mb-2">Your Choice:</h4>
                      <p className="text-sm text-muted-foreground mb-4">{scenario.choices[selectedChoice!].text}</p>
                      <h4 className="font-semibold mb-2">Consequence:</h4>
                      <p className="leading-relaxed">{scenario.choices[selectedChoice!].consequence}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {currentScenario < scenarios.length - 1 ? (
                    <Button onClick={nextScenario} className="flex-1">
                      Next Scenario
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button asChild className="flex-1" onClick={() => {
                      if (typeof window !== "undefined") {
                        const points = userDecisions.reduce((sum, d) => sum + d.points, 0);
                        const numCorrect = userDecisions.filter(d => d.outcome === "positive").length;
                        const successRate = userDecisions.length > 0 ? Math.round((numCorrect / userDecisions.length) * 100) : 0;
                        const badges = [
                          { name: "First Steps", description: "Completed your first scenario", icon: "Star", earned: userDecisions.length > 0 },
                          { name: "Ethical Thinker", description: "Made 5 positive ethical decisions", icon: "Brain", earned: numCorrect >= 5 },
                          { name: "Bias Detector", description: "Identified bias in 3 scenarios", icon: "Target", earned: userDecisions.filter(d => d.scenario.toLowerCase().includes("bias")).length >= 3 },
                          { name: "Privacy Advocate", description: "Chose privacy-focused solutions", icon: "Award", earned: userDecisions.some(d => d.scenario.toLowerCase().includes("privacy") && d.outcome === "positive") },
                        ];
                        window.localStorage.setItem("simulatorUserData", JSON.stringify({
                          points,
                          level: 1,
                          scenariosCompleted: userDecisions.length,
                          totalScenarios: scenarios.length,
                          badges,
                          recentDecisions: userDecisions,
                          successRate,
                        }));
                      }
                    }}>
                      <Link href="/dashboard">
                        View Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" onClick={resetSimulator}>
                    Start Over
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center">
          <Button variant="ghost" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
