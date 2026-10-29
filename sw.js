// WIKKI.MANAGEMENT · офлайн-кэш оболочки. Страница — свежая из сети, кэш только запасной; данные Supabase не кэшируются.
const V='wos-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./favicon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
  e.respondWith(fetch(e.request,u.origin===location.origin?{cache:'no-cache'}:undefined).then(r=>{if(r.ok&&(u.origin===location.origin||/fonts|jsdelivr/.test(u.hostname))){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
