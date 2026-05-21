import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '~/lib/cn';

interface Props {
  text: string;
  as?: 'h1' | 'h2' | 'span' | 'p';
  className?: string;
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Character-by-character mask reveal — each glyph rises from its baseline
 * inside an `overflow: hidden` clip. Used for the hero name.
 */
export default function LiquidText({ text, as: Tag = 'span', className }: Props) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.035, delayChildren: 0 } },
  };
  const child: Variants = {
    hidden: { y: reduce ? 0 : '110%' },
    show: {
      y: 0,
      transition: { duration: reduce ? 0.001 : 0.95, ease: easeOutExpo },
    },
  };

  const chars = Array.from(text);
  const MotionTag = motion[Tag as 'span'] as typeof motion.span;

  return (
    <Tag aria-label={text} className={cn(className)}>
      <MotionTag
        initial="hidden"
        animate="show"
        variants={container}
        className="inline"
        aria-hidden="true"
      >
        {chars.map((char, i) => {
          if (char === ' ') {
            return <span key={i}>{' '}</span>;
          }
          return (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', lineHeight: 0.92, paddingTop: '0.25em', paddingBottom: '0.3em', marginTop: '-0.25em', marginBottom: '-0.3em' }}
            >
              <motion.span variants={child} style={{ display: 'inline-block' }}>
                {char}
              </motion.span>
            </span>
          );
        })}
      </MotionTag>
    </Tag>
  );
}
