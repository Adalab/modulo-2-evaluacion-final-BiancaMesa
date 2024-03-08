'use strict';

//Global variables 
const inputSearch = document.querySelector('.js-input-search');
const searchButton = document.querySelector('.js-search-btn');
const resetButton = document.querySelector('.js-reset-btn');
//const removeFavButton = document.querySelectorAll('.js-remove-fav-btn'); 
const searchedSeriesContainer = document.querySelector('.js-search-cards-container'); 
const favSeriesContainer = document.querySelector('.js-fav-cards-container'); 
const url = 'https://api.jikan.moe/v4/anime?q='; 
const defaultImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"; 
let searchResult = []; //array with found series --> seriesList
let seriesFound = ''; // NEW --> cambiado de [] a '' porque no es un array
let favHTML = ''; //NEW --> es igual que seriesFound pero para series favoritas
let favList = []; //array with fav series --> favList


//Find series
function findSeries () {
    const inputSearchValue = inputSearch.value; 
    
    //API request: la propia API va a devolver los resultados de la búsqueda
    fetch(url + inputSearchValue)
    .then (response => response.json())
    .then (data => {
        searchResult = data.data;
        printSeries(searchResult, searchedSeriesContainer);
    })
}

//Add favorite series to favList
function handleAddFavorites(event) {

    //variable que obtiene los últimos elementos de la lista de favoritos de LS
    const favFavorites = localStorage.getItem('favList'); 

    //si LS está lleno, muéstrame lo último que tengo en LS
    if (favFavorites !== null ) {
        favList = JSON.parse(favFavorites); 
    }

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
 } 
//else {
//     printFavSeries(favList, favSeriesContainer); 
// }


//Print favList  
function printFavSeries(favList, favSeriesContainer) {
    //seriesFound = ''; //OLD
    //favHTML = ''; //NEW - no poner para que al refrescar la página no se quiten todas las series que hay ya guardadas 
    favHTML = '';
   
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

        //removeFavButton.addEventListener('click', handleRemoveFav); 
    }

    //Print favSeries in html
    favSeriesContainer.innerHTML = favHTML; 

    //REMOVE FROM FAV LIST 
    const removeFavButtons = document.querySelectorAll('.js-remove-fav-btn');

    // We add a click event in each remove button
    removeFavButtons.forEach((removeButton) => {
        removeButton.addEventListener('click', handleRemoveFav);
    });
}



//Print searched series
function printSeries(searchResult, searchedSeriesContainer) {
    seriesFound = ''; 

    for (const series of searchResult) {
        const seriesTitle = series.title; 
        const seriesImage = series.images.jpg.image_url; 
        const seriesId = series.mal_id; 

        if (series.images.jpg.image_url === "htpps://cdn.myanimelist.net/img/sp/icon/apple-touch-/icon-256.png") {
            seriesFound += `
                <div class="series-card js-series" id="${seriesId}">
                    <img class="searched-img" src="${defaultImage}" alt="${seriesTitle}">
                    <h3 class="card-title">${seriesTitle}</h3>
                </div>
                `
        } else {
            seriesFound += `
            <div class="series-card js-series" id="${seriesId}">
                <img class="searched-img" src="${seriesImage}" alt="${seriesTitle}">
                <h3 class="card-title">${seriesTitle}</h3>
            </div>
            `
        }
    }

    //Print found series in html
    searchedSeriesContainer.innerHTML = seriesFound; 

    //Node array with all the found series 
    const allSeriesFound = document.querySelectorAll('.js-series'); 

    //We add a click event in each series we found
    for (const seriesCard of allSeriesFound) {
        seriesCard.addEventListener('click', handleAddFavorites); 
    }

}


//Handler function to Search series 
function handleSearchClick(event) {
    event.preventDefault(); 
    findSeries(seriesFound);
}

searchButton.addEventListener('click', handleSearchClick);



//Reset whole page
function handleReset(event) {
    event.preventDefault(); 

    //empty found series list
    searchResult = []; 
    printSeries(searchResult, searchedSeriesContainer)

    //empty favorite list
    favList = []; 
    favHTML = ''; //NEW ***
    
    //empty favList from LS 
    localStorage.removeItem('favList');

    //repaint - as we have deleted favList, when we repaint favList, everything will come out empty
    printFavSeries(favList, favSeriesContainer); 
}

//Reset button 
resetButton.addEventListener('click', handleReset); 




//Handler function to remove favorite series 
function handleRemoveFav(event) {
    event.preventDefault(); 

    let deleteFavorites = JSON.parse(localStorage.getItem('favList'));
   

    const indexFavSeriesSelected = deleteFavorites.findIndex((favItem) => {
        return favItem.mal_id === parseInt(event.currentTarget.parentElement.id); //parentElement obtiene el elemento padre del elemento en el que se ha hecho click 
    })

    console.log('indexFavSeriesSelected', indexFavSeriesSelected); 

    if (indexFavSeriesSelected !== -1) {
        deleteFavorites.splice(indexFavSeriesSelected, 1);
    }

    //Detelete favList from LS 
    //localStorage.removeItem('favList');
    
    //Update local storage 
    localStorage.setItem('favList', JSON.stringify(deleteFavorites));

    //Print updated favList  
    printFavSeries(deleteFavorites, favSeriesContainer);


}






    // __________________________ OLD ____________________________

    // const idToRemove = parseInt(event.currentTarget.id); 
    
    // if (favSeriesLocalStorage !== null) {

    //     const indexFavSeriesSelected = searchResult.findIndex((favItem) => {
    //         return favItem.mal_id === idToRemove;
    //     })

    //     if (indexFavSeriesSelected !== -1) {
    //         favSeriesLocalStorage.splice(indexFavSeriesSelected, 1);

    //         //Print updated favList  
    //         printFavSeries(favSeriesLocalStorage, favSeriesContainer);

    //         //Update local storage 
    //         localStorage.setItem('favList', JSON.stringify(favSeriesLocalStorage));
    //     }


    // } else {

    //     const indexFavSeriesSelected = searchResult.findIndex((favItem) => {
    //         return favItem.mal_id === idToRemove;
    //     })

    //     if (indexFavSeriesSelected !== -1) {
    //         favList.splice(indexFavSeriesSelected, 1);

    //         //Print updated favList  
    //         printFavSeries(favList, favSeriesContainer);

    //         //Update local storage 
    //         localStorage.setItem('favList', JSON.stringify(favList));
    //     }
        
    // } 