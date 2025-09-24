import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setEmail("");
    // In production, wire this to your newsletter provider
  };

  return (
    <footer className="bg-[#1f2937] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-white/5 flex items-center justify-center text-[#8b5cf6]">LT</div>
              <div>
                <div className="font-extrabold text-white">LumenText</div>
                <div className="text-sm text-white/80">Write clearly. Ship confidently.</div>
              </div>
            </div>
            <p className="text-sm text-white/70 max-w-xs">
              Improve clarity, tone, and grammar with intelligent suggestions — trusted by writers worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-[#8b5cf6] hover:opacity-90" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#8b5cf6] hover:opacity-90" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#8b5cf6] hover:opacity-90" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#product" className="text-white/80 hover:text-[#8b5cf6]">Features</a>
              </li>
              <li>
                <a href="#pricing" className="text-white/80 hover:text-[#8b5cf6]">Pricing</a>
              </li>
              <li>
                <a href="#api" className="text-white/80 hover:text-[#8b5cf6]">API</a>
              </li>
              <li>
                <a href="#blog" className="text-white/80 hover:text-[#8b5cf6]">Blog</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#docs" className="text-white/80 hover:text-[#8b5cf6]">Docs</a>
              </li>
              <li>
                <a href="#support" className="text-white/80 hover:text-[#8b5cf6]">Support</a>
              </li>
              <li>
                <a href="#guides" className="text-white/80 hover:text-[#8b5cf6]">Guides</a>
              </li>
              <li>
                <a href="#status" className="text-white/80 hover:text-[#8b5cf6]">Status</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <div className="mt-4 text-sm text-white/80 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-white/80" />
                <a href="mailto:hello@lumentext.com" className="hover:text-[#8b5cf6]">hello@lumentext.com</a>
              </div>
              <div>123 Startup Ave, Suite 100</div>
              <div>San Francisco, CA</div>
            </div>

            <form onSubmit={submit} className="mt-6 flex gap-2">
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <input
                id="newsletter"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/40"
              />
              <button type="submit" className="btn-primary">
                {submitted ? "Thanks!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/70">
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-[#8b5cf6]">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#8b5cf6]">Terms</a>
          </div>

          <div className="mt-3 md:mt-0">© {new Date().getFullYear()} LumenText Inc. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
