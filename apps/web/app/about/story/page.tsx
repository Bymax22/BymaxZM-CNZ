import { Metadata } from 'next';
import { StoryHero } from '../../components/pages/about/StoryHero';
import { Timeline } from '../../components/pages/about/Timeline';
import { Milestones } from '../../components/pages/about/Milestones';

export const metadata: Metadata = {
  title: 'Our Story - Care for Nature Zambia',
  description: 'Discover our journey in conservation since 2008. Learn how Care for Nature Zambia started and our impact over the years.',
};

export default function StoryPage() {
  return (
    <>
      <StoryHero />
      <Timeline />
      <Milestones />
    </>
  );
}