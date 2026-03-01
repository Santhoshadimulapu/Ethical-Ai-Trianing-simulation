// ─── Scenario types & storage ────────────────────────────────────────────────

export interface Choice {
  text: string;
  consequence: string;
  type: "positive" | "negative" | "mixed";
}

export interface Scenario {
  id: number;
  category: string;
  title: string;
  description: string;
  choices: Choice[]; // 2 – 6 choices supported
}

// ─── Seed / default scenarios (always present, read-only for users) ──────────
export const DEFAULT_SCENARIOS: Scenario[] = [
  {
    id: 1,
    category: "bias-in-hiring",
    title: "Bias in Hiring",
    description:
      "A company's AI-powered recruitment tool is found to favor resumes with traditionally male names and penalize gaps in employment, disproportionately affecting women and caregivers. What should the company do?",
    choices: [
      {
        text: "Continue using the tool as is, trusting the data.",
        consequence: "NEGATIVE: Perpetuates discrimination and could lead to legal and reputational risks.",
        type: "negative",
      },
      {
        text: "Audit and retrain the AI with more diverse, unbiased data.",
        consequence: "POSITIVE: Helps reduce bias and creates a fairer hiring process.",
        type: "positive",
      },
      {
        text: "Manually review all AI-rejected resumes.",
        consequence: "MIXED: May catch some bias but is time-consuming and doesn't fix the root cause.",
        type: "mixed",
      },
    ],
  },
  {
    id: 2,
    category: "surveillance-ethics",
    title: "Surveillance Ethics",
    description:
      "A city government wants to deploy AI-powered surveillance cameras to reduce crime, but residents are concerned about constant monitoring and data misuse. How should the city proceed?",
    choices: [
      {
        text: "Deploy the cameras without public input for maximum effectiveness.",
        consequence: "NEGATIVE: Erodes public trust and may violate privacy rights.",
        type: "negative",
      },
      {
        text: "Hold public consultations and implement strict data privacy policies.",
        consequence: "POSITIVE: Builds trust and ensures ethical use of surveillance technology.",
        type: "positive",
      },
      {
        text: "Limit surveillance to high-crime areas only.",
        consequence: "MIXED: Reduces privacy concerns but may lead to unequal treatment of neighborhoods.",
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
        consequence: "NEGATIVE: Risks reinforcing stereotypes and may unfairly impact students' futures.",
        type: "negative",
      },
      {
        text: "Use AI as one tool among many, with human oversight.",
        consequence: "POSITIVE: Allows for more balanced, fair decisions and reduces the risk of bias.",
        type: "positive",
      },
      {
        text: "Discontinue use of AI in student assessment.",
        consequence: "MIXED: Avoids AI bias but may miss opportunities for early support.",
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
        consequence: "NEGATIVE: Violates user trust and privacy, risking legal action.",
        type: "negative",
      },
      {
        text: "Implement strong encryption and give users full control over their data.",
        consequence: "POSITIVE: Protects privacy and builds user trust.",
        type: "positive",
      },
      {
        text: "Anonymize data but keep it for internal AI training.",
        consequence: "MIXED: Reduces risk but may still concern privacy-focused users.",
        type: "mixed",
      },
    ],
  },
  {
    id: 5,
    category: "autonomous-vehicles",
    title: "Autonomous Vehicle Dilemma",
    description:
      "A self-driving car must choose between swerving to avoid a pedestrian and risking the passenger, or staying on course and harming the pedestrian. What should the AI do?",
    choices: [
      {
        text: "Always protect the passenger.",
        consequence: "NEGATIVE: May endanger pedestrians and is ethically questionable.",
        type: "negative",
      },
      {
        text: "Always protect the pedestrian.",
        consequence: "NEGATIVE: May endanger passengers and reduce trust in AVs.",
        type: "negative",
      },
      {
        text: "Make a random choice.",
        consequence: "MIXED: Avoids bias but lacks transparency and accountability.",
        type: "mixed",
      },
      {
        text: "Follow a transparent, pre-defined ethical policy.",
        consequence: "POSITIVE: Fair, transparent, and can be publicly debated.",
        type: "positive",
      },
    ],
  },
  {
    id: 6,
    category: "medical-ai",
    title: "Medical AI Diagnosis",
    description:
      "A hospital uses an AI to diagnose patients, but the AI is less accurate for certain minority groups. How should the hospital address this?",
    choices: [
      {
        text: "Deploy the AI for all patients without caveats.",
        consequence: "NEGATIVE: Risks harm to minority groups.",
        type: "negative",
      },
      {
        text: "Deploy with warnings about accuracy differences.",
        consequence: "MIXED: Transparent but doesn't solve the bias.",
        type: "mixed",
      },
      {
        text: "Only use the AI for majority groups.",
        consequence: "NEGATIVE: Discriminatory and exclusionary.",
        type: "negative",
      },
      {
        text: "Retrain the AI with more diverse data before deployment.",
        consequence: "POSITIVE: Improves fairness and accuracy for all patient groups.",
        type: "positive",
      },
    ],
  },
  {
    id: 7,
    category: "facial-recognition",
    title: "Facial Recognition Privacy",
    description:
      "A city plans to deploy facial recognition cameras in public spaces to improve security. What is the most ethical way to proceed?",
    choices: [
      {
        text: "Deploy without informing the public.",
        consequence: "NEGATIVE: Violates privacy and public trust.",
        type: "negative",
      },
      {
        text: "Use facial recognition with clear signage and opt-out options.",
        consequence: "POSITIVE: Respects privacy and gives citizens a choice.",
        type: "positive",
      },
      {
        text: "Only use the system for serious crimes.",
        consequence: "MIXED: Limits misuse but may still raise civil liberty concerns.",
        type: "mixed",
      },
      {
        text: "Ban facial recognition entirely.",
        consequence: "MIXED: Protects privacy but may reduce public safety capabilities.",
        type: "mixed",
      },
    ],
  },
  {
    id: 8,
    category: "ai-impact-jobs",
    title: "AI Impact on Jobs",
    description:
      "A company is automating many jobs with AI, leading to planned layoffs. What is the most ethical approach?",
    choices: [
      {
        text: "Lay off workers immediately with no support.",
        consequence: "NEGATIVE: Harmful and irresponsible to employees.",
        type: "negative",
      },
      {
        text: "Retrain workers for new AI-adjacent roles.",
        consequence: "POSITIVE: Supports employees and strengthens society.",
        type: "positive",
      },
      {
        text: "Gradually phase in automation with transition assistance.",
        consequence: "MIXED: Softens impact but doesn't prevent eventual job loss.",
        type: "mixed",
      },
      {
        text: "Automate fully as fast as possible for maximum profit.",
        consequence: "NEGATIVE: Prioritises profit over people and community.",
        type: "negative",
      },
    ],
  },
  {
    id: 9,
    category: "deepfakes",
    title: "Deepfakes and Misinformation",
    description:
      "A politician's speech is manipulated using deepfake technology and spreads rapidly online. What should social media platforms do?",
    choices: [
      {
        text: "Allow all content in the name of free speech.",
        consequence: "NEGATIVE: Spreads misinformation and harms democracy.",
        type: "negative",
      },
      {
        text: "Use AI to detect and label deepfakes automatically.",
        consequence: "POSITIVE: Helps users identify false content at scale.",
        type: "positive",
      },
      {
        text: "Remove all political content preventatively.",
        consequence: "NEGATIVE: Overreaches and censors legitimate speech.",
        type: "negative",
      },
      {
        text: "Let users flag suspicious videos for manual review.",
        consequence: "MIXED: Community-driven but too slow to stop viral spread.",
        type: "mixed",
      },
    ],
  },
  {
    id: 10,
    category: "ai-criminal-justice",
    title: "AI in Criminal Justice",
    description:
      "An AI system predicts recidivism to inform parole decisions. Studies show it is less accurate for minority groups. What should be done?",
    choices: [
      {
        text: "Continue using the AI as is.",
        consequence: "NEGATIVE: Perpetuates systemic injustice.",
        type: "negative",
      },
      {
        text: "Audit and retrain the AI for fairness across all groups.",
        consequence: "POSITIVE: Promotes justice and equity in the legal system.",
        type: "positive",
      },
      {
        text: "Ban AI from criminal justice entirely.",
        consequence: "MIXED: Removes bias tool but loses potential efficiency gains.",
        type: "mixed",
      },
      {
        text: "Require judges to explicitly override AI recommendations.",
        consequence: "MIXED: Adds human oversight but may reintroduce individual bias.",
        type: "mixed",
      },
    ],
  },
  {
    id: 11,
    category: "ai-healthcare-resources",
    title: "AI in Healthcare Resource Allocation",
    description:
      "During a pandemic, an AI is used to allocate limited ventilators. It prioritizes younger, healthier patients. What is the ethical response?",
    choices: [
      {
        text: "Follow the AI's recommendations strictly.",
        consequence: "NEGATIVE: May be unfair and harmful to vulnerable groups.",
        type: "negative",
      },
      {
        text: "Include human review and ethical board oversight for each case.",
        consequence: "POSITIVE: Adds compassion, context, and accountability.",
        type: "positive",
      },
      {
        text: "Randomly allocate resources.",
        consequence: "MIXED: Fair in process but may not maximise lives saved.",
        type: "mixed",
      },
      {
        text: "Prioritize based on perceived social value.",
        consequence: "NEGATIVE: Highly controversial and ethically unjustifiable.",
        type: "negative",
      },
    ],
  },
  {
    id: 12,
    category: "ai-credit-scoring",
    title: "AI in Credit Scoring",
    description:
      "A bank uses AI to determine credit scores. Some applicants are denied loans due to opaque factors they cannot control. What should the bank do?",
    choices: [
      {
        text: "Rely solely on the AI's decision with no appeal process.",
        consequence: "NEGATIVE: Unfair and non-transparent to applicants.",
        type: "negative",
      },
      {
        text: "Allow appeals and provide human review for rejections.",
        consequence: "POSITIVE: Adds fairness, transparency, and accountability.",
        type: "positive",
      },
      {
        text: "Disclose all scoring factors to every applicant.",
        consequence: "MIXED: Transparent but may reveal proprietary model details.",
        type: "mixed",
      },
      {
        text: "Ban AI from all credit decisions.",
        consequence: "MIXED: Removes algorithmic bias but reduces processing efficiency.",
        type: "mixed",
      },
    ],
  },
  {
    id: 13,
    category: "ai-targeted-advertising",
    title: "AI in Targeted Advertising",
    description:
      "A social media platform uses AI to target ads based on sensitive user behaviours. Some users feel manipulated. What should the platform do?",
    choices: [
      {
        text: "Allow all targeting for maximum advertising revenue.",
        consequence: "NEGATIVE: Exploits users and erodes platform trust.",
        type: "negative",
      },
      {
        text: "Give users granular opt-out controls for targeted ads.",
        consequence: "POSITIVE: Respects user autonomy and builds trust.",
        type: "positive",
      },
      {
        text: "Restrict targeting on sensitive categories like health and politics.",
        consequence: "MIXED: Reduces harm but may be hard to enforce consistently.",
        type: "mixed",
      },
      {
        text: "Show only generic, non-personalised ads to all users.",
        consequence: "MIXED: Protects privacy but reduces ad relevance and revenue.",
        type: "mixed",
      },
    ],
  },
  {
    id: 14,
    category: "ai-in-education-content",
    title: "AI-Generated Content in Schools",
    description:
      "Students use AI tools to generate essays and homework. Teachers struggle to assess genuine learning. What is the best approach?",
    choices: [
      {
        text: "Ban all AI tools in schools immediately.",
        consequence: "NEGATIVE: Stifles innovation and ignores real-world skill development.",
        type: "negative",
      },
      {
        text: "Teach students to use AI as a learning aid responsibly.",
        consequence: "POSITIVE: Prepares students for an AI-integrated future.",
        type: "positive",
      },
      {
        text: "Ignore the issue and let teachers handle it individually.",
        consequence: "NEGATIVE: Undercuts academic integrity and creates inconsistency.",
        type: "negative",
      },
      {
        text: "Deploy AI detection tools to flag AI-generated work.",
        consequence: "MIXED: Helpful but current detection tools have false positives.",
        type: "mixed",
      },
    ],
  },
  {
    id: 15,
    category: "ai-creative-arts",
    title: "AI in Creative Arts",
    description:
      "An artist discovers their work was used without permission to train an AI that now generates very similar art commercially. What should the company do?",
    choices: [
      {
        text: "Do nothing; publicly accessible data is fair use.",
        consequence: "NEGATIVE: Disrespects creators and may violate copyright law.",
        type: "negative",
      },
      {
        text: "Compensate and properly credit all original artists used in training.",
        consequence: "POSITIVE: Fair, ethical, and legally sound.",
        type: "positive",
      },
      {
        text: "Let artists opt out of future AI training datasets.",
        consequence: "MIXED: Helpful going forward but doesn't address past usage.",
        type: "mixed",
      },
      {
        text: "Remove all AI-generated artwork from commercial sale.",
        consequence: "MIXED: Protects artists but may be disproportionate and impractical.",
        type: "mixed",
      },
    ],
  },
];

// ─── Storage key ──────────────────────────────────────────────────────────────
const CUSTOM_KEY = "ethicsCustomScenarios";

/** Returns all scenarios: defaults + anything admin has added */
export function getAllScenarios(): Scenario[] {
  if (typeof window === "undefined") return DEFAULT_SCENARIOS;
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    const custom: Scenario[] = raw ? JSON.parse(raw) : [];
    return [...DEFAULT_SCENARIOS, ...custom];
  } catch {
    return DEFAULT_SCENARIOS;
  }
}

/** Returns only admin-added scenarios */
export function getCustomScenarios(): Scenario[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Save a new admin scenario */
export function addScenario(scenario: Omit<Scenario, "id">): void {
  const current = getCustomScenarios();
  const allIds = getAllScenarios().map((s) => s.id);
  const nextId = Math.max(...allIds, 100) + 1;
  const updated = [...current, { ...scenario, id: nextId }];
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(updated));
}

/** Delete an admin-added scenario by id */
export function deleteScenario(id: number): void {
  const current = getCustomScenarios();
  const updated = current.filter((s) => s.id !== id);
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(updated));
}
