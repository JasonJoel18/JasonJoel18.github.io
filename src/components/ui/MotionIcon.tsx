import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ComponentType, ReactNode, SVGProps } from 'react';

type IconLike = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

interface Props {
  icon?: IconLike;
  children?: ReactNode;
  size?: number;
  strokeWidth?: number;
  variant?: 'tilt' | 'pulse' | 'none';
  reveal?: boolean;
  className?: string;
  'aria-hidden'?: boolean;
}

const tiltHover = { scale: 1.12, rotate: 3 };
const pulseHover = { scale: 1.18 };

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function MotionIcon({
  icon: Icon,
  children,
  size = 16,
  strokeWidth = 1.75,
  variant = 'tilt',
  reveal = true,
  className,
  'aria-hidden': ariaHidden = true,
}: Props) {
  const reduce = useReducedMotion();
  const hover = variant === 'pulse' ? pulseHover : variant === 'tilt' ? tiltHover : undefined;

  const content = children ?? (Icon ? <Icon size={size} strokeWidth={strokeWidth} aria-hidden={ariaHidden} /> : null);

  if (reduce) {
    return <span className={className} aria-hidden={ariaHidden}>{content}</span>;
  }

  return (
    <motion.span
      className={className}
      aria-hidden={ariaHidden}
      style={{ display: 'inline-flex' }}
      {...(reveal
        ? {
            variants: revealVariants,
            initial: 'hidden',
            whileInView: 'show',
            viewport: { once: true, margin: '-10%' },
          }
        : {})}
      whileHover={hover}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      {content}
    </motion.span>
  );
}
