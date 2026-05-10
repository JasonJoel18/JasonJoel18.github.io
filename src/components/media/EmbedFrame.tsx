import { useEffect, useRef, useState } from 'react';
import { cn } from '~/lib/cn';

interface Props {
  src: string;
  aspect?: '16/9' | '4/3' | '21/9' | '1/1';
  title?: string;
  provider?: 'tableau' | 'powerbi' | 'iframe' | 'youtube';
  className?: string;
}

export default function EmbedFrame({
  src,
  aspect = '16/9',
  title = 'Embedded content',
  provider = 'iframe',
  className,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Lazy-mount the iframe only when scrolled near viewport — saves bandwidth + CPU.
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMounted(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-provider={provider}
      className={cn('w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black', className)}
      style={{ aspectRatio: aspect.replace('/', ' / ') }}
    >
      {mounted ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="fullscreen; clipboard-write; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full border-0"
        />
      ) : (
        <div className="h-full w-full grid place-items-center text-sm text-[var(--color-fg-subtle)]">
          Loading embed…
        </div>
      )}
    </div>
  );
}
