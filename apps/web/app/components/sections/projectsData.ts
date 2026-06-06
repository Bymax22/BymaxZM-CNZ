export type Project = {
  id: string;
  name: string;
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
    category: 'climate',
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
    id: 'mining-indaba',
    name: 'Alternative Luapula Mining Indaba - 2025 ',
    category: 'mining',
    title: '7 years of Mining dialogue ',
    shortDescription: 'The 7th Luapula Alternative Mining Indaba -  LUAMI',
    description: 'The 7th Luapula Alternative Mining Indaba - LUAMI  was officially opened by Luapula Province Permanent Secretary and in attendance where His Worship the Mayor of Mansa, His Royal Highnesses Chief Mibenge, Chief Mabumba, Chief Chimese and representative of Chief Chisunka. Other participants included CSO, Reseaechers, the Church, community members, children and the media. More details coming soon. Many thanks to The Government and Luapula Chiefs council for continued support, Centre for Environment Justice Civil Society for Poverty Reduction-CSPR Amizo Power Engineering, Mansa District Land Alliance for making the event possible.',
    location: 'Mansa & Samfya Districts',
    status: 'ongoing',
    impact: [
      '....',
      '....',
      '....',
      '....',
    ],
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779723117/536284483_1185707510255187_8154881700930956562_n_qv3kro.jpg',
    sdgs: [1, 2, 5, 12],
  },
  {
    id: 'women-land-rights',
    name: 'WOMEN’S LAND RIGHTS',
    category: 'rights',
    title: 'WOMEN’S LAND RIGHTS AND CLIMATE JUSTICE',
    shortDescription: 'Care for Nature Zambia has received financial support from Southern Africa Trust to implement a community-based project aimed at building the capacity of women in the manganese mining communities of Mansa District to defend their rights to land for resilient livelihoods and climate justice. ',
    description: 
    'This project has come at a time when increased demand for manganese has seen rise in unregulated mines which exploiting local people due to their vulnerability and persistent poverty in Luapula Province.',
    location: 'Nationwide Focus',
    status: 'ongoing',
    impact: [
      'Improved understanding and implementation of legal and policy frameworks on mining, environment, labor, land and human rights among women in the manganese mining communities',
      'Improved participation of women in policy and decision-making processes and direct policy engagement through traditional and civic structures such as village committees, DDCC, PDCC and participation in mining platforms at provincial, national and regional level.',
    ],
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779725638/482250613_1058339666325306_2005527676673850582_n_wxcov2.jpg',
    sdgs: [13],
  },
  {
    id: 'child-participation-cop28',
    name: 'UAE - COP 28',
    category: 'rights',
    title: 'Child Participation  in the United Nations Conference of Parties COP28',
    shortDescription: 'The 28th United Nations Conference of Parties which will be held in the United Arabs Emirates from 30th to 12th December 2023 will be a milestone moment as stakeholders will do an assessment and record progress on the Paris Agreement which was enacted in 2015.',
    description: 'This historical moment calls for inclusive participation of all stakeholder that are affected by climate change and those working to influence decision making and leadership roles in mitigating and adapting to climate change.',
    location: 'UAE',
    status: 'ongoing',
    impact: [
      'Children fully integrated into the global climate policy making and dialogues.”',
      
    ],
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779726699/410798998_750008060491803_5601703772940240462_n_q1t08s.jpg',
    sdgs: [14, 15],
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
