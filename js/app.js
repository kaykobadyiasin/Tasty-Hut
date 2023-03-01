// search area 
const searchFoodBtn = () => {
    displayLoader(true)
    // load start
    const searchFieldValue = document.getElementById('search-Field').value;
    loadData(searchFieldValue);
}

// search with enter key 
document.getElementById('search-Field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchFoodBtn();
    }
});

// loader 
const displayLoader = (isLoad) =>{
    const searchLoader = document.getElementById('searchLoader');
    if(isLoad){
        searchLoader.classList.remove('d-none')
    }
    else{
        searchLoader.classList.add('d-none')
    }
}

const loadData = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.meals));
}

const displayData = (meals) => {
    // step 1
    const foodCardContainer = document.getElementById('food-CardContainer');
    foodCardContainer.innerHTML = '';

    // search result 10 item 
    const showAllBtn = document.getElementById('show-AllBtn');
    if(meals.length > 10){
        meals = meals.slice(0, 10);
        showAllBtn.classList.remove('d-none')
    }
    else{
        showAllBtn.classList.add('d-none')
    }
    

    // console.log(meals);
    meals.forEach(meal => {
    // step 2
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('col-lg-6');
    mealDiv.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 id="food-card-title" class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.</p>

                            <button onclick="detailsModal('${meal.idMeal}')" class="text-warning bg-transparent border-0" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button">View Details</button>

                        </div>
                    </div>
                </div>
            </div>
        `;
        foodCardContainer.appendChild(mealDiv);
        
    })
    // load stop
    displayLoader(false) 
}


const detailsModal = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res => res.json())
    .then(foodData => mealsDetails(foodData.meals))
}

const mealsDetails = (foods) => {
    foods.forEach(food =>{
        document.getElementById('mealTitle').innerText = food.strMeal;
        const mealModalBody = document.getElementById('mealModalBody');
        mealModalBody.innerHTML = `
        <img class="img-fluid mb-3" src="${food.strMealThumb}">
        <p><strong>Category: </strong>${food.strCategory}</p>
        <p><strong>Area: </strong>${food.strArea}</p>
        <p><strong>Instructions: </strong>${food.strInstructions}</p>
        <p class="d-flex align-items-center"><strong>Youtube: </strong><a href="${food.strYoutube}"><i class="ms-2 fs-1 fa-brands fa-youtube"></i></a></p>


        `
    })
}





loadData('fish');