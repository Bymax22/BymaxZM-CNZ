import { Metadata } from 'next';
import { ProjectsHero } from '../components/pages/projects/ProjectsHero';
import { ProjectsGrid } from '../components/pages/projects/ProjectsGrid';
import { OurWorkProjects } from '../components/pages/projects/OurWorkProjects';

export const metadata: Metadata = {
  title: 'Projects - Care for Nature Zambia',
  description: 'Explore our environmental conservation projects across Zambia including forest conservation, community development, and education.',
};

export default function ProjectsPage() {
  return (
    <main className="bg-slate-50 pt-20">
      <ProjectsHero />
      <ProjectsGrid />
      <OurWorkProjects />
    </main>
  );
}