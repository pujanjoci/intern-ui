import PortalLayout from "@/components/Layout/PortalLayout";
import StatCard from "@/components/Layout/StatCard";

type Country = {
  name: { common: string };
  capital?: string[];
  region: string;
  population: number;
  flags: { png: string };
};

async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/region/asia?fields=name,capital,region,population,flags",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatPopulation(n: number) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1) + "M";
  return n.toLocaleString();
}

const REGION_COLORS: Record<string, string> = {
  Asia:     "bg-blue-50 text-blue-700",
  Europe:   "bg-green-50 text-green-700",
  Africa:   "bg-amber-50 text-amber-700",
  Americas: "bg-purple-50 text-purple-700",
  Oceania:  "bg-teal-50 text-teal-700",
};

export default async function DashboardPage() {
  const countries = await getCountries();

  const totalPop = countries.reduce((sum, c) => sum + c.population, 0);
  const avgPop   = countries.length ? Math.round(totalPop / countries.length) : 0;
  const regions  = new Set(countries.map((c) => c.region)).size;
  const recent   = countries.slice(0, 8).map((c) => ({
    name:       c.name.common,
    capital:    c.capital?.[0] ?? "—",
    region:     c.region,
    population: c.population,
    flag:       c.flags.png,
  }));

  return (
    <PortalLayout>
      <div className="animate-fade-in space-y-6 w-full">

        {/* Page heading */}
        <div>
          <h1 className="text-lg font-semibold text-[--text-primary]">Dashboard Overview</h1>
          <p className="text-sm text-[--text-secondary] mt-0.5">
            Summary of country data loaded from the REST Countries API.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Loaded countries" value={countries.length} sub="Asia region" />
          <StatCard label="Total population" value={formatPopulation(totalPop)} sub="Combined" />
          <StatCard label="Avg. population"  value={formatPopulation(avgPop)} sub="Per country" />
          <StatCard label="Regions"          value={regions} sub="Represented" accent />
        </div>

        {/* Recent items table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[--text-primary]">Recent items</h2>
            <a href="/data" className="text-xs text-[--accent] hover:underline">
              View all →
            </a>
          </div>

          <div className="bg-white border border-[--border] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-gray-50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[--text-secondary]">Country</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[--text-secondary]">Capital</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[--text-secondary]">Region</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-[--text-secondary]">Population</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((country) => (
                  <tr
                    key={country.name}
                    className="border-b border-gray-50 last:border-0 hover:bg-[--accent-light]/40 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-[--text-primary] flex items-center gap-2">
                      <img
                        src={country.flag}
                        alt=""
                        className="h-4 w-6 object-cover rounded-sm border border-[--border] shrink-0"
                      />
                      {country.name}
                    </td>
                    <td className="px-4 py-3 text-[--text-secondary]">{country.capital}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${REGION_COLORS[country.region] ?? "bg-gray-100 text-gray-600"}`}>
                        {country.region}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-[--text-secondary] tabular-nums">
                      {formatPopulation(country.population)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PortalLayout>
  );
}