import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface Props {
  name: string;
  title: string;
  subtitle: string;
  tagline?: string;
  available?: string;
}

export default function HeroIntro({ name, title, subtitle, tagline, available }: Props) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.001 : 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const words = name.split(' ');

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
      {available && (
        <motion.div
          variants={child}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] pl-2 pr-4 py-1 text-xs font-medium text-[var(--color-fg-muted)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[var(--color-success)] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
          </span>
          {available}
        </motion.div>
      )}

      <motion.p variants={child} className="text-sm font-mono text-[var(--color-accent)] tracking-[0.18em] uppercase">
        Hello — I am
      </motion.p>

      <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-balance">
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
            <motion.span variants={child} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.h2
        variants={child}
        className="text-2xl sm:text-3xl md:text-4xl font-medium text-[var(--color-fg-muted)] tracking-tight text-balance"
      >
        a <span className="gradient-text font-semibold">{title}</span>.
      </motion.h2>

      <motion.p
        variants={child}
        className="max-w-xl text-base sm:text-lg text-[var(--color-fg-muted)] leading-relaxed text-pretty"
      >
        {subtitle}
      </motion.p>

      {tagline && (
        <motion.p variants={child} className="text-xs font-mono text-[var(--color-fg-subtle)] tracking-wider">
          {tagline}
        </motion.p>
      )}
    </motion.div>
  );
}
