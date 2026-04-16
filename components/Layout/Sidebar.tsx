"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Main",
    links: [
      { href: "/", label: "Dashboard", icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
          <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
          <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
          <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.3"/>
        </svg>
      )},
      { href: "/data", label: "Data Inventory", icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="3" width="14" height="2" rx="1" fill="currentColor" opacity="0.9"/>
          <rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" opacity="0.6"/>
          <rect x="1" y="11" width="10" height="2" rx="1" fill="currentColor" opacity="0.3"/>
        </svg>
      )},
    ],
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 border-r border-[--border] bg-white flex flex-col h-full">
      <div className="px-4 py-4 border-b border-[--border]">
         <span className="text-sm font-bold text-[--text-primary] leading-tight tracking-tight max-w-xl">
            Intern-UI&nbsp;
            <span className="text-[--accent]">(Portal)</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-5">
        {navItems.map((section) => (
          <div key={section.label}>
            <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[--text-secondary]">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-[--accent-light] text-[--accent] font-medium"
                          : "text-[--text-secondary] hover:bg-gray-100 hover:text-[--text-primary]"
                      }`}
                    >
                      <span className={isActive ? "text-[--accent]" : "text-[--text-secondary]"}>
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}