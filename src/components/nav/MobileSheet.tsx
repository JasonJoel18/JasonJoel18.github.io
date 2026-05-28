import { useState } from 'react';
import { Menu, Download } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '~/components/ui/Sheet';
import { cn } from '~/lib/cn';

interface NavItem { label: string; href: string }
interface Cta { label: string; href: string }

interface Props {
  nav: NavItem[];
  cta: { primary: Cta; secondary: Cta };
}

export default function MobileSheet({ nav, cta }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(
          'md:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground hover:bg-muted transition-colors',
        )}
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col">
          {nav.map((item) => (
            <SheetClose asChild key={item.href}>
              <a
                href={item.href}
                className="px-3 py-3 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-6">
          <a
            href={cta.primary.href}
            download
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center gap-2 h-10 rounded-[var(--radius)] bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            {cta.primary.label}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
