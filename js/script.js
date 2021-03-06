// Targeting Search Input field
const input = document.getElementById("search-input");

// Search-Button interaction
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    // Calling the fetchMealsData function
    fetchMealsData();
    // Clear the previous Meals Info
    document.getElementById('meal-container').innerHTML = '';
    // Clear the previous Ingredients Info
    document.getElementById('ingredient-container').innerHTML = '';
    // Clear the previous Alert Info
    document.getElementById('alert-section').innerHTML = '';
});

// A function to fetch Meals Data from API
function fetchMealsData() {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
        .then(res => res.json()).
        // Calling the showMealsData function
        then(data => showMealsData(data.meals))
};

// A function to show Meals Data from API
const showMealsData = meals => {
    if (meals == null) {
        // Alert Section Dynamic Div
        const alertDiv = document.getElementById('alert-section');
        const alertTextDiv = document.createElement('div');
        alertTextDiv.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <p><strong>Sorry!!</strong></p>
        <p>You Searched For <span id="input-span"> ${input.value} </span></p>
        <p>No Meal Found in This Name </p>
        <p>Please Try Again With Another Valid Meal Name.</p>
        <p>Thank You</p>
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `;
        alertDiv.appendChild(alertTextDiv);        
    } else {
        // for getting each meal item, iterating through the meals
        meals.forEach(mealItem => {
            const mealContainer = document.getElementById('meal-container');
            const mealInfoDiv = document.createElement('div');
            mealInfoDiv.className = 'meal-info';
            const mealInfo = `
                <div>
                    <img src= ${mealItem.strMealThumb} />
                </div>
                <div>
                    <h4 id="meal-name" >${mealItem.strMeal}</h4>
                </div>
            `;
            mealInfoDiv.innerHTML = mealInfo;
            mealContainer.appendChild(mealInfoDiv);
            // Calling the fetchData function to get the selected Meal Ingredients 
            mealInfoDiv.onclick = () => {
                fetchIngredientsData(mealItem.strMeal);
                // Clear the previous Meals' Ingredients Info 
                document.getElementById('ingredient-container').innerHTML = '';
            };
        })
    }
    // Clear the previous searched text
    input.value = '';
}

// A function to fetch Meals' Ingredients Data from API
const fetchIngredientsData = particularMeal => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${particularMeal}`)
        .then(res => res.json())
        // Calling the showData function to show Ingredients Info
        .then(data => showIngredientsData(data.meals[0]));
}

// A function to show Meals' Ingredients Data from API
const showIngredientsData = mealInfo => {
    // targeting static div
    const ingredientsDiv = document.getElementById('ingredient-container');
    // dynamic html
    const ingredientsInfo = `
    <div class="d-flex align-items-center justify-content-evenly">
    <div class="ingredients-left">
        <img id="ingredient-img" src= ${mealInfo.strMealThumb} alt="" />
    </div>
    <div class="ingredients-right">
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
    </div>
    </div>`;
    // creating dynamic div
    const ingredientsInfoDiv = document.createElement('div');
    // assigning html to div
    ingredientsInfoDiv.innerHTML = ingredientsInfo;
    // appending dynamic div to static div
    ingredientsDiv.appendChild(ingredientsInfoDiv);
}