const f=document.querySelector(".js-input-search"),h=document.querySelector(".js-search-btn"),m=document.querySelector(".js-search-container"),d=document.querySelector(".js-fav-container"),S="https://api.jikan.moe/v4/anime?q=",g="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let o=[],r=[],a=[];function v(){const s=f.value;fetch(S+s).then(t=>t.json()).then(t=>{o=t.data,c(o,m)})}function p(s){const t=o.find(e=>Number(s.currentTarget.id)===e.mal_id);a.push(t),localStorage.setItem("favList",JSON.stringify(a));const i=JSON.parse(localStorage.getItem("favList"));i!==null?(console.log(a),console.log("Está cogiendo la lista de LS"),c(i,d)):(console.log("NO está cogiendo la lista de LS, la está pintando por primera vez"),c(a,d))}function c(s,t){r="";for(const e of s){const n=e.title,u=e.images.jpg.image_url,l=e.mal_id;e.images.jpg.image_url===null?r+=`
                <div class="series-card js-series" id="${l}">
                    <h3>${n}</h3>
                    <img src="${g}" alt="${n}">
                </div>
                `:r+=`
            <div class="series-card js-series" id="${l}">
                <h3>${n}</h3>
                <img src="${u}" alt="${n}">
            </div>
            `}t.innerHTML=r;const i=document.querySelectorAll(".js-series");for(const e of i)e.addEventListener("click",p)}function j(s){s.preventDefault(),v()}h.addEventListener("click",j);
//# sourceMappingURL=main.js.map
