import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Github, Twitter, MessageSquare, Users, Lightbulb, ArrowRight, Send } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/50 to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium bg-primary/10 text-primary border-primary/20">
            Get in Touch
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-balance mb-6 tracking-tight">
            Let's Build the Future of <span className="text-primary">AI Ethics</span> Together
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed mb-8">
            Have questions, feedback, or want to collaborate? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 tracking-tight">Send us a Message</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <Card className="p-8 border-2">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="I'd like to collaborate on..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your interest in AI ethics education..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button size="lg" className="w-full text-lg py-6">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6 tracking-tight">Other Ways to Connect</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Prefer a different way to get in touch? Here are some alternatives.
              </p>

              <div className="space-y-6">
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                      <p className="text-muted-foreground mb-3">For general inquiries, partnerships, or feedback.</p>
                      <Button variant="outline" size="sm">
                        team@aiethicssim.com
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Github className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">GitHub</h3>
                      <p className="text-muted-foreground mb-3">Check out our code, report issues, or contribute.</p>
                      <Button variant="outline" size="sm">
                        View Repository
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Twitter className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Social Media</h3>
                      <p className="text-muted-foreground mb-3">Follow us for updates and AI ethics discussions.</p>
                      <Button variant="outline" size="sm">
                        Follow Updates
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-muted/50 rounded-2xl">
                  <div className="text-3xl font-bold text-primary mb-2">24h</div>
                  <div className="text-sm text-muted-foreground">Average Response Time</div>
                </div>
                <div className="text-center p-6 bg-muted/50 rounded-2xl">
                  <div className="text-3xl font-bold text-accent mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Response Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Quick answers to common questions about our AI Ethics Simulator.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Is the simulator free to use?",
                answer:
                  "Yes! Our simulator is completely free to use. We believe ethical AI education should be accessible to everyone.",
                icon: Users,
              },
              {
                question: "Can educators use this in their classrooms?",
                answer:
                  "We designed the simulator with educators in mind. Contact us for bulk access and teaching resources.",
                icon: Lightbulb,
              },
              {
                question: "How can I contribute to the project?",
                answer:
                  "We welcome contributions! Check out our GitHub repository or reach out to discuss collaboration opportunities.",
                icon: MessageSquare,
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6 border-2 hover:border-primary/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <faq.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            Don't wait - start practicing AI ethics today with our interactive simulator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Try the Simulator
            </Button>
            {/* About page link removed */}
          </div>
        </div>
      </section>
    </div>
  )
}
