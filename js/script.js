// Targeting Search Input field
const input = document.getElementById("search-input");

// Search-Button interaction
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    fetchMealsData();
});

// A function to fetch Meals Data from API
function fetchMealsData() {
    console.log(input.value);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
        .then(res => res.json())
        .then(data => showMealsData(data.meals));
};

// A function to show Meals Data from API
const showMealsData = meals => {
    // for getting each meal item, iterating through the meals
    meals.forEach(mealItem => {
        const mealContainer = document.getElementById('meal-container');
        const mealInfoDiv = document.createElement('div');
        mealInfoDiv.className = 'meal-info';
        const mealInfo = `
            <img src= ${mealItem.strMealThumb} />
            <h1>${mealItem.strMeal}</h1>
        `;
        mealInfoDiv.innerHTML = mealInfo;
        mealContainer.appendChild(mealInfoDiv);
        // call the fetchData function to get the ingredients of selected meal 
        mealInfoDiv.onclick = () => {
            fetchIngredientsData(mealItem.strMeal);
        };
    })
}

// A function to fetch Meals' Ingredients Data from API
const fetchIngredientsData = particularMeal => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${particularMeal}`)
        .then(res => res.json())
        .then(data => showIngredientsData(data.meals[0]));
}

// A function to show Meals' Ingredients Data from API
const showIngredientsData = mealInfo => {
    const ingredientsDiv = document.getElementById('ingredient-container');
    const ingredientsInfo = `
    <div class="ingredients ingredients-top">
        <img id="ingredient-img" src= ${mealInfo.strMealThumb} alt="" />
    </div>
    <div class="ingredients ingredients-bottom">
        <h1 class="heading h1">${mealInfo.strMeal}</h1>
        <h3 class="heading h2">Ingredients</h3>
        <ul id="ingredients-list">
            <li class="list-item"><i class="fas fa-check-square"></i> ${mealInfo.strIngredient1}</li>
            <li class="list-item"><i class="fas fa-check-square"></i> ${mealInfo.strIngredient2}</li>
            <li class="list-item"><i class="fas fa-check-square"></i> ${mealInfo.strIngredient3}</li>
            <li class="list-item"><i class="fas fa-check-square"></i> ${mealInfo.strIngredient4}</li>
            <li class="list-item"><i class="fas fa-check-square"></i> ${mealInfo.strIngredient5}</li>
            <li class="list-item"><i class="fas fa-check-square"></i> ${mealInfo.strIngredient6}</li>
            <li class="list-item"><i class="fas fa-check-square"></i> ${mealInfo.strIngredient7}</li>
        </ul>            
    </div>`;
    const ingredientsInfoDiv = document.createElement('div');
    ingredientsInfoDiv.innerHTML = ingredientsInfo;
    ingredientsDiv.appendChild(ingredientsInfoDiv);
}