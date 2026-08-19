import React from 'react';
import { Link } from '../router/Router';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import SmartImage from './SmartImage';

export default function Footer({ onOpenRfq }) {
  const { content } = useContent();
  const site = content.site || {};

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <SmartImage
                src="/assets/images/galleries/footer-logo.jpg"
                alt="Glovel Matches LLP logo"
                sizes="160px"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto rounded border border-slate-800 p-1 bg-white"
              />
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight font-heading">GLOVEL MATCHES</span>
                <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded bg-yellow-400 text-slate-950 font-extrabold">LLP</span>
                <p className="text-xs text-slate-400">safetymatches.in • Madurai, Tamil Nadu</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Glovel Matches LLP (Glovel Group of Companies) is a leading Indian safety match manufacturer & exporter. Delivering high ignition safety matches, wax matches, kitchen matches, and promotional matchbooks to 52+ nations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <SmartImage
                src="/assets/images/buyers/ISO-CERTIFICATE-SAFETY-MATCHES-LLP.png"
                alt="ISO 9001:2015 quality management certificate issued to Glovel Matches LLP"
                sizes="120px"
                loading="lazy"
                decoding="async"
                className="h-10 w-auto rounded border border-slate-800 bg-white p-0.5"
              />
              <SmartImage
                src="/assets/images/buyers/CAPEXIL-Certificate-Glovel.jpg"
                alt="CAPEXIL export promotion council membership certificate for Glovel Matches LLP"
                sizes="120px"
                loading="lazy"
                decoding="async"
                className="h-10 w-auto rounded border border-slate-800 bg-white p-0.5"
              />
              <div className="text-[11px] text-slate-400 font-mono">
                <div className="text-white font-bold">ISO 9001:2015</div>
                <div>CAPEXIL Member</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider font-heading">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link to="/about-us" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link to="/our-products" className="hover:text-yellow-400 transition-colors">Our Products</Link></li>
              <li><Link to="/our-teams" className="hover:text-yellow-400 transition-colors">Our Team</Link></li>
              <li><Link to="/our-clients" className="hover:text-yellow-400 transition-colors">Clients & Export</Link></li>
              <li><Link to="/videos" className="hover:text-yellow-400 transition-colors">Videos Showcase</Link></li>
              <li><Link to="/blog" className="hover:text-yellow-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact-us" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Product Lines */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider font-heading">Product Lines</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/household-matches" className="hover:text-yellow-400 transition-colors">Household Safety Matches</Link></li>
              <li><Link to="/wax-matches" className="hover:text-yellow-400 transition-colors">Moisture-Proof Wax Matches</Link></li>
              <li><Link to="/promotional-matches" className="hover:text-yellow-400 transition-colors">Promotional & Hotel Matches</Link></li>
              <li><Link to="/kitchen-matches" className="hover:text-yellow-400 transition-colors">Kitchen Safety Matches</Link></li>
              <li><Link to="/barbeque-matches" className="hover:text-yellow-400 transition-colors">Barbeque & Fireplace Matches</Link></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider font-heading">Head Office</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>No. 3, Balaji Street, M. G. M. Nagar, Avaniyapuram Bye Pass, Madurai, Tamil Nadu 625012, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href={`mailto:${site.email || 'sales@glovel.in'}`} className="hover:text-yellow-400">{site.email || 'sales@glovel.in'}</a>
              </li>
              <li className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href={`tel:${site.phoneTel || '+919952538046'}`} className="hover:text-yellow-400">{site.phoneDisplay || '+91 99525 38046'}</a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onOpenRfq?.('Footer Direct Enquiry')}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs transition-colors shadow-md cursor-pointer"
                >
                  Request Container Quote
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-bold">Glovel Matches LLP</span> (Glovel Group of Companies). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="/llms.txt" target="_blank" className="hover:text-yellow-400 flex items-center gap-1">
              <span>llms.txt</span>
              <ExternalLink className="w-3 h-3 text-yellow-400" />
            </a>
            <span>•</span>
            <span className="text-slate-400">Madurai Head Office</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
