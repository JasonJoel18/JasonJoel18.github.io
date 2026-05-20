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
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col gap-8 sm:gap-10">
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
          className="display-italic block text-[clamp(3.5rem,14vw,16rem)] leading-[0.92] text-[var(--color-fg)] text-balance"
        />
      </div>

      <motion.h2
        variants={child}
        className="display-italic text-[clamp(1.5rem,3.2vw,3rem)] text-[var(--color-fg-muted)] leading-[1.05] max-w-3xl"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={child}
        className="max-w-2xl text-base sm:text-lg text-[var(--color-fg-muted)] leading-relaxed text-pretty"
      >
        {subtitle}
      </motion.p>

      {tagline && (
        <motion.p variants={child} className="label-mono">
          {tagline}
        </motion.p>
      )}
    </motion.div>
  );
}
