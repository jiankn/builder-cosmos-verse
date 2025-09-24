import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const headingClasses = `mx-auto text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight transition-all duration-500 ${
    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
  }`;

  return (
    <section
      id="product"
      aria-label="Hero"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h1 className={headingClasses}>Transform Your Writing with Advanced AI</h1>

          <p className="mt-4 text-base sm:text-lg text-gray-200 mx-auto max-w-2xl">
            Improve clarity, correct grammar, and refine your tone instantly with smart, context-aware suggestions.
          </p>

          <div className="mt-8">
            <label htmlFor="hero-text" className="sr-only">
              Enter your text
            </label>
            <textarea
              id="hero-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your paragraph here…"
              rows={6}
              className="w-full rounded-2xl bg-white p-5 text-gray-900 placeholder-gray-400 shadow-sm border border-transparent focus:outline-none transition focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/40"
            />

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="btn-primary">
                Improve Text Quality
                <ArrowRight className="ml-2 h-4 w-4 text-white" />
              </button>

              <button className="btn-secondary" aria-label="Check Writing Style">
                Check Writing Style
              </button>
            </div>

            <div className="mt-4 text-sm text-white/80">350k+ writers worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
}
