const S=document.querySelector(".js-input-search"),h=document.querySelector(".js-search-btn"),p=document.querySelector(".js-reset-btn");document.querySelectorAll(".js-remove-fav-btn");const u=document.querySelector(".js-search-cards-container"),o=document.querySelector(".js-fav-cards-container"),j="https://api.jikan.moe/v4/anime?q=",m="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let f=[],l=[],i=[];function L(){const t=S.value;fetch(j+t).then(e=>e.json()).then(e=>{f=e.data,g(f,u)})}function $(t){const e=f.find(r=>parseInt(t.currentTarget.id)===r.mal_id);i.push(e),localStorage.setItem("favList",JSON.stringify(i)),d(i,o)}let a=JSON.parse(localStorage.getItem("favList"));d(a!==null?a:i,o);function d(t,e){l="";for(const s of t){const c=s.title,v=s.images.jpg.image_url,n=s.mal_id;s.images.jpg.image_url===null?l+=`
                <div class="series-fav-card js-series js-series-fav" id="${n}">
                    <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                    <img class="fav-img" src="${m}" alt="${c}">
                    <h3 class="fav-card-title">${c}</h3>
                </div>
                `:l.includes(n)||(l+=`
            <div class="series-fav-card js-series js-series-fav" id="${n}">
                <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                <img class="fav-img" src="${v}" alt="${c}">
                <h3 class="fav-card-title">${c}</h3>
            </div>
            `)}e.innerHTML=l;const r=document.querySelectorAll(".js-remove-fav-btn");for(const s of r)s.addEventListener("click",F)}function g(t,e){l="";for(const s of t){const c=s.title,v=s.images.jpg.image_url,n=s.mal_id;s.images.jpg.image_url===null?l+=`
                <div class="series-card js-series" id="${n}">
                    <img class="searched-img" src="${m}" alt="${c}">
                    <h3 class="card-title">${c}</h3>
                </div>
                `:l+=`
            <div class="series-card js-series" id="${n}">
                <img class="searched-img" src="${v}" alt="${c}">
                <h3 class="card-title">${c}</h3>
            </div>
            `}e.innerHTML=l;const r=document.querySelectorAll(".js-series");for(const s of r)s.addEventListener("click",$)}function I(t){t.preventDefault(),L()}h.addEventListener("click",I);function x(){f=[],g(f,u),i=[],localStorage.removeItem("favList"),d(i,o)}p.addEventListener("click",x);function F(t){if(console.log("entra en remove fav"),a!==null){const e=a.findIndex(r=>r.mal_id===parseInt(t.currentTarget.id));console.log("indexFavSeriesSelected: ",e),console.log("favListLocalStorage before splice: ",a),e!==-1&&a.splice(e,1),console.log("favListLocalStorage after splice: ",a),console.log("indexFavSeriesSelected: ",e),d(a,o),localStorage.setItem("favList",JSON.stringify(a))}else{const e=i.findIndex(r=>r.mal_id===parseInt(t.currentTarget.id));console.log("indexFavSeriesSelected: ",e),console.log("favList after splice: ",i),e!==-1&&i.splice(e,1),console.log("favList after splice: ",i),console.log("indexFavSeriesSelected: ",e),d(a,o),localStorage.setItem("favList",JSON.stringify(i))}}
//# sourceMappingURL=main.js.map
