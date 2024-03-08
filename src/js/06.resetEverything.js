
const resetButton = document.querySelector('.js-reset-btn');


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
