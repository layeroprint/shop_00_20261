/** Optional bridge for the uploaded Layero/Elementor cards.
 * Load after layero-badges.js. Does not replace wishlist / cart event handlers.
 * Pass explicit product metadata in data-lyrb-badges='[...]'.
 * Without it, only already rendered personal/time/discount labels are reused.
 */
(function(root) {
  'use strict';
  const A=root.LayeroBadges;
  if(!A) throw new Error('Előbb a layero-badges.js fájlt töltsd be.');
  function readLegacy(card) {
    const result=[];
    const personal=card.querySelector('.lyr-product-chip--personal, .lyr-product-card__personal, .sh-personal-mark');
    const time=card.querySelector('.lyr-product-chip--time');
    const sale=card.querySelector('.sh-badge--sale');
    if(personal)result.push({id:'personal',label:personal.textContent.trim()});
    if(time)result.push({id:'productionTime',value:time.textContent.trim()});
    card.querySelectorAll('.sh-badge:not(.sh-badge--sale)').forEach(badge=>{
      const label=badge.textContent.trim();
      const id=label==='Bestseller'?'bestseller':label==='Új'?'new':label==='Szezonális'?'seasonal':'custom';
      result.push(id==='custom'?{id,label,zone:'overlay'}:{id});
    });
    if(sale) {
      const raw=sale.textContent.trim();
      const match=raw.match(/[−-]?\s*(\d+(?:[.,]\d+)?)\s*%/);
      if(match)result.push({id:'salePercent',value:Number(match[1].replace(',','.')),label:raw});
      else result.push({id:'sale',label:raw});
    }
    return result;
  }
  function enhance(rootNode=document,options={}) {
    const locale=document.documentElement.lang.toLowerCase().startsWith('ro')?'ro':'hu';
    rootNode.querySelectorAll('[data-lyrb-details]').forEach(node=>{
      try { node.innerHTML=A.groupHTML(A.resolve(JSON.parse(node.dataset.lyrbDetails),{locale,...options}).all,{locale,...options}); }
      catch(error) { console.warn('Layero Badges: hibás termékjelzések.',error.message); }
    });
    const cards=[];
    if(rootNode.matches?.('[data-layero-product-card]'))cards.push(rootNode);
    cards.push(...rootNode.querySelectorAll('[data-layero-product-card]'));
    return cards.map(card=>{
      let input;
      try {
        input=card.hasAttribute('data-lyrb-badges')?JSON.parse(card.dataset.lyrbBadges):readLegacy(card);
        if(!Array.isArray(input))throw new TypeError('A data-lyrb-badges értéke JSON-tömb legyen.');
        return A.mountCard(card,input,{locale:document.documentElement.lang.toLowerCase().startsWith('ro')?'ro':'hu',...options});
      } catch(error) {
        // Leave original labels in place on malformed host data.
        console.warn('Layero Badges: kártya kihagyva.',card.dataset.layeroProductId,error.message);
        return {ok:false,id:card.dataset.layeroProductId,reason:error.message};
      }
    });
  }
  document.addEventListener('keydown',event=>{
    const detail=event.target.closest?.('.lyrb-more[open]');
    if(event.key==='Escape' && detail){event.stopPropagation();detail.open=false;detail.querySelector('summary').focus();}
  });
  root.LayeroBadgeAdapter=Object.freeze({enhance,readLegacy});
  // Explicit opt-in only. Call enhance(container) after AJAX / Elementor grid updates.
  function boot(){document.querySelectorAll('[data-lyrb-auto]').forEach(el=>enhance(el,{locale:el.dataset.lyrbLocale||'hu',variant:el.dataset.lyrbVariant||'signature'}));}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})(window);
