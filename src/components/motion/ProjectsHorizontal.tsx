import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import HorizontalChapters from '~/components/motion/HorizontalChapters';
import ProjectCard from '~/components/sections/ProjectCard';
import type { Media } from '~/components/media/ProjectMedia';

interface Project {
  title: string;
  summary: string;
  year: number;
  tech: string[];
  media: Media;
  metrics?: { label: string; value: string }[];
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

export default function ProjectsHorizontal({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (isMobile || reduce) {
    return (
      <div className="container-wide flex flex-col gap-20 py-12">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} layout="slide" />
        ))}
      </div>
    );
  }

  return (
    <HorizontalChapters count={projects.length}>
      {projects.map((p, i) => (
        <div key={i} className="w-screen shrink-0 h-screen flex items-center">
          <div className="container-wide w-full">
            <div className="max-w-[min(72rem,90vw)] mx-auto">
              <ProjectCard project={p} index={i} layout="slide" />
            </div>
          </div>
        </div>
      ))}
    </HorizontalChapters>
  );
}
