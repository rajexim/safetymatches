import React, { useState } from 'react';
import { Container, Calculator, Ship, ArrowRight, CheckCircle2, Info, Package } from 'lucide-react';

export default function ProductContainerCalculator({ title, models, onOpenRfq }) {
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [containerSize, setContainerSize] = useState('20ft');

  const model = models[selectedModelIndex] || models[0];

  const totalCartons = containerSize === '20ft' 
    ? (model.load20ft || 1000)
    : (model.load40ft || 2300);

  const boxesPerCarton = model.boxesPerCarton || 1000;
  const totalIndividualBoxes = totalCartons * boxesPerCarton;

  return (
    <div className="my-12 glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Product Freight Loadability Estimator</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            {title || 'Container Load Calculator'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Official export container packaging & volume estimates based on Glovel Matches LLP factory specifications.
          </p>
        </div>

        {/* Container Size Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setContainerSize('20ft')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              containerSize === '20ft'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            20FT FCL Container
          </button>
          <button
            onClick={() => setContainerSize('40ft')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              containerSize === '40ft'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            40FT High Cube (HC)
          </button>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
          Select Matchbox Model / Size Specification:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {models.map((m, idx) => (
            <button
              key={m.name}
              onClick={() => setSelectedModelIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedModelIndex === idx
                  ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs font-extrabold">{m.name}</div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">{m.boxSize}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Spec Breakdown & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Model Spec Details */}
        <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs space-y-3">
          <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2 flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-600" />
            <span>Packing Specification for {model.name}</span>
          </h4>

          <div className="flex justify-between border-b border-slate-200/80 pb-2">
            <span className="text-slate-500">Box Dimensions</span>
            <span className="font-semibold text-slate-900">{model.boxSize}</span>
          </div>

          <div className="flex justify-between border-b border-slate-200/80 pb-2">
            <span className="text-slate-500">Splint Length / Material</span>
            <span className="font-semibold text-slate-900">{model.splintSize}</span>
          </div>

          <div className="flex justify-between border-b border-slate-200/80 pb-2">
            <span className="text-slate-500">Stick Count per Box</span>
            <span className="font-semibold text-slate-900">{model.sticks}</span>
          </div>

          <div className="flex justify-between border-b border-slate-200/80 pb-2">
            <span className="text-slate-500">Master Packing</span>
            <span className="font-semibold text-slate-900">{model.packing}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Total Boxes per Carton</span>
            <span className="font-semibold text-amber-700">{boxesPerCarton.toLocaleString()} Matchboxes</span>
          </div>
        </div>

        {/* Freight Load Result */}
        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs text-slate-400 font-medium">Estimated Freight Capacity</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {containerSize === '20ft' ? '20' : '40'}' FCL Ready
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div>
                  <div className="text-[11px] text-slate-400">Total Shipping Cartons</div>
                  <div className="text-2xl font-extrabold text-amber-400">{totalCartons.toLocaleString()} Cartons</div>
                </div>
                <Ship className="w-7 h-7 text-slate-600" />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div>
                  <div className="text-[11px] text-slate-400">Total Individual Matchboxes</div>
                  <div className="text-xl font-bold text-white">{totalIndividualBoxes.toLocaleString()} Units</div>
                </div>
                <CheckCircle2 className="w-7 h-7 text-emerald-500/80" />
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenRfq(`Container Order (${title} - ${model.name}, ${containerSize} Container)`)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg text-xs transition-all cursor-pointer"
          >
            <span>Request Freight Quote for {model.name} ({containerSize.toUpperCase()})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
