/* ═══════════════════════════════════════════════════════════════
   Rafeeq Motion System — Framer Motion 21st.dev Springs & Variants
   ═══════════════════════════════════════════════════════════════ */

import type { Variants, Transition } from "framer-motion";

export const springs = {
  snappy: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  smooth: { type: "spring", stiffness: 260, damping: 25 } as Transition,
  bouncy: { type: "spring", stiffness: 500, damping: 20 } as Transition,
  gentle: { type: "spring", stiffness: 180, damping: 24 } as Transition,
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springs.smooth },
  exit: { opacity: 0, y: 15, transition: { duration: 0.2 } },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: springs.snappy },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const cardHoverVariants: Variants = {
  initial: { y: 0, scale: 1, boxShadow: "var(--shadow-card)" },
  hover: {
    y: -6,
    scale: 1.015,
    boxShadow: "var(--shadow-card-hover)",
    transition: springs.snappy,
  },
  tap: { scale: 0.985, transition: { duration: 0.1 } },
};
