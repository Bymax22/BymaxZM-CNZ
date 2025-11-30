'use client';

import React, { useState } from 'react';

export default function ImpactCalculator() {
  const [trees, setTrees] = useState(100);

  // Simple sample calculation for demo purposes
  const co2PerTree = 0.02; // tons CO2 per tree per year (example)
  const estimatedCO2 = (trees * co2PerTree).toFixed(2);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Impact Calculator</h2>
        <p className="text-gray-600 mb-4">Estimate the climate impact of planting trees.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <label className="sm:col-span-2">
            <input
              type="range"
              min={10}
              max={10000}
              value={trees}
              onChange={(e) => setTrees(Number(e.target.value))}
              className="w-full"
            />
          </label>

          <div className="text-right">
            <div className="text-sm text-gray-500">Trees planted</div>
            <div className="text-xl font-semibold">{trees.toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Estimated CO₂ captured per year</div>
          <div className="text-2xl font-bold text-green-700">{estimatedCO2} tons</div>
          <div className="text-xs text-gray-500 mt-2">(Using a simple public-domain estimate for illustration)</div>
        </div>
      </div>
    </section>
  );
}
