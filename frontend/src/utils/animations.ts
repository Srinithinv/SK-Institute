import type { Variants } from "framer-motion";

export const FADE_UP_SPRING = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const CINEMATIC_EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const MASKED_TEXT_REVEAL: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.8, ease: CINEMATIC_EASING } 
  },
};
