const money=n=>n==null?'Consultar disponibilidad y precio':new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);
let products=[],cart=JSON.parse(localStorage.getItem('urii-cart')||'[]'),filter='all';
const designer=['Jean Paul Gaultier','Moschino','Azzaro','Montale','Valentino','Armani','Versace','Calvin Klein'];
const productImages={
'amber-oud-gold':'perfumes_ordenados/01 - Al Haramain - Amber Oud Gold Edition.webp',
'cdn-intense':'perfumes_ordenados/02 - Armaf - Club de Nuit Intense Man.webp',
'cdn-iconic':'perfumes_ordenados/03 - Armaf - Club de Nuit Iconic.jpg',
'cdn-untold':'perfumes_ordenados/04 - Armaf - Club de Nuit Untold.webp',
'cdn-maleka':'perfumes_ordenados/05 - Armaf - Club de Nuit Maleka.webp',
'odyssey-mandarin':'perfumes_ordenados/06 - Armaf - Odyssey Mandarin Sky.webp',
'odyssey-spectra':'perfumes_ordenados/07 - Armaf - Odyssey Spectra.jpg',
'odyssey-mega':'perfumes_ordenados/09 - Armaf - Odyssey Mega.webp',
'odyssey-white':'perfumes_ordenados/10 - Armaf - Odyssey Homme White.webp',
'odyssey-black':'perfumes_ordenados/11 - Armaf - Odyssey Homme Black.webp',
'odyssey-dubai':'perfumes_ordenados/12 - Armaf - Odyssey Dubai Chocolat.jpg',
'stallion-53':'perfumes_ordenados/13 - Emper - Stallion 53.webp',
'mashrabya':'perfumes_ordenados/14 - Lattafa - Mashrabya.jpg',
'yara-candy':'perfumes_ordenados/15 - Lattafa - Yara Candy.jpg',
'yara-rosa':'perfumes_ordenados/16 - Lattafa - Yara Rosa.jpg',
'rave-now-black':'perfumes_ordenados/17 - Rave - Now Black.webp',
'rave-now-women':'perfumes_ordenados/18 - Rave - Now Women.jpg',
'amethyst':'perfumes_ordenados/19 - Lattafa - Badee Al Oud Amethyst.jpg',
'sublime':'perfumes_ordenados/20 - Lattafa - Badee Al Oud Sublime.webp',
'noble-blush':'perfumes_ordenados/21 - Lattafa - Badee Al Oud Noble Blush.webp',
'oud-for-glory':'perfumes_ordenados/22 - Lattafa - Badee Al Oud Oud for Glory.webp',
'honor-glory':'perfumes_ordenados/23 - Lattafa - Badee Al Oud Honor y Glory.jfif',
'black-exposed':'perfumes_ordenados/24 - Lattafa - Badee Al Oud Black Exposed.png',
'hayaati':'perfumes_ordenados/25 - Lattafa - Hayaati.webp',
'hayaati-maleky':'perfumes_ordenados/26 - Lattafa - Hayaati Al Maleky.webp',
'teriaq-intense':'perfumes_ordenados/27 - Lattafa - Teriaq Intense.jpg',
'vintage-radio':'perfumes_ordenados/28 - Lattafa - Vintage Radio.jpg',
'art-universe':'perfumes_ordenados/29 - Lattafa - Art of Universe.webp',
'fakhar-rose':'perfumes_ordenados/30 - Lattafa - Fakhar Rose.webp',
'fakhar-black':'perfumes_ordenados/31 - Lattafa - Fakhar Black.webp',
'fakhar-platin':'perfumes_ordenados/32 - Lattafa - Fakhar Platin.webp',
'nebras':'perfumes_ordenados/33 - Lattafa - Nebras.jfif',
'khamrah':'perfumes_ordenados/34 - Lattafa - Khamrah.webp',
'khamrah-qahwa':'perfumes_ordenados/35 - Lattafa - Khamrah Qahwa.webp',
'khamrah-hawa':'perfumes_ordenados/36 - Lattafa - Khamrah Waha.jpg',
'confidential':'perfumes_ordenados/EXTRAS - revisar/Lattafa - Confidential Private Gold.webp',
'confidential-platinum':'perfumes_ordenados/38 - Lattafa - Confidential Platinum.webp',
'eclaire':'perfumes_ordenados/39 - Lattafa - Eclaire.png',
'qaed-white':'perfumes_ordenados/40 - Lattafa - Qaed Al Fursan White.webp',
'qaed-black':'perfumes_ordenados/41 - Lattafa - Qaed Al Fursan Black.jpg',
'qaed-untamed':'perfumes_ordenados/42 - Lattafa - Qaed Al Fursan Untamed.jpg',
'musamam-white':'perfumes_ordenados/43 - Lattafa - Musamam White Intense.webp',
'mayar-cherry':'perfumes_ordenados/44 - Lattafa - Mayar Cherry Intense.jpg',
'9pm-night-out':'perfumes_ordenados/45 - Afnan - 9PM Night Out.jpg',
'hawas-elixir':'perfumes_ordenados/46 - Rasasi - Hawas Elixir.webp',
'liquid-brun':'perfumes_ordenados/47 - French Avenue - Liquid Brun.png',
'bharara-king':'perfumes_ordenados/48 - Bharara - King.webp',
'salvo':'perfumes_ordenados/49 - Maison Alhambra - Salvo.webp',
'jorge-profumo':'perfumes_ordenados/50 - Maison Alhambra - Jorge Di Profumo.webp',
'philos-pura':'perfumes_ordenados/51 - Maison Alhambra - Philos Pura.webp',
'scandal':'perfumes_ordenados/52 - Jean Paul Gaultier - Scandal Pour Homme.webp',
'toy-boy':'perfumes_ordenados/53 - Moschino - Toy Boy.webp',
'azzaro-most-wanted':'perfumes_ordenados/54 - Azzaro - The Most Wanted.webp',
'arabians-tonka':'perfumes_ordenados/55 - Montale - Arabians Tonka.webp',
'valentino-intense':'perfumes_ordenados/56 - Valentino - Born in Roma Uomo Intense.webp',
'stronger-intensely':'perfumes_ordenados/57 - Armani - Stronger With You Intensely.webp',
'versace-eros':'perfumes_ordenados/58 - Versace - Eros.webp',
'ck-one-essence':'perfumes_ordenados/59 - Calvin Klein - CK One Essence.webp'
};
fetch('data/productos.json').then(r=>r.json()).then(d=>{products=d;render()}).catch(()=>{document.querySelector('#grid').innerHTML='<p>No se pudo cargar el catálogo.</p>'});
function minPrice(p){return [p.p5,p.p10,p.sellado].filter(x=>x!=null).sort((a,b)=>a-b)[0]}
function productVisual(p,detail=false){
  if(productImages[p.id])return `<img class="product-image ${detail?'product-image-detail':''}" src="${encodeURI(productImages[p.id])}" alt="${p.marca} ${p.nombre}" loading="${detail?'eager':'lazy'}">`;
  let cls=detail?'detail-product-visual':'product-visual';
  return `<div class="${cls}"><span>${p.marca}</span><b>${p.nombre}</b><small>${p.tamano||'EAU DE PARFUM'}</small></div>`
}
function render(){let q=document.querySelector('#search').value.toLowerCase();let list=products.filter(p=>(filter==='all'||p.marca===filter||(filter==='designer'&&designer.includes(p.marca)))&&(p.nombre+' '+p.marca).toLowerCase().includes(q));document.querySelector('#grid').innerHTML=list.map(p=>`<article class="card" onclick="openProduct('${p.id}')"><div class="photo">${productVisual(p)}</div><div class="brandline">${p.marca}</div><h3>${p.nombre}</h3><div class="tags">${p.perfil.join(' · ')||'Ver fragancia'}</div><div class="price">Desde ${money(minPrice(p))}</div></article>`).join('')}
document.querySelector('#search').oninput=render;document.querySelectorAll('[data-brand]').forEach(b=>b.onclick=()=>{filter=b.dataset.brand;document.querySelectorAll('[data-brand]').forEach(x=>x.classList.remove('active'));b.classList.add('active');render()});
function openProduct(id){let p=products.find(x=>x.id===id),similar=products.filter(x=>x.id!==id&&x.perfil.some(t=>p.perfil.includes(t))).slice(0,3);window.current=p;document.querySelector('#modalBody').innerHTML=`<div class="product-detail"><div class="detail-photo">${productVisual(p,true)}</div><div class="detail-info"><p class="eyebrow">${p.marca.toUpperCase()}</p><h2>${p.nombre}</h2><p>${p.perfil.join(' · ')||'Perfil olfativo a confirmar'}</p><div class="choices">${choice('5 ml',p.p5,'5ml')}${choice('10 ml',p.p10,'10ml')}${choice('Sellado',p.sellado,'sellado')}</div><button class="primary full" onclick="addCurrent()">Agregar al carrito</button><div class="related"><p class="eyebrow">TAMBIÉN TE PUEDE GUSTAR</p>${similar.map(s=>`<button class="related-item" onclick="openProduct('${s.id}')"><b>${s.nombre}</b><br><small>${s.perfil.filter(t=>p.perfil.includes(t)).join(' · ')}</small></button>`).join('')||'<p>Próximamente</p>'}</div></div></div>`;window.variant='5ml';document.querySelector('#modal').classList.add('open')}
function choice(label,price,v){return `<div class="choice ${v==='5ml'?'selected':''}" onclick="selectVariant(this,'${v}')"><span>${label}</span><b>${money(price)}</b></div>`}
function selectVariant(el,v){document.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');window.variant=v}
function addCurrent(){let p=window.current,v=window.variant,price=v==='5ml'?p.p5:v==='10ml'?p.p10:p.sellado;let found=cart.find(x=>x.id===p.id&&x.variant===v);if(found)found.qty++;else cart.push({id:p.id,nombre:p.nombre,marca:p.marca,variant:v,price,qty:1});save();document.querySelector('#modal').classList.remove('open');openCart()}
function save(){localStorage.setItem('urii-cart',JSON.stringify(cart));document.querySelector('#cartCount').textContent=cart.reduce((a,x)=>a+x.qty,0);renderCart()}
function renderCart(){document.querySelector('#cartItems').innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><div><b>${x.nombre}</b><br><small>${x.variant==='5ml'?'Decant 5 ml':x.variant==='10ml'?'Decant 10 ml':'Sellado'} ×${x.qty}</small></div><b>${x.price==null?'Consultar':money(x.price*x.qty)}</b><button class="remove" onclick="removeItem(${i})">Quitar</button></div>`).join(''):'<p style="padding:25px">Tu bolsa está vacía.</p>';let sub=cart.reduce((a,x)=>a+(x.price||0)*x.qty,0);document.querySelector('#subtotal').textContent=money(sub);document.querySelector('#total').textContent=money(sub+(window.shippingCost||0));let sc=document.querySelector('#shippingCost');if(sc)sc.textContent=window.shippingCost?money(window.shippingCost):'—'}
function removeItem(i){cart.splice(i,1);save()}function openCart(){renderCart();document.querySelector('#drawer').classList.add('open');document.querySelector('#shade').classList.add('open')}
document.querySelector('#cartBtn').onclick=openCart;document.querySelector('[data-cart-close]').onclick=closeCart;document.querySelector('#shade').onclick=closeCart;function closeCart(){document.querySelector('#drawer').classList.remove('open');document.querySelector('#shade').classList.remove('open')}
document.querySelector('[data-close]').onclick=()=>document.querySelector('#modal').classList.remove('open');
window.shippingCost=0;window.shippingKm=0;
const shippingBtn=document.querySelector('#shippingBtn');if(shippingBtn)shippingBtn.onclick=()=>{
  let addr=document.querySelector('#address').value.trim();
  if(!addr)return alert('Ingresá la dirección de entrega.');
  window.shippingAddress=addr;
  let status=document.querySelector('#shippingStatus');if(status)status.textContent='Costo de envío a consultar por WhatsApp.';
  let sc=document.querySelector('#shippingCost');if(sc)sc.textContent='A consultar';
};
async function createOrder(payload){
  const cfg=window.URII_SUPABASE;
  if(!cfg?.url||!cfg?.publishableKey)throw new Error('Configuración de pedidos no disponible');
  const r=await fetch(cfg.url+'/functions/v1/create-order',{method:'POST',headers:{'Content-Type':'application/json','apikey':cfg.publishableKey,'Authorization':'Bearer '+cfg.publishableKey},body:JSON.stringify(payload)});
  const d=await r.json().catch(()=>({}));
  if(!r.ok||!d.success||!d.order_code)throw new Error(d.error||'No se pudo registrar el pedido');
  return d.order_code;
}
document.querySelector('#checkout').onclick=async()=>{
  if(!cart.length)return alert('Agregá al menos un producto.');
  let addr=document.querySelector('#address').value.trim();
  if(!addr)return alert('Ingresá la dirección de entrega.');
  let sub=cart.reduce((a,x)=>a+(x.price||0)*x.qty,0),pending=cart.some(x=>x.price==null);
  let finalTotal=sub,btn=document.querySelector('#checkout'),oldText=btn.textContent;
  btn.disabled=true;btn.textContent='Registrando pedido...';
  try{
    let code=await createOrder({customer_address:addr,distance_km:0,shipping_cost:0,products_total:sub,potential_total:finalTotal,has_pending_price:pending,items:cart});
    let lines=cart.map(x=>`• ${x.marca} ${x.nombre} — ${x.variant==='5ml'?'Decant 5 ml':x.variant==='10ml'?'Decant 10 ml':'Sellado'} ×${x.qty} — ${x.price==null?'Consultar disponibilidad y precio':money(x.price*x.qty)}`);
    let totalLine=pending?`\n💰 Total parcial: ${money(finalTotal)}`:`\n💰 Total: ${money(finalTotal)}`;
    let msg=`Hola! 👋 Quiero realizar un pedido en URIIIMPORT.\n\n🧾 Pedido #${code}\n\n🛍️ Mi pedido:\n${lines.join('\n')}\n\n💰 Productos con precio: ${money(sub)}${pending?'\n⚠️ Hay productos con disponibilidad y precio a consultar.':''}${totalLine}\n🚚 Envío: a consultar\n📍 Entrega: ${addr}\n\nQuería confirmar disponibilidad${pending?' y precio de los productos pendientes':''} y costo de envío para conocer el total final y realizar el pago. ¡Gracias!`;
    window.open('https://wa.me/5491152295954?text='+encodeURIComponent(msg),'_blank');
  }catch(e){alert('No pudimos registrar el pedido. '+e.message)}
  finally{btn.disabled=false;btn.textContent=oldText}
};
save();
