# Ethical AI Training Simulation

An interactive web-based platform that teaches ethical AI decision-making through real-world scenario simulations. Users face ethical dilemmas, make choices, and see their performance compared against an AI agent powered by Google Gemini.

---

## 🧠 What It Does

Most AI ethics training is purely theoretical. This simulator puts learners in the seat of an AI decision-maker — facing real dilemmas across healthcare, finance, hiring, social media, and governance — and immediately shows the consequences of each choice.

After completing the simulation, the dashboard compares your decisions against an AI agent (Gemini 1.5 Flash) that independently answers the same scenarios using ethical principles. This gives you a concrete benchmark: *did you make more ethical choices than the AI?*

---

## ✨ Features

### 👤 Role-Based Access
- **User** — Takes the simulation survey, earns points & badges, views their dashboard
- **Admin** — Manages the question bank: add/delete custom scenarios with up to 6 choices each
- Login at `/login` · Admin password: `admin123`

### 🎮 Simulator (`/simulator`)
- 15 built-in scenarios across categories: healthcare, hiring, finance, social media, governance, surveillance, content moderation, and more
- Admin-created scenarios are automatically included
- Points: positive choice = 100, mixed = 40, negative = 0
- Badges earned based on decision patterns
- Progress saved to browser localStorage

### 🤖 AI Agent Comparison
- On simulation completion, your answers are sent to a server-side API route (`/api/ai-agent`)
- Google Gemini 1.5 Flash independently picks the most ethical choice for each scenario (temperature = 0, fully deterministic)
- If no API key is configured, a deterministic fallback picks the best-typed choice (positive > mixed > negative)
- Results are stored once — the dashboard chart never changes between visits

### 📊 Dashboard (`/dashboard`)
- **You vs AI Agent** line chart — cumulative reward per scenario (fixed, not re-simulated)
- 6-stat summary: points, level, scenarios completed, success rate, badges earned, fairness score
- Ethics metrics: fairness, transparency, bias coverage
- Recent decisions list (newest first)
- Badges panel with earned/unearned status
- Performance tips based on success rate

### 🛠️ Admin Panel (`/admin`)
- Add scenarios with title, category, description, and 2–6 choices
- Each choice has text, consequence, and outcome type (positive / mixed / negative)
- Delete custom scenarios
- View all built-in scenarios (read-only)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| Charts | Recharts |
| AI Agent | Google Gemini 1.5 Flash (`/api/ai-agent`) |
| Auth | Client-side role system (localStorage) |
| Data Storage | Browser localStorage (no database needed) |
| Deployment | Vercel |

---

## 📂 Project Structure

```
app/
  page.tsx              # Landing page
  login/page.tsx        # Role-based login (User / Admin)
  simulator/page.tsx    # Scenario simulation
  dashboard/            # Analytics dashboard
    page.tsx
    RLAgentChart.tsx    # You vs AI Agent chart (Recharts)
  admin/page.tsx        # Admin panel
  api/
    ai-agent/route.ts   # Server-side Gemini API integration
components/
  navigation.tsx        # Role-aware top nav
  FocusAreaCard.tsx
  ui/                   # shadcn/ui primitives
lib/
  auth.ts               # getUser / setUser / logout helpers
  scenarios.ts          # 15 default scenarios + admin CRUD
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Santhoshadimulapu/Ethical-Ai-Trianing-simulation.git
cd Ethical-Ai-Trianing-simulation

# Install dependencies
pnpm install

# (Optional) Add your Gemini API key for real AI responses
# Create a .env.local file:
echo "GEMINI_API_KEY=your_key_here" > .env.local

# Start development server
pnpm dev
```

The app runs at **http://localhost:3000**

### Get a Free Gemini API Key

1. Go to [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click **Get API key** (free tier: 15 req/min, 1M tokens/day)
3. Add it to `.env.local` as shown above

Without a key, the app still works — the AI agent uses a deterministic fallback.

---

## 🌐 Deployment (Vercel)

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import the repo
3. Vercel auto-detects Next.js — click **Deploy**
4. After deploy: **Settings → Environment Variables** → add `GEMINI_API_KEY` → **Redeploy**

---

## 🔐 Default Credentials

| Role | Name | Password |
|---|---|---|
| Admin | *(any)* | `admin123` |
| User | *(any)* | *(no password)* |

---

## 🗺️ Future Enhancements

- [ ] Persistent backend (database for user accounts and scenarios)
- [ ] Leaderboard across users
- [ ] More scenario categories (education, autonomous vehicles, criminal justice)
- [ ] Multi-language support
- [ ] Instructor mode for classroom use
- [ ] Exportable PDF report of simulation results

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: describe change"`
4. Push and open a Pull Request

---

## 📄 License

MIT