import type { Metadata } from "next";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/projects/project-card";
import { Container, SectionHeading } from "@/components/section-heading";
import { Connect } from "@/components/sections/connect";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Applied AI projects by Elisha Paul: computer vision, RAG, forecasting, geospatial AI, legal AI and MLOps.",
};

export default function ProjectsPage() {
  return (
    <>
      <Container className="pt-28">
        <BlurFade>
          <SectionHeading
            as="h1"
            title="Projects"
            subtitle={`${projects.length} applied AI products, from fine-tuned vision models to RAG assistants and a fully automated ML pipeline. All open source, most running live in your browser.`}
          />
        </BlurFade>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <BlurFade key={p.slug} delay={0.04 * (i % 3)}>
              <ProjectCard project={p} href={`/projects/${p.slug}/`} />
            </BlurFade>
          ))}
        </div>
      </Container>
      <Connect />
    </>
  );
}
