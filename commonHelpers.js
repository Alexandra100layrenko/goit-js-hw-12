import{a as f,S as m,i as d}from"./assets/vendor-09d7c26e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(o){if(o.ep)return;o.ep=!0;const t=r(o);fetch(o.href,t)}})();const h="42772780-849d5e67a8b9b0ab7e6b7483b",y="https://pixabay.com/api/",g={async fetchImages(e,s=1,r=15){try{const n=await f.get(y,{params:{key:h,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:r}});if(n.data.hits.length===0)throw new Error("No images found");return n.data}catch(n){throw console.error("Error fetching images:",n),n}}};function p(e){const s=document.querySelector(".gallery"),r=document.querySelector(".load-more-btn");if(!s||!r){console.error("Gallery list or Load more button not found");return}const n=e.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}" class="gallery-link">
        <img src="${t.webformatURL}" alt="${t.tags}" class="gallery-image" />
      </a>
      <div class="gallery-item-info">
        <div class="info-item">Likes: ${t.likes}</div>
        <div class="info-item">Views: ${t.views}</div>
        <div class="info-item">Comments: ${t.comments}</div>
        <div class="info-item">Downloads: ${t.downloads}</div>
      </div>
    </li>
  `).join("");s.innerHTML+=n,new m(".gallery a").refresh(),e.length>0&&r.classList.remove("hidden")}function L(){const e=document.querySelector(".gallery");e?e.innerHTML="":console.error("Gallery list not found")}function b(){const e=document.querySelector(".loader");e?e.classList.add("visible"):console.error("Loader not found")}function v(){const e=document.querySelector(".loader");e?e.classList.remove("visible"):console.error("Loader not found")}function w(e){console.error("Error:",e),E("An error occurred. Please try again later.")}function E(e){d.error({title:"Error",message:e})}function S(){d.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})}const q=document.querySelector(".search-form"),c=document.querySelector(".load-more-btn");let l=1,i="";async function u(e,s){try{b();const r=await g.fetchImages(e,s);p(r.hits),(r.hits.length<15||r.hits.length+(s-1)*15>=r.totalHits)&&(c.classList.add("hidden"),r.hits.length+(s-1)*15>=r.totalHits&&S());const n=document.querySelectorAll(".gallery-item");if(n.length){const{height:o}=n[0].getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}}catch(r){console.error("Error fetching images:",r),w(r)}finally{v()}}q.addEventListener("submit",async e=>{e.preventDefault();const r=e.target.querySelector(".search-input").value.trim();r&&r!==i&&(i=r,l=1,L(),c.classList.add("hidden"),await u(i,l))});c.addEventListener("click",async()=>{l+=1,await u(i,l)});
//# sourceMappingURL=commonHelpers.js.map
