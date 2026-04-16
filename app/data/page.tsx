"use client";

import { useEffect, useState } from "react";
import PortalLayout from "@/components/Layout/PortalLayout";
import DataTable from "@/components/Data/DataTable";

type Country = {
  name: { common: string };
  capital?: string[];
  region: string;
  population: number;
  flags: { png: string };
};

export default function DataInventoryPage() {
  const [rows, setRows]       = useState<{ name: string; capital: string; region: string; population: number; flag: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/region/asia?fields=name,capital,region,population,flags",
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`Failed to load data (${res.status})`);
        const data: Country[] = await res.json();
        setRows(
          data.map((c) => ({
            name:       c.name.common,
            capital:    c.capital?.[0] ?? "—",
            region:     c.region,
            population: c.population,
            flag:       c.flags.png,
          }))
        );
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
    return () => controller.abort();
  }, []);

  return (
    <PortalLayout>
      <div className="animate-fade-in space-y-5 w-full">

        {/* Page heading */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[--text-primary]">Data Inventory</h1>
            <p className="text-sm text-[--text-secondary] mt-0.5">
              Live data from the REST Countries API — Asia region.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[--border] bg-white text-xs text-[--text-secondary]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        </div>

        {/* Error / table */}
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-700">Unable to load data</p>
            <p className="text-sm text-red-500 mt-1">{error}</p>
          </div>
        ) : (
          <DataTable data={rows} loading={loading} />
        )}

      </div>
    </PortalLayout>
  );
}