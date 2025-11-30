import { Metadata } from 'next';
import { ProjectHero } from '../../components/pages/projects/ProjectHero';
import { ProjectDetails } from '../../components/pages/projects/ProjectDetails';
import { ProjectGallery } from '../../components/pages/projects/ProjectGallery';

export const metadata: Metadata = {
  title: 'Forest Conservation - Care for Nature Zambia',
  description: 'Learn about our forest conservation initiatives, reforestation programs, and ecosystem protection efforts.',
};

export default function ConservationPage() {
  const projectData = {
    title: 'Forest Conservation',
    subtitle: 'Protecting Zambia\'s Vital Ecosystems',
    description: 'Comprehensive forest conservation and restoration initiatives across Zambia\'s diverse landscapes',
    icon: '🌳',
    color: 'from-[#029346] to-[#0C4726]',
    stats: {
      treesPlanted: 50000,
      areasProtected: 15,
      communities: 75,
      carbonReduced: 25000
    }
  };

  return (
    <>
      <ProjectHero project={projectData} />
      <ProjectDetails project={projectData} />
      <ProjectGallery project={projectData} />
    </>
  );
}