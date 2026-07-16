import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]",
        className
      )}
    />
  );
}

export function ResultSkeleton() {
  return (
    <div className="glass rounded-3xl p-8">
      <Skeleton className="mb-6 h-6 w-40" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-5/6" />
      <Skeleton className="mb-8 h-4 w-2/3" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
      </div>
    </div>
  );
}
