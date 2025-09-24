import { useState } from "react";
import { Check, Mail, Star } from "lucide-react";

const plans = [
  {
    key: "free",
    name: "Free",
    desc: "Great for casual writing and quick fixes.",
    monthly: 0,
    annual: 0,
    features: [true, true, true, false, false],
  },
  {
    key: "pro",
    name: "Pro",
    desc: "For professionals who write every day.",
    monthly: 12,
    annual: 96, // $8/mo billed annually
    features: [true, true, true, true, true],
    recommended: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    desc: "Custom plans, dedicated support, and SSO.",
    monthly: null,
    annual: null,
    features: [true, true, true, true, true],
  },
];

const featureLabels = [
  "Grammar & clarity",
  "Tone & style controls",
  "Local & secure processing",
  "API & integrations",
  "Priority support",
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Simple pricing</h2>
          <p className="mt-3 text-muted-foreground">
            Start free. Upgrade when you need more power.
          </p>

          <div className="mt-6 inline-flex items-center space-x-1 rounded-full bg-muted/10 p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 text-sm rounded-full font-medium transition ${billing === "monthly" ? "bg-white shadow" : "text-muted-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-4 py-2 text-sm rounded-full font-medium transition ${billing === "annual" ? "bg-white shadow" : "text-muted-foreground"}`}
            >
              Annual (save 30%)
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => {
            const price = billing === "monthly" ? p.monthly : p.annual;
            const isEnterprise = p.key === "enterprise";

            return (
              <div
                key={p.key}
                className={`relative rounded-2xl border p-6 shadow-sm transition-transform hover:-translate-y-2 ${p.recommended ? "bg-brand-gradient/10 border-transparent" : "bg-card border-border"}`}
              >
                {p.recommended && (
                  <div className="absolute -top-3 right-3 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white shadow">
                    Recommended
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    {isEnterprise ? (
                      <div className="text-sm text-muted-foreground">
                        Contact us
                      </div>
                    ) : (
                      <div>
                        <div className="text-3xl font-extrabold">
                          {price === 0 ? "$0" : `$${price}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {price === 0
                            ? "/ forever"
                            : billing === "monthly"
                              ? "/ month"
                              : "/ year"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm">
                  {featureLabels.map((f, i) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md ${p.features[i] ? "bg-brand-gradient text-white" : "bg-muted text-muted-foreground"}`}
                      >
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {isEnterprise ? (
                    <a
                      href="#contact"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold hover:bg-muted"
                    >
                      <Mail className="h-4 w-4" /> Contact sales
                    </a>
                  ) : (
                    <a
                      href="#signup"
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold text-white ${p.recommended ? "bg-brand-gradient shadow-lg" : "bg-background border border-border text-foreground"}`}
                    >
                      {p.recommended ? "Get Pro" : "Get started"}
                    </a>
                  )}
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  No credit card required to start.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
