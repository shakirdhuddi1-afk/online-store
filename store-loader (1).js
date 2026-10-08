// Paste your Supabase details here (same as admin.html)
(function(){
var URL_="https://lfbwswsnaiwmjqakolyr.supabase.co", KEY="sb_publishable_lKu2uyYFQTKwpJ6uyb2SXw_O_iBZA1F";
if(URL_.indexOf("PASTE")===0) return;
var H={apikey:KEY};
function get(p){return fetch(URL_+"/rest/v1/"+p,{headers:H}).then(function(r){return r.json()})}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
get("settings?id=eq.1&select=*").then(function(a){
  var s=a&&a[0]; if(!s) return;
  document.querySelectorAll("[data-store-name]").forEach(function(e){e.textContent=s.store_name});
  document.querySelectorAll("[data-tagline]").forEach(function(e){e.textContent=s.tagline});
  if(s.store_name) document.title=s.store_name+(s.tagline?" - "+s.tagline:"");
}).catch(function(){});
get("products?active=eq.true&select=*&order=created_at.desc").then(function(list){
  if(!Array.isArray(list)) return;
  window.DB_PRODUCTS=list;
  var box=document.getElementById("db-products");
  if(box) box.innerHTML=list.map(function(p){
    return '<div style="border:1px solid #e3e9e6;border-radius:12px;overflow:hidden"><img src="'+esc(p.image)+'" alt="'+esc(p.name)+'" style="width:100%;aspect-ratio:1;object-fit:cover"><div style="padding:12px"><b>'+esc(p.name)+'</b><div>'+esc(p.price)+'</div></div></div>';
  }).join("");
  document.dispatchEvent(new CustomEvent("products-loaded",{detail:list}));
}).catch(function(){});
})();

// ---- Visit tracking + orders (needs setup-dashboard.sql) ----
(function(){
var URL_="https://lfbwswsnaiwmjqakolyr.supabase.co", KEY="sb_publishable_lKu2uyYFQTKwpJ6uyb2SXw_O_iBZA1F";
if(URL_.indexOf("PASTE")===0) return;
var H={apikey:KEY,"Content-Type":"application/json",Prefer:"return=minimal"};
function post(t,b){return fetch(URL_+"/rest/v1/"+t,{method:"POST",headers:H,body:JSON.stringify(b)})}
try{
  var v=localStorage.getItem("vid"); if(!v){v=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem("vid",v)}
  var ref=""; try{ref=document.referrer?new URL(document.referrer).hostname:"direct"}catch(e){ref="direct"}
  if(ref!==location.hostname) post("visits",{vid:v,page:location.pathname,referrer:ref,device:/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop"}).catch(function(){});
}catch(e){}
// Checkout se call karo: placeOrder({customer_name,phone,address,items:[...],total:1999}).then(ok=>...)
window.placeOrder=function(o){return post("orders",o).then(function(r){return r.ok})};
})();
