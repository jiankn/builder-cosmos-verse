import { ShieldCheck, Bot, CheckCircle2, Sparkles, Languages, Wand2 } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Smart rewrites",
    desc: "Fix grammar and clarity with intelligent suggestions.",
  },
  {
    icon: Sparkles,
    title: "Tone control",
    desc: "Switch between friendly, neutral, and formal instantly.",
  },
  {
    icon: Languages,
    title: "Multilingual",
    desc: "Great results for English and many other languages.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "Your text stays on-device in this demo. No servers.",
  },
  {
    icon: Bot,
    title: "AI powered",
    desc: "Built to plug into your preferred AI provider.",
  },
  {
    icon: CheckCircle2,
    title: "Fast workflow",
    desc: "Keyboard-first actions and clean UI for speed.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Everything you need to write well</h2>
          <p className="mt-3 text-muted-foreground">Designed for clarity, built for speed, and ready for production.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white inline-flex items-center justify-center">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
