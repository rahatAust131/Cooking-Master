// fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f='${input}'`)

// targeting input field
const inputField = document.getElementById("search-input");
const input = inputField.value;

// A function to fetch data from API
function fetchMealsData() {
    console.log('hi there');
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => showMealsData(data.categories));
};

// A function to show data from API
const showMealsData = meal => {
    meal.forEach(mealItem => {
        const mealContainer = document.getElementById('meal-container');
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal-info';
        mealDiv.onclick = `showIngredients('${mealItem})`;
        const mealInfo = `
        <img src= ${mealItem.strCategoryThumb} >
        <h1>${mealItem.strCategory}</h1>
        <p>Details</p>`;
        mealDiv.innerHTML = mealInfo;
        mealContainer.appendChild(mealDiv);
    })
}

fetchMealsData();

// Function to 
const fetchIngredientsData = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(res => res.json())
    .then(data => showIngredients(data.meals[0]));
    console.log(data.meals[0]);
} 

const showIngredients = meal => {
    const ingredientDiv = document.getElementById('ingredient-container');
        const ingredientInfo = `
            <img src= ${meal.strMealThumb} >
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        `;
        ingredientDiv.appendChild(ingredientInfo);
}

fetchIngredientsData();