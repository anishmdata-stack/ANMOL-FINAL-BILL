/* Anmol Bill - PWA service worker (v17) */
var CACHE = 'anmol-bill-v17';
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png']); }).catch(function(){}));
  self.skipWaiting();
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){ return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); })); }));
  self.clients.claim();
});
self.addEventListener('fetch', function(e){
  if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).then(function(res){
    var copy = res.clone();
    caches.open(CACHE).then(function(c){ c.put(e.request, copy); }).catch(function(){});
    return res;
  }).catch(function(){ return caches.match(e.request).then(function(hit){ return hit || caches.match('./index.html'); }); }));
});
