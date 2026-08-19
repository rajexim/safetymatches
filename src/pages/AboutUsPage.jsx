import React, { useState } from 'react';
import { Factory, Globe, ShieldCheck, CheckCircle2, Award, Search, ArrowRight, Building, FileText } from 'lucide-react';
import SmartImage from '../components/SmartImage';

const COUNTRY_FLAGS = [
  { name: 'Albania', code: 'al', region: 'Europe' },
  { name: 'Argentina', code: 'ar', region: 'Americas' },
  { name: 'Armenia', code: 'am', region: 'Asia & Europe' },
  { name: 'Australia', code: 'au', region: 'Asia Pacific' },
  { name: 'Bahrain', code: 'bh', region: 'Middle East' },
  { name: 'Benin', code: 'bj', region: 'Africa' },
  { name: 'Canada', code: 'ca', region: 'Americas' },
  { name: 'Chile', code: 'cl', region: 'Americas' },
  { name: 'Colombia', code: 'co', region: 'Americas' },
  { name: 'Congo', code: 'cg', region: 'Africa' },
  { name: 'Conakry (Guinea)', code: 'gn', region: 'Africa' },
  { name: 'Costa Rica', code: 'cr', region: 'Americas' },
  { name: 'Côte d\'Ivoire', code: 'ci', region: 'Africa' },
  { name: 'Dominican Republic', code: 'do', region: 'Americas' },
  { name: 'Egypt', code: 'eg', region: 'Africa & Middle East' },
  { name: 'El Salvador', code: 'sv', region: 'Americas' },
  { name: 'Estonia', code: 'ee', region: 'Europe' },
  { name: 'Georgia', code: 'ge', region: 'Europe' },
  { name: 'Ghana', code: 'gh', region: 'Africa' },
  { name: 'Guatemala', code: 'gt', region: 'Americas' },
  { name: 'Honduras', code: 'hn', region: 'Americas' },
  { name: 'Hong Kong', code: 'hk', region: 'Asia Pacific' },
  { name: 'Israel', code: 'il', region: 'Middle East' },
  { name: 'Kenya', code: 'ke', region: 'Africa' },
  { name: 'Latvia', code: 'lv', region: 'Europe' },
  { name: 'Lebanon', code: 'lb', region: 'Middle East' },
  { name: 'Lithuania', code: 'lt', region: 'Europe' },
  { name: 'Maldives', code: 'mv', region: 'Asia Pacific' },
  { name: 'Mauritius', code: 'mu', region: 'Africa' },
  { name: 'Mexico', code: 'mx', region: 'Americas' },
  { name: 'Mongolia', code: 'mn', region: 'Asia Pacific' },
  { name: 'Mozambique', code: 'mz', region: 'Africa' },
  { name: 'Nicaragua', code: 'ni', region: 'Americas' },
  { name: 'Nigeria', code: 'ng', region: 'Africa' },
  { name: 'Norway', code: 'no', region: 'Europe' },
  { name: 'Panama', code: 'pa', region: 'Americas' },
  { name: 'Paraguay', code: 'py', region: 'Americas' },
  { name: 'Peru', code: 'pe', region: 'Americas' },
  { name: 'Portugal', code: 'pt', region: 'Europe' },
  { name: 'Réunion', code: 're', region: 'Africa' },
  { name: 'Rwanda', code: 'rw', region: 'Africa' },
  { name: 'Sao Tome', code: 'st', region: 'Africa' },
  { name: 'Slovakia', code: 'sk', region: 'Europe' },
  { name: 'South Africa', code: 'za', region: 'Africa' },
  { name: 'Spain', code: 'es', region: 'Europe' },
  { name: 'Switzerland', code: 'ch', region: 'Europe' },
  { name: 'Turkey', code: 'tr', region: 'Europe & Middle East' },
  { name: 'UAE', code: 'ae', region: 'Middle East' },
  { name: 'Uganda', code: 'ug', region: 'Africa' },
  { name: 'Ukraine', code: 'ua', region: 'Europe' },
  { name: 'United Kingdom', code: 'gb', region: 'Europe' },
  { name: 'Zambia', code: 'zm', region: 'Africa' }
].map(c => ({
  ...c,
  flag: `https://flagcdn.com/w80/${c.code}.png`
}));

export default function AboutUsPage({ onOpenRfq }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredCountries = COUNTRY_FLAGS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || c.region.includes(selectedRegion);
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-semibold mb-4">
            <Factory className="w-3.5 h-3.5 text-amber-600" />
            <span>Glovel Matches LLP History & Credentials</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            About <span className="flame-gradient-text">Glovel Matches LLP</span>
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Glovel Matches LLP is a premier safety match manufacturer and exporter operating out of Sivakasi, Tamil Nadu—the match manufacturing capital of India. Supplying high quality wooden, wax, BBQ, and promotional matches to buyers across 52+ nations.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              One-Stop Destination for International Safety Match Importers
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Backed by our vast industry experience, Glovel Matches LLP is engaged in supplying and exporting a huge array of wax matches and safety matches. These products include <strong className="text-slate-900">pocket safety matches</strong>, <strong className="text-slate-900">kitchen safety matches</strong>, <strong className="text-slate-900">barbeque matches</strong>, <strong className="text-slate-900">wax matches</strong>, <strong className="text-slate-900">box matches</strong>, <strong className="text-slate-900">cigar matches</strong>, and <strong className="text-slate-900">book matches</strong>.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our products are known for their high quality, reliability, and durability—capable of lighting immediately at a single stroke. We offer these products in tamper-proof and compact packing solutions for secure storage and ocean transport. Thus, our safety match products enjoy a trusted reputation across international markets.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Glovel Matches LLP is part of the <strong className="text-slate-900">Glovel Group of Companies</strong>, which also manufactures and exports incense sticks and incense cones from the same Tamil Nadu facilities. This site covers our safety matches catalogue in full; visit{' '}
              <a href="https://www.glovel.in" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline hover:text-amber-800">
                glovel.in
              </a>{' '}
              for our incense product range.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-heading">52+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Export Nations</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-heading">1.2B+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Annual Match Output</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-heading">ISO</div>
                <div className="text-xs text-slate-500 font-medium mt-1">9001:2015 Certified</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-4 space-y-4">
              <SmartImage
                src="/assets/images/products/About-images.png"
                alt="Collage of safety matchboxes manufactured by Glovel Matches LLP, including household, kitchen, wax and promotional designs"
                sizes="(max-width: 1024px) 92vw, 400px"
                loading="lazy"
                decoding="async"
                className="w-full h-56 object-contain bg-slate-50 rounded-2xl border border-slate-100 p-2"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-center">
                  <SmartImage
                    src="/assets/images/buyers/ISO-CERTIFICATE-SAFETY-MATCHES-LLP.png"
                    alt="ISO 9001:2015 quality management certificate issued to Glovel Matches LLP"
                    sizes="200px"
                    loading="lazy"
                    decoding="async"
                    className="max-h-24 w-auto object-contain"
                  />
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-center">
                  <SmartImage
                    src="/assets/images/buyers/CAPEXIL-Certificate-Glovel.jpg"
                    alt="CAPEXIL export promotion council membership certificate for Glovel Matches LLP"
                    sizes="200px"
                    loading="lazy"
                    decoding="async"
                    className="max-h-24 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Export Network - All 52 Country Flags via High-Reliability CDN */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 mb-2">
                <Globe className="w-3.5 h-3.5" />
                <span>Global Footprint ({COUNTRY_FLAGS.length} Countries)</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Glovel Matches LLP Export Markets Worldwide
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore the international destinations where Glovel Matches LLP supplies safety matches.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 text-slate-800 focus:outline-none focus:border-amber-500 w-44"
                />
              </div>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
              >
                <option value="All">All Regions (52)</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Europe">Europe</option>
                <option value="Middle East">Middle East</option>
                <option value="Asia Pacific">Asia Pacific</option>
              </select>
            </div>
          </div>

          {/* Grid of Country Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredCountries.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-400 transition-all group">
                <img
                  src={c.flag}
                  alt={`Flag of ${c.name}, a Glovel Matches LLP safety match export market`}
                  width="40"
                  height="28"
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-7 object-cover rounded shadow-xs border border-slate-300 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 truncate group-hover:text-amber-700">{c.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{c.region}</div>
                </div>
              </div>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No matching countries found for "{searchTerm}".
            </div>
          )}
        </div>

        {/* Bottom Call to Action */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Glovel Matches LLP Direct Factory Desk</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-2">Looking for a Reliable Match Exporter in India?</h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Connect directly with our export managers for customized container packaging, private brand artwork design, and ocean freight rates.
            </p>
          </div>
          <button
            onClick={() => onOpenRfq('About Us Direct Inquiry')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-sm shrink-0 cursor-pointer"
          >
            Request Export Quotation
          </button>
        </div>

      </div>
    </div>
  );
}
