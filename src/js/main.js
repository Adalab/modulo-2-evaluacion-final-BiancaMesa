'use strict';

//Global variables 
const inputSearch = document.querySelector('.js-input-search');
const searchButton = document.querySelector('.js-search-btn');
const resetButton = document.querySelector('.js-reset-btn');
const resetFavListButton = document.querySelector('.js-reset-fav-list-btn'); 
const searchedSeriesContainer = document.querySelector('.js-search-cards-container'); 
const favSeriesContainer = document.querySelector('.js-fav-cards-container'); 
const url = 'https://api.jikan.moe/v4/anime?q='; 
const defaultImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"; 
let seriesList = []; //array with found series --> seriesList
let favList = []; //array with fav series --> favList

//LocalStorage: we get the favList from LS and save it in a variable 
const favSeriesLocalStorage = JSON.parse(localStorage.getItem('favoriteList')); 

//If localStorage has already the favList in it
if (favSeriesLocalStorage !== null) {
    favList = favSeriesLocalStorage; //we update favList with the content of local storage
    printFavSeries(favList, favSeriesContainer); //we print favList 
 } 


//Find series
function findSeries () {
    const inputSearchValue = inputSearch.value; 
    
    //API request: la propia API va a devolver los resultados de la búsqueda
    fetch(url + inputSearchValue)
    .then (response => response.json())
    .then (data => {
        seriesList = data.data;
        printSeries(seriesList, searchedSeriesContainer);
    })
}

//Add favorite series to favList
function handleAddFavorites(event) {

    const seriesSelected = seriesList.find((series) => {
        return parseInt(event.currentTarget.id) === series.mal_id; 
    });
  
    //We add the new element to favList 
    favList.push(seriesSelected);
    
    //We storage favList in LocalStorage
    localStorage.setItem('favoriteList', JSON.stringify(favList));

    //Print favList in html for the first time 
    printFavSeries(favList, favSeriesContainer); 
}

//Print favList  
function printFavSeries(favList, favSeriesContainer) {
    let favHTML = ''; 
   
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
    const removeFavButtons = document.querySelectorAll('.js-remove-fav-btn');

    // We add a click event in each remove button
    for (const removeFavButton of removeFavButtons) {
        removeFavButton.addEventListener('click', handleRemoveFav);
    };
}

//Print searched series
function printSeries(seriesList, searchedSeriesContainer) {
    let seriesFound = ''; 

    for (const series of seriesList) {
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
    findSeries();
}

searchButton.addEventListener('click', handleSearchClick);

//Reset whole page
function handleReset(event) {
    event.preventDefault(); 

    //empty input search value
    inputSearch.value = ""; 

    //empty found series list
    seriesList = []; 
    printSeries(seriesList, searchedSeriesContainer)

    //empty favorite list
    favList = []; 
    
    //empty favList from LS 
    localStorage.removeItem('favoriteList');

    //repaint - as we have deleted favList, when we repaint favList, everything will come out empty
    printFavSeries(favList, favSeriesContainer); 
}

//Reset button 
resetButton.addEventListener('click', handleReset); 

//Reset favorite list 
function handleClickResetFavList () {
        favList = [];  
        localStorage.removeItem('favoriteList'); 
        printFavSeries(favList, favSeriesContainer); 
}

resetFavListButton.addEventListener('click', handleClickResetFavList);

//Handler function to remove favorite series 
function handleRemoveFav(event) {
    event.preventDefault(); 

    //we get what we have in local storage (the list of favourite series)
    let deleteFavorites = JSON.parse(localStorage.getItem('favoriteList'));

    //we update favList to what we had in LS
    favList = deleteFavorites;

    const indexFavSeriesSelected = favList.findIndex((favItem) => {
        return favItem.mal_id === parseInt(event.currentTarget.parentElement.id); //parentElement obtiene el elemento padre del elemento en el que se ha hecho click 
    })

    if (indexFavSeriesSelected !== -1) {
        favList.splice(indexFavSeriesSelected, 1);
    }
    
    //Update local storage 
    localStorage.setItem('favoriteList', JSON.stringify(favList));

    //Print updated favList  
    printFavSeries(favList, favSeriesContainer);
}
