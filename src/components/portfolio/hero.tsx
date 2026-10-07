import { useEffect, useRef, useState } from "react";
import { FolderKanban, Download, Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/portfolio-data";
import portraitAsset from "@/assets/sai-srinivas-portrait.png.asset.json";
import { Wallpaper } from "./wallpaper";

const heroChips = [
  { label: ".NET", className: "left-[-2%] top-[15%]", delay: "float-slow" },
  { label: "Python", className: "right-[8%] top-[4%]", delay: "float-slower" },
  { label: "React", className: "left-[0%] bottom-[20%]", delay: "float-slow" },
  { label: "AI / ML", className: "right-[-2%] bottom-[35%]", delay: "float-slower" },
];

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % profile.rotatingPhrases.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
      el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
    };
    const reset = () => { el.style.setProperty("--px", "0"); el.style.setProperty("--py", "0"); };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", reset); };
  }, []);
  const par = (depth: number) => ({
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
  });

  return (
    <section ref={sectionRef} id="home" className="noir-hero relative overflow-hidden">
      <Wallpaper variant="tech" priority />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[7fr_5fr]">
        <div className="flex flex-col items-start gap-6">
          <p className="font-mono text-sm text-primary">
            <span className="text-secondary">{"<"}</span> Hello, world <span className="text-secondary">{"/>"}</span>
          </p>

          <h1 className="hero-title font-light leading-[1.08]">
            <span className="word-in" style={{ "--d": "0ms" } as React.CSSProperties}>Hi,</span>{" "}
            <span className="word-in" style={{ "--d": "90ms" } as React.CSSProperties}>I&apos;m</span>
            <span className="mt-1 block">
              {profile.name.split(" ").map((w, i) => (
                <span key={w} className="word-in text-gradient font-bold mr-[0.25em]" style={{ "--d": `${200 + i * 120}ms` } as React.CSSProperties}>
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p className="font-display text-xl font-medium italic text-muted-foreground sm:text-2xl">{profile.role}</p>




          <p className="flex min-h-7 items-center gap-2 text-sm text-muted-foreground sm:text-base">
            <span className="inline-block size-2 rounded-full bg-chart-4" aria-hidden />
            <span className="font-mono">{profile.rotatingPhrases[phraseIndex]}</span>
            <span className="caret font-mono text-primary">|</span>
          </p>

          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{profile.intro}</p>

          <div className="hero-actions flex flex-wrap items-center gap-3">
            <Button asChild variant="ghost" className="h-auto p-0"><a
              href="#projects"
              className="glow-primary inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <FolderKanban className="size-4" />
              View My Projects
            </a></Button>
            <Button asChild variant="ghost" className="h-auto p-0"><a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              <Download className="size-4" />
              Download Resume
            </a></Button>

          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="size-11 p-0"><a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="grid size-11 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Github className="size-5" />
            </a></Button>
            <Button asChild variant="ghost" size="icon" className="size-11 p-0"><a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="grid size-11 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Linkedin className="size-5" />
            </a></Button>
          </div>
        </div>

        <div className="hero-visual relative mx-auto w-full max-w-sm">
          <div className="hero-photo relative">
          <div aria-hidden className="spin-slow absolute inset-0 -m-2 rounded-full border-2 border-dashed border-secondary/30" />
          <div style={par(-18)} className="relative overflow-hidden rounded-full border border-primary/30 bg-card p-2">
            <img
              src={portraitAsset.url}
              alt={`Professional photo of ${profile.name}`}
              width={1245}
              height={1280}
              className="hero-portrait aspect-square w-full rounded-full object-cover object-top"
            />
          </div>

          <div style={par(36)} className="pointer-events-none absolute inset-0">
          {heroChips.map((chip) => (
            <span
              key={chip.label}
              className={`absolute z-10 rounded-sm border border-primary/40 bg-background px-3 py-1.5 font-mono text-xs font-semibold text-primary ${chip.className} ${chip.delay}`}
            >
              {chip.label}
            </span>
          ))}
          </div>

          </div>
          <div className="hero-code rounded-lg border border-primary/20 bg-card/95 p-5 font-mono text-[11px] leading-relaxed">
            <div className="flex items-center gap-1.5 pb-3">
              <span className="size-2.5 rounded-full bg-chart-5/70" />
              <span className="size-2.5 rounded-full bg-chart-3/70" />
              <span className="size-2.5 rounded-full bg-chart-4/70" />
              <span className="ml-2 text-muted-foreground">developer.ts</span>
            </div>
            <code className="block text-muted-foreground">
              <span className="text-secondary">const</span> <span className="text-primary">developer</span> = {"{"}
            </code>
            <code className="block pl-4 text-muted-foreground">
              name: <span className="text-chart-3">&quot;{profile.shortName}&quot;</span>,
            </code>
            <code className="block pl-4 text-muted-foreground">
              role: <span className="text-chart-3">&quot;{profile.role}&quot;</span>,
            </code>
            <code className="block pl-4 text-muted-foreground">
              focus: [<span className="text-chart-4">&quot;build&quot;</span>, <span className="text-chart-4">&quot;learn&quot;</span>, <span className="text-chart-4">&quot;grow&quot;</span>],
            </code>
            <code className="block text-muted-foreground">{"};"}</code>
          </div>
        </div>
      </div>
    </section>
  );
}
