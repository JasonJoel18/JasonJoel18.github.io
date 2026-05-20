import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HorizontalChapters from '~/components/motion/HorizontalChapters';

interface Job {
  title: string;
  company: string;
  location: string;
  duration: string;
  points: string[];
}

function extractMetrics(point: string): string[] {
  const matches = point.match(/(\d+\+?%?|\d+\+|\$\d+\w*|\d+x)/g) ?? [];
  return matches.slice(0, 2);
}

function Chapter({ job, index, total }: { job: Job; index: number; total: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="w-screen shrink-0 h-screen flex items-center">
      <div className="container-wide w-full grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-center">
        <div>
          <div className="label-mono mb-4">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <div className="font-mono text-[clamp(4rem,9vw,10rem)] leading-none text-[var(--color-fg)] mb-6 tabular-nums tracking-tighter">
            {job.duration.split(/[—-]/)[0]?.trim() || job.duration}
          </div>
          <div className="text-sm text-[var(--color-fg-subtle)] font-mono uppercase tracking-widest">
            {job.location}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-25%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="display-italic text-[clamp(2.5rem,5.5vw,5rem)] text-[var(--color-fg)] leading-[1.02] mb-2">
            {job.company}
          </h3>
          <p className="text-lg sm:text-xl text-[var(--color-accent)] mb-8">{job.title}</p>
          <ul className="space-y-3 max-w-xl">
            {job.points.slice(0, 4).map((point, i) => {
              const metrics = extractMetrics(point);
              return (
                <li key={i} className="text-base sm:text-lg text-[var(--color-fg-muted)] leading-relaxed">
                  <span>{point}</span>
                  {metrics.length > 0 && (
                    <span className="inline-flex flex-wrap gap-1.5 ml-2 align-middle">
                      {metrics.map((m) => (
                        <span
                          key={m}
                          className="inline-block text-[10px] font-mono uppercase tracking-wider text-[var(--color-accent)] border border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)] rounded-full px-2 py-0.5 leading-tight tabular-nums"
                        >
                          {m}
                        </span>
                      ))}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function ExperienceChapters({ jobs }: { jobs: Job[] }) {
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
        {jobs.map((job, i) => (
          <div key={i}>
            <div className="label-mono mb-3">
              {String(i + 1).padStart(2, '0')} / {String(jobs.length).padStart(2, '0')} — {job.location}
            </div>
            <div className="font-mono text-5xl text-[var(--color-fg)] mb-4 tracking-tighter">{job.duration}</div>
            <h3 className="display-italic text-4xl text-[var(--color-fg)] mb-1">{job.company}</h3>
            <p className="text-base text-[var(--color-accent)] mb-5">{job.title}</p>
            <ul className="space-y-3 text-base text-[var(--color-fg-muted)] leading-relaxed">
              {job.points.slice(0, 4).map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <HorizontalChapters count={jobs.length}>
      {jobs.map((job, i) => (
        <Chapter key={i} job={job} index={i} total={jobs.length} />
      ))}
    </HorizontalChapters>
  );
}
