import { Metadata } from 'next';
import { GetInvolvedHero } from '../components/pages/get-involved/GetInvolvedHero';
import { InvolvementOptions } from '../components/pages/get-involved/InvolvementOptions';
import ImpactCalculator from '../components/pages/get-involved/ImpactCalculator';

export const metadata: Metadata = {
  title: 'Get Involved - Care for Nature Zambia',
  description: 'Discover ways to get involved with Care for Nature Zambia - volunteer, donate, partner, or join our team.',
};

export default function GetInvolvedPage() {
  return (
    <>
      <GetInvolvedHero />
      <InvolvementOptions />
      <ImpactCalculator />
    </>
  );
}