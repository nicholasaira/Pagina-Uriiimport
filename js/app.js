const money=n=>n==null?'Consultar disponibilidad y precio':new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);
let products=[],cart=JSON.parse(localStorage.getItem('urii-cart')||'[]'),filter='all';
const designer=['Jean Paul Gaultier','Moschino','Azzaro','Montale','Valentino','Armani','Versace','Calvin Klein'];
const productImages={
'amber-oud-gold':'perfumes_recortados_CORREGIDOS/images/products/01 - Al Haramain - Amber Oud Gold Edition.png',
'cdn-intense':'perfumes_recortados_CORREGIDOS/images/products/02 - Armaf - Club de Nuit Intense Man.png',
'cdn-iconic':'perfumes_recortados_CORREGIDOS/images/products/03 - Armaf - Club de Nuit Iconic.png',
'cdn-untold':'perfumes_recortados_CORREGIDOS/images/products/04 - Armaf - Club de Nuit Untold.png',
'cdn-maleka':'perfumes_recortados_CORREGIDOS/images/products/05 - Armaf - Club de Nuit Maleka.png',
'odyssey-mandarin':'perfumes_recortados_CORREGIDOS/images/products/06 - Armaf - Odyssey Mandarin Sky.png',
'odyssey-spectra':'perfumes_recortados_CORREGIDOS/images/products/07 - Armaf - Odyssey Spectra.png',
'odyssey-aqua':'perfumes_recortados_CORREGIDOS/images/products/08 - Armaf - Odyssey Aqua.png',
'odyssey-mega':'perfumes_recortados_CORREGIDOS/images/products/09 - Armaf - Odyssey Mega.png',
'odyssey-white':'perfumes_recortados_CORREGIDOS/images/products/10 - Armaf - Odyssey Homme White.png',
'odyssey-black':'perfumes_recortados_CORREGIDOS/images/products/11 - Armaf - Odyssey Homme Black.png',
'odyssey-dubai':'perfumes_recortados_CORREGIDOS/images/products/12 - Armaf - Odyssey Dubai Chocolat.png',
'stallion-53':'perfumes_recortados_CORREGIDOS/images/products/13 - Emper - Stallion 53.png',
'mashrabya':'perfumes_recortados_CORREGIDOS/images/products/14 - Lattafa - Mashrabya.png',
'yara-candy':'perfumes_recortados_CORREGIDOS/images/products/15 - Lattafa - Yara Candy.png',
'yara-rosa':'perfumes_recortados_CORREGIDOS/images/products/16 - Lattafa - Yara Rosa.png',
'rave-now-black':'perfumes_recortados_CORREGIDOS/images/products/17 - Rave - Now Black.png',
'rave-now-women':'perfumes_recortados_CORREGIDOS/images/products/18 - Rave - Now Women.png',
'amethyst':'perfumes_recortados_CORREGIDOS/images/products/19 - Lattafa - Badee Al Oud Amethyst.png',
'sublime':'perfumes_recortados_CORREGIDOS/images/products/20 - Lattafa - Badee Al Oud Sublime.png',
'noble-blush':'perfumes_recortados_CORREGIDOS/images/products/21 - Lattafa - Badee Al Oud Noble Blush.png',
'oud-for-glory':'perfumes_recortados_CORREGIDOS/images/products/22 - Lattafa - Badee Al Oud Oud for Glory.png',
'honor-glory':'perfumes_recortados_CORREGIDOS/images/products/23 - Lattafa - Badee Al Oud Honor y Glory.png',
'black-exposed':'perfumes_recortados_CORREGIDOS/images/products/24 - Lattafa - Badee Al Oud Black Exposed.png',
'hayaati':'perfumes_recortados_CORREGIDOS/images/products/25 - Lattafa - Hayaati.png',
'hayaati-maleky':'perfumes_recortados_CORREGIDOS/images/products/26 - Lattafa - Hayaati Al Maleky.png',
'teriaq-intense':'perfumes_recortados_CORREGIDOS/images/products/27 - Lattafa - Teriaq Intense.png',
'vintage-radio':'perfumes_recortados_CORREGIDOS/images/products/28 - Lattafa - Vintage Radio.png',
'art-universe':'perfumes_recortados_CORREGIDOS/images/products/29 - Lattafa - Art of Universe.png',
'fakhar-rose':'perfumes_recortados_CORREGIDOS/images/products/30 - Lattafa - Fakhar Rose.png',
'fakhar-black':'perfumes_recortados_CORREGIDOS/images/products/31 - Lattafa - Fakhar Black.png',
'fakhar-platin':'perfumes_recortados_CORREGIDOS/images/products/32 - Lattafa - Fakhar Platin.png',
'nebras':'perfumes_recortados_CORREGIDOS/images/products/33 - Lattafa - Nebras.png',
'khamrah':'perfumes_recortados_CORREGIDOS/images/products/34 - Lattafa - Khamrah.png',
'khamrah-qahwa':'perfumes_recortados_CORREGIDOS/images/products/35 - Lattafa - Khamrah Qahwa.png',
'khamrah-hawa':'perfumes_recortados_CORREGIDOS/images/products/36 - Lattafa - Khamrah Waha.png',
'confidential':'perfumes_recortados_CORREGIDOS/images/products/37 - Lattafa - Confidential Private Gold.png',
'confidential-platinum':'perfumes_recortados_CORREGIDOS/images/products/38 - Lattafa - Confidential Platinum.png',
'eclaire':'perfumes_recortados_CORREGIDOS/images/products/39 - Lattafa - Eclaire.png',
'qaed-white':'perfumes_recortados_CORREGIDOS/images/products/40 - Lattafa - Qaed Al Fursan White.png',
'qaed-black':'perfumes_recortados_CORREGIDOS/images/products/41 - Lattafa - Qaed Al Fursan Black.png',
'qaed-untamed':'perfumes_recortados_CORREGIDOS/images/products/42 - Lattafa - Qaed Al Fursan Untamed.png',
'musamam-white':'perfumes_recortados_CORREGIDOS/images/products/43 - Lattafa - Musamam White Intense.png',
'mayar-cherry':'perfumes_recortados_CORREGIDOS/images/products/44 - Lattafa - Mayar Cherry Intense.png',
'9pm-night-out':'perfumes_recortados_CORREGIDOS/images/products/45 - Afnan - 9PM Night Out.png',
'hawas-elixir':'perfumes_recortados_CORREGIDOS/images/products/46 - Rasasi - Hawas Elixir.png',
'liquid-brun':'perfumes_recortados_CORREGIDOS/images/products/47 - French Avenue - Liquid Brun.png',
'bharara-king':'perfumes_recortados_CORREGIDOS/images/products/48 - Bharara - King.png',
'salvo':'perfumes_recortados_CORREGIDOS/images/products/49 - Maison Alhambra - Salvo.png',
'jorge-profumo':'perfumes_recortados_CORREGIDOS/images/products/50 - Maison Alhambra - Jorge Di Profumo.png',
'philos-pura':'perfumes_recortados_CORREGIDOS/images/products/51 - Maison Alhambra - Philos Pura.png',
'scandal':'perfumes_recortados_CORREGIDOS/images/products/52 - Jean Paul Gaultier - Scandal Pour Homme.png',
'toy-boy':'perfumes_recortados_CORREGIDOS/images/products/53 - Moschino - Toy Boy.png',
'azzaro-most-wanted':'perfumes_recortados_CORREGIDOS/images/products/54 - Azzaro - The Most Wanted.png',
'arabians-tonka':'perfumes_recortados_CORREGIDOS/images/products/55 - Montale - Arabians Tonka.png',
'valentino-intense':'perfumes_recortados_CORREGIDOS/images/products/56 - Valentino - Born in Roma Uomo Intense.png',
'stronger-intensely':'perfumes_recortados_CORREGIDOS/images/products/57 - Armani - Stronger With You Intensely.png',
'versace-eros':'perfumes_recortados_CORREGIDOS/images/products/58 - Versace - Eros.png',
'ck-one-essence':'perfumes_recortados_CORREGIDOS/images/products/59 - Calvin Klein - CK One Essence.png'
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
