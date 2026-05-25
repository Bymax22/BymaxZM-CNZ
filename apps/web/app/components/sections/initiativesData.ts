export type Initiative = {
  id: string;
  title: string;
  category: string;
  overview: string;
  goals: string[];
  impact: string[];
  highlights: string[];
  image: string;
  status: string;
};

export const initiatives: Initiative[] = [
  {
    id: 'zero-children-in-mining',
    title: 'Zero Children in Mining',
    category: 'Child Protection',
    overview:
      'The Zero Children in Mining initiative works to eliminate child labour in Zambia’s mining communities through advocacy, monitoring, and child-centered support services.',
    goals: [
      'Strengthen enforcement of child protection laws in mining areas.',
      'Support families with education and alternative livelihoods.',
      'Raise awareness about the risks of hazardous mining for children.',
    ],
    impact: [
      'Local monitoring groups established in three mining districts.',
      'Over 200 children reached through school safety campaigns.',
      'Stronger referral pathways for child survivors of exploitation.',
    ],
    highlights: [
      'Child-focused advocacy with district officials',
      'Community-led education and prevention campaigns',
      'Stronger protection for vulnerable families',
    ],
    image: '/images/topics/mining-pollution.jpg',
    status: 'Active',
  },
  {
    id: 'luapula-alternative-mining-indaba',
    title: 'Luapula Alternative Mining Indaba',
    category: 'Advocacy',
    overview:
      'Launched in 2019, the Luapula Alternative Mining Indaba brings civil society, communities and policymakers together to promote sustainable mining practices and human-centered governance.',
    goals: [
      'Create safe spaces for community voices in mining decisions.',
      'Encourage responsible mining policies and local benefit sharing.',
      'Build partnerships across civil society, government and traditional leaders.',
    ],
    impact: [
      'Regional dialogues that influenced mining transparency policy.',
      'New community monitoring networks established across Luapula.',
      'A stronger platform for women and youth in extractives governance.',
    ],
    highlights: [
      'Regional leadership forums',
      'Policy engagement and advocacy events',
      'Stronger community ownership of mining reforms',
    ],
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779723117/536284483_1185707510255187_8154881700930956562_n_qv3kro.jpg',
    status: 'Ongoing',
  },
  {
    id: 'green-livelihoods-initiative',
    title: 'Green Livelihoods Initiative',
    category: 'Sustainable Livelihoods',
    overview:
      'This initiative creates green income opportunities that protect the environment and support families in mining-affected communities through training and market access.',
    goals: [
      'Support eco-friendly small businesses and farming practices.',
      'Train community members in climate-resilient livelihoods.',
      'Promote local value chains that preserve natural resources.',
    ],
    impact: [
      'New seedling nurseries managed by local communities.',
      'Training for women-led green enterprises.',
      'Stronger household resilience through sustainable income.',
    ],
    highlights: [
      'Income support for farming families',
      'Training in sustainable production techniques',
      'Ecological restoration combined with livelihoods',
    ],
    image: '/images/topics/community-capacity-building.jpg',
    status: 'Growing',
  },
];

export function getInitiativeById(id: string) {
  return initiatives.find((initiative) => initiative.id === id);
}
