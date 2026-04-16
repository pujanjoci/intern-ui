"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ─── tiny icon components (inline SVG so no extra deps) ─── */
function IconGlobe() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
function IconDatabase() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    </svg>
  );
}
function IconBarChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

/* ─── spec card data ─── */
const SPEC_PAGES = [
  {
    num: "01",
    title: "Introduction Page",
    items: [
      "Landing/hero section with smooth animations (scroll, hover, transitions).",
      "Modern UI with a clear call-to-action (e.g., Explore, View Data).",
    ],
    icon: <IconGlobe />,
    href: "/",
  },
  {
    num: "02",
    title: "Dynamic Data Page",
    items: [
      "Fetch and display data from a public API.",
      "Include loading state, error handling, and creative UI (cards/tables).",
    ],
    icon: <IconDatabase />,
    href: "/data",
  },
];

const FEATURE_PILLS = [
  { icon: <IconGlobe />,     label: "Live REST API" },
  { icon: <IconDatabase />,  label: "Real-time data" },
  { icon: <IconBarChart />,  label: "Metrics & stats" },
];

/* ─── animated counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [to]);
  return <>{val.toLocaleString()}{suffix}</>;
}

export default function IntroPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[--background] flex flex-col">

      {/* ── Top nav (matches portal sidebar header style) ── */}
      <header
        className={`sticky top-0 z-30 border-b border-[--border] bg-white/90 backdrop-blur transition-shadow duration-200 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded bg-[--accent] flex items-center justify-center text-white text-xs font-bold select-none">
              I
            </span>
            <span className="text-sm font-semibold text-[--text-primary]">Intern-UI</span>
            <span className="text-xs text-[--text-secondary] border border-[--border] rounded px-1.5 py-0.5 font-medium">Portal</span>
          </div>
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-1.5 text-xs font-medium text-[--accent] bg-[--accent-light] rounded-md"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-xs font-medium text-[--text-secondary] hover:text-[--text-primary] hover:bg-gray-100 rounded-md transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/data"
              className="px-3 py-1.5 text-xs font-medium text-[--text-secondary] hover:text-[--text-primary] hover:bg-gray-100 rounded-md transition-colors"
            >
              Data
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero section ── */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 animate-fade-in">

          {/* pill badge */}
          <div className="mb-5 flex">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[--border] bg-white text-xs text-[--text-secondary] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live data · REST Countries API
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[--text-primary] leading-tight tracking-tight max-w-xl">
            Intern-UI&nbsp;
            <span className="text-[--accent]">(Portal)</span>
          </h1>

          <p className="mt-3 text-sm text-[--text-secondary] max-w-lg leading-relaxed">
            A structured portal for exploring live country data — built with smooth
            animations, real-time API fetching, and a clean dashboard interface.
          </p>

          {/* feature pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {FEATURE_PILLS.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[--border] bg-white text-xs text-[--text-secondary]"
              >
                <span className="text-[--accent]">{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[--border] bg-white text-sm font-medium text-[--text-primary] hover:bg-gray-50 transition-colors hover:text-[--accent] hover:border-[--accent] hover:shadow-sm hover:cursor-pointer hover:scale-105 hover:duration-200 hover:ease-in-out hover:shadow-lg hover:shadow-accent/20 hover:shadow-md hover:shadow-accent/20 hover:shadow-xl hover:shadow-accent/20 hover:shadow-2xl hover:shadow-accent/20 hover:shadow-3xl hover:shadow-accent/20 hover:shadow-4xl hover:shadow-accent/20 hover:shadow-5xl hover:shadow-accent/20 hover:shadow-6xl hover:shadow-accent/20 hover:shadow-7xl hover:shadow-accent/20 hover:shadow-8xl hover:shadow-accent/20 hover:shadow-9xl hover:shadow-accent/20"
            >
              Explore Dashboard
              <IconArrow />
            </Link>
            <Link
              href="/data"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[--border] bg-white text-sm font-medium text-[--text-primary] hover:bg-gray-50 transition-colors hover:text-[--accent] hover:border-[--accent] hover:shadow-sm hover:cursor-pointer hover:scale-105 hover:duration-200 hover:ease-in-out hover:shadow-lg hover:shadow-accent/20 hover:shadow-md hover:shadow-accent/20 hover:shadow-xl hover:shadow-accent/20 hover:shadow-2xl hover:shadow-accent/20 hover:shadow-3xl hover:shadow-accent/20 hover:shadow-4xl hover:shadow-accent/20 hover:shadow-5xl hover:shadow-accent/20 hover:shadow-6xl hover:shadow-accent/20 hover:shadow-7xl hover:shadow-accent/20 hover:shadow-8xl hover:shadow-accent/20 hover:shadow-9xl hover:shadow-accent/20"
            >
              View Data
              <IconArrow />
            </Link>
          </div>
        </section>

        {/* ── Quick stats strip (matching StatCard style) ── */}
        <section className="max-w-5xl mx-auto px-6 pb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Countries tracked", value: <Counter to={50} />, sub: "Asia region" },
              { label: "Live updates",       value: "3 600s",            sub: "Revalidation" },
              { label: "API source",         value: "REST",              sub: "Countries v3" },
              { label: "Pages",              value: "2",                 sub: "Dashboard · Data", accent: true },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-lg border bg-white p-4 ${
                  s.accent
                    ? "border-[--accent]/30 bg-[--accent-light]"
                    : "border-[--border]"
                }`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[--text-secondary]">{s.label}</p>
                <p className={`mt-1 text-xl font-bold tabular-nums ${s.accent ? "text-[--accent]" : "text-[--text-primary]"}`}>
                  {s.value}
                </p>
                <p className="text-[11px] text-[--text-secondary] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Project spec section ── */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[--text-primary]">Project Specification</h2>
            <span className="text-xs text-[--text-secondary]">2 pages</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {SPEC_PAGES.map((page) => (
              <div
                key={page.num}
                className="bg-white border border-[--border] rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
              >
                {/* card header */}
                <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[--border]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded bg-[--accent-light] text-[--accent] flex items-center justify-center">
                      {page.icon}
                    </span>
                    <div>
                      <p className="text-[10px] text-[--text-secondary] font-medium uppercase tracking-wider">Page {page.num}</p>
                      <p className="text-sm font-semibold text-[--text-primary] leading-tight">{page.title}</p>
                    </div>
                  </div>
                  <Link
                    href={page.href}
                    className="text-xs text-[--accent] hover:underline flex items-center gap-0.5"
                  >
                    Open <IconArrow />
                  </Link>
                </div>

                {/* requirements list */}
                <ul className="px-4 py-3 space-y-2">
                  {page.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[--text-secondary]">
                      <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                        <IconCheck />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[--border] bg-white">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-xs text-[--text-secondary]">Intern-UI (Portal)</span>
          <span className="text-xs text-[--text-secondary]">REST Countries API</span>
        </div>
      </footer>
    </div>
  );
}