import{a as p,i as c,S as y}from"./assets/vendor-eded45c0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const f=15;p.defaults.baseURL="https://pixabay.com";const l={key:"43802528-015b222178f5679b6792a0cf2",image_type:"photo",orientation:"horizontal",safesearch:!0},v=async(r="",o=1)=>{const t={key:l.key,per_page:f,q:r,orientation:l.orientation,image_type:l.image_type,safesearch:l.safesearch,page:o};return await p.get("/api/",{params:{...t}})},L=r=>r.map(({webformatURL:o,largeImageURL:t,tags:a,likes:e,views:s,downloads:n,comments:b})=>`
  
  <div class="gallery-item">
               <a class="gallery-link" href="${t}">
          <img
            class="gallery-image"
            src="${o}"
            alt="${a}"
          />
        </a>
            <div class = "card-img">
            <div class = "likes">
            <h2 class = "card-title">Likes</h2>
            <p class = image-text>${e}</p></div>
            
            <div class = "views">
            <h2 class = "card-title">Views</h2>
            <p class = image-text>${s}</p></div>

            <div class = "comments">
            <h2 class = "card-title">Comments</h2>
            <p class = image-text>${b}</p></div>
            
            <div class = "downloads">
            <h2 class = "card-title">Downloads</h2>
            <p class = image-text>${n}</p></div>
            </div>
          </div>`).join(""),i=document.querySelector(".js-gallery"),S=document.querySelector(".js-search-form"),u=document.querySelector(".js-loader"),h=document.querySelector(".btn-load-more");let d=null,m=1,g=0;async function P(r){if(r.preventDefault(),d=r.target.elements.searchKeyword.value.trim(),i.innerHTML="",d===""){i.innerHTML="",r.target.reset(),c.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3,color:"red"});return}i.innerHTML="",u.classList.remove("is-hidden");try{const{data:t}=await v(d,m);if(t.total===0){c.show({message:"Search params is not valid",position:"topRight",timeout:2e3,color:"red"}),u.classList.add("is-hidden"),r.target.reset();return}const a=new y(".gallery-list a",{captionsData:"alt",captionDelay:250});i.innerHTML=L(t.hits),a.refresh(),g=Math.ceil(t.totalHits/f),g>1&&h.classList.remove("is-hidden")}catch(t){let a="";t.message==="rateLimited"?a="Too many requests":a+="Sorry, there are no images for this query",c.error({message:a,position:"topRight",timeout:2e3})}r.target.reset(),u.classList.add("is-hidden")}const D=()=>{const t=i.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:t,left:0,behavior:"smooth"})},w=async r=>{try{m+=1;const{data:o}=await v(d,m),t=new y(".gallery-list a",{captionsData:"alt",captionDelay:250});i.insertAdjacentHTML("beforeend",L(o.hits)),t.refresh(),D(),m>g&&(h.classList.add("is-hidden"),h.removeEventListener("click",w),c.error({message:"We are sorry, but you have reached the end of search results.",position:"topRight",timeout:2e3}))}catch{c.error({message:"Search params is not valid",position:"topRight",timeout:2e3})}};S.addEventListener("submit",P);h.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
