import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  items: string[];
  duration?: number;
  className?: string;
  renderItem?: (s: string, i: number) => ReactNode;
}

export default function VerticalMarquee({ items, duration = 22, className, renderItem }: Props) {
  const reduce = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        className="flex flex-col gap-6"
        style={{ willChange: 'transform' }}
        animate={reduce ? undefined : { y: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((s, i) =>
          renderItem ? (
            <div key={i}>{renderItem(s, i)}</div>
          ) : (
            <div key={i} className="display-italic text-3xl text-[var(--color-fg-muted)] whitespace-nowrap">
              {s}
            </div>
          ),
        )}
      </motion.div>
    </div>
  );
}
