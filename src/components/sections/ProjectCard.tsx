import { useState } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import ProjectMedia, { type Media } from '~/components/media/ProjectMedia';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/Card';
import { Badge } from '~/components/ui/Badge';
import { Button } from '~/components/ui/Button';
import { cn } from '~/lib/cn';

interface Metric {
  label: string;
  value: string;
}

export interface Project {
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

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const techShown = project.tech.slice(0, 3);
  const techMore = project.tech.length - techShown.length;
  const codeUrl = project.links.github ?? null;
  const demoUrl = project.links.live ?? project.links.demo ?? null;

  const revealProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-10% 0px' },
        transition: { duration: 0.6, delay: (index % 3) * 0.08, ease: EASE },
      };

  return (
    <motion.div
      {...revealProps}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={
        reduce
          ? undefined
          : { duration: 0.35, ease: EASE, delay: (index % 3) * 0.08 }
      }
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden p-0 gap-0 transition-shadow duration-300 hover:shadow-lg hover:border-primary/30">
        <div className="relative aspect-video overflow-hidden border-b border-border">
          <ProjectMedia
            media={project.media}
            hovered={hovered}
            className="rounded-none border-0 transition-transform duration-500 ease-out"
          />
        </div>

        <CardHeader className="gap-3 pt-6">
          <div className="flex items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            <span className="tabular-nums">{project.year}</span>
            {project.role && <span className="truncate">{project.role}</span>}
          </div>
          <CardTitle className="text-xl leading-tight tracking-tight">{project.title}</CardTitle>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-1.5">
            {techShown.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
            {techMore > 0 && <Badge variant="outline">+{techMore}</Badge>}
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-4">
              {project.metrics.slice(0, 4).map((m) => (
                <div key={m.label} className="flex flex-col min-w-0">
                  <dt className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground truncate">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-primary tabular-nums">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </CardContent>

        <CardFooter className={cn('mt-auto gap-2 flex-wrap')}>
          {codeUrl && (
            <Button asChild variant="outline" size="sm">
              <a href={codeUrl} target="_blank" rel="noreferrer noopener">
                <Github />
                Code
              </a>
            </Button>
          )}
          {demoUrl && (
            <Button asChild size="sm">
              <a href={demoUrl} target="_blank" rel="noreferrer noopener">
                <ExternalLink />
                Demo
              </a>
            </Button>
          )}
          {project.href && (
            <Button asChild variant="ghost" size="sm" className="ml-auto group">
              <a href={project.href}>
                Case study
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
