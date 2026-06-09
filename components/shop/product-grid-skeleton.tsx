import { Skeleton } from "@/components/ui/skeleton";

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm"
        >
          <Skeleton className="aspect-4/5 w-full rounded-none" />
          <div className="space-y-2 px-4 py-4 sm:px-5 sm:py-5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="mt-2 h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
