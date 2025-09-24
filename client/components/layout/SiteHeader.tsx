import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "API", href: "#api" },
  { label: "Blog", href: "#blog" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors ${
        scrolled ? "backdrop-blur bg-white/60 border-b border-border/70 shadow-sm" : "backdrop-blur bg-white/40"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shadow-md" />
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                LumenText
              </span>
            </a>
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex justify-center items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex justify-end items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <a href="#login" className="text-sm text-muted-foreground hover:text-foreground">
                Login
              </a>
              <a
                href="#try"
                className="inline-flex items-center rounded-md bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Try Free
              </a>
            </div>

            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white/30 backdrop-blur"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden">
          <div className="w-full border-t border-border bg-white/60 backdrop-blur py-3">
            <div className="mx-auto max-w-7xl px-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-foreground/80"
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-2 flex gap-2">
                <a
                  href="#login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-md px-4 py-2 text-center text-sm font-medium text-muted-foreground border border-border bg-background/50"
                >
                  Login
                </a>
                <a
                  href="#try"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-md bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Try Free
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
