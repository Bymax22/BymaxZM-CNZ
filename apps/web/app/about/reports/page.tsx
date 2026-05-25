import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impact Reports - Care for Nature Zambia',
  description: 'Published reports, PDFs and transparency documents.',
};

const annualReports = [
  { year: '2024', title: 'Annual Report 2024', fileUrl: '/reports/annual-report-2024.pdf' },
  { year: '2023', title: 'Annual Report 2023', fileUrl: '/reports/annual-report-2023.pdf' },
  { year: '2022', title: 'Annual Report 2022', fileUrl: '/reports/annual-report-2022.pdf' },
];

export default function ReportsPage() {
  return (
    <main className="pt-24 pb-16">
      <section className="relative">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold mb-4">Reports</h1>
          <p className="text-gray-600 mb-8">Published reports and transparency documents. Click a tile to view or download the PDF.</p>

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-md bg-emerald-700 text-white">Tile view</button>
              <button className="px-4 py-2 rounded-md border">List view</button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {annualReports.map((report) => (
              <article key={report.year} className="rounded-lg border border-slate-200 bg-white p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">{report.year}</div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                </div>

                <div className="flex gap-2">
                  {report.fileUrl ? (
                    <>
                      <a href={report.fileUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-emerald-700 text-white text-sm">View</a>
                      <a href={report.fileUrl} download className="px-3 py-2 rounded-md border text-sm">Download</a>
                    </>
                  ) : (
                    <span className="text-sm text-gray-500">Not uploaded</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
