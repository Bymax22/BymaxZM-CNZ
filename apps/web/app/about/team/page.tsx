import { Metadata } from 'next';
import { TeamHero } from '../../components/pages/about/TeamHero';
import { LeadershipGrid } from '../../components/pages/about/LeadershipGrid';
import { AdvisoryBoard } from '../../components/pages/about/AdvisoryBoard';

export const metadata: Metadata = {
  title: 'Leadership Team - Care for Nature Zambia',
  description: 'Meet our dedicated leadership team and board members driving environmental conservation in Zambia.',
};

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <LeadershipGrid />
      <AdvisoryBoard />
    </>
  );
}