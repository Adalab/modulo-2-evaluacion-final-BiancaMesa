'use strict';

//Variables globales
const inputSearch = document.querySelector('.js-input-search');
const searchButton = document.querySelector('.js-search-btn');
const searchedSeriesContainer = document.querySelector('.js-search-container'); 
const favSeriesContainer = document.querySelector('.js-fav-container'); 
const url = 'https://api.jikan.moe/v4/anime?q='; 
const defaultImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"; 
let searchResult = []; //delete ??
let seriesFound = [];
let favList = []; 


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


//Print searched series
function printSeries(searchResult, searchedSeriesContainer) {
    seriesFound = ''; 

    for (const series of searchResult) {
        const seriesTitle = series.title; 
        const seriesImage = series.images.jpg.image_url; 

        if (series.images.jpg.image_url === null) {
            seriesFound += `
                <div class="series-card js-series">
                    <h3>${seriesTitle}</h3>
                    <img src="${defaultImage}" alt="${seriesTitle}">
                </div>
                `
        } else {
            seriesFound += `
            <div class="series-card js-series">
                <h3>${seriesTitle}</h3>
                <img src="${seriesImage}" alt="${seriesTitle}">
            </div>
            `
        }
       
    }

    searchedSeriesContainer.innerHTML = seriesFound; 

    //node array with all the found series 
    const seriesContainer = document.querySelectorAll('.js-series'); 

    for (const seriesCard of seriesContainer) {
        seriesCard.addEventListener('click', handleAddFavorites); 
    }

}

//Print favorite series 
function printFavSeries(event) {
    event.preventDefault(); 
    
}


//Search handle function 
function handleSearchClick(event) {
    event.preventDefault(); 
    findSeries(seriesFound);
}

searchButton.addEventListener('click', handleSearchClick);



//Add to favorites handle function
function handleAddFavorites (event) {

    //Find method. If the series selected by the user equals the mal_id of any of the series that are in the array of seriesFound, the function returns that series 
    //The found element is saved in the variable seriesSelected
    //The function to find the selected element is findSelectedSeries
    const seriesSelected = seriesFound.find((series) => {
        return event.currentTarget.mal_id === series.mal_id; 
    })

    //Find if the selected elements already exists in favorites 
    const indexFav = favList.findIndex((favoriteItem) => {
        return favoriteItem.mal_id === event.currentTarget.mal_id; 
    })

    //If it returns -1, it means there aren't any results and we proceed to add the series to the fav series array 
    if (indexFav === -1) {
        favList.push(seriesSelected); 
    }

    //Print Favorite Series
    printFavSeries(favList); 

}

//Almacenamos las series favoritas en local storage en una variable
const favSeriesLocalStorage = JSON.parse(localStorage.getItem('favSeries')); 
console.log('favSeriesLocalStorage', favSeriesLocalStorage); 

//if local storage has stored the fav list 
if (favSeriesLocalStorage !== null) {
    favList = favSeriesLocalStorage; 
    printFavSeries(favSeriesLocalStorage, container);
} else {
   //código
}