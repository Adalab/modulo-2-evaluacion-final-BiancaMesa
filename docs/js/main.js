const m=document.querySelector(".js-input-search"),g=document.querySelector(".js-search-btn"),v=document.querySelector(".js-search-container"),d=document.querySelector(".js-fav-container"),h="https://api.jikan.moe/v4/anime?q=",u="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let n=[],r=[],l=[];function S(){const s=m.value;fetch(h+s).then(i=>i.json()).then(i=>{n=i.data,$(n,v)})}function p(s){const i=n.find(e=>Number(s.currentTarget.id)===e.mal_id);l.push(i),localStorage.setItem("favList",JSON.stringify(l));const t=JSON.parse(localStorage.getItem("favList"));t!==null?(console.log(l),console.log("Está cogiendo la lista de LS"),f(t,d)):(console.log("NO está cogiendo la lista de LS, la está pintando por primera vez"),f(l,d))}function f(s,i){r="";for(const t of s){const e=t.title,a=t.images.jpg.image_url,c=t.mal_id;t.images.jpg.image_url===null?r+=`
                <div class="series-fav-card js-series" id="${c}"><<i class="remove-fav fa-regular fa-circle-xmark"></i>
                    <h3 class="fav-card-title">${e}</h3>
                    <img src="${u}" alt="${e}">
                </div>
                `:r+=`
            <div class="series-fav-card js-series" id="${c}"><i class="remove-fav fa-regular fa-circle-xmark"></i>
                <h3 class="fav-card-title">${e}</h3>
                <img src="${a}" alt="${e}">
            </div>
            `}i.innerHTML=r}function $(s,i){r="";for(const e of s){const a=e.title,c=e.images.jpg.image_url,o=e.mal_id;e.images.jpg.image_url===null?r+=`
                <div class="series-card js-series" id="${o}">
                    <h3 class="card-title">${a}</h3>
                    <img src="${u}" alt="${a}">
                </div>
                `:r+=`
            <div class="series-card js-series" id="${o}">
                <h3 class="card-title">${a}</h3>
                <img src="${c}" alt="${a}">
            </div>
            `}i.innerHTML=r;const t=document.querySelectorAll(".js-series");for(const e of t)e.addEventListener("click",p)}function j(s){s.preventDefault(),S()}g.addEventListener("click",j);
//# sourceMappingURL=main.js.map
