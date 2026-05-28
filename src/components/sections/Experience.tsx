import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';
import { Badge } from '~/components/ui/Badge';
import { Briefcase, GraduationCap, MapPin, CalendarDays } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';

interface Job {
  title: string;
  company: string;
  duration: string;
  location: string;
  points: string[];
}

interface Edu {
  degree: string;
  institution: string;
  duration: string;
  location: string;
  summary?: string;
}

interface Props {
  work: Job[];
  education: Edu[];
}

const TECH_TAGS = [
  'SQL', 'Python', 'Tableau', 'Power BI', 'BoldBI', 'Jupyter', 'MySQL', 'SAP HANA',
  'AWS', 'Azure', 'Excel',
];

const EASE = [0.16, 1, 0.3, 1] as const;

function deriveTags(points: string[]): string[] {
  const text = points.join(' ');
  return TECH_TAGS.filter((t) => new RegExp(`\\b${t.replace(/ /g, '\\s+')}\\b`, 'i').test(text));
}

function CardReveal({
  children,
  delay,
  skip,
}: {
  children: React.ReactNode;
  delay: number;
  skip: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce || skip) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function ExperienceTabs({ work, education }: Props) {
  const [tab, setTab] = useState<'experience' | 'education'>('experience');
  const reduce = useReducedMotion();
  const seen = useRef<Set<'experience' | 'education'>>(new Set());
  const skipStagger = seen.current.has(tab);
  seen.current.add(tab);

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => setTab(v as 'experience' | 'education')}
      className="w-full"
    >
      <div className="flex justify-center">
        <TabsList>
          <TabsTrigger value="experience" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </TabsTrigger>
        </TabsList>
      </div>

      <AnimatePresence initial={false}>
        {tab === 'experience' && (
          <motion.div
            key="experience"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <TabsContent value="experience" forceMount className="space-y-5">
              {work.map((job, i) => {
                const tags = deriveTags(job.points);
                return (
                  <CardReveal key={`${job.company}-${job.duration}`} delay={i * 0.08} skip={skipStagger}>
                    <Card className="card-lift">
                      <CardHeader className="gap-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <CardTitle className="text-xl">
                            {job.title}{' '}
                            <span className="text-primary font-medium">@ {job.company}</span>
                          </CardTitle>
                          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {job.duration}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {job.points.map((point, j) => (
                            <li
                              key={j}
                              className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {tags.map((t) => (
                              <Badge key={t} variant="secondary">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </CardReveal>
                );
              })}
            </TabsContent>
          </motion.div>
        )}

        {tab === 'education' && (
          <motion.div
            key="education"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <TabsContent value="education" forceMount className="space-y-5">
              {education.map((edu, i) => (
                <CardReveal key={`${edu.institution}-${edu.duration}`} delay={i * 0.08} skip={skipStagger}>
                  <Card className="card-lift">
                    <CardHeader className="gap-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <CardTitle className="text-xl">
                          {edu.degree}{' '}
                          <span className="text-primary font-medium">@ {edu.institution}</span>
                        </CardTitle>
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {edu.duration}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {edu.location}
                      </span>
                    </CardHeader>
                    {edu.summary && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {edu.summary}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </CardReveal>
              ))}
            </TabsContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Tabs>
  );
}
