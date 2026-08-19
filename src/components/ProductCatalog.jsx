import React, { useState } from 'react';
import { Package, Check, ArrowRight } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import SmartImage from './SmartImage';

export default function ProductCatalog({ onOpenRfq }) {
  const { content } = useContent();
  const PRODUCTS = content.products || [];
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.id === activeTab);

  return (
    <section id="products" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-bold mb-3">
              <Package className="w-3.5 h-3.5 text-yellow-600" />
              <span>Glovel Matches LLP Factory Line</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Export-Grade <span className="flame-gradient-text">Safety Match Catalog</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-yellow-400 text-slate-950 shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Range
            </button>
            {PRODUCTS.map(p => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === p.id
                    ? 'bg-yellow-400 text-slate-950 shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {p.category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <div key={p.id} className="glass-card rounded-3xl p-6 flex flex-col justify-between group hover:border-yellow-400">
              <div>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-200">
                  <SmartImage
                    src={p.image}
                    alt={`${p.title} manufactured and exported by Glovel Matches LLP, Sivakasi, India`}
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 400px"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 text-yellow-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700 backdrop-blur-md">
                    {p.category}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-yellow-700 transition-colors">
                  {p.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  {p.desc}
                </p>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-600 mb-4">
                  {p.specs}
                </div>

                <ul className="space-y-1.5 mb-6">
                  {(p.features || []).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenRfq(p.title)}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
              >
                <span>Request Spec & Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-yellow-400" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
