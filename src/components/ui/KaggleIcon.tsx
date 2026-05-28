import { siKaggle } from 'simple-icons';

interface Props {
  size?: number;
  className?: string;
}

export default function KaggleIcon({ size = 18, className }: Props) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-label="Kaggle"
      className={className}
      fill="currentColor"
    >
      <title>Kaggle</title>
      <path d={siKaggle.path} />
    </svg>
  );
}
