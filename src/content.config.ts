import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const socialKind = z.enum(['github', 'linkedin', 'kaggle', 'email', 'twitter', 'instagram', 'website']);

const profile = defineCollection({
  loader: file('src/content/profile/profile.yaml'),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    heroSubtitle: z.string(),
    heroTagline: z.string().optional(),
    heroProof: z.array(z.string()).length(3).optional(),
    avatar: z.string(),
    location: z.string(),
    availability: z.string(),
    socials: z.array(
      z.object({
        kind: socialKind,
        url: z.string(),
        label: z.string(),
      }),
    ),
    about: z.array(z.string()),
  }),
});

const site = defineCollection({
  loader: file('src/content/site/site.yaml'),
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: z.string(),
    }),
    nav: z.array(z.object({ label: z.string(), href: z.string() })),
    cta: z.object({
      primary: z.object({ label: z.string(), href: z.string() }),
      secondary: z.object({ label: z.string(), href: z.string() }),
    }),
    footer: z.object({
      tagline: z.string(),
      builtWith: z.string(),
    }),
  }),
});

const cv = defineCollection({
  loader: file('src/content/cv/cv.yaml'),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    summary: z.string(),
    contact: z.object({
      location: z.string(),
      phone: z.string().optional(),
      email: z.string(),
      linkedin: z.object({ label: z.string(), url: z.string() }),
      github: z.object({ label: z.string(), url: z.string() }),
    }),
    skills: z.array(
      z.object({
        category: z.string(),
        items: z.array(z.string()),
      }),
    ),
    languages: z.array(
      z.object({
        name: z.string(),
        level: z.string(),
      }),
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        duration: z.string(),
        location: z.string(),
        summary: z.string().optional(),
      }),
    ),
    work: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        duration: z.string(),
        location: z.string(),
        points: z.array(z.string()),
      }),
    ),
    certifications: z.array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        year: z.string().optional(),
      }),
    ),
  }),
});

const mediaSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('image'),
    src: z.string(),
    alt: z.string(),
  }),
  z.object({
    type: z.literal('video'),
    src: z.string(),
    poster: z.string(),
    alt: z.string(),
  }),
  z.object({
    type: z.literal('gif'),
    src: z.string(),
    alt: z.string(),
  }),
  z.object({
    type: z.literal('embed'),
    src: z.string(),
    aspect: z.enum(['16/9', '4/3', '21/9', '1/1']).default('16/9'),
    provider: z.enum(['tableau', 'powerbi', 'iframe', 'youtube']).default('iframe'),
    alt: z.string().optional(),
  }),
]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,md,mdx}', base: 'src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number().int(),
    featured: z.boolean().default(false),
    tech: z.array(z.string()),
    role: z.string().optional(),
    media: mediaSchema,
    links: z
      .object({
        live: z.string().nullable().optional(),
        github: z.string().nullable().optional(),
        demo: z.string().nullable().optional(),
        article: z.string().nullable().optional(),
      })
      .default({}),
    caseStudy: z.boolean().default(false),
    order: z.number().int().default(0),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .default([]),
    problem: z.string().optional(),
    approach: z.string().optional(),
    results: z.string().optional(),
  }),
});

export const collections = { profile, site, cv, projects };
