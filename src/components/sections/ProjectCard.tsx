import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, BarChart3 } from 'lucide-react';
import ProjectMedia, { type Media } from '~/components/media/ProjectMedia';
import { cn } from '~/lib/cn';

interface Metric {
  label: string;
  value: string;
}

interface Project {
  title: string;
  summary: string;
  year: number;
  tech: string[];
  media: Media;
  metrics?: Metric[];
  role?: string;
  links: {
    live?: string | null;
    github?: string | null;
    demo?: string | null;
    article?: string | null;
  };
  href?: string | null;
  featured?: boolean;
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const isEmbed = project.media.type === 'embed';

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={cn(
        'group relative glass-panel overflow-hidden flex flex-col will-change-transform',
        'transition-[transform,border-color] duration-500 ease-out',
        'hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--color-accent)_55%,var(--color-border))]',
        isEmbed && 'lg:col-span-2',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -inset-px rounded-[var(--radius-card)] transition-opacity duration-500',
          hovered ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          background:
            'radial-gradient(600px circle at 50% 0%, rgba(167,139,250,0.22), transparent 45%)',
        }}
      />

      <div className="p-2.5 sm:p-3">
        <ProjectMedia media={project.media} hovered={hovered && !isEmbed} />
      </div>

      <div className="flex-1 px-4 sm:px-5 pb-5 pt-2 flex flex-col">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--color-fg)] leading-snug">
            {project.title}
          </h3>
          <span className="label-mono shrink-0 mt-0.5">{project.year}</span>
        </div>

        {project.role && (
          <div className="label-mono !text-[var(--color-accent)] mb-2">{project.role}</div>
        )}

        <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed text-pretty mb-3">
          {project.summary}
        </p>

        {/* Metrics row */}
        {project.metrics && project.metrics.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
            {project.metrics.map((m) => (
              <li
                key={m.label}
                className="glass-sm rounded-md px-2 py-1.5 flex flex-col"
              >
                <span className="text-sm font-semibold tabular-nums leading-none text-[var(--color-accent)]">
                  {m.value}
                </span>
                <span className="label-mono mt-1 truncate">{m.label}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech tags */}
        <ul className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.map((t) => (
            <li
              key={t}
              className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-fg-subtle)] border border-[var(--color-border)] rounded-full px-2 py-0.5"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-0.5 -ml-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} on GitHub`}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-white/5 transition-colors"
              >
                <Github size={15} strokeWidth={1.5} aria-hidden="true" />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} live site`}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-white/5 transition-colors"
              >
                <ExternalLink size={15} strokeWidth={1.5} aria-hidden="true" />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} dashboard`}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-white/5 transition-colors"
              >
                <BarChart3 size={15} strokeWidth={1.5} aria-hidden="true" />
              </a>
            )}
          </div>

          {project.href && (
            <a
              href={project.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:gap-2.5 transition-all duration-300"
            >
              Case study
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
