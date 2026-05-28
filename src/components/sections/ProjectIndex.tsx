import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

export interface ProjectRow {
  slug: string;
  title: string;
  year: number;
  tech: string[];
  role?: string;
  featured?: boolean;
  cover: string;
  coverAlt: string;
}

interface Props {
  projects: ProjectRow[];
}

const PREVIEW_W = 320;
const PREVIEW_H = 200;
const OFFSET_X = 28;
const OFFSET_Y = 24;
const LERP = 0.22;

export default function ProjectIndex({ projects }: Props) {
  const listRef = useRef<HTMLOListElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const reduce = useReducedMotion();

  // Cursor-follow preview. Mounted once, transformed on pointermove.
  // Skipped entirely on coarse pointers (touch) — those users just tap to navigate.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    const preview = previewRef.current;
    const list = listRef.current;
    if (!preview || !list) return;

    let raf = 0;
    let tx = 0, ty = 0;
    let x = 0,  y = 0;
    let visible = false;

    const tick = () => {
      if (reduce) {
        x = tx;
        y = ty;
      } else {
        x += (tx - x) * LERP;
        y += (ty - y) * LERP;
      }
      preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (visible || Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) {
        raf = window.requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const maxX = window.innerWidth - PREVIEW_W - 12;
      const maxY = window.innerHeight - PREVIEW_H - 12;
      tx = Math.min(Math.max(e.clientX + OFFSET_X, 12), maxX);
      ty = Math.min(Math.max(e.clientY + OFFSET_Y, 12), maxY);
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const onEnter = () => {
      // Only show the preview if at least one project actually has a cover to render.
      if (!projects.some((p) => p.cover)) return;
      visible = true;
      preview.dataset.visible = 'true';
      // On first show, snap so the preview doesn't fly in from a stale position.
      if (!raf) {
        x = tx;
        y = ty;
        preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onLeave = () => {
      visible = false;
      preview.dataset.visible = 'false';
    };

    list.addEventListener('pointermove', onMove);
    list.addEventListener('pointerenter', onEnter);
    list.addEventListener('pointerleave', onLeave);

    return () => {
      list.removeEventListener('pointermove', onMove);
      list.removeEventListener('pointerenter', onEnter);
      list.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div className="relative">
      <ol
        ref={listRef}
        className="group/list border-t border-border"
        onPointerLeave={() => setActiveIdx(null)}
      >
        {projects.map((p, i) => {
          const isActive = activeIdx === i;
          return (
            <li key={p.slug} className="border-b border-border">
              <a
                href={`/projects/${p.slug}/`}
                onPointerEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                onBlur={() => setActiveIdx(null)}
                className={[
                  'relative grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-4 sm:gap-x-8',
                  'py-6 sm:py-9 transition-[opacity,transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  // Hover-dim only on fine pointers; coarse pointers (touch) tap-and-go without the noise.
                  'pointer-fine:group-hover/list:opacity-40',
                  'pointer-fine:hover:!opacity-100 focus-visible:!opacity-100',
                  'pointer-fine:hover:translate-x-1.5 focus-visible:translate-x-1.5',
                  isActive ? 'text-foreground' : '',
                ].join(' ')}
              >
                <span className="font-mono text-[11px] tabular-nums uppercase tracking-[0.2em] text-muted-foreground self-center">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0">
                  <div className="flex items-baseline flex-wrap gap-x-3">
                    <h3 className="font-mono text-lg sm:text-xl md:text-[1.5rem] font-medium leading-[1.2]">
                      {p.title}
                    </h3>
                    {p.featured && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80 translate-y-[-2px]">
                        featured
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.02em] text-muted-foreground">
                    {p.tech.slice(0, 5).map((t, ti) => (
                      <span key={t} className="inline-flex items-center gap-2">
                        {ti > 0 && <span aria-hidden="true" className="opacity-40">·</span>}
                        <span>{t}</span>
                      </span>
                    ))}
                    {p.tech.length > 5 && (
                      <span className="text-muted-foreground/60">+{p.tech.length - 5}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-5 self-center">
                  <span className="font-mono text-xs tabular-nums text-muted-foreground hidden sm:inline">
                    {p.year}
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/list:[:hover_&]:translate-x-1 group-hover/list:[:hover_&]:-translate-y-1"
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ol>

      {/* Cursor-follow preview. Fixed to viewport, transformed in JS. */}
      <div
        ref={previewRef}
        aria-hidden="true"
        data-visible="false"
        className={[
          'pointer-events-none fixed top-0 left-0 z-40',
          'rounded-[var(--radius)] overflow-hidden border border-border bg-card shadow-xl',
          'opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'data-[visible=true]:opacity-100',
          'hidden md:block',
        ].join(' ')}
        style={{ width: PREVIEW_W, height: PREVIEW_H, willChange: 'transform' }}
      >
        {projects.map((p, i) =>
          p.cover ? (
            <img
              key={p.slug}
              src={p.cover}
              alt=""
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
              className={[
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-200',
                activeIdx === i ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}
