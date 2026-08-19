import React from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import ProductContainerCalculator from '../components/ProductContainerCalculator';
import ProductFaq from '../components/ProductFaq';
import SmartImage from '../components/SmartImage';
import { useProductContent } from '../content/ContentContext';

const PROMOTIONAL_MODELS = [
  {
    name: 'Promotional BX-09',
    boxSize: '112 X 26 X 9 MM',
    splintSize: '96 mm Splints',
    sticks: '12 Sticks',
    headColors: 'Custom Colors',
    packing: '50 matchboxes per caddy box x 25 = 1250 Boxes / Carton',
    boxesPerCarton: 1250,
    load20ft: 1000,
    load40ft: 2200
  },
  {
    name: 'Promotional BX-10',
    boxSize: '112 X 17.5 X 17.5 MM',
    splintSize: '96 mm Splints',
    sticks: '15 Sticks',
    headColors: 'Custom Colors',
    packing: '50 matchboxes per caddy box x 20 = 1000 Boxes / Carton',
    boxesPerCarton: 1000,
    load20ft: 1000,
    load40ft: 2200
  },
  {
    name: 'Promotional BX-13 / BX-14',
    boxSize: '84 X 18 X 18 MM / 84 X 36 X 9 MM',
    splintSize: '80 mm Splints',
    sticks: '15 Sticks',
    headColors: 'Custom Colors',
    packing: '50 matchboxes per caddy box x 20/25 = 1000-1250 Boxes / Carton',
    boxesPerCarton: 1250,
    load20ft: 1200,
    load40ft: 2500
  },
  {
    name: 'Promotional BX-15',
    boxSize: '84 X 26.5 X 9 MM',
    splintSize: '80 mm Splints',
    sticks: '12 Sticks',
    headColors: 'Custom Colors',
    packing: '50 matchboxes per caddy box x 25 = 1250 Boxes / Carton',
    boxesPerCarton: 1250,
    load20ft: 1200,
    load40ft: 2500
  }
];

export default function PromotionalMatchesPage({ onOpenRfq }) {
  const { t } = useLocale();
  const { product } = useProductContent('promotional');
  const heroImage = product?.heroImage || product?.showcaseImage || '/assets/images/products/promotional/PromotionalMatchProduct3.png';
  const gallery = product?.gallery?.length
    ? product.gallery
    : [{ src: heroImage, alt: 'Promotional Match Product' }];

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
              <span>Glovel Matches LLP OEM Branding & Hotel Line</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">{t('product.promotionalTitle')}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{t('product.promotionalLead')}</p>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Bespoke Artwork, Foil Stamping & Custom Splint Colors
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                We offer complete custom manufacturing: choose black dyed wood splints, natural poplar, custom match head hex colors, metallic gold/silver foil box stamping, or soft-touch matte lamination.
              </p>
              
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Available in 10, 20, or 30 Stick Matchbooks & Sliding Boxes</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Spot UV, Embossed Logos & Metallic Foil Finishes</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>Free Vector Die-Cut Artwork Templates Provided</span>
                </div>
              </div>

              <button
                onClick={() => onOpenRfq('Custom Promotional Matches Inquiry')}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md text-xs cursor-pointer"
              >
                Request Custom Sample Box Kit
              </button>
            </div>
          </div>

          {/* Right Column: 500x500 Image exactly opposite to Heading */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-[500px] h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-4 flex items-center justify-center">
              <SmartImage
                src={heroImage}
                alt="Custom printed hotel matchbox manufactured by Glovel Matches LLP, showing foil-stamped cover artwork and long splints"
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
          <h3 className="text-xl font-bold text-slate-900 mb-4">Promotional Matchbox Specifications Table</h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                <th className="p-3">Model</th>
                <th className="p-3">Cardboard Box Size</th>
                <th className="p-3">No. of Sticks</th>
                <th className="p-3">Size of Splints</th>
                <th className="p-3">Caddy Box Packing</th>
                <th className="p-3">Boxes / Carton</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-mono">
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">BX-09</td>
                <td className="p-3">112 X 26 X 9 MM</td>
                <td className="p-3">12 sticks</td>
                <td className="p-3">96 mm</td>
                <td className="p-3">50 boxes x 25 caddy</td>
                <td className="p-3 font-bold text-amber-700">1250 Boxes</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">BX-10</td>
                <td className="p-3">112 X 17.5 X 17.5 MM</td>
                <td className="p-3">15 sticks</td>
                <td className="p-3">96 mm</td>
                <td className="p-3">50 boxes x 20 caddy</td>
                <td className="p-3 font-bold text-amber-700">1000 Boxes</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">BX-13</td>
                <td className="p-3">84 X 18 X 18 MM</td>
                <td className="p-3">15 sticks</td>
                <td className="p-3">80 mm</td>
                <td className="p-3">50 boxes x 20 caddy</td>
                <td className="p-3 font-bold text-amber-700">1000 Boxes</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">BX-14</td>
                <td className="p-3">84 X 36 X 9 MM</td>
                <td className="p-3">15 sticks</td>
                <td className="p-3">80 mm</td>
                <td className="p-3">50 boxes x 25 caddy</td>
                <td className="p-3 font-bold text-amber-700">1250 Boxes</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 font-sans">BX-15</td>
                <td className="p-3">84 X 26.5 X 9 MM</td>
                <td className="p-3">12 sticks</td>
                <td className="p-3">80 mm</td>
                <td className="p-3">50 boxes x 25 caddy</td>
                <td className="p-3 font-bold text-amber-700">1250 Boxes</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scraped Product Images Gallery Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Promotional Safety Matches Product Gallery</h3>
          <p className="text-xs text-slate-500 mb-6">Real images of our printed brand matches, hotel line boxes, and custom head colors.</p>
          
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
        <ProductFaq path="/promotional-matches" title="Promotional & Hotel Matches — Buyer Questions" />

        <ProductContainerCalculator
          title="Promotional Matches Load Estimator"
          models={PROMOTIONAL_MODELS}
          onOpenRfq={onOpenRfq}
        />

      </div>
    </div>
  );
}
