export function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 4 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div
            className="skeleton-shimmer h-3.5 rounded"
            style={{ width: i === 0 ? "60%" : i === 3 ? "40%" : "50%" }}
          />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonTable({ rows = 8 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="bg-white border border-[--border] rounded-lg p-4 space-y-2">
      <div className="skeleton-shimmer h-3 w-1/2 rounded" />
      <div className="skeleton-shimmer h-7 w-1/3 rounded" />
      <div className="skeleton-shimmer h-3 w-1/4 rounded" />
    </div>
  );
}