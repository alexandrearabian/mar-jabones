import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  /** Directly after a <PageHeader>: leave room for its wave. */
  belowHeader?: boolean;
}

/** Standard page body: shared container and vertical rhythm. */
export function PageShell({ children, className, narrow, belowHeader }: PageShellProps) {
  return (
    <div
      className={cn(
        "container-page pb-20 md:pb-28",
        belowHeader ? "pt-16 md:pt-24" : "pt-10 md:pt-16",
        narrow && "max-w-4xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
