import React from 'react';
import { Globe, ShieldCheck, CheckCircle2, MapPin, Building, Star, ArrowRight, Quote, HeartHandshake, Award } from 'lucide-react';
import CLIENTS_DATA from '../config/clients.json';
import SmartImage from '../components/SmartImage';

const REAL_TESTIMONIALS = CLIENTS_DATA.testimonials;
const BUYER_PHOTO_GALLERY = CLIENTS_DATA.buyers;

export default function OurClientsPage({ onOpenRfq }) {
  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-semibold mb-4">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>Trusted Worldwide • Glovel Matches LLP</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Our Global <span className="flame-gradient-text">Clients & Verified Reviews</span>
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Supplying direct factory safety matches to major importers, supermarket chains, and distributors across Africa, Europe, Middle East, and the Americas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 1. Corporate Philosophy • Client Satisfaction Overview Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>Corporate Philosophy • Client Satisfaction</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Superseding Client Expectations in Every Container Dispatch
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Client satisfaction is the key to any organization's success. We believe in meeting the expectations of our clients as well as superseding them. Quality materials and innovative box designs by our experienced team meet exact buyer specifications.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We ensure every requirement is completely met: conducting technical meetings, providing physical pre-shipment samples for approval, and executing timely container stuffing at Tuticorin VOC Port.
            </p>
          </div>

          <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-5 h-5" />
              <span>Trust & Commitment</span>
            </div>
            <div className="text-2xl font-extrabold font-heading text-white">100% Satisfaction Rate</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We value the trust our customers show in us and commit to meeting every single quality and shipping requirement.
            </p>
          </div>
        </div>

        {/* 2. International Buyer Network Gallery (Positioned Right Below Corporate Philosophy) */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 mb-2">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>International Buyer Photo Gallery</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Glovel Matches LLP Global Importers Photo Gallery
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Photographs of international clients and trade partners who source safety matches from our Sivakasi plant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {BUYER_PHOTO_GALLERY.map((buyer) => (
              <div key={buyer.name + buyer.location} className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between">
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100 border-b border-slate-200">
                  <SmartImage
                    src={buyer.image}
                    alt={`${buyer.name}, a Glovel Matches LLP safety match importer in ${buyer.location}`}
                    sizes="(max-width: 640px) 92vw, (max-width: 768px) 46vw, (max-width: 1024px) 31vw, 290px"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Point at a generated variant: the source .jpg is
                      // archived out of public/ by `npm run images -- --prune`.
                      e.target.srcset = '';
                      e.target.src = '/assets/images/products/matches-1-300.webp';
                    }}
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-mono backdrop-blur-md">
                    {buyer.location}
                  </div>
                </div>
                
                <div className="p-3.5 bg-slate-50/80">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{buyer.name}</h4>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Verified Global Export Client</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Verified Buyer Testimonials (Positioned Right Below the Images Gallery) */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Verified Buyer Testimonials from Across the Globe
            </h2>
            <p className="text-xs text-slate-500 mt-1">Direct feedback from international safety match importers and distributors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REAL_TESTIMONIALS.map((client, idx) => (
              <div key={idx} className="glass-card rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-amber-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-800 border border-amber-300">
                      {client.region}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">{client.country}</h3>
                  <div className="text-xs text-slate-500 font-medium mb-4">{client.product}</div>

                  <blockquote className="text-slate-600 text-xs italic leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    "{client.quote}"
                  </blockquote>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Ocean Freight Buyer Contract</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Regional Agency CTA */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Become a Regional Importer</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-1 mb-2">Exclusive Territory Supply Contracts</h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              We partner with established distributors across Africa, Europe, Middle East, and the Americas to offer exclusive regional supply contracts, container freight support, and custom OEM brand protection.
            </p>
          </div>

          <button
            onClick={() => onOpenRfq('Distributor Partnership Inquiry')}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg text-sm shrink-0 cursor-pointer"
          >
            <span>Apply for Regional Agency</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
