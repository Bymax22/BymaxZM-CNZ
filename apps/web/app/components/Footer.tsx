"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#441f01] text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h5 className="font-bold">Care for Nature Zambia</h5>
          <p className="text-sm text-white/80 mt-2">Care for Nature Zambia (CNZ) is a local not-for-profit Non-Governmental Organization working with diverse groups of people and institutions to promote nature conservation and human rights for the attainment of sustainable development in Zambia.</p>
        </div>
        <div>
          <h6 className="font-semibold">Quick Links</h6>
          <ul className="mt-2 text-sm space-y-1 text-white/90">
            <li>About Us</li>
            <li>Programs</li>
            <li>Impact</li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold">Programs</h6>
          <ul className="mt-2 text-sm space-y-1 text-white/90">
            <li>Nature Conservation Program-NCP</li>
            <li>Sustainable Mining Program -SMP</li>
            <li>Child Rights and Development Program-CRDP</li>
            <li>Organization Development Program - ODP</li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold">Subscribe to our Newsletter</h6>
          <p className="text-sm text-white/80 mt-2">Stay updated with our latest stories and initiatives.</p>
          <div className="mt-3 flex gap-2">
            <input className="flex-1 px-3 py-2 rounded" placeholder="Enter your email address" />
            <button className="px-4 py-2 bg-[#ff6600] text-white rounded">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="bg-[#036b14] text-white text-sm py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div>© 2026 CaNZ. All rights reserved. Developed by Bymax Zambia</div>
          <div className="space-x-4">Privacy Policy • Terms of Use • Refund Policy</div>
        </div>
      </div>
    </footer>
  );
}
