// Social icons component with motion animations
// Client component for motion interactions
// Accepts icon names as strings to avoid serialization issues

"use client";

import { motion } from "motion/react";
import { Instagram, Facebook, Mail, LucideIcon } from "lucide-react";

// Map icon names to icon components
const iconMap: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  mail: Mail,
};

interface SocialLink {
  href: string;
  label: string;
  iconName: string; // Changed from icon to iconName
}

interface SocialIconsProps {
  links: SocialLink[];
}

export function SocialIcons({ links }: SocialIconsProps) {
  return (
    <div className="flex gap-4">
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        );
      })}
    </div>
  );
}
