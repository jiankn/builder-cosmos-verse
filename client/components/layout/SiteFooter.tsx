export default function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]" />
            <span className="text-base font-extrabold tracking-tight">LumenText</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Write clearly and confidently. Improve tone, fix grammar, and refine your message instantly.
          </p>
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>© {new Date().getFullYear()} LumenText Inc.</p>
          <p>All rights reserved.</p>
        </div>
        <div className="flex gap-4 md:justify-end">
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
          <a href="#tool" className="text-sm text-muted-foreground hover:text-foreground">Try it</a>
        </div>
      </div>
    </footer>
  );
}
