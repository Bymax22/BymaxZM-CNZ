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
    shortDescription: 'Detailed overview of the Zambia Children’s Climate Council and its child-led climate governance model',
    description: `1 | Page


About the Children’s Climate Council
The Zambia Children’s Climate Council (ZCCC) which was established in June 2024
and endorsed by the Ministry of Green Economy and Environment in July 2025 is an
advisory body that empowers children to actively participate in climate policy and
action at local, national and global levels. The ZCCC is designed to engage children in
climate decision making, ensuring their voices, ideas and perspectives are included in
shaping policies and initiatives that address climate change. The council also provides
a structured way for children to influence climate action, advocate for sustainability
and contribute to community resilience. The council is critical in complementing
governments efforts to address the needs of children and demonstrate the importance
of strong partnerships in climate change implementation.
Legal and Policy Framework
Like the Youth Climate Councils, the children’s climate council draws its legal standing
from the following legal and policy frameworks
1. UNFCCC Paris Agreement Article 12 of the– which mandates that parties
cooperate to enhance climate change education, training, public awareness,
public participation and public access to information. Key aspects of article 12
include the Action for Climate Empowerment (ACE) which aims to empower all
members of society to engage in climate action.
2. United Nations Convention on the Rights of the Child Article 12, together with
the African Charter on the Rights and Welfare of the Child which calls for equal
participation of children in leadership and decision-making processes at all
levels
3. The Child Participation Framework of Zambia which further places emphasis
on children expressing their views freely on all matters that affect them with
their opinions given due weight according to their age and maturity.

How the Council Operates
The Zambia Children’s Climate Council comprises of a committee of Civil Society
Organizations that provide technical support to the committee of children. Through
Child rights, climate change and environmental focused organizations, children from
across the country are affiliated to the Council through nomination by the
participating CSO. One of the guiding principles of the CSO Technical Committee of
the ZCCC is to ensure that the children’s climate council is fully led and managed by
children. The council strongly encourages participation of children everywhere
especially those in hard-to-reach places, including children with disabilities.

Purpose and Activities
The Zambia Children’s Climate Councils aims to:
• Advise policymakers on climate strategies and resilience measures
• Foster child leadership in climate action
• Provide education and resources for children to engage effectively in
climate change and environmental programs
• Encourage intergenerational collaboration to ensure sustainable
climate solutions

Activities of the council
Some of the activities of the ZCCC include:
• Capacity building trainings and workshops
• Policy consultations
• Climate Change Engagements
• Participation in international climate change conferences (COP)
• Reviewing, reporting and monitoring implementation of reports with focus on
climate change and environment

Benefits of belonging to the council
Participation in the Zambia Children’s Climate Council allows children to:
• Influence climate policy and local decision-making
• Gain leadership and advocacy experience
• Connect with peers locally, Regionally and Globally
• Contribute to meaningful Climate Action that addresses both environment and
social justice issues

Composition of the Technical Committee to the Children’s Climate Council
The Technical Committee comprises of organizations working with children and on
issues of climate change and environment. The role of the Technical Committee is to
support the implementation of the Children’s Climate Council by developing child-led
inclusive solutions to climate change and environmental challenges, both financially
and through capacity building. The technical committee to the ZCCC comprises of:
1. Chairing Organization
2. Secretariat
3. Treasurer
4. Committee Members

Composition of the ZCCC Committee
The Children’s Climate Council Committee shall comprise of ten members namely:
1. The President
2. Vice President
3. The Secretary
4. Vice Secretary
5. The Treasurer
6. Trustee
7. Trustee
8. Trustee
9. Trustee
10. Trustee

Current Technical Committee Members
The Children’s Climate Council organizing committee comprises of the following
organizations:
1. Care for Nature Zambia
2. Caritas Zambia
3. Centre for Environment Justice
4. Civil Society for Poverty reduction
5. Environment Africa
6. Family Development Initiative
7. Keeper Zambia Foundation
8. Media Network on Child Rights and Development
9. Save the Children-Petauke
10. Zambia Climate Change Network
11. Zango Foundation

Quote
Children have a right to a clean, healthy and sustainable environment. Children need a clean
environment in order to enjoy all of their human rights. Children should have access to clean
air and water, safe climates, healthy ecosystems and biodiversity, healthy food and non
polluted environments. General Comment No. 26, United Nations Committee on the Rights of
the Child, CRC/C/GC/26, 22 August 2023ZCCC

Advocacy Focus for the Council
• Advocate for inclusive participation of children in climate policy by having child
representatives on the National Technical Committee on Climate Change
• Advocate for children to be put first in National Sustainability Plans, NAP, NDC
and Budgets
• Support and empower children to review, monitor and develop reports to be
submitted to various mandate holders
• Protect children from climate change and environmental impacts in line with
General Comment 26
• Promote Child participation in climate policy and decision making in line with
Article 12 of the UNCRC`,
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
