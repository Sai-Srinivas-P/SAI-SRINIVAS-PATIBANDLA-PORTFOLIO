import { Target, Quote, Download, MapPin, Sparkles } from "lucide-react";
import { profile, stats, currentGoal } from "@/lib/portfolio-data";
import { Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { CountUp } from "./fx";
import aboutDesk from "@/assets/about-desk.jpg";

export function About() {
  return (
    <Section id="about" className="border-t border-border/60">
      <SectionHeader
        label="About Me"
        title={
          <>
            Turning Ideas into <span className="text-gradient">Real-World Solutions</span>
          </>
        }
      />

      <div className="grid auto-rows-[minmax(140px,auto)] gap-4 md:grid-cols-4">
        <Reveal className="md:col-span-2 md:row-span-2">
          <div className="spotlight h-full rounded-3xl border border-border bg-card/60 p-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
              <Sparkles className="size-3.5" /> whoami
            </span>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {profile.aboutText.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={90} className="md:col-span-2 md:row-span-2">
          <div className="spotlight group h-full overflow-hidden rounded-3xl border border-border">
            <img
              src={aboutDesk}
              alt="Sai working on code at a multi-monitor desk"
              width={1200}
              height={752}
              loading="lazy"
              className="h-full min-h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="size-4 text-primary" /> {profile.location}
              </p>
            </div>
          </div>
        </Reveal>

        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={150 + i * 90}>
            <div className="spotlight tilt flex h-full flex-col justify-center rounded-3xl border border-border bg-card/60 p-6 text-center">
              <p className="font-display text-4xl font-bold text-gradient">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          </Reveal>
        ))}

        <Reveal delay={100} className="md:col-span-2">
          <div className="spotlight flex h-full gap-3 rounded-3xl border border-primary/25 bg-primary/5 p-6">
            <Quote className="size-6 shrink-0 text-primary" />
            <p className="text-base italic text-foreground/85">
              Always eager to learn, build, and contribute to innovative solutions that make a real impact.
            </p>
          </div>
        </Reveal>

        <Reveal delay={180} className="md:col-span-2">
          <div className="spotlight h-full rounded-3xl border border-secondary/30 bg-secondary/5 p-6">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-secondary" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-secondary">Current Goal</h3>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {currentGoal.map((g) => (
                <li key={g} className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
