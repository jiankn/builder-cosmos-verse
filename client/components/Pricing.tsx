export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Simple pricing</h2>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade when you need more power.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="mt-1 text-sm text-muted-foreground">Great for casual writing and quick fixes.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold">$0</span>
              <span className="text-sm text-muted-foreground">/ forever</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              <li>• Grammar and clarity tools</li>
              <li>• Tone adjustments</li>
              <li>• Local processing</li>
            </ul>
            <a href="#tool" className="mt-6 inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">Try free</a>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-[1px] shadow-sm">
            <div className="rounded-2xl bg-card p-6">
              <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-3 py-1 text-xs font-semibold text-white">Best value</div>
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="mt-1 text-sm text-muted-foreground">For professionals who write every day.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$12</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                <li>• Advanced rewrite styles</li>
                <li>• Team collaboration</li>
                <li>• API and integrations</li>
                <li>• Priority support</li>
              </ul>
              <a href="#tool" className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 text-sm font-semibold text-white hover:opacity-95">Get started</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
