const searchBox = document.querySelector(`.searchBox`);
const searchBtn = document.querySelector(`.searchBtn`);
const recipecontainer = document.querySelector(`.recepie-container`);
const recipeDetailsContent = document.querySelector(`.recipe-details-content`);
const recipeCloseBtn = document.querySelector(`.recipe-class-btn`);


const fetchRecipes = async(query) =>{

    try {
    if(!query){
        alert("\query is empty ")
        return
    }

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

const response = await data.json();
recipecontainer.innerHTML = " "

response.meals.forEach(meal=>{
    const  recipeDiv = document.createElement('div');
        recipeDiv.classList.add(`recipe`);
        recipeDiv.innerHTML=`<img src="${meal.strMealThumb}" > 
        <h3>${meal.strMeal}</h3>
          <p> <span>${meal.strArea}</span> Dish</p>
           <p> Belong to <span>${meal.strCategory} </span> Category</p>

        `

        const button = document.createElement(`button`);
        button.textContent = "view Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener( `click` ,()=> {
            openRecipePopup(meal);
        });
        recipecontainer.appendChild(recipeDiv); 
});
} catch (error) {
    recipecontainer.innerHTML = " <h2> Error in fetching in Recipe...  </h2> "
        
}

}
const fetchIngredients = (meal) =>{
    let ingredientsList = "";
    for( let i  = 1; i<= 20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
const measure = meal[`strMeasure${i}`];
ingredientsList += `<li> ${measure} ${ingredient} </li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) =>{
 recipeDetailsContent.innerHTML = ` <h2 class ="recipeName" > ${meal.strMeal}</h2>
 <h3 > Ingredents: </h3> 
  <ul class = "ingredientList"> ${fetchIngredients(meal)} </ul>
  <div>
    <h3>Instructions</h3>
    <p  class= "recipeInstructions"> ${meal.strInstructions}</p>
</div>
`
 recipeDetailsContent.parentElement.style.display = "block";

}
recipeCloseBtn.addEventListener(`click`, ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});


searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    

}); 