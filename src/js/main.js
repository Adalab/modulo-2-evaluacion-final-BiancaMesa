'use strict';

//Variables globales
const inputSearch = document.querySelector('.js-input-search');
const searchButton = document.querySelector('.js-search-btn');
const seriesCard = document.querySelector('.js-search-list'); 
const url = 'https://api.jikan.moe/v4/anime?q='; 
let APIUrlSeries = ''; 
let seriesList = [];


//Function find a series
function findSeries () {
    const inputSearchValue = inputSearch.value; 
    //const url = 'https://api.jikan.moe/v4/anime?q=' + inputSearchValue; 

    //API request 
    fetch(url + inputSearchValue)
    .then (response => response.json())
    .then (data => {
        seriesList = data;
        // seriesList = data.data[2].title;
        console.log(seriesList); 
    })
}

//Print TV shows 
function printSeries(data) {
    const seriesTitle = data.title; 
    const imageUrl = data.images.jpg.image_url; 

    //Create the card with image and title of the series in HTML
    seriesCard.innerHTML = `
        <div>
            <h2>${title}</h2>
            <img src="${imageUrl}" alt="${title}">
        </div>
        `;

}


//Filter TV shows
function handleSearchClick (event) {
    event.preventDefault(); 
    findSeries(); 
    printSeries(); 
    console.log('1'); 
    // const inputSearchValue = inputSearch.value; 
    //console.log(inputSearchValue); 

    //array con las series filtradas
    const filteredSeries = seriesList.filter(function (series) {
        console.log('2'); 
        return seriesListAPIUrlSeries = URL + '&search' + inputSearchValue; 
        // return series.titles.toLowerCase().includes(inputSearchValue.toLowerCase()); 
    }); 
    
    // printSeries (filteredSeries); 

}

searchButton.addEventListener('click', handleSearchClick);