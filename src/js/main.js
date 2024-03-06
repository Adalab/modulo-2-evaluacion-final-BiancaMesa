'use strict';

//Global variables 
const inputSearch = document.querySelector('.js-input-search');
const searchButton = document.querySelector('.js-search-btn');
const resetButton = document.querySelector('.js-reset-btn');
const removeFavButton = document.querySelectorAll('.js-remove-fav-btn'); 
const searchedSeriesContainer = document.querySelector('.js-search-cards-container'); 
const favSeriesContainer = document.querySelector('.js-fav-cards-container'); 
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
    seriesFound = ''; 

    for (const series of favList) {
        const seriesTitle = series.title; 
        const seriesImage = series.images.jpg.image_url; 
        const seriesId = series.mal_id; 

        if (series.images.jpg.image_url === null) {
            seriesFound += `
                <div class="series-fav-card js-series js-series-fav" id="${seriesId}">
                    <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                    <img class="fav-img" src="${defaultImage}" alt="${seriesTitle}">
                    <h3 class="fav-card-title">${seriesTitle}</h3>
                </div>
                `
        } else if (!seriesFound.includes(seriesId)) {
            seriesFound += `
            <div class="series-fav-card js-series js-series-fav" id="${seriesId}">
                <i class="remove-fav-btn js-remove-fav-btn fa-solid fa-x"></i>
                <img class="fav-img" src="${seriesImage}" alt="${seriesTitle}">
                <h3 class="fav-card-title">${seriesTitle}</h3>
            </div>
            `
        }
    }

    //Print favSeries in html
    favSeriesContainer.innerHTML = seriesFound; 

    //REMOVE FROM FAV LIST 
    const removeFav = document.querySelectorAll('.js-remove-fav-btn'); 

    //We add a click event in each cross we click
    for (const item of removeFav) {
    item.addEventListener('click', handleRemoveFav); 
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
function handleReset() {
    //empty found series list
    searchResult = []; 
    printSeries(searchResult, searchedSeriesContainer)

    //empty favorite list
    favList = []; 
    localStorage.removeItem('favList');
    printFavSeries(favList, favSeriesContainer); 
}

//Reset button 
resetButton.addEventListener('click', handleReset); 




//Handler function to remove favorite series 
function handleRemoveFav(event) {
    console.log('entra en remove fav');

    //If localStorage has already the favList in it, we print that list that is storaged
    if (favSeriesLocalStorage !== null) {
       //favSeriesLocalStorage = JSON.parse(favSeriesLocalStorage);

       //Find the index of the cross selected
        const indexFavSeriesSelected = favSeriesLocalStorage.findIndex((favItem) => {
        return favItem.mal_id === parseInt(event.currentTarget.id);
        })

        console.log('indexFavSeriesSelected: ', indexFavSeriesSelected); 


        console.log('favListLocalStorage before splice: ', favSeriesLocalStorage); 
        //We remove this element from favList 
        if (indexFavSeriesSelected !== -1) {
            favSeriesLocalStorage.splice(indexFavSeriesSelected, 1);
        }

        console.log('favListLocalStorage after splice: ', favSeriesLocalStorage); 
        console.log('indexFavSeriesSelected: ', indexFavSeriesSelected); 
        //console.log('favSeriesContainer: ', favSeriesContainer); 

        //Print updated favList  
        printFavSeries(favSeriesLocalStorage, favSeriesContainer);

        //Update local storage 
        localStorage.setItem('favList', JSON.stringify(favSeriesLocalStorage));

    } else {

        //Find the index of the cross selected
        const indexFavSeriesSelected = favList.findIndex((favItem) => {
        return favItem.mal_id === parseInt(event.currentTarget.id);
        })

        console.log('indexFavSeriesSelected: ', indexFavSeriesSelected); 
        console.log('favList after splice: ', favList); 

        //We remove this element from favList 
        if (indexFavSeriesSelected !== -1) {
            favList.splice(indexFavSeriesSelected, 1);
        }

        console.log('favList after splice: ', favList); 
        console.log('indexFavSeriesSelected: ', indexFavSeriesSelected); 
        //console.log('favSeriesContainer: ', favSeriesContainer); 

        //Print updated favList  
        printFavSeries(favSeriesLocalStorage, favSeriesContainer);

        //Update local storage 
        localStorage.setItem('favList', JSON.stringify(favList));

    } 
}




