type CountryCardProps = {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
};

export default function CountryCard({ name, capital, region, population, flag }: CountryCardProps) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40">
      <div className="mb-5 overflow-hidden rounded-3xl bg-white/5">
        <img src={flag} alt={`${name} flag`} className="h-40 w-full object-cover" />
      </div>
      <div className="space-y-3 text-sm text-slate-300">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p>
          <span className="font-semibold text-cyan-300">Capital:</span> {capital}
        </p>
        <p>
          <span className="font-semibold text-cyan-300">Region:</span> {region}
        </p>
        <p>
          <span className="font-semibold text-cyan-300">Population:</span> {population.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
