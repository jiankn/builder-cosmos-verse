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
    <header className={`sticky top-0 z-40 w-full bg-white ${scrolled ? "shadow-sm" : "shadow-sm"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-[#1f2937]" />
              <span className="text-lg font-extrabold tracking-tight" style={{ color: "#1f2937" }}>
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
                className="text-sm"
                style={{ color: "#6b7280" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex justify-end items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <a href="#login" className="btn-secondary text-sm">Login</a>
              <a href="#try" className="btn-primary text-sm">Try Free</a>
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
          <div className="w-full border-t border-border bg-white py-3">
            <div className="mx-auto max-w-7xl px-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-2"
                  style={{ color: "#1f2937" }}
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-2 flex gap-2">
                <a
                  href="#login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-md px-4 py-2 text-center text-sm font-medium"
                  style={{ color: "#8b5cf6", border: "1.5px solid #8b5cf6" }}
                >
                  Login
                </a>
                <a
                  href="#try"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-md px-4 py-2 text-center text-sm font-semibold text-white"
                  style={{ backgroundColor: "#8b5cf6" }}
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
