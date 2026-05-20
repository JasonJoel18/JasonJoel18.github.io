import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface Props {
  children: ReactNode;
  direction?: 'left' | 'right';
  duration?: number;
  className?: string;
}

export default function HorizontalMarquee({
  children,
  direction = 'left',
  duration = 28,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const distance = direction === 'left' ? '-50%' : '0%';
  const initial  = direction === 'left' ? '0%' : '-50%';

  return (
    <div
      className={className}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      style={{ overflow: 'hidden' }}
    >
      <motion.div
        className="marquee-track"
        animate={reduce ? undefined : { x: paused ? undefined : [initial, distance] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {/* Duplicate children for seamless loop */}
        <div className="flex items-center gap-12 shrink-0">{children}</div>
        <div className="flex items-center gap-12 shrink-0" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}
