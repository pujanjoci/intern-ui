"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/",          label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/data",      label: "Data" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-[--background]">

      {/* ── Top nav bar ── */}
      <header className="sticky top-0 z-30 border-b border-[--border] bg-white/90 backdrop-blur">
        <div className="w-full max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded bg-[--accent] flex items-center justify-center text-white text-xs font-bold select-none">
              I
            </span>
            <span className="text-sm font-semibold text-[--text-primary]">Intern-UI</span>
            <span className="text-xs text-[--text-secondary] border border-[--border] rounded px-1.5 py-0.5 font-medium">
              Portal
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    active
                      ? "text-[--accent] bg-[--accent-light]"
                      : "text-[--text-secondary] hover:text-[--text-primary] hover:bg-gray-100"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ── Main content — centered, full width ── */}
      <main className="flex-1 w-full">
        <div className="w-full max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[--border] bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-xs text-[--text-secondary]">Intern-UI (Portal)</span>
          <span className="text-xs text-[--text-secondary]">REST Countries API</span>
        </div>
      </footer>
    </div>
  );
}