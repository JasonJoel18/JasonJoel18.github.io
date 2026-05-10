import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'span' | 'li';
  className?: string;
  amount?: number;
}

export default function Reveal({
  children,
  delay = 0,
  y = 16,
  as = 'div',
  className,
  amount = 0.2,
}: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.001 : 0.55, ease: [0.16, 1, 0.3, 1], delay },
    },
  };

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15%', amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
