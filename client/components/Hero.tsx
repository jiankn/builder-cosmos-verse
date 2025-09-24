import { useEffect, useState } from "react";
import { ArrowRight, Users } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="product" className="relative overflow-hidden py-20 sm:py-28" aria-label="Hero">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] opacity-20 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#6366f1] opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur transition-opacity duration-600 ${mounted ? "opacity-100" : "opacity-0 translate-y-2"}`}>
            ✨ Modern AI writing assistant
          </div>

          <h1 className={`mx-auto text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Transform Your Writing with Advanced AI
          </h1>

          <p className={`mt-4 text-base sm:text-lg text-muted-foreground transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
            Improve clarity, fix grammar, and refine tone in seconds — powered by smart suggestions and clear explanations.
          </p>

          {/* Large text area */}
          <div className={`mt-8 rounded-2xl border border-border bg-white/60 p-2 shadow-sm backdrop-blur transition-transform duration-500 ${mounted ? "scale-100" : "scale-98 opacity-80"}`}>
            <label htmlFor="hero-text" className="sr-only">Enter your text</label>
            <textarea
              id="hero-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste a paragraph (500+ characters recommended) to improve."
              rows={8}
              maxLength={20000}
              className="w-full resize-y rounded-lg border border-transparent bg-background/0 p-4 text-base outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-[#8b5cf6]"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row items-center justify-between">
              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-5 py-3 text-sm font-semibold text-white shadow-lg transform active:scale-95 transition-transform">
                  Improve text <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <button className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted transition">
                  Get Pro
                </button>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Users className="h-5 w-5 text-[#6366f1]" />
                <div className="leading-4">
                  <div className="text-foreground font-semibold">350k+ users</div>
                  <div className="text-xs">Trusted by teams worldwide</div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">We respect your privacy — this demo runs locally in your browser.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
