import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, BarChart3 } from 'lucide-react';
import ProjectMedia, { type Media } from '~/components/media/ProjectMedia';
import DistortMedia from '~/components/gl/DistortMedia';
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

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const flip = index % 2 === 1;
  const isImage = project.media.type === 'image' || project.media.type === 'gif';

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.9, ease: easeOutExpo }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      {/* Media */}
      <div className={cn('lg:col-span-7 relative', flip && 'lg:col-start-6')}>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black">
          {isImage ? (
            <DistortMedia
              src={(project.media as { src: string }).src}
              alt={(project.media as { alt: string }).alt}
              className="h-full w-full"
            />
          ) : (
            <ProjectMedia media={project.media} hovered={hovered} />
          )}
        </div>
        <div className="absolute -top-3 left-4 label-mono bg-[var(--color-bg)] px-2 py-0.5 rounded-sm">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Copy */}
      <div className={cn('lg:col-span-5', flip && 'lg:col-start-1 lg:row-start-1')}>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="font-mono text-sm text-[var(--color-fg-subtle)] tabular-nums">{project.year}</span>
          {project.role && (
            <span className="label-mono !text-[var(--color-accent)]">{project.role}</span>
          )}
        </div>

        <h3 className="display-italic text-[clamp(2rem,4.4vw,4.5rem)] leading-[1.0] text-[var(--color-fg)] mb-5">
          <span className="draw-underline">{project.title}</span>
        </h3>

        <p className="text-base sm:text-lg text-[var(--color-fg-muted)] leading-relaxed text-pretty mb-6 max-w-prose">
          {project.summary}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 mb-6">
            {project.metrics.map((m) => (
              <li key={m.label} className="flex flex-col">
                <span className="display-italic text-3xl text-[var(--color-accent)] tabular-nums leading-none">
                  {m.value}
                </span>
                <span className="label-mono mt-1">{m.label}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="flex flex-wrap gap-x-4 gap-y-1 mb-6 text-[11px] font-mono uppercase tracking-widest text-[var(--color-fg-subtle)]">
          {project.tech.map((t, i) => (
            <li key={t} className="flex items-center gap-4">
              {i > 0 && <span aria-hidden="true">·</span>}
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          {project.href && (
            <a
              href={project.href}
              className="group/cs inline-flex items-center gap-2 text-base text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="draw-underline">Case study</span>
              <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5" aria-hidden="true" />
            </a>
          )}
          <div className="flex items-center gap-1">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} on GitHub`}
                className="inline-flex items-center justify-center h-9 w-9 rounded-full text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-white/5 transition-colors"
              >
                <Github size={16} strokeWidth={1.5} aria-hidden="true" />
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
                <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
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
                <BarChart3 size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
