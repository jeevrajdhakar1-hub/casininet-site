
const CACHE_NAME = 'cn-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://raw.githubusercontent.com/jeevrajdhakar1-hub/casininet-site/refs/heads/main/images/IMG_0945.png'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch process (Offline support ke liye)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
