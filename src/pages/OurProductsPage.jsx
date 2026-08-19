import React from 'react';
import { Link } from '../router/Router';
import ProductCatalog from '../components/ProductCatalog';
import ContainerCalculator from '../components/ContainerCalculator';
import { Flame, Box, Shield, ChevronRight, ArrowRight } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    title: 'Household Matches',
    link: '/household-matches',
    description: 'Compact 40mm & 42mm wooden splints for daily home use, retail supermarkets, and bulk distribution.',
    badge: 'Popular Household'
  },
  {
    title: 'Kitchen Matches',
    link: '/kitchen-matches',
    description: '47mm & 53mm long wooden splints engineered for gas stoves, candles, and kitchen safety.',
    badge: 'Extra Long 110mm'
  },
  {
    title: 'Promotional Matches',
    link: '/promotional-matches',
    description: 'Bespoke hotel matchbooks & box designs with gold foil, metallic embossing, and black dyed matchsticks.',
    badge: 'Custom OEM Branding'
  },
  {
    title: 'Barbeque Matches',
    link: '/barbeque-matches',
    description: 'Heavy duty extra-thick long matches created for outdoor grills, charcoal, and fireplaces.',
    badge: 'Outdoor BBQ'
  },
  {
    title: 'Wax Matches',
    link: '/wax-matches',
    description: 'Paraffin wax impregnated paper sticks designed to ignite reliably in rainy or high humidity climates.',
    badge: '100% Damp Proof'
  }
];

export default function OurProductsPage({ onOpenRfq }) {
  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-semibold mb-4">
            <Box className="w-3.5 h-3.5 text-amber-600" />
            <span>Complete Factory Product Catalog</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Our Entire <span className="flame-gradient-text">Safety Match Portfolio</span>
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Explore our complete range of wooden, wax, cardboard, kitchen, barbeque, and promotional match products manufactured in Sivakasi by Glovel Matches LLP.
          </p>
        </div>
      </div>

      {/* Embedded Main Factory Product Catalog Section */}
      <ProductCatalog onOpenRfq={onOpenRfq} />

      {/* Select Specific Product Category Cards Section (Placed Below Glovel Matches LLP Factory Line) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="mb-8">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 inline-block mb-2">
            Detailed Product Specifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Select Specific Product Category for Technical Specs & Container Loads
          </h2>
          <p className="text-xs text-slate-500 mt-1">Jump to dedicated technical pages with full stick counts, box sizes, splint dimensions, and 20FT/40FT HC container estimators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.link}
              to={cat.link}
              className="glass-card p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 block w-fit mb-3">
                  {cat.badge}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                <span>View Full Specs</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Container Calculator */}
      <ContainerCalculator onOpenRfq={onOpenRfq} />

    </div>
  );
}
