import React, { useEffect, useState } from 'react';
import { X, Send, CheckCircle2, Flame } from 'lucide-react';

const PRODUCT_OPTIONS = [
  'Standard Wooden Matches',
  'Moisture-Proof Wax Matches',
  'Eco-Friendly Cardboard Matches',
  'Extra Long Kitchen Matches',
  'Custom Promotional Hotel Matchboxes'
];

const VOLUME_OPTIONS = [
  { value: '1 x 20ft Container (FCL)', label: '1 x 20ft Container (FCL)' },
  { value: '1 x 40ft High Cube Container (FCL)', label: '1 x 40ft High Cube Container (FCL)' },
  { value: 'Multiple Containers / Long-Term Contract', label: 'Multiple Containers / Long-Term Contract' },
  { value: 'Physical Sample Request Only', label: 'Physical Sample Request Only' }
];

function resolveProduct(name) {
  const raw = String(name || '').trim();
  if (!raw) return PRODUCT_OPTIONS[0];
  const match = PRODUCT_OPTIONS.find((p) => raw.toLowerCase().includes(p.toLowerCase().replace(/ matches$/i, '')) || raw === p);
  return match || PRODUCT_OPTIONS[0];
}

const emptyForm = (product) => ({
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  product: resolveProduct(product),
  orderVolume: VOLUME_OPTIONS[0].value,
  customBranding: 'Yes, need private label OEM box artwork',
  notes: ''
});

export default function RfqModal({ isOpen, onClose, selectedProductName }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(() => emptyForm(selectedProductName));

  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setSending(false);
    setError('');
    setFormData(emptyForm(selectedProductName));
  }, [isOpen, selectedProductName]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/cms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'rfq', fields: formData })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Could not send your inquiry.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Could not send your inquiry.');
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] text-slate-900">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-600">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Request Factory Quotation & Sample Kit</h3>
                <p className="text-xs text-slate-500">Direct factory pricing from Sivakasi, India • Dispatch in 24 Hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Trading Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="david@apextrading.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Country / Port *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mombasa, Kenya / Lagos, Nigeria"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Product Line</label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    {PRODUCT_OPTIONS.map((product) => (
                      <option key={product} value={product}>{product}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Order Volume / Container Estimate</label>
                <select
                  value={formData.orderVolume}
                  onChange={(e) => setFormData({ ...formData, orderVolume: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {VOLUME_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Packaging & Artwork Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Specify box dimensions, stick colors, inner polywrap count, or private label details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              {error ? (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>
              ) : null}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 disabled:opacity-60 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{sending ? 'Sending…' : 'Submit Inquiry to Factory Export Team'}</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Factory Inquiry Received!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              Thank you, <strong className="text-amber-700">{formData.name}</strong> ({formData.company}). Our Sivakasi export team has received your request for <strong className="text-slate-900">{formData.product}</strong>.
            </p>
            <button
              onClick={handleReset}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
