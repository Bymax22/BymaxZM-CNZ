'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaCheckCircle } from 'react-icons/fa';

const missionPoints = [
  'Environmental conservation and restoration',
  'Child rights and participation',
  'Sustainable mining and extractives accountability',
  'Organizational capacity and governance',
  'Sustainable livelihoods and green jobs',
];

const visionPoints = [
  'Carbon-neutral communities by 2040',
  '100,000+ trees planted annually',
  'Environmental education in every school',
  'Sustainable livelihoods for rural households',
  'A nationwide conservation network',
];

export function MissionVision() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white mb-6">
                <FaBullseye className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                To build resilient and prosperous communities through nature-based action, child-centred development, sustainable extractives reforms, and local institution strengthening.
              </p>
              <div className="space-y-3">
                {missionPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-gray-600">
                    <FaCheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-700" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600 text-white mb-6">
                <FaEye className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                A Zambia where thriving ecosystems and empowered communities coexist in harmony, where every citizen is an active steward of the environment, and where sustainable development ensures prosperity for future generations.
              </p>
              <div className="space-y-3">
                {visionPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-gray-600">
                    <FaCheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-orange-600" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative h-[520px] w-full">
              <Image
                src="/images/community.jpg"
                alt="Community conservation in Zambia"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-slate-950/35 p-8 flex flex-col justify-end">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Our strategic direction</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Guided by people, policy, and nature.</h2>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
