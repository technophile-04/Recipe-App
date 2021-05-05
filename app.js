const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container  = document.querySelector('.container');
const notFoundDiv = document.getElementById('notFound');
let searchQuery = '';
const APP_ID = 'd2340635';
const APP_KEY = 'a2083b8735c5588f963f833f22983845';


searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log(e);
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=6&to=35`;
    const response = await fetch(baseURL);
    const data = await response.json();
    if(data.hits.length == 0){
        notFoundDiv.classList.remove('none');
        notFoundDiv.classList.add('active');
    }else{
        notFoundDiv.classList.add('none');
        generateHTML(data.hits);
        console.log(data);
    }
}

function generateHTML(results){
    container.classList.remove('intial');
    let genreatedHMTL = '';
    results.map(result=> {
        genreatedHMTL += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="" />
            <div class="flex-container">
              <h1 class="title">${result.recipe.label}</h1>
              <a class="view-button" href="${result.recipe.url}" target = "_blank">View Recipe</a>
            </div>
            <p class="item-data">Calories : ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Cuisine type : ${result.recipe.cuisineType === undefined ? 'Not Found' : result.recipe.cuisineType }</p>
            <p class="item-data">Dish Type : ${result.recipe.dishType === undefined ? 'Not Found' : result.recipe.dishType}</p>
            <p class="item-data">Health label : ${result.recipe.healthLabels[0]} ${result.recipe.healthLabels[1]} ${result.recipe.healthLabels[2]} </p>
          </div>
        `
    })

    searchResultDiv.innerHTML = genreatedHMTL;
}
