import {
  Code2, Box, Globe, Coffee, Brain, Database, Cog, Wrench, Sparkles, type LucideIcon,
} from "lucide-react";
import { skillCategories, type SkillCategory } from "@/lib/portfolio-data";
import { Section, SectionHeader } from "./section";
import { Reveal } from "./reveal";
import { useInView } from "./fx";
import { cn } from "@/lib/utils";

const iconMap: Record<SkillCategory["icon"], LucideIcon> = {
  code: Code2, box: Box, globe: Globe, coffee: Coffee, brain: Brain,
  database: Database, cog: Cog, wrench: Wrench, sparkles: Sparkles,
};

const accents = ["text-chart-1", "text-chart-2", "text-chart-3", "text-chart-4", "text-chart-5"];
const accentBgs = ["bg-chart-1/10 border-chart-1/30", "bg-chart-2/10 border-chart-2/30", "bg-chart-3/10 border-chart-3/30", "bg-chart-4/10 border-chart-4/30", "bg-chart-5/10 border-chart-5/30"];
// Bento spans for a 4-column grid (9 categories)
const spans = ["md:col-span-2", "md:col-span-2 md:row-span-2", "", "", "md:col-span-2", "", "md:col-span-2", "md:col-span-2", ""];

const maxSkills = Math.max(...skillCategories.map((c) => c.skills.length));

function SkillCard({ category, i }: { category: SkillCategory; i: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const Icon = iconMap[category.icon];
  const accent = accents[i % accents.length];
  const accentBg = accentBgs[i % accents.length];
  return (
    <div ref={ref} className="spotlight tilt group flex h-full flex-col rounded-3xl border border-border bg-card/60 p-5">
      <div className="flex items-center gap-3">
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6", accentBg)}>
          <Icon className={cn("size-5", accent)} />
        </span>
        <h3 className="font-display text-sm font-semibold sm:text-base">{category.title}</h3>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {category.skills.map((skill, j) => {
          const isHighlight = category.highlights.includes(skill);
          return (
            <li
              key={skill}
              className={cn("transition-all duration-500", inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")}
              style={{ transitionDelay: `${j * 50}ms` }}
            >
              <span
                className={cn(
                  "inline-block rounded-lg border px-2.5 py-1 text-xs font-medium transition-transform hover:scale-105",
                  isHighlight ? "border-primary/40 bg-primary/15 text-primary" : "border-border bg-muted/40 text-muted-foreground"
                )}
              >
                {skill}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto pt-5">
        <div className="flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>{category.skills.length} skills</span>
          <span>{category.highlights.length} core</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted/60">
          <div
            className={cn("meter-fill h-full rounded-full", inView && "is-on")}
            style={{ "--meter": category.skills.length / maxSkills, "--meter-delay": "200ms" } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills" className="border-t border-border/60">
      <SectionHeader
        label="Skills"
        title="My Technical Skills"
        subtitle="A diverse set of technologies and tools to build real-world solutions."
      />
      <div className="grid gap-4 md:grid-cols-4">
        {skillCategories.map((category, i) => (
          <Reveal key={category.title} delay={(i % 4) * 80} className={spans[i]}>
            <SkillCard category={category} i={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
