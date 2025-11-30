import { Metadata } from 'next';
import { ProjectsHero } from '../components/pages/projects/ProjectsHero';
import { ProjectsGrid } from '../components/pages/projects/ProjectsGrid';
import { ProjectImpact } from '../components/pages/projects/ProjectImpact';

export const metadata: Metadata = {
  title: 'Projects - Care for Nature Zambia',
  description: 'Explore our environmental conservation projects across Zambia including forest conservation, community development, and education.',
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsGrid />
      <ProjectImpact />
    </>
  );
}