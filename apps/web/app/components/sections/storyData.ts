export type StoryTopic = {
  id: string;
  category: 'National' | 'Regional' | 'Global' | 'Other';
  theme: 'Nature' | 'Children' | 'Mining' | 'Policy' | 'Community' | 'Advocacy' | 'Pollution';
  title: string;
  description: string;
  summary: string;
  highlight: string;
  mediaType: 'image' | 'video';
  media: string;
  gallery?: string[];
  content: string[];
};

export const storyCategories = ['All', 'National', 'Regional', 'Global', 'Other'] as const;

export const storyThemes = ['All', 'Nature', 'Children', 'Mining', 'Policy', 'Community', 'Advocacy', 'Pollution' ] as const;

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
    gallery: [
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779064259/_MG_2437_jlo9ix.jpg',
    ],
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
    id: 'polution',
    category: 'National',
    theme: 'Pollution',
    title: 'The Mwense Mine pollution and the damage it has caused to biodiversity and people’s livelihoods!',
    description:
      'Over a month and some weeks since the Mine accident occurred in Mwense District when a tailings dam owned...',
    summary:
      'The Mwense Mine pollution and the damage it has caused to biodiversity and people’s livelihoods!',
    highlight: 'Mine pollution in Mwense.',
    mediaType: 'image',
    media: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779721557/611132077_1317075760451694_7312051361315355744_n_rcakzs.jpg',
    content: [
      'It’s been a month and some weeks since the Mine accident occurred in Mwense District when a tailings dam owned by EZED Mining collapsed releasing toxic substances into Mwense Stream which killed off fish, destroyed crops and left hundreds of community members with no access to safe and clean water.',
      'Care for Nature Zambia visited some of the pollution victims to hear how they have been affected and the findings were both sad and disturbing. Firstly a walk down Mwense Stream should evidence of the Stream still being polluted and people that we spoke to confirmed that they have been cautioned against consuming nor getting I to contact with the water from the Stream. Thus means that they are now depending on water which is delivered to them, which unfortunately is not sufficient to meet their basic water needs. ',
      'Women bemoned how those coming from labor with new born babies where having challenges of Sanitation and hygiene due to inadequate supply of water! And sadly there has been no discussion for compensation despite the polluter having asked for a record of those affected.',
      'A walk through the village lead us to the back side of the area where the tailings dam collapsed. From Kote village, we were able to see the polluted slurry in the tailings that collapsed. To the communities concern, there is a huge furrow being dug to divert water from the hill, which causes flooding when it reaches its peak to a point where they don’t know where the water will drain to. The village households are not the only infrastructure affected, among the most impacted by the effects of mining is Chebele School!',
      'The honest truth is that this copper Mine sits at a very sensitive ecological area, less than 100 if not 50 meters away from Mwense Stream headwaters. The accident which occurred on 25th November was not the first nor second, according to community members this was the 3rd time that the tailings had collapsed in the year 2025. ',
      'The rights of community members have been violated! Copper has been extracted and taken away, there is no sign of corporate social responsibility! The People’s livelihoods have been dependent on fish and agriculture, which the Mine too has taken away! It’s time for affected people of Mwense District to get justice! The polluter must pay and the Mine should close!',
      'In solidarity ✊️ #carefornature',

    ],
  },

  {
    id: 'advocacy-work',
    category: 'National',
    theme: 'Policy',
    title: 'Supporting effective management of Child and Youth led clubs in Samfya District',
    description:
      'Supporting effective management of Child and Youth led clubs in Samfya District.',
    summary:
      'As we prepare to kick start our three year Civil Society and Children’s Climate Action Project on the Copperbelt with support from Save the Children Zambia under the SIDA Civil Society Strengthening Program, we brought together children from 8 Child Rights Clubs from Samfya District including Government officers, traditional leaders, civic leaders and teachers to train them on how to effectively manage child and youth led clubs.',
    highlight: 'Executive Director Nsama Kearns thanked the people of Samfya for the support towards the children and ensured stakeholders of continued support towards the child and youth led program. ',
    mediaType: 'image',
    media: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779720408/651746913_1388376536654949_2206623137915631918_n_kvdcdo.jpg',
    gallery: [
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779727626/484405851_1060700349422571_6461318569406411229_n_ezlgok.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779727627/484946287_1060700342755905_5628316666382113607_n_ehpd5d.jpg',
    ],
    content: [
      'As we prepare to kick start our three year Civil Society and Children’s Climate Action Project on the Copperbelt with support from Save the Children Zambia under the SIDA Civil Society Strengthening Program, we brought together children from 8 Child Rights Clubs from Samfya District including Government officers, traditional leaders, civic leaders and teachers to train them on how to effectively manage child and youth led clubs.',
      'The training was conducted to ensure that children continue to participate in climate change and environmental policy and decision making processes at all levels even as the organization moves to implementing programs at National and Regional level. Children from the child rights club have already joined efforts to establish and register a club called "Save Nature for Young People" under the Local Authority. The training focused on topics relating to legal and policy frameworks on child participation in Zambia, Child protection and safeguarding, Club Management, Networking and Partnerships and Project sustainability.',
      'During the plenary session, Lupili Ward Councilor expressed happiness on the leadership principles that children from the rights clubs have exhibited, pledging his full support to continue working with children and youths to ensure that they continue to inspire others and bring pride to Samfya. Village headman Mwanayama equally pledged to continue supporting the children through their club, stating that his village is now a champion for Children’s rights as they have a representative for children in their village committee.',
      'Care for Nature Zambia envisions a world where children are considered as equal partners in development and are given opportunities to be heard on issues that affect them. Executive Director Nsama Kearns thanked the people of Samfya for the support towards the children and ensured stakeholders of continued support towards the child and youth led program. ',
    
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
    id: 'environmental-crime',
    category: 'National',
    theme: 'Mining',
    title: 'Care for Nature Zambia to report EZED Mining to the National Prosecution Authority, Environmental crimes department',
    description:
      'Care for Nature Zambia to report EZED Mining to the National Prosecution Authority, Environmental crimes department...',
    summary:
      'Care for Nature Zambia to report EZED Mining to the National Prosecution Authority, Environmental crimes department for negligence which has led to loss of biodiversity and violation of human rights!',
    highlight: 'Environmental crime',
    mediaType: 'video',
    media: 'https://res.cloudinary.com/dwxlzl5us/video/upload/q_auto/f_auto/v1779720564/AQM8P5o748CnLADarEMvBFPP4HPM36wRNQ_FOJ2NHRC1GBZ4o9f3Z6QRoKQkKnFcrNUU23rnyj1seOIHnDF3W915YoMf5F-oJFQPOC-n0w_wnvhas.mp4',
    content: [
      'More in the following report (Video file)',
      
    ],
  },

  {
    id: 'children-capacity-building',
    category: 'National',
    theme: 'Policy',
    title: 'CSO and Children’s Capacity Building Training',
    description:
      'CSO and Children’s Capacity Building Training on Reporting and Monitoring Government’s commitments towards protecting children from climate change and environmental impacts.',
    summary:
      'Care for Nature Zambia under the CSO strengthening program supported by Save the Children Zambia with funding from the Swedish International Development Cooperation Agency Sida conducted...',
    highlight: 'A platform for inclusive mining dialogue and shared commitments',
    mediaType: 'image',
    media: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779720008/704914375_1465714018921200_6313954475734854321_n_lau5os.jpg',
    content: [
      'Care for Nature Zambia under the CSO strengthening program supported by Save the Children Zambia with funding from the Swedish International Development Cooperation Agency Sida conducted a two day training for Civil Society Organizations and members of the Zambia Children’s Climate Council on monitoring and reporting on the the commitments that government has made towards protecting children from climate change and environmental impacts.',
      'During the training, FIAN Zambia made a presentation on UN reporting mechanisms and shared experiences and examples of some of the reports that they have presented as an institution and as a coalition of CSOs.',
      'The training further looked at the guidance for children to integrate climate change and environment in the reporting process to the African Committee of Experts on the Rights and Welfare of the Child and used a case study from Cote de voire  to learn how CSO helped children to present a report to the ACERWC for the first time in 2022.',
      'The training which deepened Children’s understand of their rights, state obligations and the periodic reporting and review processes ended with an action plan being developed by children who participated in the training both physically and virtually, including developing operational guidelines for the Zambia Children’s Climate Council.',
      'Care for Nature Zambia remains committed to promoting meaningful participation of children in climate change and environmental policy and decision making processes at all levels. #carefornature See less',
    ],
  },
  {
    id: 'luapula-alternative-mining-indaba',
    category: 'Regional',
    theme: 'Mining',
    title: 'Alternative Mining Indaba',
    description:
      'Untold Stories of Women from Manganese host Communities.',
    summary:
      'Meet 34 year old Liness, a mother of 4 from Mwale Village who is in Cape town, South Africa attending the Alternative Mining Indaba. Liness is among many women negative affected by Manganese mining. An unknown company that was conducting exploration in the area has left trenches around their village destroying their crops, reducing farm land and polluting the Chofoshi stream where they draw water for basic use.',
    highlight: 'AMI',
    mediaType: 'image',
    media: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779727626/484405851_1060700349422571_6461318569406411229_n_ezlgok.jpg',
    content: [
      'Meet 34 year old Liness, a mother of 4 from Mwale Village who is in Cape town, South Africa attending the Alternative Mining Indaba. Liness is among many women negative affected by Manganese mining. An unknown company that was conducting exploration in the area has left trenches around their village destroying their crops, reducing farm land and polluting the Chofoshi stream where they draw water for basic use.',
      'Liness was living Mwale Village for the first time and we were happy to see her smiling as we arrived in Lusaka on Friday 2nd February because she had been sick all through the 12 hour journey from Mansa to Lusaka.',
      'After a restful night she handled the flight well and also enjoyed the boat cruise on the Atlantic Ocean.',
      'oday Liness will be giving a solidarity statement at the AMI and we are extremely excited for her to have this platform of advocacy. She has also learnt what other women around Africa are experiencing and after one session, she said she wants to go back to school so she interpret English for her self. ',
      'Many thanks to Southern Africa Trust for supporting the Women’s Land Rights and Climate Justice Project.',
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
    mediaType: 'image',
    media: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779727627/484946287_1060700342755905_5628316666382113607_n_ehpd5d.jpg',
    content: [
      'At AMI, delegates shared lessons from mining communities and discussed practical tools for transparency, justice, and environmental care.',
      'The event showcased the power of regional solidarity in shaping mining policy and defending community rights.',
    ],
  },
  {
    id: 'cop28',
    category: 'Global',
    theme: 'Advocacy',
    title: 'Care for Nature Zambia has been advocating for child participation in climate change processes and decision making at all levels. ',
    description:
      'Care for Nature Zambia has been advocating for child participation in climate change processes and decision making at all levels. ',
    summary:
      'Pollution stories reveal the urgent need for nature-based solutions and responsible mining management.',
    highlight: 'This year we were extremely excited that 2 children 1 from Luapula Province and the other from Southern Province were part of the Zambian delegation that attended the United Nations Conference of Parties on Climate Change with support from Save the Children Zambia.',
    mediaType: 'image',
    media: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779728254/484907373_1059382549554351_264895252848447067_n_cyidfh.jpg',
    content: [
      '06.12.2023',
      'Care for Nature Zambia has been advocating for child participation in climate change processes and decision making at all levels. This year we were extremely excited that 2 children 1 from Luapula Province and the other from Southern Province were part of the Zambian delegation that attended the United Nations Conference of Parties on Climate Change with support from Save the Children Zambia.',
      'On arrival, the children had a feel of the highly participated Conference with over 100, 000 delegates said to have registered for this significant event where World leaders negotiate and make decisions on matters relating to climate change.',
      'Join us here as we share the experiences and achievements we recorded at COP 28.',
    ],
  },

  {
    id: 'year-2023-highlights',
    category: 'Other',
    theme: 'Advocacy',
    title: 'Swedish ambassador to Zambia during the Mine visit to AMIZO Mine',
    description:
      'Swedish ambassador to Zambia during the Mine visit to AMIZO Mine.',
    summary:
      'A year of milestones across conservation, community advocacy, and regional partnership.',
    highlight: '27.07.2023',
    mediaType: 'image',
    media: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779728664/481203668_1049816653844274_6869822423782969566_n_crtku6.jpg',
    content: [
      'Care for Nature Zambia Programs Manager Mrs Bridget Ndebe Tembo with His Excellency Johan Hallenborg, the Swedish ambassador to Zambia during the Mine visit to AMIZO Mine Save the Children Zambia Swedish Embassy.',
      
    ],
  },
];
