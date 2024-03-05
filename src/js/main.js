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
    //event.preventDefault(); 

    const seriesSelected = searchResult.find((series) => {
        //condition why I want this item and not any other from the array
        //if there is an element in the array that has the same id as the one selected, this method is going to return that element 
        //devuelvenos del array de series buscadas, la serie cuyo id sea igual al id seleccionado 
        return Number(event.currentTarget.id) === series.mal_id; 
    });
  
    //we add the new element to fav list 
    favList.push(seriesSelected);
    console.log(favList);

    //print the fav list in html 
    printSeries(favList, favSeriesContainer); 


}

//Add to favorites handle function
// function handleAddFavorites (event) {
//     console.log(seriesFound); 
//     event.preventDefault(); 

//     //Find method. If the series selected by the user equals the mal_id of any of the series that are in the array of seriesFound, the function returns that series 
//     //The found element is saved in the variable seriesSelected
//     //The function to find the selected element is findSelectedSeries
//     const seriesSelected = seriesFound.find((series) => {
//         return event.currentTarget.id === series.mal_id; 
//     });

//     //Find if the selected elements already exists in favorites 
//     const indexFav = favList.findIndex((favoriteItem) => {
//         return favoriteItem.mal_id === event.currentTarget.id; 
//     });

//     //If it returns -1, it means there aren't any results and we proceed to add the series to the fav series array 
//     if (indexFav === -1) {
//         favList.push(seriesSelected); 
//     }

//     console.log("film array favoritas ", favList)

//     //Print Favorite Series
//     printSeries(favList, favSection); //create favsection

//     //Storage in local storage
//     localStorage.setItem('favSeries', JSON.stringify(favList)); 
// }

// //Almacenamos las series favoritas en local storage en una variable
// const favSeriesLocalStorage = JSON.parse(localStorage.getItem('favSeries')); 
// console.log('favSeriesLocalStorage', favSeriesLocalStorage); 

// //if local storage has already stored the fav list  
// if (favSeriesLocalStorage !== null) {
//     favList = favSeriesLocalStorage; 
//     printSeries(favSeriesLocalStorage, container);
// } else {
//    //código
// }


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

    searchedSeriesContainer.innerHTML = seriesFound; 

    //node array with all the found series 
    const allSeriesFound = document.querySelectorAll('.js-series'); 

    for (const seriesCard of allSeriesFound) {
        seriesCard.addEventListener('click', handleAddFavorites); 
    }

}

//Print favorite series 
// function printFavSeries(event) {

//     seriesFound = ''; 

//     for (const series of searchResult) {
//         const seriesTitle = series.title; 
//         const seriesImage = series.images.jpg.image_url; 
//         const seriesId = series.mal_id; 

//         if (series.images.jpg.image_url === null) {
//             seriesFound += `
//                 <div class="series-card js-series" id="${seriesId}">
//                     <h3>${seriesTitle}</h3>
//                     <img src="${defaultImage}" alt="${seriesTitle}">
//                 </div>
//                 `
//         } else {
//             seriesFound += `
//             <div class="series-card js-series" id="${seriesId}">
//                 <h3>${seriesTitle}</h3>
//                 <img src="${seriesImage}" alt="${seriesTitle}">
//             </div>
//             `
//         }
       
//     }

//     favSeriesContainer.innerHTML = seriesFound; 

//     //node array with all the found series 
//     const allSeriesFound = document.querySelectorAll('.js-series'); 

//     for (const seriesCard of allSeriesFound) {
//         seriesCard.addEventListener('click', handleAddFavorites); 
//     }
    
// }


//Search handle function 
function handleSearchClick(event) {
    event.preventDefault(); 
    findSeries(seriesFound);
}

searchButton.addEventListener('click', handleSearchClick);



