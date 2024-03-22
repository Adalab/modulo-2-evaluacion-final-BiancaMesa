const u=document.querySelector(".js-input-search"),S=document.querySelector(".js-search-btn"),p=document.querySelector(".js-reset-btn"),j=document.querySelector(".js-reset-fav-list-btn"),m=document.querySelector(".js-search-cards-container"),l=document.querySelector(".js-fav-cards-container"),L="https://api.jikan.moe/v4/anime?q=",g="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let o=[],s=[];const v=JSON.parse(localStorage.getItem("favoriteList"));v!==null&&(s=v,d(s,l));function $(){const e=u.value;fetch(L+e).then(a=>a.json()).then(a=>{o=a.data,h(o,m)})}function I(e){const a=o.find(t=>parseInt(e.currentTarget.id)===t.mal_id);s.push(a),localStorage.setItem("favoriteList",JSON.stringify(s)),d(s,l)}function d(e,a){let t="";for(const i of e){const r=i.title,f=i.images.jpg.image_url,n=i.mal_id;i.images.jpg.image_url===null?t+=`
                <div class="series-fav-card js-series js-series-fav" id="${n}" collapsed>
                    <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                    <img class="fav-img" src="${g}" alt="${r}">
                    <h3 class="fav-card-title">${r}</h3>
                </div>
                `:t.includes(n)||(t+=`
                <div class="series-fav-card js-series js-series-fav" id="${n}collapsed">
                    <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                    <img class="fav-img" src="${f}" alt="${r}">
                    <h3 class="fav-card-title">${r}</h3>
                </div>
                `)}a.innerHTML=t;const c=document.querySelectorAll(".js-remove-fav-btn");for(const i of c)i.addEventListener("click",b)}function h(e,a){let t="";for(const i of e){const r=i.title,f=i.images.jpg.image_url,n=i.mal_id;i.images.jpg.image_url==="htpps://cdn.myanimelist.net/img/sp/icon/apple-touch-/icon-256.png"?t+=`
                <div class="series-card js-series" id="${n}">
                    <img class="searched-img" src="${g}" alt="${r}">
                    <h3 class="card-title">${r}</h3>
                </div>
                `:t+=`
            <div class="series-card js-series" id="${n}">
                <img class="searched-img" src="${f}" alt="${r}">
                <h3 class="card-title">${r}</h3>
            </div>
            `}a.innerHTML=t;const c=document.querySelectorAll(".js-series");for(const i of c)i.addEventListener("click",I)}function F(e){e.preventDefault(),$()}S.addEventListener("click",F);function y(e){e.preventDefault(),u.value="",o=[],h(o,m),s=[],localStorage.removeItem("favoriteList"),d(s,l)}p.addEventListener("click",y);function q(){s=[],localStorage.removeItem("favoriteList"),d(s,l)}j.addEventListener("click",q);function b(e){e.preventDefault(),s=JSON.parse(localStorage.getItem("favoriteList"));const t=s.findIndex(c=>c.mal_id===parseInt(e.currentTarget.parentElement.id));t!==-1&&s.splice(t,1),localStorage.setItem("favoriteList",JSON.stringify(s)),d(s,l)}
//# sourceMappingURL=main.js.map
