
const resetFavListButton = document.querySelector('.js-reset-fav-list-btn'); 


//Reset favorite list 
function handleClickResetFavList () {
        favList = []; 
        favHTML = ''; 
        localStorage.removeItem('favList'); 
        printFavSeries(favList, favSeriesContainer); 
}

resetFavListButton.addEventListener('click', handleClickResetFavList);

