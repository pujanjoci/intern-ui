type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="group rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-800/90">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-2xl">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}
