import React from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { Droplets, CheckCircle2 } from 'lucide-react';
import ProductContainerCalculator from '../components/ProductContainerCalculator';
import ProductFaq from '../components/ProductFaq';
import SmartImage from '../components/SmartImage';
import { useProductContent } from '../content/ContentContext';

const WAX_MODELS = [
  {
    name: 'Wax Matches (WM)',
    boxSize: '40 X 33 X 12 MM',
    splintSize: '32 mm Paraffin Kraft Paper',
    sticks: '40 Sticks',
    headColors: 'Black / Red',
    packing: '10 Matchboxes in Paper Pack x 10 Polybags = 1000 Boxes / Carton',
    boxesPerCarton: 1000,
    load20ft: 1500,
    load40ft: 3650
  },
  {
    name: 'Wax Matches (WSM)',
    boxSize: '43 X 30 X 10 MM',
    splintSize: '30 mm Paraffin Kraft Paper',
    sticks: '40 Sticks',
    headColors: 'Black / Red',
    packing: '10 Matchboxes in Printed Pack x 10 Polybags = 1000 Boxes / Carton',
    boxesPerCarton: 1000,
    load20ft: 1800,
    load40ft: 4350
  },
  {
    name: 'Wax Matches (5H)',
    boxSize: '53 X 37 X 11 MM',
    splintSize: '35 mm Paraffin Kraft Paper',
    sticks: '40 Sticks',
    headColors: 'Black / Pink',
    packing: '10 Matchboxes in Paper Pack x 6 Polybags = 600 Boxes / Carton',
    boxesPerCarton: 600,
    load20ft: 1850,
    load40ft: 4400
  },
  {
    name: 'Wax Kitchen Matches',
    boxSize: '70 X 48 X 22 MM',
    splintSize: '30/32 mm Paraffin Kraft Paper',
    sticks: '200 Match Sticks (Avg)',
    headColors: 'Black',
    packing: '2 Matchboxes in Paper Pack x 10 Polybags x 4 = 80 Boxes / Carton',
    boxesPerCarton: 80,
    load20ft: 4000,
    load40ft: 10000
  }
];

export default function WaxMatchesPage({ onOpenRfq }) {
  const { t } = useLocale();
  const { product } = useProductContent('wax');
  const heroImage = product?.heroImage || product?.showcaseImage || '/assets/images/products/wax/wax-match-01.png';
  const gallery = product?.gallery?.length
    ? product.gallery
    : [{ src: heroImage, alt: 'Wax Match Product' }];

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-semibold">
              <Droplets className="w-3.5 h-3.5 text-yellow-600" />
              <span>100% Damp Proof Moisture Resistant</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">{t('product.waxTitle')}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{t('product.waxLead')}</p>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Paraffin Impregnated Kraft Paper Sticks
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Our wax matches feature paraffin impregnated paper sticks designed to ignite smoothly in humid, tropical, coastal, or rainy climates with prolonged flame burn. The #1 selling match type across Africa, Latin America, and island nations.
              </p>
              
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>42mm & 45mm Wax Stick Options</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Polywrap Outer Shrink Wrapping to Prevent Ocean Humidity Damage</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Custom Label Artwork for San Jorge & Private Brands</span>
                </div>
              </div>

              <button
                onClick={() => onOpenRfq('Wax Matches Export Inquiry')}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md text-xs cursor-pointer"
              >
                Request Wax Match FCL Quote
              </button>
            </div>
          </div>

          {/* Right Column: 500x500 Image exactly opposite to Heading */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-[500px] h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-4 flex items-center justify-center">
              <SmartImage
                src={heroImage}
                alt="Glovel Matches LLP moisture-proof wax safety matchbox with paraffin-impregnated kraft paper splints for humid climates"
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
          <h3 className="text-xl font-bold text-slate-900 mb-4">Wax Safety Matches Technical Specifications Table</h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                <th className="p-3">Specification</th>
                <th className="p-3">Wax Matches (WM)</th>
                <th className="p-3">Wax Matches (WSM)</th>
                <th className="p-3">Wax Matches (5H)</th>
                <th className="p-3">Wax Kitchen Matches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 font-semibold text-slate-900">Cardboard Box Size</td>
                <td className="p-3 font-mono">40 X 33 X 12 MM</td>
                <td className="p-3 font-mono">43 X 30 X 10 MM</td>
                <td className="p-3 font-mono">53 X 37 X 11 MM</td>
                <td className="p-3 font-mono">70 X 48 X 22 MM</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Color of Head</td>
                <td className="p-3">Black</td>
                <td className="p-3">Black</td>
                <td className="p-3">Black / Pink</td>
                <td className="p-3">Black</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">No. of Sticks</td>
                <td className="p-3">40 sticks</td>
                <td className="p-3">40 sticks</td>
                <td className="p-3">40 sticks</td>
                <td className="p-3">200 sticks (Avg)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Size of Splints</td>
                <td className="p-3">32 mm Splints</td>
                <td className="p-3">30 mm Splints</td>
                <td className="p-3">35 mm Splints</td>
                <td className="p-3">30/32 mm Splints</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Packing Details</td>
                <td className="p-3">1000 boxes / carton</td>
                <td className="p-3">1000 boxes / carton</td>
                <td className="p-3">600 boxes / carton</td>
                <td className="p-3">80 boxes / carton</td>
              </tr>
              <tr className="bg-emerald-50/60 font-bold text-emerald-900">
                <td className="p-3">Loadability - 20FT HC</td>
                <td className="p-3">1500 cartons</td>
                <td className="p-3">1800 cartons</td>
                <td className="p-3">1850 cartons</td>
                <td className="p-3">4000 cartons</td>
              </tr>
              <tr className="bg-emerald-100/60 font-bold text-emerald-950">
                <td className="p-3">Loadability - 40FT HC</td>
                <td className="p-3">3650 cartons</td>
                <td className="p-3">4350 cartons</td>
                <td className="p-3">4400 cartons</td>
                <td className="p-3">10000 cartons</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scraped Product Images Gallery Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Wax Safety Matches Product Gallery</h3>
          <p className="text-xs text-slate-500 mb-6">Real images of our premium moisture-proof wax matches, caddy wrapping, and print graphics.</p>
          
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
        <ProductFaq path="/wax-matches" title="Wax Safety Matches — Buyer Questions" />

        <ProductContainerCalculator
          title="Wax Safety Matches Load Estimator"
          models={WAX_MODELS}
          onOpenRfq={onOpenRfq}
        />

      </div>
    </div>
  );
}
