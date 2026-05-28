import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import KaggleIcon from '~/components/ui/KaggleIcon';

const EASE = [0.16, 1, 0.3, 1] as const;

interface Social {
  kind: 'github' | 'linkedin' | 'email' | 'kaggle' | string;
  url: string;
  label: string;
}

interface Props {
  firstWords: string;
  lastWord: string;
  tagline: string;
  subtitle?: string;
  location: string;
  availability: string;
  socials: Social[];
  cvHref: string;
}

const SOCIAL_ICON = { github: Github, linkedin: Linkedin, email: Mail } as const;

export default function HeroIntro({
  firstWords,
  lastWord,
  tagline,
  subtitle,
  location,
  availability,
  socials,
  cvHref,
}: Props) {
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <>
      <motion.p
        {...fade(0)}
        className="text-sm font-mono text-muted-foreground mb-4 inline-flex items-center gap-2"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-primary/55 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        {location} — {availability}
      </motion.p>

      <motion.h1
        {...fade(0.08)}
        className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-balance"
      >
        <span className="text-foreground">
          {firstWords}
          {firstWords && ' '}
        </span>
        <span className="text-primary relative inline-block">
          {lastWord}
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 -bottom-1 sm:-bottom-1.5 block h-px origin-left bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
            />
          )}
        </span>
      </motion.h1>

      <motion.h2
        {...fade(0.18)}
        className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
      >
        {tagline}
      </motion.h2>

      {subtitle && (
        <motion.p
          {...fade(0.26)}
          className="mt-3 text-base text-muted-foreground/80 max-w-xl mx-auto text-pretty"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        {...fade(0.34)}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 h-11 rounded-[var(--radius)] bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          View My Work
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </a>
        <a
          href={cvHref}
          download
          className="inline-flex items-center gap-2 h-11 rounded-[var(--radius)] border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Download size={16} />
          Download CV
        </a>
      </motion.div>

      <motion.div
        {...fade(0.42)}
        className="mt-8 flex items-center justify-center gap-2"
      >
        {socials.map((s) => {
          const baseClass =
            'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground hover:-translate-y-0.5';
          if (s.kind === 'kaggle') {
            return (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className={baseClass}
              >
                <KaggleIcon size={18} />
              </a>
            );
          }
          const Icon = SOCIAL_ICON[s.kind as keyof typeof SOCIAL_ICON];
          if (!Icon) return null;
          return (
            <a
              key={s.url}
              href={s.url}
              target={s.kind === 'email' ? undefined : '_blank'}
              rel="noreferrer noopener"
              aria-label={s.label}
              className={baseClass}
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          );
        })}
      </motion.div>
    </>
  );
}
