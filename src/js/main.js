'use strict';

//Variables globales
const inputSearch = document.querySelector('.js-input-search');
const searchButton = document.querySelector('.js-search-btn');
const searchedSeriesContainer = document.querySelector('.js-search-container'); 
const favSeriesContainer = document.querySelector('.js-fav-container'); 
const url = 'https://api.jikan.moe/v4/anime?q='; 
let searchResult = [];
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
        printSeries();
    })
}

//Print series
function printSeries() {
    let seriesFound = ''; 

    for (const series of searchResult) {
        const seriesTitle = series.title; 
        const seriesImage = series.images.jpg.image_url; 

        seriesFound += `
            <h3>${seriesTitle}</h3>
            <img src="${seriesImage}" alt="${seriesTitle}">
            `
    }

    searchedSeriesContainer.innerHTML = seriesFound; 
}


//Search handle function 
function handleSearchClick(event) {
    event.preventDefault(); 
    findSeries();
}

searchButton.addEventListener('click', handleSearchClick);


//PART 2 
//Add to favorites handle function
