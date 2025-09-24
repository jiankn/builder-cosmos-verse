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
    <section id="features" className="py-16 sm:py-24 bg-[#f9fafb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2937]">Everything you need to write well</h2>
          <p className="mt-3 text-[#6b7280]">Designed for clarity, built for speed, and ready for production.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-3 hover:shadow-[0_10px_30px_rgba(139,92,246,0.12)] hover:border-[#8b5cf6]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#8b5cf6] border border-transparent group-hover:border-[#8b5cf6] transition">
                  <f.icon className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#1f2937]">{f.title}</h3>
                  <p className="mt-2 text-sm text-[#6b7280]">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
