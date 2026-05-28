import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  Code,
  Command as CmdIcon,
  Download,
  FileText,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Search,
  User,
} from 'lucide-react';

interface Action {
  id: string;
  label: string;
  hint?: string;
  icon: typeof Home;
  run: () => void;
  group: 'navigate' | 'links' | 'actions';
  keywords?: string;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === '/' && !open && !isTypingInForm(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const go = (hash: string) => () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      window.location.hash = hash;
    }
  };
  const openUrl = (url: string, sameTab = false) => () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      if (sameTab) window.location.href = url;
      else window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const actions = useMemo<Action[]>(
    () => [
      { id: 'home', label: 'Go to top', icon: Home, run: go('#hero'), group: 'navigate', keywords: 'top hero start' },
      { id: 'about', label: 'About', icon: User, run: go('#about'), group: 'navigate' },
      { id: 'stack', label: 'Skills and tools', icon: Layers, run: go('#skills'), group: 'navigate', keywords: 'stack tech tools' },
      { id: 'projects', label: 'Projects', icon: Code, run: go('#projects'), group: 'navigate' },
      { id: 'experience', label: 'Experience and education', icon: Briefcase, run: go('#experience'), group: 'navigate' },
      { id: 'contact', label: 'Contact', icon: Mail, run: go('#contact'), group: 'navigate' },

      { id: 'cv', label: 'Open CV page', icon: FileText, run: openUrl('/cv/', true), group: 'actions', keywords: 'resume curriculum' },
      { id: 'cv-pdf', label: 'Download CV (PDF)', icon: Download, run: openUrl('/cv.pdf'), group: 'actions', keywords: 'resume pdf' },

      { id: 'gh', label: 'GitHub · JasonJoel18', icon: Github, run: openUrl('https://github.com/JasonJoel18'), group: 'links' },
      { id: 'li', label: 'LinkedIn', icon: Linkedin, run: openUrl('https://www.linkedin.com/in/jason-joel-pinto-a44a16190/'), group: 'links' },
      { id: 'email', label: 'Email Jason', icon: Mail, run: openUrl('mailto:jasonjoel1899@gmail.com', true), group: 'links' },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(query) ||
        a.id.includes(query) ||
        (a.keywords ?? '').includes(query),
    );
  }, [q, actions]);

  useEffect(() => {
    if (active >= filtered.length) setActive(0);
  }, [filtered, active]);

  const grouped = useMemo(() => {
    const g: Record<string, Action[]> = { navigate: [], actions: [], links: [] };
    filtered.forEach((a) => g[a.group].push(a));
    return g;
  }, [filtered]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open command palette"
          className="inline-flex items-center gap-2 h-9 px-2.5 rounded-md border border-border bg-background text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors font-mono"
        >
          <Search size={14} aria-hidden="true" />
          <span className="hidden sm:inline">Jump to</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-px text-[10px] tracking-wider">
            <CmdIcon size={10} />K
          </kbd>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm cmd-overlay" />
        <Dialog.Content
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(filtered.length - 1, a + 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(0, a - 1));
            } else if (e.key === 'Enter') {
              e.preventDefault();
              filtered[active]?.run();
            }
          }}
          className="fixed left-1/2 top-[18vh] z-50 w-[min(640px,92vw)] -translate-x-1/2 overflow-hidden rounded-[var(--radius)] border border-border bg-popover text-popover-foreground shadow-2xl cmd-content"
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Jump to a section, open a link, or download the CV.
          </Dialog.Description>

          <div className="flex items-center gap-2 border-b border-border px-3.5">
            <Search size={16} className="text-muted-foreground" aria-hidden="true" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type a section or command…"
              className="flex-1 h-11 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-muted px-1.5 py-px text-[10px] text-muted-foreground tracking-wider">
              esc
            </kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No matches.
              </div>
            ) : (
              (['navigate', 'actions', 'links'] as const).map((group) => {
                const items = grouped[group];
                if (!items?.length) return null;
                return (
                  <div key={group} className="py-1.5">
                    <div className="px-3.5 pb-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
                      {group}
                    </div>
                    {items.map((a) => {
                      const idx = filtered.indexOf(a);
                      const isActive = idx === active;
                      const Icon = a.icon;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onMouseEnter={() => setActive(idx)}
                          onClick={a.run}
                          className={
                            'flex w-full items-center gap-3 px-3.5 py-2 text-sm text-left transition-colors ' +
                            (isActive
                              ? 'bg-muted text-foreground'
                              : 'text-muted-foreground hover:text-foreground')
                          }
                        >
                          <Icon size={15} className="shrink-0" aria-hidden="true" />
                          <span className="flex-1 truncate">{a.label}</span>
                          {isActive && (
                            <ArrowRight size={13} className="text-muted-foreground" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border px-3.5 py-2 text-[10px] text-muted-foreground font-mono">
            <span className="flex items-center gap-2">
              <kbd className="rounded border border-border bg-muted px-1.5 py-px">↑↓</kbd>
              navigate
              <kbd className="rounded border border-border bg-muted px-1.5 py-px ml-2">↵</kbd>
              select
            </span>
            <span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-px">esc</kbd> close
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function isTypingInForm(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}
