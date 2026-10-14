import Link from "next/link";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-obsidian p-14 lg:flex lg:flex-col lg:justify-end">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Members Only</span>
          <h2 className="mt-4 max-w-md font-serif text-4xl text-silk">
            Join the LUMIÈRE Circle
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            Enjoy faster checkout, live order tracking, exclusive drops and a curated wishlist that
            follows you everywhere.
          </p>
        </div>
      </aside>

      <div className="flex items-center justify-center px-4 py-14 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 block font-serif text-xl font-bold tracking-[0.15em] text-obsidian">
            LUMI<span className="text-gold">È</span>RE
          </Link>
          <h1 className="font-serif text-3xl text-obsidian">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>
        </div>
      </div>
    </div>
  );
}
