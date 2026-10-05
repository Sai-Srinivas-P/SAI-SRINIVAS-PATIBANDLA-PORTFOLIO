import { useEffect, useRef, useState } from "react";

/** Global pointer tracker: feeds --mx/--my to any hovered `.spotlight` card and the page cursor glow. */
export function PointerFx() {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glowRef.current?.style.setProperty("transform", `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`);
        const card = (e.target as HTMLElement | null)?.closest?.(".spotlight") as HTMLElement | null;
        if (card) {
          const r = card.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          card.style.setProperty("--mx", `${x}px`);
          card.style.setProperty("--my", `${y}px`);
          if (card.classList.contains("tilt")) {
            const rx = ((y / r.height) - 0.5) * -6;
            const ry = ((x / r.width) - 0.5) * 6;
            card.style.setProperty("--rx", `${rx}deg`);
            card.style.setProperty("--ry", `${ry}deg`);
          }
        }
      });
    };
    const onLeave = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.(".tilt") as HTMLElement | null;
      if (card && !card.contains(e.relatedTarget as Node)) {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
    };
  }, []);
  return <div ref={glowRef} aria-hidden className="cursor-glow" />;
}

export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/** Animates numeric values up from 0 when visible; non-numeric values render as-is. */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const target = Number.parseFloat(value);
  const isNum = !Number.isNaN(target) && /^[\d.]+$/.test(value);
  const decimals = isNum && value.includes(".") ? (value.split(".")[1] ?? "").length : 0;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || !isNum) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNum, target, duration]);
  return <span ref={ref}>{isNum ? n.toFixed(decimals) : value}</span>;
}
