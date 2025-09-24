import { useMemo, useState, useCallback } from "react";
import {
  Sparkles,
  Wand2,
  Text as TextIcon,
  Quote,
  Eraser,
  FileText,
  Download,
  Copy,
} from "lucide-react";

function normalizeSpaces(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s([,.;:!?])/g, "$1")
    .trim();
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

// Simple LCS-based word diff to produce ops for original and improved
function wordDiff(a: string, b: string) {
  const A = a.trim() ? a.split(/\s+/) : [];
  const B = b.trim() ? b.split(/\s+/) : [];
  const n = A.length;
  const m = B.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(0),
  );
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (A[i] === B[j]) dp[i][j] = dp[i + 1][j + 1] + 1;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const opsA: { type: "equal" | "delete"; text: string }[] = [];
  const opsB: { type: "equal" | "insert"; text: string }[] = [];
  let i = 0,
    j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && A[i] === B[j]) {
      opsA.push({ type: "equal", text: A[i] });
      opsB.push({ type: "equal", text: B[j] });
      i++;
      j++;
    } else if (j < m && (i === n || dp[i][j + 1] >= dp[i + 1][j])) {
      opsB.push({ type: "insert", text: B[j] });
      j++;
    } else if (i < n) {
      opsA.push({ type: "delete", text: A[i] });
      i++;
    } else {
      break;
    }
  }

  return { opsA, opsB };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

export default function ToolInterface() {
  const [original, setOriginal] = useState(
    "I really just want to make sure this sentence is very clear and easy to read.",
  );
  const [improved, setImproved] = useState("");
  const [style, setStyle] = useState<
    "grammar" | "formal" | "friendly" | "shorten" | "expand"
  >("grammar");

  const wordCount = useMemo(
    () => (original.trim() ? original.trim().split(/\s+/).length : 0),
    [original],
  );
  const charCount = original.length;
  const progress = Math.min(100, Math.round((wordCount / 500) * 100));

  const applyStyle = useCallback(() => {
    let out = original;
    if (style === "grammar")
      out = setTone(fixGrammarBasic(improveClarity(out)), "friendly");
    else if (style === "formal") out = setTone(fixGrammarBasic(out), "formal");
    else if (style === "friendly")
      out = setTone(fixGrammarBasic(out), "friendly");
    else if (style === "shorten") out = shorten(out);
    else if (style === "expand") out = expand(out);
    setImproved(out);
  }, [original, style]);

  const { opsA, opsB } = useMemo(
    () => wordDiff(original, improved),
    [original, improved],
  );

  const originalHtml = useMemo(() => {
    if (!original) return "";
    return opsA
      .map((op) => {
        if (op.type === "equal") return `<span>${escapeHtml(op.text)}</span>`;
        return `<span class=\"line-through text-red-600 bg-red-50 px-1 rounded-sm\">${escapeHtml(op.text)}</span>`;
      })
      .join(" ");
  }, [opsA, original]);

  const improvedHtml = useMemo(() => {
    if (!improved) return "";
    return opsB
      .map((op) => {
        if (op.type === "equal") return `<span>${escapeHtml(op.text)}</span>`;
        return `<span class=\"bg-green-100 text-green-800 px-1 rounded-sm\">${escapeHtml(op.text)}</span>`;
      })
      .join(" ");
  }, [opsB, improved]);

  const copyImproved = async () => {
    try {
      await navigator.clipboard.writeText(improved || "");
      alert("Copied to clipboard");
    } catch (e) {
      console.error(e);
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([improved || ""], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "improved.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const clear = () => {
    setOriginal("");
    setImproved("");
  };

  return (
    <section id="tool" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex-1 rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Original
              </h3>
              <div className="text-xs text-muted-foreground">
                {wordCount} words • {charCount} chars
              </div>
            </div>
            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              rows={18}
              className="mt-3 w-full resize-y rounded-lg border border-border bg-background/60 p-4 outline-none focus:ring-2 focus:ring-[#8b5cf6]"
              placeholder="Paste or write your text here…"
            />
            <div className="mt-3 flex items-center gap-3">
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as any)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="grammar">Grammar & clarity</option>
                <option value="formal">Formal tone</option>
                <option value="friendly">Friendly tone</option>
                <option value="shorten">Shorten</option>
                <option value="expand">Expand</option>
              </select>

              <button
                onClick={applyStyle}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-semibold text-white"
              >
                Apply
              </button>

              <button
                onClick={clear}
                className="ml-auto inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"
              >
                <Eraser className="h-4 w-4" /> Clear
              </button>
            </div>

            <div className="mt-4">
              <div className="h-2 w-full rounded-full bg-muted/30">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Target: 500 words • Progress: {progress}%
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Improved
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyImproved}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <Copy className="h-4 w-4" /> Copy
                </button>
                <button
                  onClick={downloadTxt}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            </div>

            <div className="mt-3 min-h-[18rem] rounded-lg border border-dashed border-border bg-background/60 p-4">
              {improved ? (
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: improvedHtml }} />
                </div>
              ) : (
                <div className="text-muted-foreground">
                  Run an improvement to see results here.
                </div>
              )}
            </div>

            <div className="mt-3">
              <div className="text-xs text-muted-foreground">
                Changes highlighted: deletions (left) and insertions (right).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
