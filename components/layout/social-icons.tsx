import { Facebook, Instagram } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { href: site.instagram.profileUrl, label: "Instagram", Icon: Instagram },
  { href: site.facebookUrl, label: "Facebook", Icon: Facebook },
];

export function SocialIcons() {
  return (
    <div className="flex gap-2">
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-11 items-center justify-center rounded-full border border-deep-foreground/15 text-deep-foreground/80 transition-[color,border-color,transform] duration-300 ease-(--ease-fluid) hover:-translate-y-0.5 hover:border-deep-foreground/40 hover:text-deep-foreground"
        >
          <Icon className="size-[18px]" strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}
