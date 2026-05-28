import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'article' | 'li' | 'span';
  y?: number;
  duration?: number;
  once?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
  y = 14,
  duration = 0.6,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -8% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
