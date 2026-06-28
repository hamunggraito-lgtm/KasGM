// sw.js - Service Worker untuk Gajah Mas

const CACHE_NAME = 'gajahmas-v1';
// Cache hanya resource lokal dulu agar SW tidak gagal di-install
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/icon-192.png',
  '/icon-152.png',
  './',
  './manifest.json',
  './sw.js',
  './icon-192.png',
  './icon-152.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('❌ Cache addAll gagal (tidak fatal untuk install):', err);
      })
  );
});

// Aktifkan Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercept request
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response atau fetch dari network
        return response || fetch(event.request);
      })
  );
});