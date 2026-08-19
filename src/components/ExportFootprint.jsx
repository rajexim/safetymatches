import React from 'react';
import { Globe, Award, ShieldCheck, MapPin, Anchor, CheckCircle2, Factory } from 'lucide-react';

const REGIONS = [
  { name: 'Africa', countries: 'Kenya, Nigeria, Ghana, Tanzania, Ethiopia, Mozambique', percentage: '35%' },
  { name: 'Middle East', countries: 'UAE, Saudi Arabia, Oman, Qatar, Yemen', percentage: '25%' },
  { name: 'Latin America', countries: 'Brazil, Chile, Colombia, Peru, Guatemala', percentage: '20%' },
  { name: 'Europe & UK', countries: 'UK, Germany, France, Poland, Greece', percentage: '12%' },
  { name: 'Asia Pacific', countries: 'Australia, Sri Lanka, Malaysia, Philippines', percentage: '8%' },
];

export default function ExportFootprint() {
  return (
    <section id="export-hub" className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold mb-4">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>International B2B Supply Chain</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
            Global Export Network & <span className="flame-gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Operating directly from Sivakasi, Tamil Nadu—the global safety match manufacturing capital—with direct port clearance at Tuticorin Sea Port.
          </p>
        </div>

        {/* Global Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {REGIONS.map((reg) => (
            <div key={reg.name} className="glass-card p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-600" />
                    <span>{reg.name}</span>
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                    {reg.percentage} Export Volume
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  <strong className="text-slate-900 font-semibold">Key Buyers:</strong> {reg.countries}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Custom Labeling & Packaging Compliant</span>
              </div>
            </div>
          ))}

          {/* Port Dispatch Highlight Box */}
          <div className="glass-card p-6 rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50/50 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Anchor className="w-4 h-4 text-amber-600" />
                <span>Primary Export Port</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tuticorin Sea Port (VOC Port)</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Located just 90 km from our Sivakasi manufacturing plant, ensuring rapid container stuffed dispatch, quick BL release, and competitive sea freight rates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900 font-bold">
              <span>Average Transit: 12 - 25 Days</span>
              <Anchor className="w-4 h-4 text-amber-600" />
            </div>
          </div>

        </div>

        {/* Quality Certifications Bar */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-700 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">ISO 9001:2015 Certified</h4>
              <p className="text-xs text-slate-500 mt-1">Rigorous quality control audits across automated splint dipping, box assembly, and head chemical formula stability.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">BIS IS 2653 Standard</h4>
              <p className="text-xs text-slate-500 mt-1">Complying with Bureau of Indian Standards safety guidelines: non-splintering wooden splints & non-toxic strike head compounds.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-100 border border-blue-300 text-blue-700 shrink-0">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">EU REACH & Environmental</h4>
              <p className="text-xs text-slate-500 mt-1">Free from heavy metals, chlorate balance compliance, and eco-friendly recyclable packaging options.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
