import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, BarChart3 } from 'lucide-react';
import ProjectMedia, { type Media } from '~/components/media/ProjectMedia';
import { cn } from '~/lib/cn';

interface Project {
  title: string;
  summary: string;
  year: number;
  tech: string[];
  media: Media;
  links: {
    live?: string | null;
    github?: string | null;
    demo?: string | null;
    article?: string | null;
  };
  href?: string | null; // /projects/[slug] — only when caseStudy: true
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
        'group relative card overflow-hidden flex flex-col will-change-transform',
        'transition-[transform,border-color] duration-500 ease-out',
        'hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--color-accent)_45%,var(--color-border))]',
        isEmbed && 'lg:col-span-2',
      )}
    >
      {/* Soft glow on hover — pre-rendered, only opacity is tweened */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -inset-px rounded-[var(--radius-card)] transition-opacity duration-500',
          hovered ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          background:
            'radial-gradient(600px circle at var(--mx,50%) var(--my,0%), rgba(167,139,250,0.18), transparent 40%)',
        }}
      />

      <div className="p-3 sm:p-4">
        <ProjectMedia media={project.media} hovered={hovered && !isEmbed} />
      </div>

      <div className="flex-1 px-5 sm:px-6 pb-6 pt-2 flex flex-col">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--color-fg)]">
            {project.title}
          </h3>
          <span className="text-xs font-mono text-[var(--color-fg-subtle)]">{project.year}</span>
        </div>

        <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed text-pretty mb-5">
          {project.summary}
        </p>

        <ul className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-fg-subtle)] border border-[var(--color-border)] rounded-full px-2.5 py-0.5"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} on GitHub`}
                className="inline-flex items-center justify-center h-9 w-9 rounded-full text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-white/5 transition-colors"
              >
                <Github size={16} aria-hidden="true" />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} live site`}
                className="inline-flex items-center justify-center h-9 w-9 rounded-full text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-white/5 transition-colors"
              >
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} dashboard`}
                className="inline-flex items-center justify-center h-9 w-9 rounded-full text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-white/5 transition-colors"
              >
                <BarChart3 size={16} aria-hidden="true" />
              </a>
            )}
          </div>

          {project.href && (
            <a
              href={project.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:gap-2.5 transition-all duration-300"
            >
              Case study
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
