import { useEffect, useState } from 'react';

export type ResourceStatus = 'checking' | 'available' | 'unavailable';

/**
 * Checks whether a same-origin file (e.g. /resume.pdf) actually exists.
 * - Empty URL → unavailable.
 * - Cross-origin URL → assumed available (cannot be verified without CORS).
 * - Same-origin URL → HEAD request; an HTML response (SPA fallback) counts as missing.
 */
export function useResourceAvailable(url: string): ResourceStatus {
  const [status, setStatus] = useState<ResourceStatus>(() => (url.trim() ? 'checking' : 'unavailable'));

  useEffect(() => {
    const trimmed = url.trim();
    if (!trimmed) {
      setStatus('unavailable');
      return;
    }

    let target: URL;
    try {
      target = new URL(trimmed, window.location.href);
    } catch {
      setStatus('unavailable');
      return;
    }
    if (target.origin !== window.location.origin) {
      setStatus('available');
      return;
    }

    const controller = new AbortController();
    setStatus('checking');
    fetch(target.href, { method: 'HEAD', signal: controller.signal, cache: 'no-cache' })
      .then((response) => {
        const type = response.headers.get('content-type') ?? '';
        setStatus(response.ok && !type.includes('text/html') ? 'available' : 'unavailable');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setStatus('unavailable');
      });
    return () => controller.abort();
  }, [url]);

  return status;
}
