import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';

export default function ContactUsPage({ onOpenRfq }) {
  const { t } = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/cms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          fields: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            company: form.company,
            country: form.country,
            message: form.message
          }
        })
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

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-semibold mb-4">
            <Mail className="w-3.5 h-3.5 text-yellow-600" />
            <span>Glovel Group Export Division</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="glass-card p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Glovel Matches Head Office</h3>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-100 border border-yellow-300 text-yellow-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Head Office Address</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    GLOVEL MATCHES Head Office:<br />
                    No. 3, Balaji Street, M. G. M. Nagar,<br />
                    Avaniyapuram Bye Pass Madurai,<br />
                    Tamil Nadu 625012, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Official Export Email</h4>
                  <p className="text-xs text-slate-600 mt-1 font-mono">
                    sales@glovel.in
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-100 border border-yellow-300 text-yellow-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Direct Export Phone & WhatsApp</h4>
                  <div className="text-xs text-slate-600 mt-1 font-mono leading-relaxed space-y-1">
                    <p>
                      <a
                        href="https://wa.me/919952538046"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-semibold hover:underline"
                      >
                        +91 99525 38046
                      </a>
                      {' '}(WhatsApp B2B Desk)
                    </p>
                    <p>+91 83448 53164 (Direct Sales)</p>
                    <p>+91 80128 77148 (Export Manager)</p>
                    <p>+91 74180 53337 (Logistics Desk)</p>
                    <p>+91 78450 63338 (Purchase Desk)</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Operating Hours</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Monday - Saturday: 8:00 AM - 8:00 PM IST (GMT +5:30)<br />
                    24/7 B2B WhatsApp International Desk
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-4">
              <h4 className="text-base font-bold flex items-center gap-2">
                <Globe className="w-5 h-5 text-yellow-400" />
                <span>Tuticorin Sea Port Clearance</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct container dispatch from V.O. Chidambaranar Port (Tuticorin VOC Port), located just 90 km from our plant for rapid ocean freight dispatch.
              </p>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{t('contact.sendInquiry')}</h3>
              <p className="text-xs text-slate-600 mb-6">
                Fill out the form below to receive factory price lists, stick samples, and shipping estimates within 12 hours.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">{t('contact.name')} *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-yellow-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">{t('contact.email')} *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-yellow-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">{t('contact.phone')} *</label>
                      <input
                        type="text"
                        required
                        placeholder="+1 (555) 234-5678"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-yellow-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">{t('contact.companyCountry')} *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Global Supplies, Kenya"
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-yellow-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">{t('contact.message')} *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Specify stick lengths (42mm, 47mm, 52mm), box match counts, wax vs wooden, or target container volume..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-yellow-500 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 disabled:opacity-60 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-yellow-500/20 text-sm transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sending ? t('contact.sending') : t('contact.submit')}</span>
                  </button>
                  {error ? (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>
                  ) : null}
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">{t('contact.successTitle')}</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    {t('contact.successBody')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-slate-900 text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
