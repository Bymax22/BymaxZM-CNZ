'use client';

export type StoryTopic = {
  id: string;
  category: 'National' | 'Regional' | 'Global' | 'Other';
  theme: 'Nature' | 'Children' | 'Mining' | 'Policy' | 'Community' | 'Advocacy';
  title: string;
  description: string;
  summary: string;
  highlight: string;
  mediaType: 'image' | 'video';
  media: string;
  content: string[];
};

export const storyCategories = ['All', 'National', 'Regional', 'Global', 'Other'] as const;

export const storyThemes = ['All', 'Nature', 'Children', 'Mining', 'Policy', 'Community', 'Advocacy'] as const;

export const storyTopics: StoryTopic[] = [
  {
    id: 'climate-action',
    category: 'National',
    theme: 'Children',
    title: 'THE 2026 CHILDREN’S CLIMATE ACTION SUMMIT',
    description:
      'Children Face Climate Change Threats – CHIBAMBA',
    summary:
      'Ministry of Green Economy and Environment Permanent Secretary DOUTY CHIBAMBA says the recent drought experienced in the country shows the urgent need for stronger climate action and child-sensitive policies.',
    highlight: 'Government says children remain among the most vulnerable groups affected by climate change.',
    mediaType: 'video',
    media: 'https://res.cloudinary.com/dwxlzl5us/video/upload/q_auto/f_auto/v1779063895/vid_w3flah.mp4',
    content: [
      'By Raphael Kumwenda.',
      'Ministry of Green Economy and Environment Permanent Secretary DOUTY CHIBAMBA says the recent drought experienced in the country shows the urgent need for stronger climate action and child-sensitive policies.',
      'Dr. CHIBAMBA’s remarks were delivered by Principal Climate Change Officer HERRICK MWEWA during the 2026 Kids Climate Change Summit in Lusaka.',
      'Meanwhile, summit convener and Care for Nature Zambia Director NSAMA MUSONDA expressed concern over the growing levels of environmental degradation in many parts of the country, largely linked to mining activities and other human actions.',
      'And Save the Children Zambia Country Director CHILOBE KAMBIKAMBI said climate change is increasingly becoming a child rights issue, with climate shocks threatening children’s wellbeing and development.',
      'Newly elected Children’s Climate Council President ASHLEY PHIRI said the council will work to represent all children, including those in hard-to-reach areas across the country, on climate-related matters.',
      'Meanwhile, Ministry of Education Director of Primary Education LANGFORD CHIBUYE said the newly introduced competence-based curriculum includes sustainable skills aimed at promoting environmental protection.',
      
    ],
  },
  {
    id: 'advocacy-work',
    category: 'National',
    theme: 'Policy',
    title: 'Advocacy work',
    description:
      'Video coverage highlighting our policy advocacy and mining accountability efforts.',
    summary:
      'Policy advocacy is sharpening the voice of vulnerable communities and pushing for stronger mining safeguards.',
    highlight: 'Policy meetings and public advocacy driving accountability in extractive sectors',
    mediaType: 'video',
    media: '/videos/advocacy-work.mp4',
    content: [
      'This story follows our advocacy work with government officials, community coalitions, and civil society partners to promote responsible mining practices.',
      'From hearings to media outreach, the campaign amplified community priorities and built momentum for meaningful regulatory change.',
    ],
  },
  {
    id: 'women-in-manganese-communities',
    category: 'National',
    theme: 'Mining',
    title: 'Women in manganese communities',
    description:
      'News coverage on women’s leadership, rights and livelihood stories in mining areas.',
    summary:
      'Women-led stories from mining communities show how gender equality and environmental justice are linked.',
    highlight: 'Women leading change in mining-affected communities',
    mediaType: 'image',
    media: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779064259/_MG_2437_jlo9ix.jpg',
    content: [
      'This story explores women’s leadership, rights, and livelihoods in manganese mining areas, where families are balancing survival and stewardship.',
      'It highlights training programs, advocacy campaigns, and community networks that are creating safer, more equitable local economies.',
    ],
  },
  {
    id: 'national-mining-dialogue',
    category: 'National',
    theme: 'Policy',
    title: 'National Mining Dialogue',
    description:
      'Highlights from participation in the National Mining Dialogue and policy engagements.',
    summary:
      'The national dialogue brought together communities, industry, and policymakers around responsible mining futures.',
    highlight: 'A platform for inclusive mining dialogue and shared commitments',
    mediaType: 'image',
    media: '/images/topics/national-mining-dialogue.jpg',
    content: [
      'The National Mining Dialogue created a space where community voices were heard alongside corporate and government stakeholders.',
      'Outcomes from the meeting include stronger commitments on environmental protection, community benefit sharing, and compliance with mining regulations.',
    ],
  },
  {
    id: 'luapula-alternative-mining-indaba',
    category: 'Regional',
    theme: 'Mining',
    title: 'Luapula Alternative Mining Indaba',
    description:
      'Provincial dialogue on mining at the Luapula Alternative Mining Indaba (LUAMI).',
    summary:
      'Regional dialogue is helping communities shape better mining practice and stronger local oversight.',
    highlight: 'Community-centered mining conversations in Luapula province',
    mediaType: 'video',
    media: '/videos/luapula-indaba.mp4',
    content: [
      'This story covers the Luapula Alternative Mining Indaba, where provincial leaders, activists, and residents discussed mining impacts and alternatives.',
      'Participants explored local strategies for environmental protection, land rights, and sustainable livelihoods beyond extractive activity.',
    ],
  },
  {
    id: 'regional-ami-cape-town',
    category: 'Regional',
    theme: 'Mining',
    title: 'Alternative Mining Indaba, Cape Town',
    description:
      'Regional meeting coverage from the Alternative Mining Indaba (AMI) in Cape Town.',
    summary:
      'Regional partnerships at AMI are strengthening the movement for responsible mining across southern Africa.',
    highlight: 'Cross-border collaboration on mining accountability and community protections',
    mediaType: 'video',
    media: '/videos/ami-cape-town.mp4',
    content: [
      'At AMI, delegates shared lessons from mining communities and discussed practical tools for transparency, justice, and environmental care.',
      'The event showcased the power of regional solidarity in shaping mining policy and defending community rights.',
    ],
  },
  {
    id: 'mining-pollution',
    category: 'Global',
    theme: 'Nature',
    title: 'Addressing mining pollution',
    description:
      'Visual stories about pollution issues in the mining sector and our response.',
    summary:
      'Pollution stories reveal the urgent need for nature-based solutions and responsible mining management.',
    highlight: 'Protecting ecosystems from mining pollution through local action',
    mediaType: 'image',
    media: '/images/topics/mining-pollution.jpg',
    content: [
      'This story documents pollution impacts from mining and the efforts to restore water, soil, and wildlife habitat.',
      'It also highlights the work of community monitors and environmental teams to hold industry accountable and restore damaged landscapes.',
    ],
  },
  {
    id: 'community-capacity-building',
    category: 'Other',
    theme: 'Community',
    title: 'Community capacity building',
    description:
      'Projects that strengthen community skills, governance and environmental resilience.',
    summary:
      'Capacity building is empowering communities to lead conservation and climate resilience efforts.',
    highlight: 'Stronger communities through training, governance, and local leadership',
    mediaType: 'image',
    media: '/images/topics/community-capacity-building.jpg',
    content: [
      'This story explains how training programs, governance support, and mentorship are helping communities manage natural resources more effectively.',
      'Local leaders are using those skills to protect forests, manage water, and sustain livelihoods in a changing climate.',
    ],
  },
  {
    id: 'year-2024-highlights',
    category: 'Other',
    theme: 'Advocacy',
    title: '2024 highlights',
    description:
      'Milestones from 2024 across national, regional and global engagements.',
    summary:
      'A year of milestones across conservation, community advocacy, and regional partnership.',
    highlight: 'Celebrating impact, innovation, and collaboration from 2024',
    mediaType: 'image',
    media: '/images/topics/2024-highlights.jpg',
    content: [
      'Our 2024 highlights include conservation wins, policy successes, and strengthened regional networks improving community outcomes.',
      'The story brings together achievements from national campaigns, regional dialogues, and global partnerships.',
    ],
  },
];
