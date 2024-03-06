const S=document.querySelector(".js-input-search"),h=document.querySelector(".js-search-btn"),j=document.querySelector(".js-reset-btn");document.querySelectorAll(".js-remove-fav-btn");const m=document.querySelector(".js-search-cards-container"),d=document.querySelector(".js-fav-cards-container"),p="https://api.jikan.moe/v4/anime?q=",u="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let c=[],a=[],n=[];function $(){const t=S.value;fetch(p+t).then(s=>s.json()).then(s=>{c=s.data,g(c,m)})}function I(t){const s=c.find(i=>parseInt(t.currentTarget.id)===i.mal_id);n.push(s),localStorage.setItem("favList",JSON.stringify(n)),f(n,d)}let o=JSON.parse(localStorage.getItem("favList"));f(o!==null?o:n,d);function f(t,s){a="";for(const e of t){const r=e.title,v=e.images.jpg.image_url,l=e.mal_id;e.images.jpg.image_url===null?a+=`
                <div class="series-fav-card js-series js-series-fav" id="${l}">
                    <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                    <img class="fav-img" src="${u}" alt="${r}">
                    <h3 class="fav-card-title">${r}</h3>
                </div>
                `:a.includes(l)||(a+=`
            <div class="series-fav-card js-series js-series-fav" id="${l}">
                <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                <img class="fav-img" src="${v}" alt="${r}">
                <h3 class="fav-card-title">${r}</h3>
            </div>
            `)}s.innerHTML=a;const i=document.querySelectorAll(".js-remove-fav-btn");for(const e of i)e.addEventListener("click",q)}function g(t,s){a="";for(const e of t){const r=e.title,v=e.images.jpg.image_url,l=e.mal_id;e.images.jpg.image_url===null?a+=`
                <div class="series-card js-series" id="${l}">
                    <img class="searched-img" src="${u}" alt="${r}">
                    <h3 class="card-title">${r}</h3>
                </div>
                `:a+=`
            <div class="series-card js-series" id="${l}">
                <img class="searched-img" src="${v}" alt="${r}">
                <h3 class="card-title">${r}</h3>
            </div>
            `}s.innerHTML=a;const i=document.querySelectorAll(".js-series");for(const e of i)e.addEventListener("click",I)}function L(t){t.preventDefault(),$()}h.addEventListener("click",L);function y(){c=[],g(c,m),n=[],localStorage.removeItem("favList"),f(n,d)}j.addEventListener("click",y);function q(t){const s=parseInt(t.currentTarget.id);if(o!==null){const i=c.findIndex(e=>e.mal_id===s);i!==-1&&(o.splice(i,1),f(o,d),localStorage.setItem("favList",JSON.stringify(o)))}else{const i=c.findIndex(e=>e.mal_id===s);i!==-1&&(n.splice(i,1),f(n,d),localStorage.setItem("favList",JSON.stringify(n)))}}
//# sourceMappingURL=main.js.map
