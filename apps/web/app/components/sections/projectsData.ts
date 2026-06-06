export type Project = {
  id: string;
  name: string;
  slug: string;
  category: 'conservation' | 'climate' | 'education' | 'mining' | 'livelihoods' | 'rights';
  title: string;
  shortDescription: string;
  description: string;
  location: string;
  status: 'ongoing' | 'completed' | 'planned';
  impact: string[];
  image: string;
  sdgs: number[];
  video?: string;
  publishedAt?: string;
  partnerLogos?: string[];
  gallery?: { type: 'image' | 'video'; url: string }[];
};

export const projects: Project[] = [
  {
    id: 'ncp-zambia',
    slug: 'ncp-zambia',
    name: 'Nature Conservation Program',
    category: 'conservation',
    title: 'Protecting Zambia\'s Ecosystems',
    shortDescription: 'Restoring and protecting natural habitats across Zambia',
    description: 'Our flagship conservation program protects forests, wetlands, fisheries and wildlife across Zambia. We work with communities to sustainably manage natural resources while combating climate change through nature-based solutions.',
    location: 'Lusaka, Zambia',
    status: 'ongoing',
    impact: [
      'Protected 50+',
      '25,000+ trees planted',
      'Community conservation clubs established',
      'Sustainable resource management practices',
    ],
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053946/692938516_1446768550815747_5499726643162476941_n_nv4vge.jpg',
    sdgs: [12, 13, 15],
  },
 ];
export const projectCategories = [
  { id: 'conservation', label: 'Conservation', color: 'green' },
  { id: 'climate', label: 'Climate Action', color: 'blue' },
  { id: 'education', label: 'Education', color: 'purple' },
  { id: 'mining, rights', label: 'Mining | Rights', color: 'orange' },
  { id: 'livelihoods', label: 'Livelihoods', color: 'yellow' },
];

export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
};


export const getProjectById = (id: string) => {
  return projects.find((p) => p.id === id);
};
