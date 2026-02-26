// MovieBox Service Worker
const CACHE_NAME = 'moviebox-v1.0.0';
const RUNTIME_CACHE = 'moviebox-runtime';

// Files to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/main.html',
  '/movies.html',
  '/tvshows.html',
  '/popular.html',
  '/mylist.html',
  '/auth.html',
  '/css/main_styles.css',
  '/js/main.js',
  '/images/ghprofit.ico',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.error('[SW] Install failed:', err))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    // For TMDB API and images, use network first
    if (url.hostname.includes('tmdb.org') || url.hostname.includes('unsplash.com')) {
      event.respondWith(networkFirst(request));
      return;
    }
    return;
  }

  // For navigation requests, use network first
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // For other requests, use cache first
  event.respondWith(cacheFirst(request));
});

// Cache first strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.error('[SW] Fetch failed:', err);
    // Return offline page if available
    return cache.match('/index.html');
  }
}

// Network first strategy
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw err;
  }
}

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker loaded');
