import React, { useState } from 'react';
import { Container, Calculator, Info, Ship, ArrowRight, ShieldAlert, CheckCircle } from 'lucide-react';

export default function ContainerCalculator({ onOpenRfq }) {
  const [containerType, setContainerType] = useState('20ft');
  const [stickLength, setStickLength] = useState('47mm');
  const [innerBoxCount, setInnerBoxCount] = useState(10); // 10 boxes per packet

  // Estimate calculations based on standard match industry standards
  const totalCartons = containerType === '20ft' ? 1000 : 2200;
  const totalBoxes = totalCartons * 100 * innerBoxCount; // 100 gross per carton approx
  const estCbm = containerType === '20ft' ? '28 - 30 CBM' : '62 - 65 CBM';
  const estWeightTons = containerType === '20ft' ? '12 - 14 Metric Tons' : '24 - 26 Metric Tons';

  return (
    <section id="calculator" className="py-20 bg-slate-100/60 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-300 text-xs font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5 text-orange-600" />
            <span>Interactive Freight Tool</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
            Export Container Load <span className="flame-gradient-text">Estimator</span>
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Calculate your container loading capacity, outer carton requirements, and volume specs for sea freight shipping from Tuticorin Port (VOC Port).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form */}
          <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Container className="w-5 h-5 text-amber-600" />
              <span>Select Shipping Parameters</span>
            </h3>

            {/* Container Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Container Type & Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setContainerType('20ft')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    containerType === '20ft'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-base font-extrabold">20ft FCL Standard</div>
                  <div className="text-[11px] text-slate-500 font-normal mt-1">Approx. 1,000 Outer Cartons</div>
                </button>

                <button
                  onClick={() => setContainerType('40ft')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    containerType === '40ft'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-base font-extrabold">40ft High Cube (HC)</div>
                  <div className="text-[11px] text-slate-500 font-normal mt-1">Approx. 2,200 Outer Cartons</div>
                </button>
              </div>
            </div>

            {/* Stick Length Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Match Stick Length
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['42mm', '47mm', '52mm'].map(len => (
                  <button
                    key={len}
                    onClick={() => setStickLength(len)}
                    className={`py-3 rounded-lg border text-center text-sm font-semibold transition-all cursor-pointer ${
                      stickLength === len
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {len} Standard
                  </button>
                ))}
              </div>
            </div>

            {/* Inner Packet Packing */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Inner Polywrap Bundle
              </label>
              <select
                value={innerBoxCount}
                onChange={(e) => setInnerBoxCount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value={10}>10 Matchboxes per Polywrap Packet (Standard)</option>
                <option value={12}>12 Matchboxes per Polywrap Packet</option>
                <option value={50}>50 Matchboxes per Master Gross Box</option>
              </select>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>All export cartons are wrapped in heavy-gauge moisture-proof polyethylene film with sturdy corrugated master boxes to prevent maritime humidity damage.</span>
            </div>

          </div>

          {/* Result Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden text-white">
            
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Ship className="w-48 h-48 text-amber-400" />
            </div>

            <h3 className="text-xl font-extrabold text-white mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <span>Estimated Shipping Summary</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Port Ready</span>
            </h3>

            <div className="space-y-4 mb-8">
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Outer Cartons (Master Shipping Boxes)</div>
                  <div className="text-2xl font-extrabold text-amber-400 font-heading">{totalCartons.toLocaleString()} Cartons</div>
                </div>
                <Container className="w-8 h-8 text-slate-600" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Estimated Total Individual Matchboxes</div>
                  <div className="text-2xl font-extrabold text-white font-heading">{totalBoxes.toLocaleString()} Units</div>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500/60" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Total Freight Volume</div>
                  <div className="text-lg font-bold text-slate-200 mt-1">{estCbm}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Estimated Cargo Weight</div>
                  <div className="text-lg font-bold text-slate-200 mt-1">{estWeightTons}</div>
                </div>
              </div>

            </div>

            <button
              onClick={() => onOpenRfq(`FCL Container Load Order (${containerType}, ${stickLength} sticks)`)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 text-sm transition-all group cursor-pointer"
            >
              <span>Get Freight Quote for this Container Load</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
