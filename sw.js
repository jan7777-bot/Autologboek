const V="autologboek-3";
const FILES=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png",
"barlow-latin-400-normal.woff2","barlow-latin-500-normal.woff2","barlow-latin-600-normal.woff2",
"barlow-condensed-latin-500-normal.woff2","barlow-condensed-latin-600-normal.woff2","barlow-condensed-latin-700-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>e.request.mode==="navigate"?caches.match("index.html"):Response.error())))});
