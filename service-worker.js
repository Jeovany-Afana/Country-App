const CACHE_NAME = 'country-app-cache-v1';

// Les fichiers à mettre en cache
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/countries.json' // Si tu utilises un fichier JSON pour les données
];

// Installer le Service Worker et mettre en cache les fichiers
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Les fichiers sont mis en cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepter les requêtes et retourner les fichiers depuis le cache si disponibles
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si le fichier est dans le cache, on le retourne
        if (response) {
          return response;
        }
        // Sinon, on fait la requête réseau normale
        return fetch(event.request);
      })
  );
});
