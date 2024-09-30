const CACHE_NAME = 'country-app-cache-v1';

// Les fichiers à mettre en cache
const urlsToCache = [
 './',                    // Cache la racine (index.html par défaut)
  './index.html',           // Cache ton fichier HTML
  './style.css',            // Cache ton fichier CSS
  './index.js',             // Cache ton fichier JS principal
  './service-worker.js',    // Cache le Service Worker lui-même
  './countries.json',
  './manifest.json',        // Cache le manifest pour PWA
  './icons/logo1.jpeg', // Cache les icônes
  './icons/official_logo.png',
  './backTop.png',
  './DMSerifDisplay-Italic.ttf'
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
