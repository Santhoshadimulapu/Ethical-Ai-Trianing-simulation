import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Target,
  Users,
  Award,
  BarChart3,
  MessageSquare,
  Mail,
  Github,
  Twitter,
  Play,
  CheckCircle,
  Lightbulb,
  Gamepad2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-primary/5 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Removed Hackathon Project badge and rocket symbol */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-balance mb-6 tracking-tight">
            Practice AI Ethics in <span className="text-primary">Action</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground text-pretty max-w-4xl mx-auto mb-12 leading-relaxed">
            An interactive simulator where students face real-life AI dilemmas, make decisions, and see the
            consequences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link href="/simulator">
                <Play className="mr-2 h-5 w-5" />
                Try the Simulator
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-transparent" asChild>
              <Link href="/about">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Visual Element */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-card border rounded-3xl p-8 shadow-xl backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">AI Scenarios</div>
                    <div className="text-sm text-muted-foreground">Real-world dilemmas</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Make Decisions</div>
                    <div className="text-sm text-muted-foreground">Choose your path</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">See Results</div>
                    <div className="text-sm text-muted-foreground">Learn from outcomes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-balance tracking-tight">
              The Problem We're Solving
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              AI is everywhere, but we're not prepared for the ethical challenges it brings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-destructive font-bold text-lg">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-xl">AI is Everywhere</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      From hiring algorithms to facial recognition, autonomous cars to health apps - AI systems make
                      decisions that affect millions of lives daily.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-destructive font-bold text-lg">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-xl">No Practical Training</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Current AI ethics education is theoretical and lecture-based. Students learn concepts but never
                      practice applying them to real situations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-destructive font-bold text-lg">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-xl">Dangerous Consequences</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      This creates AI systems that may be biased, unfair, or unsafe - affecting real people in hiring,
                      healthcare, criminal justice, and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="font-semibold text-lg mb-2">Hiring Bias</div>
                <div className="text-sm text-muted-foreground">AI screening tools discriminate</div>
              </Card>
              <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20">
                <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
                <div className="font-semibold text-lg mb-2">Facial Recognition</div>
                <div className="text-sm text-muted-foreground">Privacy and accuracy issues</div>
              </Card>
              <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/20">
                <Target className="h-12 w-12 text-secondary mx-auto mb-4" />
                <div className="font-semibold text-lg mb-2">Autonomous Cars</div>
                <div className="text-sm text-muted-foreground">Life-or-death decisions</div>
              </Card>
              <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="font-semibold text-lg mb-2">Health Apps</div>
                <div className="text-sm text-muted-foreground">Medical misinformation</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-balance tracking-tight">
              Our Solution: A Flight Simulator for AI Ethics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Just like pilots train in flight simulators, AI practitioners need a safe space to practice ethical
              decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Card className="p-10 border-2 shadow-xl">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Gamepad2 className="h-12 w-12 text-primary" />
                  <h3 className="text-3xl font-bold">Gamified Learning</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our simulator generates realistic AI ethics scenarios and lets learners make decisions in a risk-free
                  environment. It's engaging, interactive, and builds real-world skills through practice.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
                    <div className="text-3xl font-bold text-primary mb-2">100+</div>
                    <div className="text-sm text-muted-foreground">Scenarios</div>
                  </div>
                  <div className="text-center p-6 bg-accent/5 rounded-2xl border border-accent/10">
                    <div className="text-3xl font-bold text-accent mb-2">Real-time</div>
                    <div className="text-sm text-muted-foreground">Feedback</div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Generate Scenarios",
                  description: "AI creates diverse, realistic ethical dilemmas based on current events and research.",
                  color: "primary",
                },
                {
                  step: "2",
                  title: "Make Decisions",
                  description: "Learners choose from multiple options, each with different ethical implications.",
                  color: "accent",
                },
                {
                  step: "3",
                  title: "See Consequences",
                  description: "Instant feedback shows the real-world impact of decisions with detailed explanations.",
                  color: "secondary",
                },
                {
                  step: "4",
                  title: "Track Progress",
                  description: "Comprehensive analytics help learners understand their ethical reasoning patterns.",
                  color: "primary",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div
                    className={`w-14 h-14 bg-${item.color}/10 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-${item.color}/20`}
                  >
                    <span className={`text-${item.color} font-bold text-lg`}>{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-xl">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ethical AI Simulator Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-balance tracking-tight">Ethical AI Simulator</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Face real-life AI dilemmas, make critical decisions, and immediately see the consequences of your choices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Card className="p-8 border-2 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Interactive Scenarios</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Experience realistic AI ethics dilemmas based on current industry challenges. Each scenario presents
                  multiple decision paths with real-world implications.
                </p>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/simulator">
                    <Play className="mr-2 h-5 w-5" />
                    Start Simulation
                  </Link>
                </Button>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-card border rounded-2xl">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Scenarios Available</div>
                </div>
                <div className="text-center p-6 bg-card border rounded-2xl">
                  <div className="text-3xl font-bold text-accent mb-2">Real-time</div>
                  <div className="text-sm text-muted-foreground">Consequence Feedback</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-l-4 border-l-primary">
                <h4 className="font-semibold mb-2">Example Scenario</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  "Your AI hiring system shows a pattern of rejecting qualified women candidates at a higher rate than
                  men. What's your next action?"
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-left bg-transparent">
                    A) Ignore it - the AI is just finding the best candidates
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-left bg-transparent">
                    B) Immediately audit the training data for bias
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-left bg-transparent">
                    C) Add gender-balancing rules to the algorithm
                  </Button>
                </div>
              </Card>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Each choice leads to different outcomes and learning opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-balance tracking-tight">
              Powerful Features for Effective Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Everything you need to master AI ethics through hands-on practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Diverse Ethical Scenarios",
                description:
                  "From healthcare AI to autonomous vehicles - practice with scenarios across all industries and use cases.",
                color: "primary",
              },
              {
                icon: Award,
                title: "Gamification System",
                description:
                  "Earn points, unlock badges, and compete on leaderboards while mastering ethical decision-making.",
                color: "accent",
              },
              {
                icon: BarChart3,
                title: "Progress Tracking",
                description: "Detailed analytics and reports show your ethical reasoning development over time.",
                color: "secondary",
              },
              {
                icon: MessageSquare,
                title: "Instant Feedback",
                description: "Get immediate, detailed explanations of ethical implications and alternative approaches.",
                color: "primary",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group"
              >
                <div
                  className={`w-20 h-20 bg-${feature.color}/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-10 w-10 text-${feature.color}`} />
                </div>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section
        id="simulator"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-balance tracking-tight">
            Ready to Practice AI Ethics?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 text-pretty leading-relaxed">
            Join thousands of students and professionals who are building ethical AI skills through hands-on practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link href="/simulator">
                <Play className="mr-2 h-5 w-5" />
                Try the Simulator
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-transparent" asChild>
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Free to use • No signup required • Works on all devices</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary-foreground" />
                </div>
                AI Ethics Simulator
              </Link>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Building ethical AI skills through hands-on practice and interactive learning.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <a
                  href="#simulator"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Try Simulator
                </a>
                <Link
                  href="/about"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>Built with ❤️ for the future of ethical AI • © 2024 AI Ethics Simulator Team</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
