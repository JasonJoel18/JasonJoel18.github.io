import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { cn } from '~/lib/cn';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
  download?: boolean;
  strength?: number; // px max translation
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  ariaLabel,
  external,
  download,
  strength = 8,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.6 });

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const Tag: typeof motion.a | typeof motion.button = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref as never}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      download={download ? '' : undefined}
      aria-label={ariaLabel}
      style={{ x: sx, y: sy }}
      className={cn('inline-block will-change-transform', className)}
    >
      {children}
    </Tag>
  );
}
