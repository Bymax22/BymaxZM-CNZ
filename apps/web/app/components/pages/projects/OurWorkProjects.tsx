'use client';

const workProjects = [
  {
    number: '01',
    title: 'Conservation of the Chamalawa Hot Spring Heritage Site',
    description: 'Implemented in partnership with the National Heritage Conservation Commission in 2013 with support from Civil Society Environment Fund (CSEF1).',
  },
  {
    number: '02',
    title: 'Action Research: Women and Youth Access to Development Minerals and Mining Rights',
    description: 'Conducted in 2017/18 with support from UNDP Small Grants under the ACP-EU Development Minerals Program.',
  },
  {
    number: '03',
    title: 'Community Action Project: Transparency and Accountability in Natural Resource Management',
    description: 'Implemented in 2018/19 with support from ActionAid Zambia, strengthening legal and policy compliance in mining and environmental management.',
  },
  {
    number: '04',
    title: 'Children’s Climate Action Project',
    description: 'Empowered children in Mansa District to take action against climate change and advocate for improved nutrition and health services, implemented 2021–2023 with Save the Children.',
  },
  {
    number: '05',
    title: 'Children’s Agency Project',
    description: 'Enhanced capacity of children to participate in climate campaigns, negotiations and reporting at all levels in Samfya District with support from Save the Children and SIDA-CSO.',
  },
  {
    number: '06',
    title: 'Women’s Land Rights and Climate Justice Project',
    description: 'Built capacity of women in the Kabunda-Matelo manganese mining community to defend land rights for resilient livelihoods and climate justice under Southern Africa Trust.',
  },
];

export function OurWorkProjects() {
  return (
    <section id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gray-500 mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Recent Project Work and Action</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            A selection of our flagship projects and research programs that demonstrate our commitment to nature conservation, children&apos;s rights, community accountability, and climate justice.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {workProjects.map((project) => (
            <div key={project.number} className="border border-gray-200 rounded-3xl bg-gray-50 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#029346] text-white font-bold">{project.number}</div>
                <h3 className="text-2xl font-semibold text-gray-900">{project.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
