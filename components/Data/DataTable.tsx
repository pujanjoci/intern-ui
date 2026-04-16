"use client";

import { useState, useMemo } from "react";
import { SkeletonTable } from "@/components/Ui/Skeleton";

type Country = {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
};

type DataTableProps = {
  data: Country[];
  loading: boolean;
};

const REGION_COLORS: Record<string, string> = {
  Asia:    "bg-blue-50 text-blue-700",
  Europe:  "bg-green-50 text-green-700",
  Africa:  "bg-amber-50 text-amber-700",
  Americas:"bg-purple-50 text-purple-700",
  Oceania: "bg-teal-50 text-teal-700",
};

function formatPopulation(n: number) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1) + "M";
  return n.toLocaleString();
}

type SortKey = keyof Country;
type SortDir = "asc" | "desc";

export default function DataTable({ data, loading }: DataTableProps) {
  const [search, setSearch]     = useState("");
  const [region, setRegion]     = useState("All");
  const [sortKey, setSortKey]   = useState<SortKey>("name");
  const [sortDir, setSortDir]   = useState<SortDir>("asc");

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(data.map((c) => c.region))).sort()],
    [data]
  );

  const filtered = useMemo(() => {
    let rows = [...data];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.capital.toLowerCase().includes(q)
      );
    }
    if (region !== "All") rows = rows.filter((c) => c.region === region);
    rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [data, search, region, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const cols: { key: SortKey; label: string; className?: string }[] = [
    { key: "name",       label: "Country" },
    { key: "capital",    label: "Capital" },
    { key: "region",     label: "Region" },
    { key: "population", label: "Population", className: "text-right" },
  ];

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 opacity-40">
      {sortKey === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  return (
    <div className="bg-white border border-[--border] rounded-lg overflow-hidden animate-fade-in">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-[--border] bg-gray-50">
        <div className="relative flex-1 min-w-48">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[--text-secondary]"
            width="14" height="14" viewBox="0 0 14 14" fill="none"
          >
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search country or capital…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-[--border] rounded-md bg-white text-[--text-primary] placeholder:text-[--text-secondary] focus:outline-none focus:ring-2 focus:ring-[--accent]/20 focus:border-[--accent]"
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="px-3 py-1.5 text-sm border border-[--border] rounded-md bg-white text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--accent]/20 focus:border-[--accent]"
        >
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <span className="text-xs text-[--text-secondary] ml-auto">
          {loading ? "Loading…" : `${filtered.length} countries`}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[--border] bg-gray-50">
              {cols.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[--text-secondary] cursor-pointer select-none hover:text-[--text-primary] transition-colors ${col.className ?? ""}`}
                >
                  {col.label}
                  <SortIcon col={col.key} />
                </th>
              ))}
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[--text-secondary]">
                Flag
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonTable rows={10} />
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-[--text-secondary]">
                  No results match your search.
                </td>
              </tr>
            ) : (
              filtered.map((country) => (
                <tr
                  key={country.name}
                  className="border-b border-gray-50 hover:bg-[--accent-light]/40 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-[--text-primary]">{country.name}</td>
                  <td className="px-4 py-3 text-[--text-secondary]">{country.capital}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${REGION_COLORS[country.region] ?? "bg-gray-100 text-gray-600"}`}>
                      {country.region}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-[--text-secondary] tabular-nums">
                    {formatPopulation(country.population)}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="h-5 w-8 object-cover rounded-sm border border-[--border]"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}