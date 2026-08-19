import React from 'react';
import { Users, Mail, Phone, Globe, Shield, Award, Briefcase, CheckCircle2, Quote, Building2, Factory } from 'lucide-react';
import ABOUT_DATA from '../config/about.json';
import SmartImage from '../components/SmartImage';

const MANAGEMENT_TEAM = ABOUT_DATA.managementTeam;

export default function OurTeamsPage({ onOpenRfq }) {
  const md = ABOUT_DATA.mdProfile;

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-semibold mb-4">
            <Users className="w-3.5 h-3.5 text-yellow-600" />
            <span>Glovel Matches LLP Leadership</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Meet Our <span className="flame-gradient-text">Leadership & Team</span>
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Technical know-how coupled with vast industry experience. Our dedicated team of engineers, quality analysts, and export managers ensure every matchbox meets international standards.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Managing Director Profile Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-slate-100 border-2 border-yellow-500 shadow-md mb-4">
              <SmartImage
                src={md.image}
                alt={`${md.name}, ${md.role} of ${md.company}`}
                sizes="192px"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{md.name}</h3>
            <div className="text-xs font-bold text-yellow-700 uppercase tracking-wider mt-0.5">{md.role}</div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">{md.company}</div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-amber-600 font-semibold text-xs uppercase tracking-wider">
              <Quote className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Message From Managing Director</span>
            </div>
            <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic bg-slate-50 p-6 rounded-2xl border border-slate-200">
              "We regard quality as our most successful attribute and it’s the key to our success, today and tomorrow. Our well-established business relations with quality-conscious buyers deliver desired outputs as demanded by our customers. Further, our well-defined business operations ensure our customers get nothing but the best deals from us."
            </blockquote>
          </div>
        </div>

        {/* Facilities & Expertise Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mb-4 text-amber-700 font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">International Quality Standards</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              We possess a team of experts maintaining product quality to meet international BIS IS 2653, ISO 9001:2015, and EU REACH standards.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mb-4 text-emerald-700 font-bold">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Hygienic Grading & Packing</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Grading and polywrap packing is executed by technically skilled professionals with utmost care in a controlled manufacturing environment.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center mb-4 text-blue-700 font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Timely Container Schedules</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              We have always stuck to strict timely delivery schedules for 20FT and 40FT HC ocean container stuffing at Tuticorin Sea Port.
            </p>
          </div>
        </div>

        {/* Management Team Grid with Photos */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Guiding Geniuses & Management Team</h3>
          <p className="text-xs text-slate-500 mb-8">Dedicated department leads handling B2B inquiries, production quality, purchasing, and port logistics.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MANAGEMENT_TEAM.map((member) => (
              <div key={member.name} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all flex flex-col group shadow-xs">
                <div>
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-200 border border-slate-300 mb-4">
                    <SmartImage
                      src={member.image}
                      alt={`${member.name}, ${member.role} at Glovel Matches LLP`}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 250px"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Hide image if external host fails to load and fallback to initial badge
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{member.name}</h4>
                  <div className="text-xs font-semibold text-amber-700 mt-0.5">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Connect Directly with Glovel Export Desk</h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Our business development and logistics managers are available to assist you with container quotes, custom packaging specs, or sample kits.
            </p>
          </div>
          <button
            onClick={() => onOpenRfq('Team Consultation Inquiry')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-sm shrink-0 cursor-pointer"
          >
            Contact Management Desk
          </button>
        </div>

      </div>

    </div>
  );
}
