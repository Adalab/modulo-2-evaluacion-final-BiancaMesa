const S=document.querySelector(".js-input-search"),h=document.querySelector(".js-search-btn"),p=document.querySelector(".js-reset-btn"),j=document.querySelector(".js-reset-fav-list-btn"),m=document.querySelector(".js-search-cards-container"),l=document.querySelector(".js-fav-cards-container"),L="https://api.jikan.moe/v4/anime?q=",u="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let o=[],t=[];const v=JSON.parse(localStorage.getItem("favoriteList"));v!==null&&(t=v,d(t,l));function $(){const e=S.value;fetch(L+e).then(a=>a.json()).then(a=>{o=a.data,g(o,m)})}function I(e){const a=o.find(s=>parseInt(e.currentTarget.id)===s.mal_id);t.push(a),localStorage.setItem("favoriteList",JSON.stringify(t)),d(t,l)}function d(e,a){let s="";for(const i of e){const r=i.title,f=i.images.jpg.image_url,n=i.mal_id;i.images.jpg.image_url===null?s+=`
                <div class="series-fav-card js-series js-series-fav" id="${n}" collapsed>
                    <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                    <img class="fav-img" src="${u}" alt="${r}">
                    <h3 class="fav-card-title">${r}</h3>
                </div>
                `:s.includes(n)||(s+=`
                <div class="series-fav-card js-series js-series-fav" id="${n}collapsed">
                    <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                    <img class="fav-img" src="${f}" alt="${r}">
                    <h3 class="fav-card-title">${r}</h3>
                </div>
                `)}a.innerHTML=s;const c=document.querySelectorAll(".js-remove-fav-btn");for(const i of c)i.addEventListener("click",b)}function g(e,a){let s="";for(const i of e){const r=i.title,f=i.images.jpg.image_url,n=i.mal_id;i.images.jpg.image_url==="htpps://cdn.myanimelist.net/img/sp/icon/apple-touch-/icon-256.png"?s+=`
                <div class="series-card js-series" id="${n}">
                    <img class="searched-img" src="${u}" alt="${r}">
                    <h3 class="card-title">${r}</h3>
                </div>
                `:s+=`
            <div class="series-card js-series" id="${n}">
                <img class="searched-img" src="${f}" alt="${r}">
                <h3 class="card-title">${r}</h3>
            </div>
            `}a.innerHTML=s;const c=document.querySelectorAll(".js-series");for(const i of c)i.addEventListener("click",I)}function F(e){e.preventDefault(),$()}h.addEventListener("click",F);function y(e){e.preventDefault(),o=[],g(o,m),t=[],localStorage.removeItem("favoriteList"),d(t,l)}p.addEventListener("click",y);function q(){t=[],localStorage.removeItem("favoriteList"),d(t,l)}j.addEventListener("click",q);function b(e){e.preventDefault(),t=JSON.parse(localStorage.getItem("favoriteList"));const s=t.findIndex(c=>c.mal_id===parseInt(e.currentTarget.parentElement.id));console.log("indexFavSeriesSelected",s),s!==-1&&t.splice(s,1),localStorage.setItem("favoriteList",JSON.stringify(t)),d(t,l)}
//# sourceMappingURL=main.js.map
