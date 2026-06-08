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
  comments?: string[];
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
    // Use Cloudinary video URLs (set via uploader). Leave empty until uploaded.
    video: 'https://res.cloudinary.com/dwxlzl5us/video/upload/q_auto/f_auto/v1779063895/vid_w3flah.mp4',
    category: 'Climate Action',
    date: '2026-05-07',
    author: 'Raphael Kumwenda',
    readTime: '3 min',
    icon: FaTree,
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    tags: ['Children', 'Climate Action', 'ZNBC'],
    slug: 'children-climate-change-summit-2026',
    href: '/news/children-climate-change-summit-2026'
  },
  {
    id: 2,
    title: 'EnviroMentors Program Launch',
    excerpt:
      'Today we celebrated another milestone as we launched the Environmentors Program, implemented by Care For Nature Zambia in collaboration with the Global Council for Science and Environment based in the United States of America.',
    content: [
      'By Care for Nature Zambia',
      'Today we celebrated another milestone as we launched the Environmentors Program, implemented by Care For Nature Zambia in collaboration with the Global Council for Science and Environment based in the United States of America.',
      'The EnvironMentors is a mentorship based science research program designed to prepare high school students for careers in STEM with a focus on environmental science and sustainability.',
      'The program connects students with university and professional mentors who guide them through an independent research project,  culminating in a international science fair competition.',
      'The EnvironMentors program will help the Children’s Climate Council to come up with research to better engage policy makers on the impacts of climate change and environment on the rights and welfare of children.'
    ],
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053938/689842600_1446768710815731_6105767634409331045_n_pnlc30.jpg',
    category: 'Environment',
    date: '2026-05-08',
    author: 'CaNZ',
    readTime: '4 min',
    icon: FaUsers,
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    tags: ['Partnership', 'Environment'],
    slug: 'zawa-partnership',
    href: '/news/zawa-partnership'
  },
  {
    id: 3,
    title: 'Integrating Climate Change in Adolescent Sexual Reproductive Health and Rights Programming (ASRHR)',
    excerpt:
      'Adolescents in Zambia continue to face significant barriers in accessing timely non judgemental and comprehensive health services particularly in in areas of sexual reproductive health, mental health and preventing Gender Based Violence, which includes the issue of child marriages.',
    content: [
      'By Care for Nature Zambia',
      'Climate change further multiplies the risk for sexual reproductive health and rights as it disrupts access to services and increases vulnerability to Gender Based Violence among women and girls.',
      'This week, Care for Nature Zambia was among stakeholders that attended the SMART Advocacy Training on ASRHR conducted by Marie Stopes under the EU funded Equal Chances for Human Development (EC4HD) Project which took place in Mansa from 12th to 15th May 2026.',
      'During the training Care for Nature Zambia Programs team made presentations on how climate change affects effective distribution of ASRHR services and the urgent need to ensure Adolescents themselves take lead in policy and decision-making making in this sector, in line with childrens rights to participate in matters that concern them.',
      'Care for Nature Zambia further noted that floods, droughts, and disasters destroy clinics and disrupt supply chains, leaving communities without access to SRH services. ',
      'Scarcity of resources and displacement frequently trigger increases in sexual violence, exploitation, and child or forced marriages hence the need to integrate climate change in ASRHR programming.',
      'As an organization committed to addressing the impacts of climate change on the rights and welfare of children, we are keen to partner with organizations to develop programs that mainstream climate change and Childrens rights, whilst at the same time gaining knowledge to integrate cross cutting issues in our programming. ',
      'Together we can secure the future of every child! #carefornature',
    ],
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779063214/699962679_1456513743174561_6442142294815966973_n_dhmrzs.jpg',
    category: 'Education',
    date: '2024-01-08',
    author: 'Bridget Ndebe',
    readTime: '5 min',
    icon: FaRegNewspaper,
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    tags: ['Education', 'Youth'],
    slug: 'children-environmental-program',
    href: '/news/children-environmental-program'
  }
];

export function getNewsItemBySlug(slug: string): NewsItem | null {
  return news.find((item) => item.slug === slug) ?? null;
}
