import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import initialContent from '../../content/site-content.json';

const ContentContext = createContext({
  content: null,
  loading: true,
  error: null,
  reload: () => {}
});

const FALLBACK = {
  version: 1,
  site: {
    phoneDisplay: '+91 99525 38046',
    phoneTel: '+919952538046',
    email: 'sales@glovel.in',
    brandTagline: 'Sivakasi Factory Direct Export Division',
    trustBadge: 'Sivakasi Factory Direct Export',
    heroCta: 'Request Factory Quotation',
    factoryBadge: 'Factory Direct Export'
  },
  banners: [],
  products: []
};

export function ContentProvider({ children }) {
  // Seed from the built-in JSON so the hero/aspect box paints on first frame
  // (avoids CLS from an empty hero while /content/site-content.json loads).
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      // No cache-bust query — let nginx/CDN ETag cache work for public visitors.
      const res = await fetch('/content/site-content.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('Failed to load site content');
      const data = await res.json();
      setContent(data);
    } catch (err) {
      setError(err.message);
      setContent((prev) => prev || FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const value = useMemo(
    () => ({ content: content || FALLBACK, loading, error, reload }),
    [content, loading, error]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

export function useProductContent(productId) {
  const { content, loading } = useContent();
  const product = (content.products || []).find((p) => p.id === productId) || null;
  return { product, loading, products: content.products || [] };
}
