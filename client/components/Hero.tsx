import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="product"
      className="relative overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] opacity-20 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#6366f1] opacity-20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur">
            ✨ Modern AI writing assistant
          </span>
          <h1 className="mx-auto max-w-3xl text-4xl sm:text-6xl font-extrabold tracking-tight">
            Make every sentence shine
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
            LumenText helps you improve clarity, fix grammar, and set the right tone — instantly.
          </p>
          <div className="mx-auto max-w-2xl rounded-xl border border-border bg-white/70 p-2 shadow-sm backdrop-blur">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                aria-label="Enter a sentence"
                placeholder="Paste a sentence to improve…"
                className="flex-1 rounded-md border border-transparent bg-transparent px-3 py-3 outline-none focus:ring-2 focus:ring-[#8b5cf6]"
              />
              <a
                href="#tool"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Improve text <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">No signup required. Try it below.</p>
        </div>
      </div>
    </section>
  );
}
