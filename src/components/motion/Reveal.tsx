import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Variant = 'fade' | 'rise' | 'stagger-words' | 'draw-line';

interface Props {
  children?: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'span' | 'li' | 'p' | 'h2' | 'h3';
  className?: string;
  amount?: number;
  variant?: Variant;
  /** stagger-words: split this string into words instead of using children */
  text?: string;
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Reveal({
  children,
  delay = 0,
  y = 16,
  as = 'div',
  className,
  amount = 0.2,
  variant = 'rise',
  text,
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  const viewport = { once: true, margin: '-15%', amount } as const;

  if (variant === 'fade') {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: reduce ? 0.001 : 0.7, ease: easeOutExpo, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  if (variant === 'draw-line') {
    return (
      <MotionTag
        className={className}
        style={{ transformOrigin: 'left center' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewport}
        transition={{ duration: reduce ? 0.001 : 0.9, ease: easeOutExpo, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  if (variant === 'stagger-words') {
    const words = (text ?? '').split(/(\s+)/);
    const container: Variants = {
      hidden: {},
      show: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: delay } },
    };
    const child: Variants = {
      hidden: { opacity: 0, y: reduce ? 0 : '60%' },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0.001 : 0.7, ease: easeOutExpo },
      },
    };
    return (
      <MotionTag
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={container}
      >
        {words.map((w, i) =>
          /\s+/.test(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingTop: '0.2em', paddingBottom: '0.25em', marginTop: '-0.2em', marginBottom: '-0.25em' }}>
              <motion.span variants={child} style={{ display: 'inline-block' }}>
                {w}
              </motion.span>
            </span>
          ),
        )}
      </MotionTag>
    );
  }

  // rise (default)
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.001 : 0.6, ease: easeOutExpo, delay },
    },
  };
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
