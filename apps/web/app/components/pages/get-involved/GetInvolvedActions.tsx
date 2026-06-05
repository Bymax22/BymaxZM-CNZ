'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type ProjectOption = {
  id: string;
  title: string;
  description: string;
  location: string;
  volunteersCount: number;
  totalDonations: number;
};

const emptyVolunteerState = {
  projectId: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  skills: '',
  message: '',
};

const emptyPartnerState = {
  projectId: '',
  organization: '',
  contactName: '',
  contactEmail: '',
  website: '',
  message: '',
};

const emptyCareerState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  roleInterested: '',
  resumeLink: '',
  message: '',
};

export function GetInvolvedActions() {
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectError, setProjectError] = useState<string | null>(null);

  const [volunteer, setVolunteer] = useState(emptyVolunteerState);
  const [partner, setPartner] = useState(emptyPartnerState);
  const [career, setCareer] = useState(emptyCareerState);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const [volunteerStatus, setVolunteerStatus] = useState<string | null>(null);
  const [partnerStatus, setPartnerStatus] = useState<string | null>(null);
  const [careerStatus, setCareerStatus] = useState<string | null>(null);

  const [volunteerLoading, setVolunteerLoading] = useState(false);
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [careerLoading, setCareerLoading] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/projects?limit=6');
        const data = await response.json();

        if (!response.ok) {
          setProjectError(data.error || 'Could not load projects');
          return;
        }

        setProjects(data.projects ?? []);
      } catch (error) {
        setProjectError('Unable to load projects at this time.');
      } finally {
        setLoadingProjects(false);
      }
    }

    void loadProjects();
  }, []);

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus(null);

    if (!newsletterEmail.trim()) {
      setNewsletterStatus('Please enter an email address.');
      return;
    }

    const trimmed = newsletterEmail.trim().toLowerCase();

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await response.json();
      if (!response.ok) {
        setNewsletterStatus(data.error || 'Unable to subscribe right now. Please try again later.');
        return;
      }

      setNewsletterStatus('Thank you! You are subscribed to our newsletter.');
      setNewsletterEmail('');
    } catch (error) {
      console.error('Newsletter signup failed', error);
      setNewsletterStatus('Unable to subscribe right now. Please try again later.');
    }
  };

  const submitForm = async (
    path: string,
    payload: Record<string, unknown>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    setStatus: React.Dispatch<React.SetStateAction<string | null>>, 
    reset: () => void
  ) => {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error || 'Something went wrong.');
      } else {
        setStatus(data.message || 'Request received. We will follow up soon.');
        reset();
      }
    } catch (error) {
      console.error(error);
      setStatus('Unable to submit your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVolunteerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!volunteer.projectId || !volunteer.firstName || !volunteer.lastName || !volunteer.email) {
      setVolunteerStatus('Please complete all required fields.');
      return;
    }

    await submitForm(
      '/api/get-involved/volunteer',
      {
        ...volunteer,
        skills: volunteer.skills,
        message: volunteer.message,
      },
      setVolunteerLoading,
      setVolunteerStatus,
      () => setVolunteer(emptyVolunteerState)
    );
  };

  const handlePartnerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!partner.organization || !partner.contactName || !partner.contactEmail || !partner.projectId) {
      setPartnerStatus('Please complete all required fields.');
      return;
    }

    await submitForm(
      '/api/get-involved/partnership',
      partner,
      setPartnerLoading,
      setPartnerStatus,
      () => setPartner(emptyPartnerState)
    );
  };

  const handleCareerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!career.firstName || !career.lastName || !career.email || !career.roleInterested) {
      setCareerStatus('Please complete all required fields.');
      return;
    }

    await submitForm(
      '/api/get-involved/careers',
      career,
      setCareerLoading,
      setCareerStatus,
      () => setCareer(emptyCareerState)
    );
  };

  const projectOptions = projects.length
    ? projects
    : [{ id: '', title: 'Loading projects...', description: '' }];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-[#029346]">Get Involved</p>
              <h2 className="mt-4 text-4xl font-bold text-slate-900">
                Take action with a volunteer, partnership, or careers request.
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl">
                Use the forms below to express interest in volunteering, partnering, or joining our team. Each request is stored in the database and recorded against real projects and opportunities.
              </p>
            </motion.div>

            <div className="grid gap-8">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Volunteer with a project</h3>
                  <p className="text-gray-600 mt-2">
                    Select a current project and tell us how you want to help. We will record your volunteer interest in the database.
                  </p>
                </div>

                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      First name *
                      <input
                        type="text"
                        name="firstName"
                        value={volunteer.firstName}
                        onChange={(event) => setVolunteer({ ...volunteer, firstName: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      Last name *
                      <input
                        type="text"
                        name="lastName"
                        value={volunteer.lastName}
                        onChange={(event) => setVolunteer({ ...volunteer, lastName: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      Email *
                      <input
                        type="email"
                        name="email"
                        value={volunteer.email}
                        onChange={(event) => setVolunteer({ ...volunteer, email: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      Phone
                      <input
                        type="tel"
                        name="phone"
                        value={volunteer.phone}
                        onChange={(event) => setVolunteer({ ...volunteer, phone: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      Choose project *
                      <select
                        value={volunteer.projectId}
                        onChange={(event) => setVolunteer({ ...volunteer, projectId: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      >
                        <option value="">Select a project</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      Skills / availability
                      <input
                        type="text"
                        name="skills"
                        value={volunteer.skills}
                        onChange={(event) => setVolunteer({ ...volunteer, skills: event.target.value })}
                        placeholder="e.g. community outreach, field work"
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 text-sm text-slate-700">
                    Message
                    <textarea
                      name="message"
                      value={volunteer.message}
                      onChange={(event) => setVolunteer({ ...volunteer, message: event.target.value })}
                      rows={4}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                    />
                  </label>

                  {volunteerStatus && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {volunteerStatus}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={volunteerLoading}
                    className="inline-flex items-center justify-center rounded-full bg-[#029346] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#027437] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {volunteerLoading ? 'Submitting...' : 'Submit Volunteer Interest'}
                  </button>
                </form>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Partner with our projects</h3>
                  <p className="text-gray-600 mt-2">
                    Share your organisation&apos;s interest in collaboration and help us scale impact.
                  </p>
                </div>

                <form onSubmit={handlePartnerSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      Organization name *
                      <input
                        type="text"
                        name="organization"
                        value={partner.organization}
                        onChange={(event) => setPartner({ ...partner, organization: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      Contact person *
                      <input
                        type="text"
                        name="contactName"
                        value={partner.contactName}
                        onChange={(event) => setPartner({ ...partner, contactName: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      Email address *
                      <input
                        type="email"
                        name="contactEmail"
                        value={partner.contactEmail}
                        onChange={(event) => setPartner({ ...partner, contactEmail: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      Website
                      <input
                        type="url"
                        name="website"
                        value={partner.website}
                        onChange={(event) => setPartner({ ...partner, website: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 text-sm text-slate-700">
                    Project to partner with *
                    <select
                      value={partner.projectId}
                      onChange={(event) => setPartner({ ...partner, projectId: event.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                    >
                      <option value="">Choose a project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    Message
                    <textarea
                      name="message"
                      value={partner.message}
                      onChange={(event) => setPartner({ ...partner, message: event.target.value })}
                      rows={4}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                    />
                  </label>

                  {partnerStatus && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {partnerStatus}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={partnerLoading}
                    className="inline-flex items-center justify-center rounded-full bg-[#F79021] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#dc7e11] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {partnerLoading ? 'Submitting...' : 'Send Partnership Request'}
                  </button>
                </form>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Careers & opportunities</h3>
                  <p className="text-gray-600 mt-2">
                    Apply for a role or ask about current openings. We will create a candidate record in the database.
                  </p>
                </div>

                <form onSubmit={handleCareerSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      First name *
                      <input
                        type="text"
                        name="firstName"
                        value={career.firstName}
                        onChange={(event) => setCareer({ ...career, firstName: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      Last name *
                      <input
                        type="text"
                        name="lastName"
                        value={career.lastName}
                        onChange={(event) => setCareer({ ...career, lastName: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      Email address *
                      <input
                        type="email"
                        name="email"
                        value={career.email}
                        onChange={(event) => setCareer({ ...career, email: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      Phone
                      <input
                        type="tel"
                        name="phone"
                        value={career.phone}
                        onChange={(event) => setCareer({ ...career, phone: event.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 text-sm text-slate-700">
                    Role you are interested in *
                    <input
                      type="text"
                      name="roleInterested"
                      value={career.roleInterested}
                      onChange={(event) => setCareer({ ...career, roleInterested: event.target.value })}
                      placeholder="e.g. Program Coordinator, Communications"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    Resume or profile link
                    <input
                      type="url"
                      name="resumeLink"
                      value={career.resumeLink}
                      onChange={(event) => setCareer({ ...career, resumeLink: event.target.value })}
                      placeholder="Optional link to your CV, LinkedIn or portfolio"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    Message
                    <textarea
                      name="message"
                      value={career.message}
                      onChange={(event) => setCareer({ ...career, message: event.target.value })}
                      rows={4}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                    />
                  </label>

                  {careerStatus && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {careerStatus}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={careerLoading}
                    className="inline-flex items-center justify-center rounded-full bg-[#0C4726] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#08411c] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {careerLoading ? 'Submitting...' : 'Send Career Interest'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">Newsletter signup</h3>
              <p className="text-gray-600 mt-2">
                Stay updated with project launches, volunteer calls, and partnership opportunities.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="mt-6 space-y-4">
                <label className="sr-only" htmlFor="newsletter-email">
                  Newsletter email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-[#029346] focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#029346] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#027437]"
                >
                  Subscribe now
                </button>

                {newsletterStatus && (
                  <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {newsletterStatus}
                  </p>
                )}
              </form>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">Featured projects</h3>
              <p className="text-gray-600 mt-2">
                These projects are currently open for volunteering and partnership conversations.
              </p>

              <div className="mt-6 space-y-4">
                {loadingProjects ? (
                  <div className="rounded-3xl bg-slate-50 p-4 text-slate-500">Loading projects…</div>
                ) : projectError ? (
                  <div className="rounded-3xl bg-rose-50 p-4 text-rose-700">{projectError}</div>
                ) : (
                  projects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <h4 className="font-semibold text-slate-900">{project.title}</h4>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{project.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-white px-3 py-1">Volunteers {project.volunteersCount}</span>
                        <span className="rounded-full bg-white px-3 py-1">Raised ZMW {project.totalDonations.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
