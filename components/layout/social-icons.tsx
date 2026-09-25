"use client";

// Icons are passed by name: components can't cross the server/client boundary as props

import { motion } from "motion/react";
import { Instagram, Facebook, Mail, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  mail: Mail,
};

interface SocialLink {
  href: string;
  label: string;
  iconName: string;
}

interface SocialIconsProps {
  links: SocialLink[];
}

export function SocialIcons({ links }: SocialIconsProps) {
  return (
    <div className="flex gap-2">
      {links.map((social) => {
        const Icon = iconMap[social.iconName];
        if (!Icon) return null;

        return (
          <motion.a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="flex size-10 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-foreground/5 transition-colors duration-300 hover:text-primary"
          >
            <Icon className="size-[18px]" strokeWidth={1.5} />
          </motion.a>
        );
      })}
    </div>
  );
}
