import { NextRequest, NextResponse } from "next/server";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Choice {
  text: string;
  type: "positive" | "negative" | "mixed";
}

interface ScenarioInput {
  id: number;
  title: string;
  description: string;
  category: string;
  choices: Choice[];
}

export interface AIDecision {
  scenario: string;
  category: string;
  choice: string;
  outcome: "positive" | "negative" | "mixed";
  points: number;
}

// ── Fallback: deterministically pick the best choice without API ───────────────
function deterministicPick(scenarios: ScenarioInput[]): AIDecision[] {
  return scenarios.map((s) => {
    // Prefer positive > mixed > negative
    const ranked = [...s.choices]
      .map((c, i) => ({ c, i }))
      .sort((a, b) => {
        const order = { positive: 0, mixed: 1, negative: 2 };
        return order[a.c.type] - order[b.c.type];
      });
    const best = ranked[0].c;
    return {
      scenario: s.title,
      category: s.category,
      choice: best.text,
      outcome: best.type,
      points: best.type === "positive" ? 100 : best.type === "mixed" ? 40 : 0,
    };
  });
}

// ── POST /api/ai-agent ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { scenarios }: { scenarios: ScenarioInput[] } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;

  // If no API key configured, return deterministic fallback
  if (!apiKey) {
    return NextResponse.json({ aiDecisions: deterministicPick(scenarios), source: "fallback" });
  }

  // Build a single compact prompt for all scenarios
  const scenarioText = scenarios
    .map(
      (s, idx) =>
        `[${idx}] ${s.title}: ${s.description}\n${s.choices
          .map((c, ci) => `  ${ci}. ${c.text}`)
          .join("\n")}`
    )
    .join("\n\n");

  const prompt = `You are an ethical AI expert advisor. For each numbered scenario below, respond with the index (0-based) of the choice that BEST aligns with ethical AI principles: fairness, transparency, accountability, privacy, and human wellbeing. Respond with ONLY a JSON array of integers, one per scenario, in order. No explanation.\n\nExample for 3 scenarios: [0, 2, 1]\n\n${scenarioText}`;

  let aiDecisions: AIDecision[];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0,       // deterministic output
            maxOutputTokens: 256,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error ${response.status}`);
    }

    const data = await response.json();
    const rawText: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Extract the first JSON array from the response
    const match = rawText.match(/\[\s*\d[\d,\s]*\]/);
    if (!match) throw new Error("No JSON array in Gemini response");

    const indexes: number[] = JSON.parse(match[0]);

    aiDecisions = scenarios.map((s, i) => {
      const idx = Math.min(Math.max(indexes[i] ?? 0, 0), s.choices.length - 1);
      const choice = s.choices[idx];
      return {
        scenario: s.title,
        category: s.category,
        choice: choice.text,
        outcome: choice.type,
        points: choice.type === "positive" ? 100 : choice.type === "mixed" ? 40 : 0,
      };
    });

    return NextResponse.json({ aiDecisions, source: "gemini" });
  } catch (err) {
    // Fallback to deterministic on any error
    console.error("AI agent error, using fallback:", err);
    return NextResponse.json({ aiDecisions: deterministicPick(scenarios), source: "fallback" });
  }
}
