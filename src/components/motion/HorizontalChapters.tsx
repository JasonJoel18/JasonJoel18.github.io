import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface Props {
  children: ReactNode;
  /** Number of chapters — used to size the pin track and translation range */
  count: number;
  className?: string;
}

/**
 * Pins its section for ~count viewports and translates inner row horizontally.
 * On reduced motion or narrow viewports the consumer should render a vertical fallback.
 */
export default function HorizontalChapters({ children, count, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Translate from 0% to -(100 * (count-1) / count)% across the scroll range
  const endPct = count > 1 ? -((count - 1) / count) * 100 : 0;
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `${endPct}%`]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ height: `${count * 100}vh`, position: 'relative' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x, width: `${count * 100}%`, willChange: 'transform' }}
          className="flex h-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
