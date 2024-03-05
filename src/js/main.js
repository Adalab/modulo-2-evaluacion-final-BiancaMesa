'use strict';

//Variables globales
const inputSearch = document.querySelector('.js-input-search');
const searchButton = document.querySelector('.js-search-btn');
const searchedSeriesContainer = document.querySelector('.js-search-container'); 
const favSeriesContainer = document.querySelector('.js-fav-container'); 
const url = 'https://api.jikan.moe/v4/anime?q='; 
const defaultImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"; 
let searchResult = []; //array with found series
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


function handleAddFavorites(event) {

    const seriesSelected = searchResult.find((series) => {
        //condition why I want this item and not any other from the array
        //if there is an element in the array that has the same id as the one selected, this method is going to return that element 
        //devuelvenos del array de series buscadas, la serie cuyo id sea igual al id seleccionado 
        return Number(event.currentTarget.id) === series.mal_id; 
    });
  
    //We add the new element to favList 
    favList.push(seriesSelected);
    //console.log(favList);

    //We storage favList in LocalStorage 
    //The first element represents what we want to storage, we give a name to what we are going to storage, and the second one, what we are going to storage for real
    //We need to turn our favList into a string because in LocalStorage we can only store strings, not arrays or any other type of data
    localStorage.setItem('favList', JSON.stringify(favList));


    //Print favList in html 
    //printSeries(favList, favSeriesContainer); 

    //We use as the first parameter, the same one we used before. We are telling localStorage to go and find that element.
    //We turn the string we take from localStorage into an array 
    const favSeriesLocalStorage = JSON.parse(localStorage.getItem('favList')); 

    //If localStorage has already the favList in it, we print that list that is storaged
    if (favSeriesLocalStorage !== null) {
        console.log(favList); 
        console.log('Está cogiendo la lista de LS'); 
        printSeries(favSeriesLocalStorage, favSeriesContainer);
    } else {
        console.log('NO está cogiendo la lista de LS, la está pintando por primera vez'); 
        printSeries(favList, favSeriesContainer); 
    }

}

    



//Print searched series
function printSeries(searchResult, searchedSeriesContainer) {
    seriesFound = ''; 

    for (const series of searchResult) {
        const seriesTitle = series.title; 
        const seriesImage = series.images.jpg.image_url; 
        const seriesId = series.mal_id; 

        if (series.images.jpg.image_url === null) {
            seriesFound += `
                <div class="series-card js-series" id="${seriesId}">
                    <h3>${seriesTitle}</h3>
                    <img src="${defaultImage}" alt="${seriesTitle}">
                </div>
                `
        } else {
            seriesFound += `
            <div class="series-card js-series" id="${seriesId}">
                <h3>${seriesTitle}</h3>
                <img src="${seriesImage}" alt="${seriesTitle}">
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



//Search handle function 
function handleSearchClick(event) {
    event.preventDefault(); 
    findSeries(seriesFound);
}

searchButton.addEventListener('click', handleSearchClick);



