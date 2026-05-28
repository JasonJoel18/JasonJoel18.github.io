import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  CornerDownLeft,
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

type Group = 'navigate' | 'actions' | 'links';

interface Action {
  id: string;
  label: string;
  meta?: string;
  icon: typeof Home;
  run: () => void;
  group: Group;
  external?: boolean;
  keywords?: string;
}

const GROUP_LABEL: Record<Group, string> = {
  navigate: 'Sections',
  actions: 'Actions',
  links: 'Elsewhere',
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
      const id = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(id);
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
      { id: 'home', label: 'Go to top', meta: '#hero', icon: Home, run: go('#hero'), group: 'navigate', keywords: 'top hero start' },
      { id: 'about', label: 'About', meta: '#about', icon: User, run: go('#about'), group: 'navigate' },
      { id: 'stack', label: 'Skills & tools', meta: '#skills', icon: Layers, run: go('#skills'), group: 'navigate', keywords: 'stack tech tools' },
      { id: 'projects', label: 'Projects', meta: '#projects', icon: Code, run: go('#projects'), group: 'navigate' },
      { id: 'experience', label: 'Experience & education', meta: '#experience', icon: Briefcase, run: go('#experience'), group: 'navigate' },
      { id: 'contact', label: 'Contact', meta: '#contact', icon: Mail, run: go('#contact'), group: 'navigate' },

      { id: 'cv', label: 'Open CV page', meta: '/cv', icon: FileText, run: openUrl('/cv/', true), group: 'actions', keywords: 'resume curriculum' },
      { id: 'cv-pdf', label: 'Download CV', meta: 'PDF', icon: Download, run: openUrl('/cv.pdf'), group: 'actions', external: true, keywords: 'resume pdf' },

      { id: 'gh', label: 'GitHub', meta: '@JasonJoel18', icon: Github, run: openUrl('https://github.com/JasonJoel18'), group: 'links', external: true },
      { id: 'li', label: 'LinkedIn', meta: 'jason-joel-pinto', icon: Linkedin, run: openUrl('https://www.linkedin.com/in/jason-joel-pinto-a44a16190/'), group: 'links', external: true },
      { id: 'email', label: 'Email Jason', meta: 'jasonjoel1899@gmail.com', icon: Mail, run: openUrl('mailto:jasonjoel1899@gmail.com', true), group: 'links' },
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
        (a.keywords ?? '').includes(query) ||
        (a.meta ?? '').toLowerCase().includes(query),
    );
  }, [q, actions]);

  useEffect(() => {
    if (active >= filtered.length) setActive(0);
  }, [filtered, active]);

  // Keep the active row in view as the user arrows through the list.
  useEffect(() => {
    if (!listRef.current) return;
    const row = listRef.current.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    if (row) row.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const grouped = useMemo(() => {
    const g: Record<Group, Action[]> = { navigate: [], actions: [], links: [] };
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
        <Dialog.Overlay
          data-cmd-scroll-lock-ignore
          className="cmd-overlay fixed inset-0 z-50 bg-[oklch(0.08_0.014_256_/_0.55)] backdrop-blur-[6px]"
        />
        <Dialog.Content
          data-cmd-scroll-lock-ignore
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
            } else if (e.key === 'Home') {
              e.preventDefault();
              setActive(0);
            } else if (e.key === 'End') {
              e.preventDefault();
              setActive(Math.max(0, filtered.length - 1));
            }
          }}
          className="cmd-content fixed left-1/2 top-[14vh] z-50 w-[min(640px,92vw)] overflow-hidden rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--primary)_28%,transparent),0_8px_24px_-8px_color-mix(in_oklab,var(--foreground)_18%,transparent)]"
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Jump to a section, open a link, or download the CV.
          </Dialog.Description>

          {/* Search row */}
          <div className="flex items-center gap-3 border-b border-border/70 px-4 h-14">
            <Search size={17} className="text-muted-foreground shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sections, actions, links…"
              className="flex-1 min-w-0 h-full bg-transparent outline-none text-[15px] placeholder:text-muted-foreground/70 caret-primary"
              autoComplete="off"
              spellCheck={false}
              aria-label="Search commands"
            />
            {q && (
              <button
                type="button"
                onClick={() => {
                  setQ('');
                  inputRef.current?.focus();
                }}
                className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5"
              >
                clear
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-muted px-1.5 py-px text-[10px] text-muted-foreground tracking-wider font-mono">
              esc
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-[58vh] overflow-y-auto py-1.5 scroll-smooth">
            {filtered.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <div className="text-sm text-foreground">No matches for <span className="font-mono text-primary">"{q}"</span></div>
                <div className="mt-1.5 text-xs text-muted-foreground">
                  Try <span className="font-mono">projects</span>, <span className="font-mono">cv</span>, or <span className="font-mono">contact</span>.
                </div>
              </div>
            ) : (
              (['navigate', 'actions', 'links'] as const).map((group, gi) => {
                const items = grouped[group];
                if (!items?.length) return null;
                return (
                  <div key={group} className={gi === 0 ? 'pt-1.5' : 'pt-2.5'}>
                    <div className="flex items-center gap-2 px-4 pb-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 font-mono">
                      <span>{GROUP_LABEL[group]}</span>
                      <span className="h-px flex-1 bg-border/60" aria-hidden="true" />
                      <span className="tabular-nums">{String(items.length).padStart(2, '0')}</span>
                    </div>
                    <div className="px-1.5">
                      {items.map((a) => {
                        const idx = filtered.indexOf(a);
                        const isActive = idx === active;
                        const Icon = a.icon;
                        const Trail = a.external ? ArrowUpRight : CornerDownLeft;
                        return (
                          <button
                            key={a.id}
                            type="button"
                            data-idx={idx}
                            onMouseEnter={() => setActive(idx)}
                            onClick={a.run}
                            className={
                              'group/cmd flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm text-left transition-colors ' +
                              (isActive
                                ? 'bg-accent text-foreground'
                                : 'text-muted-foreground hover:text-foreground')
                            }
                          >
                            <span
                              className={
                                'inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors ' +
                                (isActive
                                  ? 'border-primary/40 bg-background text-primary'
                                  : 'border-border/70 bg-background/60 text-muted-foreground')
                              }
                              aria-hidden="true"
                            >
                              <Icon size={14} />
                            </span>
                            <span className="flex-1 truncate text-foreground/90">{a.label}</span>
                            {a.meta && (
                              <span
                                className={
                                  'hidden sm:inline font-mono text-[11px] tracking-[0.04em] truncate max-w-[40%] ' +
                                  (isActive ? 'text-muted-foreground' : 'text-muted-foreground/60')
                                }
                              >
                                {a.meta}
                              </span>
                            )}
                            <Trail
                              size={13}
                              className={
                                'shrink-0 transition-opacity ' +
                                (isActive ? 'opacity-100 text-primary' : 'opacity-0')
                              }
                              aria-hidden="true"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 border-t border-border/70 px-4 py-2.5 text-[10px] text-muted-foreground font-mono uppercase tracking-[0.16em]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-muted px-1.5 py-px normal-case tracking-wider">↑↓</kbd>
                navigate
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-muted px-1.5 py-px normal-case tracking-wider">↵</kbd>
                select
              </span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <span>{filtered.length} {filtered.length === 1 ? 'result' : 'results'}</span>
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
