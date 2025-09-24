import { BarChart2, Palette, Activity } from "lucide-react";

const features = [
  {
    icon: BarChart2,
    title: "Advanced Analysis",
    desc: "Deep linguistic analysis that surfaces readability, redundancy, and clarity issues so you can improve precisely.",
  },
  {
    icon: Palette,
    title: "Multiple Styles",
    desc: "Switch between formal, friendly, concise, or expanded styles to match your audience and purpose.",
  },
  {
    icon: Activity,
    title: "Quality Metrics",
    desc: "Track improvements with automated quality scores, change history, and actionable suggestions.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything you need to write well
          </h2>
          <p className="mt-3 text-muted-foreground">
            Designed for clarity, built for speed, and ready for production.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-2 hover:shadow-lg hover:border-transparent"
              aria-hidden={false}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-md transition-opacity group-hover:opacity-95">
                  <f.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
