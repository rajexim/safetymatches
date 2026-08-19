import { useEffect } from 'react';
import { useRouter } from '../router/Router';

const GA_ID = 'G-G5TZ1X59K0';

/**
 * Sends GA4 page_view on SPA navigations. The base gtag snippet lives in
 * index.html; this keeps virtual page views in sync with the custom router.
 */
export default function Analytics() {
  const { path } = useRouter();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('config', GA_ID, {
      page_path: path || '/',
      page_location: window.location.href,
      page_title: document.title
    });
  }, [path]);

  return null;
}
