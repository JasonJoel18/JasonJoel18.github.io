import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Slides an overlay up from the bottom on first paint, then unmounts.
 * Pairs with Astro's view transitions where supported but works as a standalone
 * mount-time entrance effect.
 */
export default function PageTransition() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    const id = window.setTimeout(() => setShow(false), 30);
    return () => window.clearTimeout(id);
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-bg)',
            zIndex: 200,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}
