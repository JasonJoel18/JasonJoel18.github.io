import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface Line {
  prompt?: string;
  text: string;
  responseDelay?: number;
  className?: string;
  output?: boolean;
}

interface Props {
  title?: string;
  lines: Line[];
  typingSpeed?: number;
  startDelay?: number;
  className?: string;
}

export default function Terminal({
  title = 'jason@portfolio:~',
  lines,
  typingSpeed = 22,
  startDelay = 250,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();

  const [shownLines, setShownLines] = useState<string[]>(
    reduce ? lines.map((l) => l.text) : [],
  );
  const [cursorOn, setCursorOn] = useState(true);
  const [done, setDone] = useState(reduce);

  useEffect(() => {
    if (!inView || reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    let lineIdx = 0;
    let charIdx = 0;
    const current: string[] = [];

    const step = () => {
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[lineIdx];
      if (line.output) {
        current[lineIdx] = line.text;
        setShownLines([...current]);
        lineIdx += 1;
        charIdx = 0;
        timer = setTimeout(step, 120);
        return;
      }
      if (charIdx <= line.text.length) {
        current[lineIdx] = line.text.slice(0, charIdx);
        setShownLines([...current]);
        charIdx += 1;
        timer = setTimeout(step, typingSpeed);
      } else {
        lineIdx += 1;
        charIdx = 0;
        timer = setTimeout(step, line.responseDelay ?? 180);
      }
    };

    timer = setTimeout(step, startDelay);
    return () => clearTimeout(timer);
  }, [inView, reduce, lines, typingSpeed, startDelay]);

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => setCursorOn((c) => !c), 520);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={
        'overflow-hidden rounded-[var(--radius)] border border-border bg-[color:var(--code-bg)] font-mono text-[13px] leading-relaxed shadow-sm ' +
        (className ?? '')
      }
    >
      <div className="flex items-center justify-between border-b border-border/80 px-3.5 py-2 bg-muted/40">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.16_28)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.14_85)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_148)]" />
        </div>
        <span className="text-[11px] text-muted-foreground tabular-nums">{title}</span>
        <span className="h-2.5 w-2.5 opacity-0" />
      </div>

      <div className="px-4 py-3.5 overflow-x-auto min-h-[180px]">
        {lines.map((line, i) => {
          const shown = shownLines[i] ?? '';
          const isActive = !done && i === shownLines.findIndex((s, idx) => idx === i) && shown.length < line.text.length;
          const reallyActive =
            !done &&
            i === shownLines.length - 1 &&
            !line.output &&
            shown.length < line.text.length;
          return (
            <div key={i} className={'whitespace-pre ' + (line.className ?? '')}>
              {line.prompt && (
                <span className="text-[color:var(--code-prompt)] select-none">{line.prompt}</span>
              )}
              <span className={line.output ? 'text-muted-foreground' : 'text-foreground'}>
                {shown}
              </span>
              {reallyActive && cursorOn && (
                <span className="inline-block w-[7px] h-[14px] -mb-0.5 ml-0.5 bg-foreground/80 align-middle" />
              )}
            </div>
          );
        })}
        {done && !reduce && (
          <div className="whitespace-pre">
            <span className="text-[color:var(--code-prompt)] select-none">$ </span>
            {cursorOn && (
              <span className="inline-block w-[7px] h-[14px] -mb-0.5 bg-foreground/80 align-middle" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
