import { Github, Linkedin, Mail, Twitter, Instagram, Globe } from 'lucide-react';
import MotionIcon from './MotionIcon';
import { cn } from '~/lib/cn';

type Kind = 'github' | 'linkedin' | 'kaggle' | 'email' | 'twitter' | 'instagram' | 'website';

interface Props {
  kind: Kind;
  url: string;
  label: string;
  className?: string;
  size?: number;
}

function KaggleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336" />
    </svg>
  );
}

export default function SocialIcon({ kind, url, label, className, size = 18 }: Props) {
  const isExternal = !url.startsWith('mailto:') && !url.startsWith('#') && !url.startsWith('/');

  let inner: React.ReactNode = null;
  if (kind === 'github') inner = <Github size={size} aria-hidden="true" />;
  else if (kind === 'linkedin') inner = <Linkedin size={size} aria-hidden="true" />;
  else if (kind === 'email') inner = <Mail size={size} aria-hidden="true" />;
  else if (kind === 'twitter') inner = <Twitter size={size} aria-hidden="true" />;
  else if (kind === 'instagram') inner = <Instagram size={size} aria-hidden="true" />;
  else if (kind === 'website') inner = <Globe size={size} aria-hidden="true" />;
  else if (kind === 'kaggle') inner = <KaggleIcon size={size} />;

  return (
    <a
      href={url}
      aria-label={label}
      title={label}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      className={cn(
        'group inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--color-border)] text-[var(--color-fg-muted)]',
        'transition-[color,border-color,background-color] duration-300 ease-out',
        'hover:text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]',
        className,
      )}
    >
      <MotionIcon variant="tilt" reveal={false}>
        {inner}
      </MotionIcon>
    </a>
  );
}
