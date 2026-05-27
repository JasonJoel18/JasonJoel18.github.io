import { useState } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
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

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const techShown = project.tech.slice(0, 3);
  const techMore = project.tech.length - techShown.length;
  const codeUrl = project.links.github ?? null;
  const demoUrl = project.links.live ?? project.links.demo ?? null;

  return (
    <Card
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="flex flex-col overflow-hidden p-0 gap-0 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden border-b border-border">
        <ProjectMedia media={project.media} hovered={hovered} className="rounded-none border-0" />
      </div>

      <CardHeader className="gap-2">
        <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground">
          <span>{project.year}</span>
          {project.role && <span className="truncate">{project.role}</span>}
        </div>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.summary}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {techShown.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
          {techMore > 0 && <Badge variant="outline">+{techMore}</Badge>}
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {project.metrics.slice(0, 4).map((m) => (
              <li key={m.label} className="flex items-baseline gap-2">
                <span className="font-semibold text-foreground tabular-nums">{m.value}</span>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </li>
            ))}
          </ul>
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
          <Button asChild variant="ghost" size="sm" className="ml-auto">
            <a href={project.href}>
              Case study
              <ArrowUpRight />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
