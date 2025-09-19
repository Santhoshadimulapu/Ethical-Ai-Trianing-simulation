import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Target, Users, Award, Lightbulb, BookOpen, Zap, Shield, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/50 to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium bg-primary/10 text-primary border-primary/20">
            About Our Mission
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-balance mb-6 tracking-tight">
            Building the Future of <span className="text-primary">AI Ethics Education</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed mb-8">
            We're a passionate team of students who believe that ethical AI education should be practical, engaging, and
            accessible to everyone.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Our Story</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  The Ethical AI Training Simulator was born out of frustration with traditional AI ethics education. As
                  computer science students, we sat through countless lectures about bias, fairness, and transparency,
                  but never got to practice applying these concepts to real situations.
                </p>
                <p>
                  We realized that learning AI ethics is like learning to drive - you can't master it just by reading
                  about it. You need hands-on practice in a safe environment where mistakes become learning
                  opportunities, not real-world consequences.
                </p>
                <p>
                  During our hackathon, we decided to build the tool we wished we had in our classes: an interactive
                  simulator that makes AI ethics education practical, engaging, and memorable.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Student-Led</h3>
                <p className="text-sm text-muted-foreground">
                  Built by students, for students, understanding real learning needs.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">AI Ethics Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated to making AI more ethical through better education.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Hackathon Spirit</h3>
                <p className="text-sm text-muted-foreground">Fast iteration, bold ideas, and practical solutions.</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">Pushing boundaries in educational technology.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Our Mission</h2>
          <p className="text-xl text-muted-foreground mb-12 text-pretty leading-relaxed">
            To democratize AI ethics education by making it practical, engaging, and accessible to everyone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-2 hover:border-primary/20 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-4">Practical Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Move beyond theoretical knowledge to hands-on practice with real-world scenarios.
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-accent/20 transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-xl mb-4">Safe Environment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Practice ethical decision-making without real-world consequences or judgment.
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-secondary/20 transition-all duration-300">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-xl mb-4">Engaging Experience</h3>
              <p className="text-muted-foreground leading-relaxed">
                Gamified learning that keeps students motivated and actively participating.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">What Makes Us Different</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              We're not just another educational platform - we're reimagining how AI ethics should be taught.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Scenario-Based Learning",
                description:
                  "Instead of abstract principles, we present real-world dilemmas that AI practitioners face every day.",
                icon: Target,
              },
              {
                title: "Immediate Feedback",
                description:
                  "Get instant explanations of your decisions' implications, helping you understand the 'why' behind ethical choices.",
                icon: Zap,
              },
              {
                title: "Progress Tracking",
                description:
                  "See how your ethical reasoning develops over time with detailed analytics and personalized insights.",
                icon: Award,
              },
              {
                title: "Diverse Perspectives",
                description:
                  "Scenarios cover multiple industries, cultures, and ethical frameworks to provide comprehensive training.",
                icon: Users,
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6 p-6 rounded-2xl hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Ready to Join Our Mission?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            Whether you're an educator, student, or AI practitioner, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Try the Simulator
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-transparent" asChild>
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
