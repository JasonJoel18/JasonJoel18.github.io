import { useEffect, useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { cn } from '~/lib/cn';

interface NavItem { label: string; href: string }
interface Cta { label: string; href: string }
interface Props {
  nav: NavItem[];
  cta: { primary: Cta; secondary: Cta };
}

export default function MobileMenu({ nav, cta }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-[var(--color-border)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:border-[var(--color-accent)] transition-colors"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            'absolute right-3 left-3 top-20 rounded-2xl glass p-4 origin-top transition-transform duration-300 ease-out',
            open ? 'scale-100' : 'scale-95',
          )}
        >
          <nav className="flex flex-col">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-[var(--color-fg)] text-base font-medium tracking-tight hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="my-3 h-px bg-[var(--color-border)]" />
            <a
              href={cta.primary.href}
              download
              className="inline-flex items-center justify-center gap-2 h-11 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] font-medium"
            >
              <Download size={14} /> {cta.primary.label}
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
