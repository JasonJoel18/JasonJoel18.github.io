import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';
import { Badge } from '~/components/ui/Badge';
import { Briefcase, GraduationCap, MapPin, CalendarDays } from 'lucide-react';

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

function deriveTags(points: string[]): string[] {
  const text = points.join(' ');
  return TECH_TAGS.filter((t) => new RegExp(`\\b${t.replace(/ /g, '\\s+')}\\b`, 'i').test(text));
}

export default function ExperienceTabs({ work, education }: Props) {
  return (
    <Tabs defaultValue="experience" className="w-full">
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

      <TabsContent value="experience" className="space-y-5">
        {work.map((job) => {
          const tags = deriveTags(job.points);
          return (
            <Card key={`${job.company}-${job.duration}`}>
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
                  {job.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
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
          );
        })}
      </TabsContent>

      <TabsContent value="education" className="space-y-5">
        {education.map((edu) => (
          <Card key={`${edu.institution}-${edu.duration}`}>
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
                <p className="text-sm text-muted-foreground leading-relaxed">{edu.summary}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  );
}
