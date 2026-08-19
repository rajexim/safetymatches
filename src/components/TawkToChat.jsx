import { useEffect } from 'react';

const TAWK_SRC = 'https://embed.tawk.to/65d5d7659131ed19d96f5407/1hn5l2plp';

function injectTawk() {
  if (document.querySelector(`script[src="${TAWK_SRC}"]`)) return;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  // Keep Tawk on the left so it does not sit on top of the WhatsApp button.
  window.Tawk_API.customStyle = {
    visibility: {
      desktop: { position: 'bl', xOffset: 20, yOffset: 20 },
      mobile: { position: 'bl', xOffset: 12, yOffset: 20 }
    }
  };

  const s1 = document.createElement('script');
  const s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = TAWK_SRC;
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
}

/**
 * Loads Tawk.to after idle / first interaction so it does not compete with LCP
 * or cause early layout shift on mobile.
 */
export default function TawkToChat() {
  useEffect(() => {
    let idleId = 0;
    let timeoutId = 0;
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();
      injectTawk();
    };

    const onInteract = () => load();

    const cleanup = () => {
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', onInteract, { capture: true });
      window.removeEventListener('pointerdown', onInteract, { capture: true });
      window.removeEventListener('keydown', onInteract, { capture: true });
    };

    window.addEventListener('scroll', onInteract, { once: true, passive: true, capture: true });
    window.addEventListener('pointerdown', onInteract, { once: true, capture: true });
    window.addEventListener('keydown', onInteract, { once: true, capture: true });

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(load, { timeout: 6000 });
    } else {
      timeoutId = window.setTimeout(load, 4000);
    }

    return cleanup;
  }, []);

  return null;
}
