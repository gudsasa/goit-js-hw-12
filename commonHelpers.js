import{a as m,S as b,i}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const L="43838996-7b0b384f174ce1ebbbcd3455e",C="https://pixabay.com/api/";m.defaults.baseURL=C;async function p(s,t){try{return await m.get("",{params:{q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,key:L,per_page:15,page:t}})}catch(r){throw console.error("Error fetching data from Pixabay API:",r),r}}function h(s){return s.map(({tags:t,likes:r,views:c,comments:e,downloads:o,largeImageURL:a})=>`<li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img class="gallery-img" src="${a}" alt="${t}">
            <div class="info-gallery-box">
              <ul class="info-gallery-list">
                <li class="info-gallery-item">
                  <p class="info-gallery-text">Likes</p>
                  <span class="info-gallery-span">${r}</span>
                </li>
                <li class="info-gallery-item">
                  <p class="info-gallery-text">Views</p>
                  <span class="info-gallery-span">${c}</span>
                </li>
                <li class="info-gallery-item">
                  <p class="info-gallery-text">Comments</p>
                  <span class="info-gallery-span">${e}</span>
                </li>
                <li class="info-gallery-item">
                  <p class="info-gallery-text">Downloads</p>
                  <span class="info-gallery-span">${o}</span>
                </li>
              </ul>
            </div>
          </a>
        </li>`).join("")}const w=document.querySelector(".form"),d=document.querySelector(".gallery"),l=document.querySelector(".loader"),g=document.querySelector(".load-more"),y=new b(".gallery a",{captionsData:"alt",captionDelay:250});let n=1,f="",u=0;w.addEventListener("submit",S);g.addEventListener("click",v);async function S(s){if(s.preventDefault(),f=s.currentTarget.elements.search.value.trim(),f===""){i.error({message:"Search query cannot be empty. Please try again!",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",timeout:4e3});return}n=1,l.classList.remove("is-hidden"),g.classList.add("is-hidden"),d.innerHTML="";try{const{data:t}=await p(f,n);if(u=t.totalHits,t.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",timeout:4e3}),l.classList.add("is-hidden");return}d.innerHTML=h(t.hits),y.refresh(),t.hits.length<15||u<=15?i.info({message:"We're sorry, but you've reached the end of search results.",messageColor:"#fff",backgroundColor:"#9fc5e8",position:"topRight",timeout:4e3}):g.classList.remove("is-hidden")}catch(t){console.log(t),i.error({message:"Something went wrong. Please try again later.",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",timeout:4e3})}finally{l.classList.add("is-hidden"),s.target.reset()}}async function v(){n+=1,l.classList.remove("is-hidden");try{const{data:s}=await p(f,n);d.insertAdjacentHTML("beforeend",h(s.hits)),y.refresh();const t=d.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"}),(s.hits.length<15||n*15>=u)&&(i.info({message:"We're sorry, but you've reached the end of search results.",messageColor:"#fff",backgroundColor:"#9fc5e8",position:"topRight",timeout:4e3}),g.classList.add("is-hidden"))}catch(s){console.log(s),i.error({message:"Something went wrong. Please try again later.",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",timeout:4e3})}finally{l.classList.add("is-hidden")}}
//# sourceMappingURL=commonHelpers.js.map
