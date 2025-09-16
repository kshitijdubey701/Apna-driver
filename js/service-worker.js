// Apna Driver Service Worker
const CACHE_NAME = "apna-driver-v1";
const ASSETS_TO_CACHE = [
  "/",                           // Home page
  "/index.html",
  "/css/main.css",
  "/vendor/bootstrap/css/bootstrap.min.css",
  "/vendor/bootstrap-icons/bootstrap-icons.css",
  "/vendor/aos/aos.css",
  "/vendor/glightbox/css/glightbox.min.css",
  "/vendor/swiper/swiper-bundle.min.css",
  "/js/main.js",
  "/img/logo.png",
  "/img/hero-bg-abstract.jpg",
  "/img/favicon.png",
  "/img/apple-touch-icon.png"
];

// Install Event - Cache essential assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate Event - Delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

// Fetch Event - Serve from cache first, then network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
