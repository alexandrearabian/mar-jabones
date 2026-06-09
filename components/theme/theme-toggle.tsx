// Theme toggle using CSS `dark` class on <html>
// No external dependency, works with the CSS variables defined in globals.css

"use client";

import { useEffect, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // Apply theme to <html> element
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const isDark = theme === "dark";

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        onClick={toggleTheme}
        className="relative"
      >
        <Sun
          className={`h-5 w-5 transition-transform ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
        />
        <Moon
          className={`absolute h-5 w-5 transition-transform ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
        />
      </Button>
    </motion.div>
  );
}


