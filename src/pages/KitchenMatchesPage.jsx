import React from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { Flame, CheckCircle2 } from 'lucide-react';
import ProductContainerCalculator from '../components/ProductContainerCalculator';
import ProductFaq from '../components/ProductFaq';
import SmartImage from '../components/SmartImage';
import { useProductContent } from '../content/ContentContext';

const KITCHEN_MODELS = [
  {
    name: 'KB 100 FILL',
    boxSize: '71 X 53 X 25 MM',
    splintSize: '53 mm Splints',
    sticks: '100 Match Sticks (Avg)',
    headColors: 'Black / Red / Blue / Brown / Green',
    packing: '4 boxes poly pack x 8 shrink wrap = 512 Boxes / Carton',
    boxesPerCarton: 512,
    load20ft: 500,
    load40ft: 1300
  },
  {
    name: 'KB 200 FILL (Small Box)',
    boxSize: '84 X 50 X 28 MM',
    splintSize: '47 mm Splints',
    sticks: '200 Match Sticks (Avg)',
    headColors: 'Black / Red / Blue / Brown / Green',
    packing: '2 boxes paper pack x 10 polybags x 4 = 80 Boxes / Carton',
    boxesPerCarton: 80,
    load20ft: 500,
    load40ft: 1800
  },
  {
    name: 'KB 200 FILL (Big Box)',
    boxSize: '118 X 65 X 25 MM',
    splintSize: '47/53 mm Splints',
    sticks: '200 Match Sticks (Avg)',
    headColors: 'Black / Red / Blue / Brown / Green',
    packing: '5 boxes poly pack x 50 wrapped = 250 Boxes / Carton',
    boxesPerCarton: 250,
    load20ft: 500,
    load40ft: 1300
  },
  {
    name: 'KB 240 / KB 250 FILL',
    boxSize: '118 X 65 X 25 MM',
    splintSize: '47/53 mm Splints',
    sticks: '240 - 250 Match Sticks',
    headColors: 'Black / Red / Blue / Brown / Green',
    packing: '5 boxes poly pack x 50 wrapped = 250 Boxes / Carton',
    boxesPerCarton: 250,
    load20ft: 500,
    load40ft: 1300
  }
];

export default function KitchenMatchesPage({ onOpenRfq }) {
  const { t } = useLocale();
  const { product } = useProductContent('kitchen');
  const heroImage = product?.heroImage || product?.showcaseImage || '/assets/images/products/kitchen/kitchen-match-01.png';
  const gallery = product?.gallery?.length
    ? product.gallery
    : [{ src: heroImage, alt: 'Kitchen Match Product' }];

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-yellow-600" />
              <span>Glovel Matches LLP Long Stick Line</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">{t('product.kitchenTitle')}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{t('product.kitchenLead')}</p>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Long Sturdy Sticks for Safe Culinary Lighting
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Our kitchen safety matches are damp-proof, ensuring reliability even in humid kitchen conditions. Available in various packaging options, they are perfect for everyday cooking, deep oven burners, candles, and professional culinary use.
              </p>
              
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>110mm & 280mm Extra Long Wooden Splints</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Damp-Proof Chemical Head & High Heat Sustained Flame</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Bulk Box Capacity: 60, 100, or 200 Sticks per Box</span>
                </div>
              </div>

              <button
                onClick={() => onOpenRfq('Kitchen Matches Inquiry')}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md text-xs cursor-pointer"
              >
                Inquire Kitchen Matches Bulk Pricing
              </button>
            </div>
          </div>

          {/* Right Column: 500x500 Image exactly opposite to Heading */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-[500px] h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-4 flex items-center justify-center">
              <SmartImage
                src={heroImage}
                alt="Glovel Matches LLP extra long kitchen safety matchbox with 47mm to 53mm wooden splints for gas stoves and candles"
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
          <h3 className="text-xl font-bold text-slate-900 mb-4">Kitchen Safety Matches Technical Specifications Table</h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                <th className="p-3">Model</th>
                <th className="p-3">Match Box Size</th>
                <th className="p-3">No. of Sticks</th>
                <th className="p-3">Splint Size</th>
                <th className="p-3">Boxes / Carton</th>
                <th className="p-3">Loadability (20FT / 40FT HC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-mono">
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">KB 100 FILL</td>
                <td className="p-3">71 X 53 X 25 MM</td>
                <td className="p-3">100 Sticks</td>
                <td className="p-3">53 mm</td>
                <td className="p-3 font-bold text-amber-700">512 Boxes</td>
                <td className="p-3 font-bold">500 / 1300 Cartons</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">KB 200 FILL (Small)</td>
                <td className="p-3">84 X 50 X 28 MM</td>
                <td className="p-3">200 Sticks</td>
                <td className="p-3">47 mm</td>
                <td className="p-3 font-bold text-amber-700">80 Boxes</td>
                <td className="p-3 font-bold">500 / 1800 Cartons</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">KB 200 FILL (Big)</td>
                <td className="p-3">118 X 65 X 25 MM</td>
                <td className="p-3">200 Sticks</td>
                <td className="p-3">47/53 mm</td>
                <td className="p-3 font-bold text-amber-700">250 Boxes</td>
                <td className="p-3 font-bold">500 / 1300 Cartons</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">KB 220 / KB 240 / KB 250</td>
                <td className="p-3">118 X 65 X 25 MM</td>
                <td className="p-3">220 - 250 Sticks</td>
                <td className="p-3">47/53 mm</td>
                <td className="p-3 font-bold text-amber-700">250 Boxes</td>
                <td className="p-3 font-bold">500 / 1300 Cartons</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scraped Product Images Gallery Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Kitchen Safety Matches Product Gallery</h3>
          <p className="text-xs text-slate-500 mb-6">Real images of our heavy-duty kitchen matches, caddy packaging, and master carton boxes.</p>
          
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
        <ProductFaq path="/kitchen-matches" title="Kitchen Safety Matches — Buyer Questions" />

        <ProductContainerCalculator
          title="Kitchen Safety Matches Load Estimator"
          models={KITCHEN_MODELS}
          onOpenRfq={onOpenRfq}
        />

      </div>
    </div>
  );
}
