import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
    const ids = nav.filter((n) => n.href.startsWith('#')).map((n) => n.href.slice(1));
    if (ids.length === 0) return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibility.set(entry.target.id, entry.intersectionRatio);
        let bestId = '';
        let best = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > best) { best = ratio; bestId = id; }
        }
        if (bestId) setActive(bestId);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [nav]);

  return (
    <nav aria-label="Section navigation" className="hidden md:flex items-center gap-1 text-xs font-mono uppercase tracking-[0.15em]">
      {nav.map((item) => {
        const isAnchor = item.href.startsWith('#');
        const isActive = isAnchor && active === item.href.slice(1);
        return (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'relative px-3 py-2 transition-colors duration-300',
              isActive ? 'text-[var(--color-fg)]' : 'text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)]',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute left-3 right-3 bottom-1 h-px bg-[var(--color-accent)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
