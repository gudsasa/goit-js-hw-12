import{S,i as l}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const v="43804338-e495c959d27dd2a0f1faf63f4",E="https://pixabay.com/api/";async function f(s,t){const r=new URLSearchParams({key:v,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}),a=await fetch(`${E}?${r}`);if(!a.ok)throw new Error(a.statusText);return await a.json()}function p(s){const t=document.querySelector(".gallery");t.innerHTML="";const r=s.map(({webformatURL:o,largeImageURL:n,tags:h,likes:g,views:L,comments:w,downloads:b})=>`<li class="gallery-item">
            <a href = "${n}">
        <img src="${o}" alt="${h}"/>
    <ul class="gallery-info">
        <li>Likes<p>${g}</p></li>
        <li>Views<p>${L}</p></li>
        <li>Comments<p>${w}</p></li>
        <li>Downloads<p>${b}</p></li>
    </ul>
    </a>
    </li>`).join("");t.insertAdjacentHTML("beforeend",r);const a={captionsData:"alt",captionDelay:250};new S(".gallery a",a).refresh()}const P=document.querySelector(".search-form"),y=document.querySelector(".search-images"),u=document.querySelector(".loader"),i=document.querySelector(".load-more-button");let c=1,m="",d=[];document.addEventListener("DOMContentLoaded",()=>{i.style.display="none"});P.addEventListener("submit",async function(s){s.preventDefault();const t=y.value.trim();if(t===""){l.error({message:"Please enter a search term!",position:"topRight"});return}u.style.display="block",c=1;try{const r=await f(t,c);r.hits.length===0?(p([]),i.style.display="none",l.error({title:"Error!",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})):(p(r.hits),i.style.display="block",m=t,d=r.hits,c=1)}catch(r){console.error("Error fetching images:",r),l.error({title:"Error!",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}finally{u.style.display="none"}y.value=""});i.addEventListener("click",async()=>{try{u.style.display="block";const s=await f(m,++c);if(s.hits.length===0)i.style.display="none",l.info({message:"You've reached the end of search results.",position:"topRight"});else{d=[...d,...s.hits],p(d);const r=document.querySelector(".gallery a").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}catch(s){console.log(s)}finally{u.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
