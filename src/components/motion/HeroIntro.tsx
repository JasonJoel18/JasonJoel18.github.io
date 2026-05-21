import { motion, useReducedMotion, type Variants } from 'framer-motion';
import LiquidText from '~/components/motion/LiquidText';

interface Props {
  name: string;
  title: string;
  subtitle: string;
  tagline?: string;
  available?: string;
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroIntro({ name, title, subtitle, tagline }: Props) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 } },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.001 : 0.9, ease: easeOutExpo } },
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col gap-4 sm:gap-5">
      <motion.p
        variants={child}
        className="label-mono text-[var(--color-accent)]"
      >
        Portfolio — 2026
      </motion.p>

      <div>
        <LiquidText
          text={name}
          as="h1"
          className="display-italic block text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.95] text-[var(--color-fg)]"
        />
      </div>

      <motion.h2
        variants={child}
        className="display-italic text-[clamp(1.125rem,2.4vw,1.75rem)] text-[var(--color-fg-muted)] leading-[1.15] max-w-2xl"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={child}
        className="max-w-xl text-sm sm:text-base text-[var(--color-fg-muted)] leading-relaxed text-pretty"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
