import React from 'react';
import { Link } from '../router/Router';
import { BookOpen, ArrowRight, Calendar, Tag } from 'lucide-react';
import { BLOG_POSTS, blogPostPath } from '../config/blogPosts';
import SmartImage from '../components/SmartImage';

export default function BlogPage({ onOpenRfq }) {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-bold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-yellow-600" />
            <span>Glovel Matches LLP Insights</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Safety Matches <span className="flame-gradient-text">Export Blog</span>
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Buyer guides, manufacturing notes and market tips for importers, distributors and FMCG
            procurement teams sourcing safety matches from Sivakasi, India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="glass-card rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:border-yellow-400 transition-all flex flex-col group"
            >
              <Link to={blogPostPath(post.slug)} className="block relative aspect-16/10 overflow-hidden bg-slate-100 border-b border-slate-200">
                <SmartImage
                  src={post.image}
                  alt={post.title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-500 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-50 text-yellow-900 border border-yellow-200">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.dateLabel}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-yellow-700 transition-colors leading-snug mb-3">
                  <Link to={blogPostPath(post.slug)}>{post.title}</Link>
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                <Link
                  to={blogPostPath(post.slug)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-700 hover:text-yellow-800"
                >
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight">Need a factory quotation?</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Tell us your destination market, preferred models and FCL size. Our export desk replies
              with packing options and sample kit details.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenRfq?.('Blog inquiry — bulk safety matches quotation')}
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Request Bulk Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
