"use client";

import { MotionConfig } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  // reducedMotion="user": Motion drops transforms when the OS asks for reduced motion
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
