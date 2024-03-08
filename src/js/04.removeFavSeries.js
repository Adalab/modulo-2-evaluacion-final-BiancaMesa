
const removeFavButton = document.querySelectorAll('.js-remove-fav-btn'); 


//Handler function to remove favorite series 
function handleRemoveFav(event) {
    event.preventDefault();

    const favSeriesLocalStorage = JSON.parse(localStorage.getItem('favList'));

    const indexFavSeriesSelected = favSeriesLocalStorage.findIndex((favItem) => {
        return parseInt(event.currentTarget.id) === favItem.mal_id; //nos devuelve el index del elemento que encuentre cuyo mal_id se corresponda con el id del elemento seleccionado y si no se encuentran resultados, nos devuelve -1
    })

    console.log('index Fav Series Selected: ', indexFavSeriesSelected); 

    //si sí se han encontrado resultados, eliminamos ese elemento de la lista 
    if (indexFavSeriesSelected === -1) {
        favSeriesLocalStorage.splice(indexFavSeriesSelected, 1); 
        
        //Update local storage 
        localStorage.setItem('favList', JSON.stringify(favSeriesLocalStorage));

        //We empty the favSeriesContainer
        favSeriesContainer.innerHTML = ''; 

        //Print updated favList in favSeriesContainer 
        printFavSeries(favSeriesLocalStorage, favSeriesContainer);
    }

   
}
