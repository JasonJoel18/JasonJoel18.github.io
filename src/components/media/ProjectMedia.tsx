import { useEffect, useRef, useState } from 'react';
import EmbedFrame from './EmbedFrame';
import { cn } from '~/lib/cn';

export type Media =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string; alt: string }
  | { type: 'gif';   src: string; alt: string }
  | { type: 'embed'; src: string; aspect?: '16/9' | '4/3' | '21/9' | '1/1'; provider?: 'tableau' | 'powerbi' | 'iframe' | 'youtube'; alt?: string };

interface Props {
  media: Media;
  hovered?: boolean;
  className?: string;
}

export default function ProjectMedia({ media, hovered = false, className }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Lazy-attach the video src on first hover; play/pause based on `hovered` prop.
  useEffect(() => {
    if (media.type !== 'video') return;
    const v = videoRef.current;
    if (!v) return;

    if (hovered) {
      if (!videoReady) {
        v.src = media.src;
        v.load();
        setVideoReady(true);
      }
      v.play().catch(() => {/* autoplay can fail silently on slow networks */});
    } else if (videoReady) {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered, media, videoReady]);

  if (media.type === 'embed') {
    return (
      <EmbedFrame
        src={media.src}
        aspect={media.aspect ?? '16/9'}
        provider={media.provider}
        title={media.alt}
        className={className}
      />
    );
  }

  if (media.type === 'video') {
    return (
      <div className={cn('relative w-full aspect-video overflow-hidden rounded-[var(--radius)] bg-black border border-border', className)}>
        <img
          src={media.poster}
          alt={media.alt}
          loading="lazy"
          decoding="async"
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
            hovered ? 'opacity-0' : 'opacity-100',
          )}
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={media.poster}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
            hovered ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>
    );
  }

  // image | gif
  return (
    <div className={cn('relative w-full aspect-video overflow-hidden rounded-[var(--radius)] bg-muted border border-border', className)}>
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
      />
    </div>
  );
}
