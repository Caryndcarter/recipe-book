//VARIABLES

//Create variable for the aside element

const aside = document.querySelector('aside');

// Create form variables that selects the form elements

const firstForm = document.querySelector('#firstForm');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const servingsInput = document.querySelector('#servings');
const timeInput = document.querySelector('#time');
const ingredientInput = document.querySelector('#ingredients');
const stepsInput = document.querySelector('#steps');

//Create submit button variables for each section of the recipes

const submitBasics = document.querySelector('#submitBasics');
const submitIngredient = document.querySelector('#submitIngredient');
const submitStep = document.querySelector('#submitStep');



//Handle the error if there is not enough info submitted in the form

let errorMessage = document.querySelector('#errorMsg')
errorMessage.textContent = ""; 


//FUNCTIONS 

function recordRecipe(event) {

if (!titleInput.value || !descriptionInput.value || !servingsInput.value || !timeInput.value) {
        event.preventDefault();
        errorMessage.textContent = "Please complete the form."
     
    } else {
        event.preventDefault();    
        let recipe = {
            title: titleInput.value, 
            description: descriptionInput.value,
            servings: servingsInput.value,
            time: timeInput.value,
            ingredients: ingredientInput.value,
            steps: stepsInput.value
            
        }     

    storeLocalStorage(recipe);
    renderRecipeList(recipe);

    //redirectPage("recipe-form-ingredients.html"); 
        
    }
 
}

  
  //  Create a function called `storeLocalStorage` that takes a given object and saves the new data to the existing recipe data in local storage.
  
function storeLocalStorage(recipe) {
  
    let storedRecipes = readLocalStorage();      
  
        storedRecipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(storedRecipes));
};
  



// Create a function that builds an element and appends it to the DOM

function buildElement (recipeList) {
   
    const articleEl = document.createElement('article');
    aside.appendChild(articleEl);

    const titleEL = document.createElement('h2');
    const blockquoteEL = document.createElement('blockquote');
    const recipeItemsEL = document.createElement('ul');
    const servingspEL = document.createElement('li');
    const timepEL = document.createElement('li');

    articleEl.appendChild(titleEL);
    articleEl.appendChild(blockquoteEL);
    articleEl.appendChild(recipeItemsEL);
    articleEl.appendChild(servingspEL);
    articleEl.appendChild(timepEL);

    titleEL.textContent = recipeList.title; 
    blockquoteEL.textContent = recipeList.description; 
    servingspEL.textContent = recipeList.servings;
    timepEL.textContent = recipeList.time;
  
};


function renderRecipeList() {

    console.log("renderRecipeList"); 
     
    aside.innerHTML = ""; 
    
    const recipeList = JSON.parse(localStorage.getItem('recipes'));
    
    if (recipeList !== null) {

        for (let i = 0; i <recipeList.length; i++) {
            buildElement(recipeList[i]);
        }
        
  }
}; 



function readLocalStorage() {

    let storedRecipes = JSON.parse(localStorage.getItem('recipe')) || []; 
  
    return storedRecipes; 
  
};


function buildStepsElement (recipeList) {
    const articleEl = document.createElement('article');
    aside.appendChild(articleEl);

    const stepsEL = document.createElement('h2');
    const recipeItemsEL = document.createElement('ol');
    const individualstepsEL = document.createElement('li');

    articleEl.appendChild(stepsEL);
    articleEl.appendChild(recipeItemsEL);
    articleEl.appendChild(individualstepsEL);

    stepsEL.textContent = "Recipe Steps"; 
    individualstepsEL.textContent = recipeList.steps;
  
};


function renderSteps(event) {
    event.preventDefault(); 

    const recipeList = JSON.parse(localStorage.getItem('recipes'));
    console.log(recipeList);
    console.log(recipeList.steps);
    
   // for (let i = 0; i <stepsList.length; i++) {
        buildStepsElement(recipeList);
    }





  // Add an event listener to the form on submit. Call the function to handle the form submission.
//firstForm.addEventListener('submit', recordRecipe, renderRecipeList);


submitBasics.addEventListener('click', recordRecipe); 


submitIngredient.addEventListener('click', renderRecipeList);

submitStep.addEventListener('click', renderSteps);



//CLEAR LOCAL STORAGE IF/WHEN NECESSARY
clearStorage(); 

function clearStorage () {
    localStorage.clear();
} 
  

let redirectURL = '';

const redirectPage = function (url) {
      redirectURL = url;
      location.assign(url);
    };


