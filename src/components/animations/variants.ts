import type { Transition, Variants } from 'framer-motion'

const smooth: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: smooth },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: smooth },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: smooth },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: smooth },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -42 },
  visible: { opacity: 1, x: 0, transition: smooth },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 42 },
  visible: { opacity: 1, x: 0, transition: smooth },
}

export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

export const doorOpenLeft: Variants = {
  closed: { rotateY: 0, x: 0 },
  open: {
    rotateY: -108,
    x: -12,
    transition: { duration: 1.6, ease: [0.2, 1, 0.22, 1] },
  },
}

export const doorOpenRight: Variants = {
  closed: { rotateY: 0, x: 0 },
  open: {
    rotateY: 108,
    x: 12,
    transition: { duration: 1.6, ease: [0.2, 1, 0.22, 1] },
  },
}

export const revealCard: Variants = {
  closed: { y: 0 },
  open: { y: 184, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
