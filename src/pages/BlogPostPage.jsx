import React from 'react';
import { Link, useRouter } from '../router/Router';
import { ArrowLeft, ArrowRight, Calendar, Tag, BookOpen } from 'lucide-react';
import { getBlogPostByPath, BLOG_POSTS, blogPostPath } from '../config/blogPosts';
import SmartImage from '../components/SmartImage';

export default function BlogPostPage({ onOpenRfq }) {
  const { routePath } = useRouter();
  const cleanPath = routePath.length > 1 && routePath.endsWith('/') ? routePath.slice(0, -1) : routePath;
  const post = getBlogPostByPath(cleanPath);

  if (!post) {
    return (
      <div className="py-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Article not found</h1>
        <p className="text-slate-600 mb-8">This blog post may have been moved or removed.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 text-yellow-700 font-bold hover:text-yellow-800">
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>
      </div>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <div className="py-12 lg:py-16 bg-slate-50">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-yellow-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-100 text-yellow-900 border border-yellow-300">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            Glovel Matches LLP
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-slate-600 mt-5 leading-relaxed">{post.excerpt}</p>

        <div className="mt-8 rounded-3xl overflow-hidden border border-slate-200 bg-white aspect-16/9">
          <SmartImage
            src={post.image}
            alt={post.title}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{section.heading}</h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-slate-700 leading-relaxed text-[15px] sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-slate-900 text-white p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold">Talk to our export desk</h2>
            <p className="text-slate-300 text-sm mt-2">
              Request FOB/CIF pricing, free samples or private-label artwork guidelines.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {post.relatedProduct ? (
              <Link
                to={post.relatedProduct}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors"
              >
                View related products
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => onOpenRfq?.(`Blog: ${post.title}`)}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Get Bulk Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      {related.length ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More from the blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={blogPostPath(item.slug)}
                className="glass-card rounded-2xl p-5 bg-white border border-slate-200 hover:border-yellow-400 transition-colors"
              >
                <p className="text-[11px] font-bold text-yellow-700 mb-2">{item.dateLabel}</p>
                <h3 className="font-bold text-slate-900 leading-snug">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
