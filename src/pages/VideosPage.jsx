import React from 'react';
import { Play, Video, ShieldCheck, Factory, Container, ArrowRight } from 'lucide-react';

const FACTORY_YOUTUBE_VIDEOS = [
  {
    id: '0V-VnHGNojU',
    title: 'Single-Stroke Ignition & Damp Resistance Quality Testing',
    description: 'Quality assurance laboratory testing instant flame ignition, zero afterglow safety, and moisture-proof wax match performance.',
    embedUrl: 'https://www.youtube.com/embed/0V-VnHGNojU?rel=0',
    category: 'Quality Control'
  },
  {
    id: '4IgDjNgUJvg',
    title: 'Match Box Filling & FCL Container Stuffing at Sivakasi Plant',
    description: 'Demonstrating 20FT & 40FT High Cube container stuffing at Glovel plant for sea export through V.O. Chidambaranar Port (Tuticorin).',
    embedUrl: 'https://www.youtube.com/embed/4IgDjNgUJvg?rel=0',
    category: 'Export Container Stuffing'
  }
];

export default function VideosPage({ onOpenRfq }) {
  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-bold mb-4">
            <Video className="w-3.5 h-3.5 text-yellow-600" />
            <span>Glovel Matches LLP Video Showcase</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Factory Tour & <span className="flame-gradient-text">Manufacturing Videos</span>
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Watch our automated safety match production lines, quality ignition testing, and FCL container stuffing in Sivakasi.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Factory Video Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACTORY_YOUTUBE_VIDEOS.map((video) => (
            <div key={video.id} className="glass-card rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:border-yellow-400 transition-all flex flex-col justify-between group">
              <div>
                {/* Responsive iFrame Container */}
                <div className="relative aspect-16/9 bg-slate-950 overflow-hidden border-b border-slate-200">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <div className="p-6">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-yellow-100 text-yellow-900 border border-yellow-300 inline-block mb-3">
                    {video.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-yellow-700 transition-colors mb-2 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onOpenRfq(`Inquiry regarding ${video.title}`)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                >
                  <span>Inquire About Factory Process</span>
                  <ArrowRight className="w-3.5 h-3.5 text-yellow-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Highlights Box */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 border border-yellow-300 flex items-center justify-center text-yellow-700 font-bold shrink-0">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Automated Chemical Dipping</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Splints are dipped with precision head chemicals for uniform ignition and zero splint detachment.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 font-bold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">100% Moisture Barrier</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Wax match sticks & polywrap bundles pass strict humidity immersion testing for export safety.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 font-bold shrink-0">
              <Container className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Tuticorin Port Stuffing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Direct container loading and sealing at our factory floor for rapid dispatch through Tuticorin Port.</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Glovel Matches LLP Plant Visit</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-2">Schedule a Virtual or On-Site Factory Inspection</h2>
            <p className="text-slate-300 text-sm max-w-xl">
              We welcome international importers to inspect our Sivakasi manufacturing unit or arrange a live video inspection for container loading.
            </p>
          </div>
          <button
            onClick={() => onOpenRfq('Factory Inspection Inquiry')}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-lg text-sm shrink-0 cursor-pointer"
          >
            Schedule Factory Inspection
          </button>
        </div>

      </div>

    </div>
  );
}
