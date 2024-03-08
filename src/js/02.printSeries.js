
const searchedSeriesContainer = document.querySelector('.js-search-cards-container'); 
const defaultImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"; 

let seriesFound = '';

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

