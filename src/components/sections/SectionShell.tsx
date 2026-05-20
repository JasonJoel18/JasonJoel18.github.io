import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  chapter?: string;
  title?: string;
}

/**
 * Editorial section wrapper. Provides:
 *   - section anchor
 *   - optional chapter label ("01 — INTRO") at the top-left
 *   - continuous scroll-linked opacity/translateY (fades in and back out)
 */
export default function SectionShell({ id, children, className = '', ariaLabel, chapter, title }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.4, 1, 1, 0.4]);
  const y       = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [40, 0, 0, -40]);

  return (
    <section ref={ref} id={id} aria-label={ariaLabel} className={`relative ${className}`}>
      {(chapter || title) && (
        <div className="container-wide pt-16 sm:pt-24 pb-6 sm:pb-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8">
            {chapter && <span className="label-mono">{chapter}</span>}
            {title && (
              <h2 className="display-italic text-4xl sm:text-5xl md:text-6xl text-[var(--color-fg)]">
                {title}
              </h2>
            )}
          </div>
          <div className="mt-6 h-px w-full bg-[color-mix(in_oklab,var(--color-border-2)_70%,transparent)]" />
        </div>
      )}
      {reduce ? (
        <div>{children}</div>
      ) : (
        <motion.div style={{ opacity, y, willChange: 'transform, opacity' }}>{children}</motion.div>
      )}
    </section>
  );
}
