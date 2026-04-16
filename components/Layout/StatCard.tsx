type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
};

export default function StatCard({ label, value, sub, accent = false }: StatCardProps) {
  return (
    <div className="bg-white border border-[--border] rounded-lg p-4">
      <p className="text-xs text-[--text-secondary] mb-1.5">{label}</p>
      <p className={`text-2xl font-semibold ${accent ? "text-[--accent]" : "text-[--text-primary]"}`}>
        {value}
      </p>
      {sub && (
        <p className="text-xs text-[--text-secondary] mt-1">{sub}</p>
      )}
    </div>
  );
}