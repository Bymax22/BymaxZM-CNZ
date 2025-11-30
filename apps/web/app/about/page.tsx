import { Metadata } from 'next';
import { AboutHero } from '../components/pages/about/AboutHero';
import { MissionVision } from '../components/pages/about/MissionVision';
import { OurValues } from '../components/pages/about/OurValues';
import { QuickStats } from '../components/pages/about/QuickStats';

export const metadata: Metadata = {
  title: 'About Us - Care for Nature Zambia',
  description: 'Learn about Care for Nature Zambia - Our mission, vision, values, and commitment to environmental conservation and community development.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <QuickStats />
      <MissionVision />
      <OurValues />
    </>
  );
}