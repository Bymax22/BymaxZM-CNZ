import type { IconType } from 'react-icons';
import { FaRegNewspaper, FaTree, FaUsers } from 'react-icons/fa';

export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  video?: string;
  image?: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  icon: IconType;
  color: string;
  bgColor: string;
  tags: string[];
  slug: string;
  href: string;
};

export const news: NewsItem[] = [
  {
    id: 1,
    title: 'Children Face Climate Change Threats – CHIBAMBA',
    excerpt:
      'By Raphael Kumwenda: Government says children remain among the most vulnerable groups affected by climate change.',
    content: [
      'By Raphael Kumwenda',
      'Government says children remain among the most vulnerable groups affected by climate change.',
      'Ministry of Green Economy and Environment Permanent Secretary DOUTY CHIBAMBA says the recent drought experienced in the country shows the urgent need for stronger climate action and child-sensitive policies.',
      'Dr. CHIBAMBA’s remarks were delivered by Principal Climate Change Officer HERRICK MWEWA during the 2026 Kids Climate Change Summit in Lusaka.',
      'Meanwhile, summit convener and Care for Nature Zambia Director NSAMA MUSONDA expressed concern over the growing levels of environmental degradation in many parts of the country, largely linked to mining activities and other human actions.',
      'And Save the Children Zambia Country Director CHILOBE KAMBIKAMBI said climate change is increasingly becoming a child rights issue, with climate shocks threatening children’s wellbeing and development.',
      'Newly elected Children’s Climate Council President ASHLEY PHIRI said the council will work to represent all children, including those in hard-to-reach areas across the country, on climate-related matters.',
      'Meanwhile, Ministry of Education Director of Primary Education LANGFORD CHIBUYE said the newly introduced competence-based curriculum includes sustainable skills aimed at promoting environmental protection.'
    ],
    video:
      '/AQPbPZQM5lsjIvuM9BBoWuNddk3w3LcCi0aPrsL2JmXcB_L_GpRszX6I2a1iKdPrKzd_VKeW7KEs5-gmncfoezvJsl1eGCjm9SoAQVdPNBVakQ.mp4',
    category: 'Conservation',
    date: '2024-01-15',
    author: 'Raphael Kumwenda',
    readTime: '3 min',
    icon: FaTree,
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    tags: ['Reforestation', 'Community'],
    slug: 'children-climate-change-summit-2026',
    href: '/news/children-climate-change-summit-2026'
  },
  {
    id: 2,
    title: 'New Partnership with Zambia Wildlife Authority',
    excerpt:
      'CNZ signs MOU with ZAWA to enhance wildlife conservation and anti-poaching efforts.',
    content: [
      'CNZ signs MOU with ZAWA to enhance wildlife conservation and anti-poaching efforts.'
    ],
    image: '/images/news/partnership.jpg',
    category: 'Partnership',
    date: '2024-01-12',
    author: 'David Mwansa',
    readTime: '4 min',
    icon: FaUsers,
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    tags: ['Partnership', 'Wildlife'],
    slug: 'zawa-partnership',
    href: '/news/zawa-partnership'
  },
  {
    id: 3,
    title: 'Children Environmental Program Launched',
    excerpt:
      'Empowering young Zambians with conservation skills across 10 schools in Copperbelt Province.',
    content: [
      'Empowering young Zambians with conservation skills across 10 schools in Copperbelt Province.'
    ],
    image: '/images/news/children-program.jpg',
    category: 'Education',
    date: '2024-01-08',
    author: 'Grace Banda',
    readTime: '5 min',
    icon: FaRegNewspaper,
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    tags: ['Education', 'Youth'],
    slug: 'children-environmental-program',
    href: '/news/children-environmental-program'
  }
];

export function getNewsItemBySlug(slug: string) {
  return news.find((item) => item.slug === slug);
}
