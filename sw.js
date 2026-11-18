// Site shell only. Project records remain in this browser; no cloud sync.
const CACHE = 'hvac-duct-pwa-v7-duct-icon';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './duct-icon-192-v3.png', './duct-icon-512-v3.png', './duct-apple-touch-v3.png'];
self.addEventListener('install', event => {event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate', event => {event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('hvac-duct-pwa-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch', event => {const req=event.request; if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return; event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match(req).then(x=>x||caches.match('./index.html'))));});
