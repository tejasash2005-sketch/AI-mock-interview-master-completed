import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain, Mic, BarChart3, Video, Sparkles, Target, Clock, Shield,
  ArrowRight, Check, Star, Menu, Zap, Users
} from "lucide-react";
import Link from "next/link";

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Brain className="size-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white">MockMind<span className="text-gradient">.ai</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how" className="hover:text-white transition">How it works</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#testimonials" className="hover:text-white transition">Reviews</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white hover:bg-white/10">Sign in</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90 shadow-glow border-none">
              Start Free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-gray-400 mb-6">
            <Sparkles className="size-3.5 text-purple-400" />
            Powered by next-gen interview intelligence
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
            Ace every interview with your <span className="text-gradient">AI coach</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-xl">
            Practice unlimited mock interviews with a hyper-realistic AI interviewer.
            Get instant feedback on your tone, body language, and answers — and walk into
            the real thing fully prepared.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90 shadow-glow h-12 px-6 border-none">
                Start Free Interview <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-6 border-gray-700 bg-gray-800/40 text-white hover:bg-gray-800">
              Watch Demo
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-gray-400">
            <div className="flex -space-x-2">
              <img src="/testimonial-1.jpg" alt="" width={32} height={32} className="size-8 rounded-full border-2 border-[#0a0a0a] object-cover" />
              <img src="/testimonial-2.jpg" alt="" width={32} height={32} className="size-8 rounded-full border-2 border-[#0a0a0a] object-cover" />
              <div className="size-8 rounded-full border-2 border-[#0a0a0a] bg-gradient-primary grid place-items-center text-xs text-white font-bold">+</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-purple-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
              </div>
              <p className="text-xs">Trusted by 50,000+ candidates</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-8 bg-purple-600 opacity-20 blur-3xl rounded-full" />
          <div className="relative rounded-2xl overflow-hidden shadow-elegant border border-gray-800 animate-float">
            <img src="/hero-interview.jpg" alt="AI mock interview session" width={1536} height={1024} className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-card hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-gradient-primary grid place-items-center animate-pulse-glow">
                <Zap className="size-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Confidence Score</p>
                <p className="font-bold text-xl text-white">94%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const logos = ["Google", "Meta", "Amazon", "Stripe", "Netflix", "Microsoft"];
  return (
    <section className="py-12 border-y border-gray-800 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-8">
          Our users have landed roles at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-60">
          {logos.map((l) => (
            <span key={l} className="text-xl md:text-2xl font-semibold text-white">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Video, title: "Realtime Video Analysis", desc: "AI tracks your eye contact, posture, and facial expressions to coach you like a real interviewer.", img: "/feature-video.jpg" },
    { icon: Mic, title: "Voice & Tone Intelligence", desc: "Detects filler words, pace, and confidence in your voice. Get clarity on how you really sound.", img: "/feature-voice.jpg" },
    { icon: BarChart3, title: "Deep Performance Analytics", desc: "Track progress across hundreds of metrics. See exactly where you improved and what to fix.", img: "/feature-analytics.jpg" },
  ];
  return (
    <section id="features" className="py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm text-purple-400 font-medium mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">An interview lab in your pocket</h2>
          <p className="mt-4 text-gray-400">Everything you need to prepare for behavioral, technical, and case interviews — all powered by frontier AI.</p>
        </div>
        <div className="space-y-8">
          {features.map((f, i) => (
            <Card key={f.title} className="overflow-hidden border-gray-800 bg-gray-900/60 backdrop-blur-sm">
              <div className={`grid lg:grid-cols-2 gap-0 items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div className="p-10 lg:p-14">
                  <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow mb-6">
                    <f.icon className="size-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">{f.title}</h3>
                  <p className="text-gray-400 text-lg">{f.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {["Instant scoring", "Actionable feedback", "Industry-specific questions"].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="size-4 text-purple-400" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-full min-h-[320px]">
                  <img src={f.img} alt={f.title} loading="lazy" width={1280} height={896} className="w-full h-full object-cover" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Target, title: "Choose your role", desc: "Pick from 500+ roles — from FAANG SWE to product manager to medical residency." },
    { icon: Brain, title: "Talk to the AI", desc: "Live conversation with a realistic AI interviewer that adapts to your answers in real time." },
    { icon: BarChart3, title: "Get your report", desc: "Receive a deep, frame-by-frame breakdown with scores and concrete next steps." },
  ];
  return (
    <section id="how" className="py-24 relative bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm text-purple-400 font-medium mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">From nervous to ready in minutes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Card key={s.title} className="p-8 bg-gray-900/60 border-gray-800 relative overflow-hidden group hover:border-purple-500/50 transition">
              <div className="absolute top-4 right-6 text-7xl font-bold text-purple-500/10 group-hover:text-purple-500/20 transition">
                0{i + 1}
              </div>
              <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow mb-6">
                <s.icon className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "50K+", l: "Interviews delivered" },
    { v: "94%", l: "Report better confidence" },
    { v: "3.2x", l: "Higher offer rate" },
    { v: "500+", l: "Role templates" },
  ];
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl glass p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-gradient">{s.v}</p>
              <p className="mt-2 text-sm text-gray-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Sarah Chen", role: "Product Manager @ Stripe", img: "/testimonial-1.jpg", quote: "I bombed three interviews before MockMind. After two weeks of practice I had offers from Stripe and Airbnb. The voice feedback alone was worth it." },
    { name: "Daniel Park", role: "Software Engineer @ Google", img: "/testimonial-2.jpg", quote: "It feels eerily like a real interview. The AI followed up on my answers in ways no other tool does. Got the offer on my first onsite." },
  ];
  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm text-purple-400 font-medium mb-3">Loved by candidates</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Stories from the offer letter pile</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t) => (
            <Card key={t.name} className="p-8 bg-gray-900/60 border-gray-800">
              <div className="flex items-center gap-1 text-purple-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <p className="text-lg leading-relaxed text-gray-300">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={t.img} alt={t.name} loading="lazy" width={48} height={48} className="size-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Starter", price: "0", desc: "Try it out", features: ["3 interviews / month", "Basic feedback", "Standard question bank"] },
    { name: "Pro", price: "29", desc: "Most popular", featured: true, features: ["Unlimited interviews", "Video & voice analysis", "All 500+ role templates", "Detailed performance reports"] },
    { name: "Teams", price: "99", desc: "For coaches & schools", features: ["Everything in Pro", "Team dashboard", "Custom question banks", "Priority support"] },
  ];
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm text-purple-400 font-medium mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Less than one coffee a week</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <Card key={p.name} className={`p-8 border-gray-800 relative ${p.featured ? "bg-gradient-primary text-white shadow-elegant scale-[1.02] border-none" : "bg-gray-900/60"}`}>
              {p.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0a0a0a] text-xs font-medium border border-gray-800 text-white">Most Popular</div>}
              <p className={`text-sm font-medium ${p.featured ? "opacity-80" : "text-gray-400"}`}>{p.name}</p>
              <p className="mt-4 text-5xl font-bold text-white">${p.price}<span className="text-base font-normal opacity-70">/mo</span></p>
              <p className={`mt-2 text-sm ${p.featured ? "opacity-80" : "text-gray-400"}`}>{p.desc}</p>
              <Link href="/dashboard" className="w-full block">
                <Button className={`mt-6 w-full ${p.featured ? "bg-white text-black hover:bg-white/90" : "bg-gradient-primary text-white border-none"}`}>Get started</Button>
              </Link>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300"><Check className="size-4" /> {f}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl bg-gradient-primary p-12 md:p-20 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Your next interview is the one</h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">Join 50,000+ candidates training with MockMind. Free to start, no credit card required.</p>
            <Link href="/dashboard">
              <Button size="lg" className="mt-8 h-12 px-8 bg-white text-black hover:bg-white/90">
                Start Your Free Interview <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-gradient-primary grid place-items-center">
            <Brain className="size-3.5 text-white" />
          </div>
          <span className="font-semibold text-white">MockMind.ai</span>
        </div>
        <p>© 2026 MockMind AI. Crafted for the next great hire.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
