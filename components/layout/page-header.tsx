import { Wave } from "@/components/ui/wave";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Extra content under the subtitle (e.g. category filters). */
  children?: React.ReactNode;
}

/**
 * Wet-sand band at the top of inner pages; it runs under the floating navbar and ends in a wave.
 * Follow it with <PageShell belowHeader> so content clears the wave.
 */
export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="relative -mt-(--header-h) bg-sand pt-(--header-h)">
      <div className="container-page pb-10 pt-10 md:pb-14 md:pt-16">
        <h1 className="heading-1 animate-enter">{title}</h1>
        {subtitle ? <p className="lead mt-4 animate-enter [--delay:120ms] md:mt-5">{subtitle}</p> : null}
        {children ? <div className="mt-8 animate-enter [--delay:200ms] md:mt-10">{children}</div> : null}
      </div>
      <Wave tone="sand" edge="bottom" />
    </section>
  );
}
