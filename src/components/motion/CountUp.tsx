import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface Props {
  value: string;
  duration?: number;
  className?: string;
}

const EASE_OUT_QUART = (t: number) => 1 - Math.pow(1 - t, 4);

export default function CountUp({ value, duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();

  const match = value.match(/^([^\d-]*)(-?[\d.]+)(.*)$/);
  const prefix = match?.[1] ?? '';
  const target = match ? parseFloat(match[2]) : NaN;
  const suffix = match?.[3] ?? '';
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0;

  const [display, setDisplay] = useState(
    isNaN(target) || reduce ? value : `${prefix}0${suffix}`,
  );

  useEffect(() => {
    if (!inView || isNaN(target) || reduce) {
      if (reduce) setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = EASE_OUT_QUART(t);
      const current = (target * eased).toFixed(decimals);
      setDisplay(`${prefix}${current}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, prefix, suffix, decimals, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
