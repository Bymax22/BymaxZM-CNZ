import type { ReactNode } from 'react';

export const metadata = {
  title: 'Our Stories | Care for Nature Zambia',
  description: 'Read authentic stories of conservation, youth leadership, and community transformation across Zambia.',
};

export default function OurStoriesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
