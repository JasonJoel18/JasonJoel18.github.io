import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

function readInitialTheme(): 'dark' | 'light' {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applyTheme(next: 'dark' | 'light') {
  const root = document.documentElement;
  root.classList.toggle('dark', next === 'dark');
  try {
    localStorage.setItem('theme', next);
  } catch {
    // Ignore storage failures (private mode, etc.) — DOM class still applies.
  }
  // Keep the system chrome (mobile address bar, etc.) in sync.
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', next === 'dark' ? '#1a1a1d' : '#fafafa');
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setTheme(readInitialTheme());
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  const Icon = theme === 'dark' ? Sun : Moon;
  const nextLabel =
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? nextLabel : 'Toggle theme'}
      title={theme ? nextLabel : undefined}
      className="relative inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors overflow-hidden"
      suppressHydrationWarning
    >
      {theme === null ? (
        // Reserve the icon's footprint so the button doesn't shift on hydration.
        <span className="block h-[15px] w-[15px]" aria-hidden="true" />
      ) : reduce ? (
        <Icon size={15} aria-hidden="true" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="inline-flex"
          >
            <Icon size={15} aria-hidden="true" />
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
