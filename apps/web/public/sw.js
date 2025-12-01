/* Simple service worker for Care for Nature Zambia (CNZ)
   - Caches an offline fallback HTML
   - Serves cached assets when offline
   - Avoids interfering with Next.js internal routes (_next, api)
*/

const CACHE_NAME = 'cnz-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/offline.html', '/site.webmanifest']).catch(() => {});
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)));
      if (self.clients && clients.claim) {
        await clients.claim();
      }
    })()
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // Let Next.js internals and API calls go to network
  if (requestUrl.pathname.startsWith('/_next/') || requestUrl.pathname.startsWith('/api/')) {
    return;
  }

  // HTML navigation requests: network-first, fallback to offline page
  if (event.request.destination === 'document' || event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Optionally cache successful responses for offline
          if (response && response.status === 200) {
            const copy = response.clone();
            try {
              // Only cache same-origin http(s) requests to avoid errors from
              // browser extension schemes (e.g. chrome-extension://...)
              const reqUrl = new URL(event.request.url);
              const isHttp = reqUrl.protocol === 'http:' || reqUrl.protocol === 'https:';
              const isSameOrigin = reqUrl.origin === self.location.origin;
              if (isHttp && isSameOrigin) {
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
              }
            } catch (err) {
              // Swallow caching errors — caching failures should not break navigation.
            }
          }
          return response;
        })
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // For other resources: try cache first, then network and cache result
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // Only cache basic, successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') return response;
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          // If image fails, return a transparent 1x1 GIF response as a lightweight fallback
          if (event.request.destination === 'image') {
            return new Response(
              'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
              { headers: { 'Content-Type': 'image/gif' } }
            );
          }
          return caches.match('/offline.html');
        });
    })
  );
});
