import React from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { Flame, CheckCircle2 } from 'lucide-react';
import ProductContainerCalculator from '../components/ProductContainerCalculator';
import ProductFaq from '../components/ProductFaq';
import SmartImage from '../components/SmartImage';
import { useProductContent } from '../content/ContentContext';

const BBQ_MODELS = [
  {
    name: 'BBQ 96 Matchbox',
    boxSize: '110 X 65 X 20 MM',
    splintSize: '96 X 3 X 3 MM',
    sticks: '50 Sticks',
    headColors: 'As per Buyer Request',
    packing: '10 matchboxes shrink pack x 30 = 300 Boxes / Carton',
    boxesPerCarton: 300,
    load20ft: 550,
    load40ft: 1450
  },
  {
    name: 'BBQ 170 Matchbox',
    boxSize: '182 X 63.5 X 18 MM',
    splintSize: '170 X 3 X 3 MM',
    sticks: '50 Sticks',
    headColors: 'As per Buyer Request',
    packing: '10 matchboxes shrink pack x 20 = 200 Boxes / Carton',
    boxesPerCarton: 200,
    load20ft: 500,
    load40ft: 1500
  },
  {
    name: 'BBQ 280 Matchbox',
    boxSize: '290 X 60 X 29 MM',
    splintSize: '280 X 3 X 3 MM',
    sticks: '40 Sticks',
    headColors: 'As per Buyer Request',
    packing: '1 matchbox shrink pack x 50 = 50 Boxes / Carton',
    boxesPerCarton: 50,
    load20ft: 700,
    load40ft: 2300
  }
];

export default function BarbequeMatchesPage({ onOpenRfq }) {
  const { t } = useLocale();
  const { product } = useProductContent('barbeque');
  const heroImage = product?.heroImage || product?.showcaseImage || '/assets/images/products/barbeque/barbeque-match-01.png';
  const gallery = product?.gallery?.length
    ? product.gallery
    : [{ src: heroImage, alt: 'Barbeque Match Product' }];

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-yellow-600" />
              <span>Glovel Matches LLP Outdoor & Fireplace Line</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">{t('product.barbequeTitle')}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{t('product.barbequeLead')}</p>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Extra Thick Splints & Wind Resistant Heat
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Our BBQ safety matches feature extra-thick wooden splints that prevent snapping when lighting log fires or charcoal briquettes under windy outdoor conditions.
              </p>
              
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Extended Burn Heat Output for Charcoal Lighting</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Damp-Proof Striker Panels for Rainy Camping Trips</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Custom Retail Counter Display Boxes Available</span>
                </div>
              </div>

              <button
                onClick={() => onOpenRfq('Barbeque Matches Export Inquiry')}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md text-xs cursor-pointer"
              >
                Request BBQ Match Bulk Quote
              </button>
            </div>
          </div>

          {/* Right Column: 500x500 Image exactly opposite to Heading */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-[500px] h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-4 flex items-center justify-center">
              <SmartImage
                src={heroImage}
                alt="Glovel Matches LLP barbeque and fireplace matchbox with extra thick 3 x 3 mm softwood splints for grills and log fires"
                sizes="(max-width: 640px) 90vw, 500px"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Official Specifications Table */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs overflow-x-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Barbeque Safety Matches Technical Specifications Table</h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                <th className="p-3">Specification</th>
                <th className="p-3">BBQ 96</th>
                <th className="p-3">BBQ 170</th>
                <th className="p-3">BBQ 280</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 font-semibold text-slate-900">Box Size</td>
                <td className="p-3 font-mono">110 X 65 X 20 MM</td>
                <td className="p-3 font-mono">182 X 63.5 X 18 MM</td>
                <td className="p-3 font-mono">290 X 60 X 29 MM</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Splints Size</td>
                <td className="p-3 font-mono">96 X 3 X 3 MM</td>
                <td className="p-3 font-mono">170 X 3 X 3 MM</td>
                <td className="p-3 font-mono">280 X 3 X 3 MM</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Content / Sticks</td>
                <td className="p-3">50 sticks</td>
                <td className="p-3">50 sticks</td>
                <td className="p-3">40 sticks</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Cover Board</td>
                <td className="p-3">White Duplex Board</td>
                <td className="p-3">White Duplex Board</td>
                <td className="p-3">White Duplex Board</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Packing Details</td>
                <td className="p-3">300 matchboxes / carton</td>
                <td className="p-3">200 matchboxes / carton</td>
                <td className="p-3">50 matchboxes / carton</td>
              </tr>
              <tr className="bg-yellow-50/60 font-bold text-yellow-900">
                <td className="p-3">20FT Container Loadability</td>
                <td className="p-3">550 Cartons</td>
                <td className="p-3">500 Cartons</td>
                <td className="p-3">700 Cartons</td>
              </tr>
              <tr className="bg-yellow-100/60 font-bold text-yellow-950">
                <td className="p-3">40FT Container Loadability</td>
                <td className="p-3">1450 Cartons</td>
                <td className="p-3">1500 Cartons</td>
                <td className="p-3">2300 Cartons</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scraped Product Images Gallery Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Barbeque Safety Matches Product Gallery</h3>
          <p className="text-xs text-slate-500 mb-6">Real images of our extra-long barbeque & fireplace matches, cardboard slide trays, and wood splints.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {gallery.map((img, i) => (
              <div key={i} className="group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 hover:border-yellow-400 transition-colors shadow-xs">
                <div className="relative aspect-square overflow-hidden bg-white">
                  <SmartImage
                    src={img.src}
                    alt={img.alt}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
                    className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-2 border-t border-slate-100 bg-white/50">
                  <div className="text-[10px] font-bold text-slate-800 truncate">{img.label || img.alt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Product Container Load Calculator */}
        <ProductFaq path="/barbeque-matches" title="Barbeque & Fireplace Matches — Buyer Questions" />

        <ProductContainerCalculator
          title="Barbeque Safety Matches Load Estimator"
          models={BBQ_MODELS}
          onOpenRfq={onOpenRfq}
        />

      </div>
    </div>
  );
}
