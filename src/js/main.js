'use strict';

//Global variables 
const inputSearch = document.querySelector('.js-input-search');
const searchButton = document.querySelector('.js-search-btn');
const resetButton = document.querySelector('.js-reset-btn');
const removeFavButton = document.querySelectorAll('.js-remove-fav-btn'); 
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

    //LOCAL STORAGE I (inside a function)
    //We storage favList in LocalStorage, we usually do this inside a function
    //The first element represents what we want to storage, we give a name to what we are going to storage, and the second one, what we are going to storage for real
    //We need to turn our favList into a string because in LocalStorage we can only store strings, not arrays or any other type of data
    localStorage.setItem('favList', JSON.stringify(favList));


    //Print favList in html for the first time 
    printSeries(favList, favSeriesContainer); 

}

    //LOCAL STORAGE II (outside a function, in global, so we have access to it since the website is refreshed). Once we have included the data we wanted in local storage, we want to be able to access it from the moment the website refreshes and from global
    //We use as the first parameter, the same one we used before. We are telling localStorage to go and find that element.
    //We turn the string we take from localStorage into an array 
    const favSeriesLocalStorage = JSON.parse(localStorage.getItem('favList')); 

    //If localStorage has already the favList in it, we print that list that is storaged
    if (favSeriesLocalStorage !== null) {
        console.log(favList); 
        console.log('Está cogiendo la lista de LS'); 
        printFavSeries(favSeriesLocalStorage, favSeriesContainer);
    } else {
        console.log('NO está cogiendo la lista de LS, la está pintando por primera vez'); 
        printFavSeries(favList, favSeriesContainer); 
    }

function printFavSeries(favList, favSeriesContainer) {
    seriesFound = ''; 

    for (const series of favList) {
        const seriesTitle = series.title; 
        const seriesImage = series.images.jpg.image_url; 
        const seriesId = series.mal_id; 

        if (series.images.jpg.image_url === null) {
            seriesFound += `
                <div class="series-fav-card js-series js-series-fav" id="${seriesId}"><<i class="remove-fav js-remove-fav-btn fa-regular fa-circle-xmark"></i>
                    <h3 class="fav-card-title">${seriesTitle}</h3>
                    <img src="${defaultImage}" alt="${seriesTitle}">
                </div>
                `
        } else if (!seriesFound.includes(seriesId)) {
            seriesFound += `
            <div class="series-fav-card js-series js-series-fav" id="${seriesId}"><i class="remove-fav js-remove-fav-btn fa-regular fa-circle-xmark"></i>
                <h3 class="fav-card-title">${seriesTitle}</h3>
                <img src="${seriesImage}" alt="${seriesTitle}">
            </div>
            `
        }
    }

    //Print found series in html
    favSeriesContainer.innerHTML = seriesFound; 

    //QUITAR PARA QUE FUNCIONE BIEN DE NUEVO ******
    //Add click events to removeFavButtons
    // //array with all the cross icons to remove that series from favList
    // const removeFavButtons = document.querySelectorAll('.js-remove-fav-btn'); 

    // //We add a click event in each series we found
    // for (const removeFavButton of removeFavButtons) {
    //     removeFavButton.addEventListener('click', handleRemoveFav); 
    // }   

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
                    <h3 class="card-title">${seriesTitle}</h3>
                    <img src="${defaultImage}" alt="${seriesTitle}">
                </div>
                `
        } else {
            seriesFound += `
            <div class="series-card js-series" id="${seriesId}">
                <h3 class="card-title">${seriesTitle}</h3>
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



//Search series 
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


// removeFromFavList (); 


// //Remove favorite series 
// function removeFromFavList () {
//     console.log('0'); 
    // //array with all the cross icons to remove that series from favList
    // const removeFav = document.querySelectorAll('.js-remove-fav'); 

    // //We add a click event in each cross we click
    // for (const item of removeFav) {
    //     console.log('1'); 
    //     item.addEventListener('click', handleRemoveFav); 
    //     console.log('2'); 
    // }

//     const allCrosses = document.querySelectorAll('.js-remove-fav-btn'); 

//     //We add a click event in each series we found
//     for (const cross of allCrosses) {
//         cross.addEventListener('click', handleRemoveFav); 
//     }   
// }


//Handler function to remove favorite series 
function handleRemoveFav(event) {
    favList = ''; 
    //favSeriesContainer = ''; 
    console.log('entra en remove fav'); 
    // const favSeriesSelected = searchResult.find((series) => {
    //     return Number(event.currentTarget.id) === series.mal_id; 
    // });

    //Find the index of the cross selected
    const indexFavSeriesToRemove = searchResult.findIndex((favItem) => {
        console.log('9'); 
        return favItem.mal_id === Number(event.currentTarget.id);
    })
  
    //We remove this element from favList 
    if (indexFavSeriesToRemove !== -1) {
        console.log('10'); 
        favList.splice(indexFavSeriesToRemove, 1);
    }


    //Print updated favList 
    printFavSeries(favList, favSeriesContainer); 
    console.log(printFavSeries); 

    //Update local storage
    localStorage.setItem('favList', JSON.stringify(favList));

}



//Remove favorite series one by one
// function removeFavFromList(event) {
//     console.log('1'); 
//     const IndexFavSeriesSelected = searchResult.findIndex((favItem) => {
//         return favItem.mal_id === Number(event.currentTarget.id);
//     })
          
//     //We remove the new element from favList 
//     favList.splice(IndexFavSeriesSelected, 1);
        
//     //print updated fav list 
//     printFavSeries(favList, favSeriesContainer); 
        
//     //update local storage
//     localStorage.setItem('favList', JSON.stringify(favList));
// }



