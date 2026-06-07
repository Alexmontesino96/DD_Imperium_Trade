"use client";

import {
  CSSProperties,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type EasingFn = (t: number) => number;

export const Easing: Record<string, EasingFn> = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
};

export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export function interpolate(
  input: number[],
  output: number[],
  ease: EasingFn | EasingFn[] = Easing.linear
) {
  return (t: number) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

type TimelineCtx = { time: number; duration: number };
const TimelineContext = createContext<TimelineCtx>({ time: 0, duration: 10 });
export const useTime = () => useContext(TimelineContext).time;

type SpriteCtx = { localTime: number; progress: number; duration: number };
const SpriteContext = createContext<SpriteCtx>({
  localTime: 0,
  progress: 0,
  duration: 0,
});
export const useSprite = () => useContext(SpriteContext);

export function Sprite({
  start = 0,
  end = Infinity,
  children,
  keepMounted = false,
}: {
  start?: number;
  end?: number;
  keepMounted?: boolean;
  children: ReactNode | ((ctx: SpriteCtx) => ReactNode);
}) {
  const { time } = useContext(TimelineContext);
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;

  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress =
    duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value: SpriteCtx = { localTime, progress, duration };

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </SpriteContext.Provider>
  );
}

export function Stage({
  width,
  height,
  duration,
  background = "transparent",
  scaleBoost = 1,
  children,
}: {
  width: number;
  height: number;
  duration: number;
  background?: string;
  scaleBoost?: number;
  children: ReactNode;
}) {
  const [time, setTime] = useState(0);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const s = Math.min(el.clientWidth / width, el.clientHeight / height);
      setScale(Math.max(0.05, s) * scaleBoost);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [width, height, scaleBoost]);

  useEffect(() => {
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime((t) => {
        let next = t + dt;
        if (next >= duration) next = next % duration;
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [duration]);

  const ctxValue = useMemo(() => ({ time, duration }), [time, duration]);

  const stageStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };
  const canvasStyle: CSSProperties = {
    width,
    height,
    background,
    position: "relative",
    transform: `scale(${scale})`,
    transformOrigin: "center",
    flexShrink: 0,
  };

  return (
    <div ref={stageRef} style={stageStyle}>
      <div style={canvasStyle}>
        <TimelineContext.Provider value={ctxValue}>
          {children}
        </TimelineContext.Provider>
      </div>
    </div>
  );
}
