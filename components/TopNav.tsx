import Link from "next/link";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-cyan-300">
          Pulse Studio
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-300">
          <Link href="/" className="rounded-full px-4 py-2 transition hover:bg-slate-800/90 hover:text-white">
            Home
          </Link>
          <Link href="/data" className="rounded-full bg-cyan-500 px-4 py-2 text-slate-950 transition hover:bg-cyan-400">
            Live Data
          </Link>
        </nav>
      </div>
    </header>
  );
}
