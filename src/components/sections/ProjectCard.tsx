import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, BarChart3 } from 'lucide-react';
import ProjectMedia, { type Media } from '~/components/media/ProjectMedia';
import DistortMedia from '~/components/gl/DistortMedia';
import MotionIcon from '~/components/ui/MotionIcon';
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

export default function ProjectCard({
  project,
  index,
  layout = 'wide',
}: {
  project: Project;
  index: number;
  layout?: 'wide' | 'slide';
}) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const flip = layout === 'wide' && index % 2 === 1;
  const isImage = project.media.type === 'image' || project.media.type === 'gif';
  const isSlide = layout === 'slide';

  return (
    <motion.article
      initial={isSlide ? false : { opacity: 0, y: reduce ? 0 : 60 }}
      whileInView={isSlide ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.9, ease: easeOutExpo }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={cn(
        isSlide
          ? 'group relative grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10 items-center h-full'
          : 'group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center',
      )}
    >
      <div
        className={cn(
          isSlide
            ? 'relative w-full'
            : cn('lg:col-span-7 relative', flip && 'lg:col-start-6'),
        )}
      >
        <div className={cn('relative w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black', isSlide ? 'aspect-[16/10]' : 'aspect-[16/10]')}>
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

      <div className={cn(isSlide ? 'min-w-0' : cn('lg:col-span-5', flip && 'lg:col-start-1 lg:row-start-1'))}>
        <div className="label-mono mb-2 text-[var(--color-fg-subtle)]">
          <span className="tabular-nums">{project.year}</span>
          {project.role && (
            <>
              <span className="mx-2 opacity-60">·</span>
              <span className="!text-[var(--color-accent)]">{project.role}</span>
            </>
          )}
        </div>

        <h3 className={cn('display-italic text-[var(--color-fg)] mb-2', isSlide ? 'text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1]' : 'text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.1] mb-3')}>
          <span className="draw-underline">{project.title}</span>
        </h3>

        <p className={cn('text-[var(--color-fg-muted)] leading-relaxed text-pretty mb-3 max-w-prose', isSlide ? 'text-sm sm:text-base' : 'text-base sm:text-lg mb-4')}>
          {project.summary}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <ul className="flex flex-wrap gap-x-5 gap-y-1 mb-3 text-sm">
            {project.metrics.slice(0, 3).map((m, i) => (
              <li key={m.label} className="flex items-baseline gap-1.5">
                {i > 0 && <span aria-hidden="true" className="text-[var(--color-fg-subtle)] opacity-60">·</span>}
                <span className="display-italic text-[var(--color-accent)] tabular-nums">{m.value}</span>
                <span className="label-mono">{m.label}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="flex flex-wrap gap-x-3 gap-y-1 mb-3 text-[11px] font-mono uppercase tracking-widest text-[var(--color-fg-subtle)]">
          {project.tech.slice(0, 5).map((t, i) => (
            <li key={t} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true">·</span>}
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {project.href && (
            <a
              href={project.href}
              className="group/cs inline-flex items-center gap-2 text-base text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="draw-underline">Case study</span>
              <MotionIcon icon={ArrowUpRight} size={16} strokeWidth={1.5} reveal={false} />
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
                <MotionIcon icon={Github} size={16} strokeWidth={1.5} reveal={false} />
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
                <MotionIcon icon={ExternalLink} size={16} strokeWidth={1.5} reveal={false} />
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
                <MotionIcon icon={BarChart3} size={16} strokeWidth={1.5} reveal={false} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
