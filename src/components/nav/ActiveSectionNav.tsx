import { useEffect, useState } from 'react';
import { cn } from '~/lib/cn';

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  nav: NavItem[];
}

export default function ActiveSectionNav({ nav }: Props) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    // Only watch hash-style anchors. External / route links are ignored.
    const ids = nav
      .filter((n) => n.href.startsWith('#'))
      .map((n) => n.href.slice(1));
    if (ids.length === 0) return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Use IntersectionObserver to track which section dominates the viewport.
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = '';
        let best = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > best) {
            best = ratio;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
      },
      {
        // 25% from top, 60% from bottom — biased to "what the user is reading"
        rootMargin: '-25% 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [nav]);

  return (
    <nav
      aria-label="Section navigation"
      className="hidden md:flex items-center gap-1 text-sm"
    >
      {nav.map((item) => {
        const isAnchor = item.href.startsWith('#');
        const isActive = isAnchor && active === item.href.slice(1);
        return (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'relative px-3 py-1.5 rounded-full font-medium tracking-tight transition-colors duration-300',
              isActive
                ? 'text-[var(--color-fg)]'
                : 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]',
            )}
          >
            {isActive && (
              <span
                className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                aria-hidden
              />
            )}
            <span className="relative">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
