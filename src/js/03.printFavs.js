
const favSeriesContainer = document.querySelector('.js-fav-cards-container'); 

let favList = []; 
let favHTML = ''; 


//Add favorite series to favList
function handleAddFavorites(event) {

    const seriesSelected = searchResult.find((series) => {
        return parseInt(event.currentTarget.id) === series.mal_id; 
    });
  
    //We add the new element to favList 
    favList.push(seriesSelected);
    
    //We storage favList in LocalStorage
    localStorage.setItem('favList', JSON.stringify(favList));

    //Print favList in html for the first time 
    printFavSeries(favList, favSeriesContainer); 
}


//LocalStorage: we get the favList from LS and save it in another variable 
let favSeriesLocalStorage = JSON.parse(localStorage.getItem('favList')); 

//If localStorage has already the favList in it, we print that list that is storaged
if (favSeriesLocalStorage !== null) {
    printFavSeries(favSeriesLocalStorage, favSeriesContainer);
} else {
    printFavSeries(favList, favSeriesContainer); 
}


//Print favList  
function printFavSeries(favList, favSeriesContainer) {
    //seriesFound = ''; //OLD
    //favHTML = ''; //NEW - no poner para que al refrescar la página no se quiten todas las series que hay ya guardadas 
   
    for (const series of favList) {
        const seriesTitle = series.title; 
        const seriesImage = series.images.jpg.image_url; 
        const seriesId = series.mal_id; 

        if (series.images.jpg.image_url === null) {
            favHTML += `
                <div class="series-fav-card js-series js-series-fav" id="${seriesId}" collapsed>
                    <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                    <img class="fav-img" src="${defaultImage}" alt="${seriesTitle}">
                    <h3 class="fav-card-title">${seriesTitle}</h3>
                </div>
                `
        } else if (!favHTML.includes(seriesId)) {
            favHTML += `
            <div class="series-fav-card js-series js-series-fav" id="${seriesId}collapsed">
                <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                <img class="fav-img" src="${seriesImage}" alt="${seriesTitle}">
                <h3 class="fav-card-title">${seriesTitle}</h3>
            </div>
            `
        }
    }

    //Print favSeries in html
    favSeriesContainer.innerHTML = favHTML; 

    //REMOVE FROM FAV LIST 
    const removeFav = document.querySelectorAll('.js-remove-fav-btn'); 

    //We add a click event in each cross we click
    for (const item of removeFav) {
        item.addEventListener('click', handleRemoveFav); 
    }
}
