export type Project = {
  id: string;
  name: string;
  category: 'conservation' | 'climate' | 'education' | 'mining' | 'livelihoods';
  title: string;
  shortDescription: string;
  description: string;
  location: string;
  status: 'ongoing' | 'completed' | 'planned';
  impact: string[];
  image: string;
  sdgs: number[];
};

export const projects: Project[] = [
  {
    id: 'ncp-zambia',
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
  {
    id: 'crdp-zambia',
    name: 'Zambia Children’s Climate Council',
    category: 'education',
    title: 'Zambia Children’s Climate Council (ZCCC)',
    shortDescription: 'Child-led climate governance and advocacy for Zambia’s young climate leaders',
    description: 'The Zambia Children’s Climate Council (ZCCC) is a child-led advisory body established in 2024 and endorsed by the Ministry of Green Economy and Environment. It empowers children to participate in climate policy, influence national and local climate action, and advocate for inclusive, sustainable solutions across Zambia.',
    location: 'Mansa, Samfya, Mwense & National Networks',
    status: 'ongoing',
    impact: [
      '5,000+ children engaged in conservation',
      'Children\'s Climate Council formed',
      'Youth-led advocacy campaigns',
      'School environmental clubs established',
    ],
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053944/689870554_1020652813653190_5398139666292164193_n_c8e1cx.jpg',
    sdgs: [4, 5],
  },
  {
    id: 'smp-zambia',
    name: 'Sustainable Mining Program',
    category: 'mining',
    title: 'Responsible Extractives Accountability',
    shortDescription: 'Minimizing mining\'s environmental and social impacts',
    description: 'We work with mining communities, companies and government to ensure mining operations comply with environmental and social standards. Through the Luapula Mining Insaka, we monitor mining impacts, protect community rights, and promote sustainable alternatives.',
    location: 'Luapula Province - Mansa & Samfya Districts',
    status: 'ongoing',
    impact: [
      '8 mining cooperatives established',
      'Mining monitoring networks active',
      'Environmental compliance increased',
      'Community benefit sharing improved',
    ],
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050096/695034324_1446466424179293_4955720521473252367_n_lkvmj7.jpg',
    sdgs: [8, 11, 16, 17],
  },
  {
    id: 'green-livelihoods',
    name: 'Green Livelihoods Initiative',
    category: 'livelihoods',
    title: 'Sustainable Income for Communities',
    shortDescription: 'Creating sustainable alternative livelihoods',
    description: 'We support communities in developing sustainable livelihoods that don\'t depend on destructive resource extraction. Through cooperative formation, skills training and market linkages, we enable families to earn income while protecting the environment.',
    location: 'Mansa & Samfya Districts',
    status: 'ongoing',
    impact: [
      '800+ households in cooperatives',
      'Indigenous seeds & crafts programs',
      'Agricultural enterprises established',
      'Women economic empowerment',
    ],
    image: '/images/projects/livelihoods.jpg',
    sdgs: [1, 2, 5, 12],
  },
  {
    id: 'climate-resilience',
    name: 'Climate Resilience Project',
    category: 'climate',
    title: 'Building Climate-Smart Communities',
    shortDescription: 'Helping communities adapt to climate change',
    description: 'As climate impacts intensify in Zambia, we work with communities to develop adaptation strategies and climate-smart agriculture. We also conduct research on environmental trends to inform policy and community decision-making.',
    location: 'Nationwide Focus',
    status: 'ongoing',
    impact: [
      'Climate action plans developed',
      'Community adaptation strategies',
      'Weather monitoring networks',
      'Climate change research completed',
    ],
    image: '/images/projects/climate.jpg',
    sdgs: [13],
  },
  {
    id: 'hotspring-restoration',
    name: 'Chamalawa Hot Spring Conservation',
    category: 'conservation',
    title: 'Protecting Natural Heritage',
    shortDescription: 'Conserving Zambia\'s unique wetland ecosystem',
    description: 'Through our partnership with the National Heritage Conservation Commission, we protect and restore the Chamalawa Hot Spring and its associated wetland. This unique ecosystem provides habitat for rare species and cultural significance for local communities.',
    location: 'Chamalawa, Zambia',
    status: 'ongoing',
    impact: [
      'Wetland restoration ongoing',
      'Species monitoring program',
      'Community stewardship established',
      'Eco-tourism development',
    ],
    image: '/images/projects/hotspring.jpg',
    sdgs: [14, 15],
  },
];

export const projectCategories = [
  { id: 'conservation', label: 'Conservation', color: 'green' },
  { id: 'climate', label: 'Climate Action', color: 'blue' },
  { id: 'education', label: 'Education', color: 'purple' },
  { id: 'mining', label: 'Mining', color: 'orange' },
  { id: 'livelihoods', label: 'Livelihoods', color: 'yellow' },
];

export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
};

export const getProjectById = (id: string) => {
  return projects.find((p) => p.id === id);
};
