import { useMemo, useState } from "react";
import { Sparkles, Wand2, Text as TextIcon, Quote, Eraser } from "lucide-react";

function normalizeSpaces(text: string) {
  return text.replace(/\s+/g, " ").replace(/\s([,.;:!?])/g, "$1").trim();
}

function fixGrammarBasic(text: string) {
  let t = text;
  t = t.replace(/\bi\b/g, "I");
  t = t.replace(/\bim\b/g, "I'm");
  t = t.replace(/\bdoesnt\b/g, "doesn't");
  t = t.replace(/\bdont\b/g, "don't");
  t = t.replace(/\bcant\b/g, "can't");
  t = t.replace(/\bive\b/g, "I've");
  t = t.replace(/\bthier\b/gi, "their");
  t = t.replace(/\bteh\b/gi, "the");
  t = t.replace(/\brecieve\b/gi, "receive");
  t = t.replace(/\balot\b/gi, "a lot");
  t = t.replace(/\b(could|would|should) of\b/gi, "$1 have");
  // Capitalize first letter after period
  t = t.replace(/(^|[.!?]\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
  return normalizeSpaces(t);
}

function improveClarity(text: string) {
  let t = text;
  t = t.replace(/\b(really|very|actually|basically|literally)\b/gi, "");
  t = t.replace(/\b(in order to)\b/gi, "to");
  t = t.replace(/\b(due to the fact that)\b/gi, "because");
  t = t.replace(/\b(at this point in time)\b/gi, "now");
  t = t.replace(/\b(make use of)\b/gi, "use");
  t = t.replace(/\b(the fact that)\b/gi, "that");
  t = t.replace(/\b(there is|there are)\b/gi, "");
  return normalizeSpaces(t);
}

function shorten(text: string) {
  const t = improveClarity(text)
    .replace(/\b(very|really|quite|just|so|some|few|several)\b/gi, "")
    .replace(/\b(that|which)\b/gi, "")
    .replace(/\b(able to)\b/gi, "can")
    .replace(/\b(in order to)\b/gi, "to");
  return normalizeSpaces(t);
}

function expand(text: string) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const elaborations = sentences.map((s) => {
    if (s.length < 4) return s;
    return `${s} This improves clarity for your reader and strengthens your message.`;
  });
  return normalizeSpaces(elaborations.join(" "));
}

function setTone(text: string, tone: "formal" | "friendly") {
  let t = text;
  if (tone === "formal") {
    t = t
      .replace(/\b(can't)\b/gi, "cannot")
      .replace(/\bdon't\b/gi, "do not")
      .replace(/\byeah\b/gi, "yes")
      .replace(/\bokay\b/gi, "acceptable");
  } else {
    t = t
      .replace(/\b(therefore|however|moreover|consequently)\b/gi, "")
      .replace(/\b(assistance)\b/gi, "help")
      .replace(/\b(utilize)\b/gi, "use");
  }
  return normalizeSpaces(t);
}

export default function ToolInterface() {
  const [input, setInput] = useState(
    "I really just want to make sure this sentence is very clear and easy to read."
  );
  const [output, setOutput] = useState("");
  const [tone, setToneState] = useState<"neutral" | "formal" | "friendly">(
    "neutral"
  );

  const charCount = input.length;
  const wordCount = useMemo(() => (input.trim() ? input.trim().split(/\s+/).length : 0), [input]);

  const run = (fn: (t: string) => string) => {
    const result = fn(input);
    setOutput(result);
  };

  const clear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <section id="tool" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground">Your text</h3>
              <div className="text-xs text-muted-foreground">{wordCount} words • {charCount} chars</div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              className="mt-3 w-full resize-y rounded-lg border border-border bg-background/60 p-3 outline-none focus:ring-2 focus:ring-[#8b5cf6]"
              placeholder="Paste or write your text here…"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => run((t) => setTone(fixGrammarBasic(improveClarity(t)), tone === "neutral" ? "friendly" : (tone as any)))}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm hover:bg-muted"
              >
                <Wand2 className="h-4 w-4 text-[#8b5cf6]" /> Fix grammar
              </button>
              <button
                onClick={() => run(improveClarity)}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm hover:bg-muted"
              >
                <Sparkles className="h-4 w-4 text-[#6366f1]" /> Improve clarity
              </button>
              <button
                onClick={() => run(shorten)}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm hover:bg-muted"
              >
                <TextIcon className="h-4 w-4 text-[#6366f1]" /> Shorten
              </button>
              <button
                onClick={() => run(expand)}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm hover:bg-muted"
              >
                <Quote className="h-4 w-4 text-[#8b5cf6]" /> Expand
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Tone:</span>
              <div className="inline-flex overflow-hidden rounded-md border border-border">
                {(["neutral", "friendly", "formal"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setToneState(t)}
                    className={`px-3 py-1.5 ${
                      tone === t ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white" : "bg-background"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <button
                onClick={clear}
                className="ml-auto inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
              >
                <Eraser className="h-4 w-4" /> Clear
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground">Improved text</h3>
            </div>
            <div className="mt-3 min-h-[10rem] rounded-lg border border-dashed border-border bg-background/60 p-4">
              {output ? (
                <p className="whitespace-pre-wrap leading-relaxed">{setTone(output, tone === "neutral" ? "friendly" : tone)}</p>
              ) : (
                <p className="text-muted-foreground">Run an improvement to see results here.</p>
              )}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Client-side demo only. No data leaves your browser.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
