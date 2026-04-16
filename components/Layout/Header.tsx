"use client";

import { usePathname } from "next/navigation";

const breadcrumbMap: Record<string, string> = {
  "/": "Dashboard",
  "/data": "Data Inventory",
  "/settings": "Settings",
};

export default function Header() {
  const pathname = usePathname();
  const pageName = breadcrumbMap[pathname] ?? "Page";

  return (
    <header className="h-12 shrink-0 border-b border-[--border] bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-[--text-secondary]">Portal</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[--border]">
          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-medium text-[--text-primary]">{pageName}</span>
      </div>
    </header>
  );
}