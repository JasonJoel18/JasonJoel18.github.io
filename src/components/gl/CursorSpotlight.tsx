import { useEffect, useRef, useState } from 'react';

/**
 * Two-layer cursor follower:
 *   - large soft violet radial glow (positioned via CSS vars)
 *   - small mix-blend-difference dot that scales up over interactive elements
 */
export default function CursorSpotlight() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.innerWidth < 1024) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const wrap = wrapRef.current;
    const dot  = dotRef.current;
    if (!wrap || !dot) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, target: 1 };
    let rx = mouse.x, ry = mouse.y, rs = 1;
    let rafId = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const isInteractive = (el: EventTarget | null) => {
      let n = el as HTMLElement | null;
      while (n && n !== document.body) {
        if (n.tagName === 'A' || n.tagName === 'BUTTON' || n.dataset?.magnetic === 'true') return true;
        n = n.parentElement;
      }
      return false;
    };

    const tick = () => {
      rx += (mouse.x - rx) * 0.18;
      ry += (mouse.y - ry) * 0.18;
      rs += (mouse.target - rs) * 0.12;
      wrap.style.setProperty('--mx', `${mouse.x}px`);
      wrap.style.setProperty('--my', `${mouse.y}px`);
      dot.style.transform = `translate3d(${rx - 8}px, ${ry - 8}px, 0) scale(${rs})`;
      // Continue while not yet settled.
      const settled = Math.abs(mouse.x - rx) < 0.5 && Math.abs(mouse.y - ry) < 0.5 && Math.abs(mouse.target - rs) < 0.01;
      if (!settled) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const ensureTicking = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.target = isInteractive(e.target) ? 4 : 1;
      ensureTicking();
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
      }, 200);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    ensureTicking();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={wrapRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(700px circle at var(--mx, 50%) var(--my, 50%), rgba(167,139,250,0.08), transparent 35%)',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'white',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 60,
          willChange: 'transform',
        }}
      />
    </>
  );
}
