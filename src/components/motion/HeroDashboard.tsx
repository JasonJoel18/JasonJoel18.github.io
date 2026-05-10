import { motion, useInView, useReducedMotion, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Activity, Database, Sparkles } from 'lucide-react';

const SERIES = [
  { label: 'Q1', a: 32, b: 18 },
  { label: 'Q2', a: 41, b: 22 },
  { label: 'Q3', a: 38, b: 28 },
  { label: 'Q4', a: 56, b: 35 },
  { label: 'Q5', a: 62, b: 41 },
  { label: 'Q6', a: 71, b: 48 },
  { label: 'Q7', a: 78, b: 55 },
  { label: 'Q8', a: 91, b: 64 },
];

const COUNTERS = [
  { label: 'Queries shipped', value: 200, suffix: '+', icon: Database },
  { label: 'Efficiency gain', value: 40, suffix: '%', icon: Activity },
  { label: 'Dashboards live', value: 15, suffix: '+', icon: Sparkles },
];

const W = 480;
const H = 220;
const PAD_X = 24;
const PAD_Y = 22;

function buildPath(values: number[], smooth = true) {
  const max = 100;
  const stepX = (W - PAD_X * 2) / (values.length - 1);
  const points = values.map((v, i) => {
    const x = PAD_X + i * stepX;
    const y = H - PAD_Y - (v / max) * (H - PAD_Y * 2);
    return [x, y] as const;
  });
  if (!smooth) return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const cx = (px + x) / 2;
    d += ` C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }
  return d;
}

function Counter({ value, suffix, label, Icon, delay }: { value: number; suffix: string; label: string; Icon: typeof Database; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, delay, reduce]);

  return (
    <div className="glass-sm rounded-lg px-3 py-2.5 flex items-center gap-3 min-w-0">
      <div className="shrink-0 w-8 h-8 rounded-md grid place-items-center bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
        <Icon size={16} strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-0.5 leading-none">
          <span ref={ref} className="text-xl sm:text-2xl font-semibold tabular-nums">{display}</span>
          <span className="text-base font-semibold text-[var(--color-accent)]">{suffix}</span>
        </div>
        <div className="label-mono mt-1 truncate">{label}</div>
      </div>
    </div>
  );
}

export default function HeroDashboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  const valuesA = SERIES.map((s) => s.a);
  const valuesB = SERIES.map((s) => s.b);
  const linePath = buildPath(valuesA);
  const lineB = buildPath(valuesB);
  const areaPath = `${linePath} L ${W - PAD_X} ${H - PAD_Y} L ${PAD_X} ${H - PAD_Y} Z`;

  const drawDuration = reduce ? 0.001 : 1.6;

  return (
    <div ref={ref} className="glass-panel relative overflow-hidden p-4 sm:p-5">
      {/* Top bar — terminal chrome */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[var(--color-danger)] opacity-70" />
          <span className="w-2 h-2 rounded-full bg-[var(--color-warning)] opacity-70" />
          <span className="w-2 h-2 rounded-full bg-[var(--color-success)] opacity-70" />
          <span className="label-mono ml-2 truncate">~/dashboards/kpi-live.tsx</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[var(--color-success)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-[var(--color-success)] opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
          </span>
          <span className="label-mono !text-[var(--color-success)]">live</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative mt-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hd-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hd-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* horizontal grid lines */}
          {[0.25, 0.5, 0.75].map((p) => (
            <line
              key={p}
              x1={PAD_X}
              x2={W - PAD_X}
              y1={PAD_Y + p * (H - PAD_Y * 2)}
              y2={PAD_Y + p * (H - PAD_Y * 2)}
              stroke="#2d3346"
              strokeDasharray="2 4"
              strokeWidth="1"
              opacity="0.6"
            />
          ))}

          {/* area fill */}
          <motion.path
            d={areaPath}
            fill="url(#hd-area)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          {/* secondary line */}
          <motion.path
            d={lineB}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            strokeOpacity="0.55"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: drawDuration, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* primary line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#hd-line)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: drawDuration, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* data points on primary line */}
          {SERIES.map((_, i) => {
            const stepX = (W - PAD_X * 2) / (SERIES.length - 1);
            const x = PAD_X + i * stepX;
            const y = H - PAD_Y - (valuesA[i] / 100) * (H - PAD_Y * 2);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={2.5}
                fill="#0c0e16"
                stroke="#a78bfa"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: reduce ? 0 : 0.6 + i * 0.08 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend + counters */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {COUNTERS.map((c, i) => (
          <Counter
            key={c.label}
            value={c.value}
            suffix={c.suffix}
            label={c.label}
            Icon={c.icon}
            delay={0.4 + i * 0.15}
          />
        ))}
      </div>

      {/* Footer line */}
      <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
        <span className="label-mono truncate">throughput · last 8 quarters</span>
        <span className="inline-flex items-center gap-1 text-xs text-[var(--color-success)] font-medium tabular-nums">
          <ArrowUpRight size={12} strokeWidth={2} /> +184%
        </span>
      </div>
    </div>
  );
}
