self.addEventListener('install', function(event) {
  console.log('V1 installing…');

  // cache a cat SVG
  event.waitUntil(
    caches.open('static-v1').then(function(cache){ cache.add('/cat.png')})
  );
});

self.addEventListener('activate', function(event) {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == '/dog.png') {
    event.respondWith(caches.match('/cat.png'));
  }
});