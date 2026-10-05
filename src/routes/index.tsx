import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Education } from "@/components/portfolio/education";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { Certifications } from "@/components/portfolio/certifications";
import { CodingProfiles } from "@/components/portfolio/coding-profiles";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { profile } from "@/lib/portfolio-data";
import { PointerFx } from "@/components/portfolio/fx";

const description =
  "Sai Srinivas Patibandla — Aspiring Software Developer (Fresher) from Hyderabad. Full-stack, .NET, Java/Spring Boot, and AI/ML projects, certifications, and coding profiles.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} | Aspiring Software Developer` },
      { name: "description", content: description },
      { property: "og:title", content: `${profile.name} | Aspiring Software Developer` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <PointerFx />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <CodingProfiles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
