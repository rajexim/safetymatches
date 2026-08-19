import React from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { Box, CheckCircle2 } from 'lucide-react';
import ProductContainerCalculator from '../components/ProductContainerCalculator';
import ProductFaq from '../components/ProductFaq';
import SmartImage from '../components/SmartImage';
import { useProductContent } from '../content/ContentContext';

const HOUSEHOLD_MODELS = [
  {
    name: 'Household 5S',
    boxSize: '49 X 35 X 12 MM',
    splintSize: '40 x 2 x 2 mm Poplar Wood',
    sticks: '40 Sticks (Avg)',
    headColors: 'Black / Brown / Red / Green',
    packing: '10 Poly packs x 10 Shrink wraps = 1000 Boxes / Carton',
    boxesPerCarton: 1000,
    load20ft: 1200,
    load40ft: 2850
  },
  {
    name: 'Household 5E',
    boxSize: '51 X 35 X 14 MM',
    splintSize: '42 x 2 x 2 mm Poplar Wood',
    sticks: '40 Sticks (Avg)',
    headColors: 'Black / Brown / Red / Green',
    packing: '10 Poly packs x 10 Shrink wraps = 1000 Boxes / Carton',
    boxesPerCarton: 1000,
    load20ft: 1000,
    load40ft: 2375
  },
  {
    name: 'Household 5H',
    boxSize: '52 X 35 X 12 MM',
    splintSize: '42 x 2 x 2 mm Poplar Wood',
    sticks: '40 Sticks (Avg)',
    headColors: 'Black / Brown / Red / Green',
    packing: '10 Poly packs x 10 Shrink wraps = 1000 Boxes / Carton',
    boxesPerCarton: 1000,
    load20ft: 1100,
    load40ft: 2600
  }
];

export default function HouseholdMatchesPage({ onOpenRfq }) {
  const { t } = useLocale();
  const { product } = useProductContent('household');
  const heroImage = product?.heroImage || product?.showcaseImage || '/assets/images/products/household/household-match-01.png';
  const gallery = product?.gallery?.length
    ? product.gallery
    : [{ src: heroImage, alt: 'Household Match Product' }];

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-semibold">
              <Box className="w-3.5 h-3.5 text-yellow-600" />
              <span>Glovel Matches LLP Household Line</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">{t('product.householdTitle')}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{t('product.householdLead')}</p>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Compact Size, Tamper-Proof Polywrap & Moisture Resistant
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Our wooden matches light in one stroke and are moisture-proof. The sticks are made from the best quality wood with carbonized splint treatment for maximum safety.
              </p>
              
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Compact Box Packaging & Outer Gross Shipping Bundles</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Moisture-Proof Side Striker Friction Coating</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Custom OEM Label Printing for Importers</span>
                </div>
              </div>

              <button
                onClick={() => onOpenRfq('Household Wooden Matches Order')}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md text-xs cursor-pointer"
              >
                Inquire Wholesale Household Match Quote
              </button>
            </div>
          </div>

          {/* Right Column: 500x500 Image exactly opposite to Heading */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-[500px] h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-4 flex items-center justify-center">
              <SmartImage
                src={heroImage}
                alt="Glovel Matches LLP household safety matchbox opened to show 40mm poplar wood splints, manufactured in Sivakasi, India"
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
          <h3 className="text-xl font-bold text-slate-900 mb-4">Household Safety Matches Technical Specifications Table</h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                <th className="p-3">Specification</th>
                <th className="p-3">Model 5S</th>
                <th className="p-3">Model 5E</th>
                <th className="p-3">Model 5H</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 font-semibold text-slate-900">Cardboard Box Size</td>
                <td className="p-3 font-mono">49 X 35 X 12 MM</td>
                <td className="p-3 font-mono">51 X 35 X 14 MM</td>
                <td className="p-3 font-mono">52 X 35 X 12 MM</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Board Quality</td>
                <td className="p-3">White Duplex Board</td>
                <td className="p-3">White Duplex Board</td>
                <td className="p-3">White Duplex Board</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Color of Head</td>
                <td className="p-3">Black / Brown / Red / Green</td>
                <td className="p-3">Black / Brown / Red / Green</td>
                <td className="p-3">Black / Brown / Red / Green</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">No. of Sticks</td>
                <td className="p-3">40 sticks (Average)</td>
                <td className="p-3">40 sticks (Average)</td>
                <td className="p-3">40 sticks (Average)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Size of Splints</td>
                <td className="p-3">40 x 2 x 2 mm</td>
                <td className="p-3">42 x 2 x 2 mm</td>
                <td className="p-3">42 x 2 x 2 mm</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Side Friction</td>
                <td className="p-3">Dotted / Plain</td>
                <td className="p-3">Dotted / Plain</td>
                <td className="p-3">Dotted / Plain</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Packing Details</td>
                <td className="p-3">1000 matchboxes per carton</td>
                <td className="p-3">1000 matchboxes per carton</td>
                <td className="p-3">1000 matchboxes per carton</td>
              </tr>
              <tr className="bg-amber-50/50 font-bold text-amber-900">
                <td className="p-3">Loadability (20FT / 40FT HC)</td>
                <td className="p-3">1200 / 2850 Cartons</td>
                <td className="p-3">1000 / 2375 Cartons</td>
                <td className="p-3">1100 / 2600 Cartons</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scraped Product Images Gallery Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Household Safety Matches Product Gallery</h3>
          <p className="text-xs text-slate-500 mb-6">Real images of our printed boxes, branding labels, and matchbox outer packaging.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
        <ProductFaq path="/household-matches" title="Household Safety Matches — Buyer Questions" />

        <ProductContainerCalculator
          title="Household Safety Matches Load Estimator"
          models={HOUSEHOLD_MODELS}
          onOpenRfq={onOpenRfq}
        />

      </div>
    </div>
  );
}
