//VARIABLES

//Create variable for the aside elements

const aside = document.querySelector('aside');
const recipePicture = document.querySelector('.headerimage')
const submitButton = document.querySelector('#final');
const template = document.querySelector('template');

// Create form variables that selects the form elements

const firstForm = document.querySelector('#firstForm');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const servingsInput = document.querySelector('#servings');
const timeInput = document.querySelector('#time');
const imageInput = document.querySelector('#image');
const ingredientInput = document.querySelector('#ingredient');
const stepsInput = document.querySelector('#stepitem');
const ingredientHeader = document.querySelector('#ingredient-header');
const stepHeader = document.querySelector('#step-header');
const ingredientLabel = document.querySelector('#ingredient-label');
const stepLabel = document.querySelector('#step-label');

//Create submit button variables for each section of the recipes

const submitBasics = document.querySelector('#submitBasics');
const submitIngredient = document.querySelector('#submitIngredient');
const submitStep = document.querySelector('#submitStep');


//Create arrays for ingredients and steps
let ingredientsArray = [];
let stepsArray = [];  


//Recipe Object 
let recipe = {
    title: titleInput.value, 
    description: descriptionInput.value,
    servings: servingsInput.value,
    time: timeInput.value,
    image: imageInput.value,
    ingredients: ingredientInput.value,
    steps: stepsInput.value
    
} 

//Handle the error if there is not enough info submitted in the form

let errorMessage = document.querySelector('#errorMsg')
errorMessage.textContent = ""; 


//FUNCTIONS 

window.onload = function() {
    ingredientInput.style.display = "none";
    stepsInput.style.display = "none";
    submitIngredient.style.display = "none";
    submitStep.style.display = "none";
    ingredientHeader.style.display = "none";
    stepHeader.style.display = "none";
    ingredientLabel.style.display = "none";
    stepLabel.style.display = "none";
};


function recordRecipe(event) {
    event.preventDefault();

    if (!titleInput.value || !descriptionInput.value || !servingsInput.value || !timeInput.value || !imageInput.value) {
      
        errorMessage.textContent = "Please complete the form."
     
    } else {
       
        recipe = {
            title: titleInput.value, 
            description: descriptionInput.value,
            servings: servingsInput.value,
            time: timeInput.value,
            image: imageInput.value,
            ingredients: "",
            steps: ""
            
        } 
        
    ingredientInput.style.display = "block";
    submitIngredient.style.display = "block";
    ingredientHeader.style.display = "block";
    ingredientLabel.style.display = "block";  

    storeLocalStorage(recipe);
    renderRecipeList(recipe);
        
    }
 
}

  
  //  Create a function called `storeLocalStorage` that takes a given object and saves the new data to the existing recipe data in local storage.
  
function storeLocalStorage(recipe) {
  
    let storedRecipes = readLocalStorage();      
  
        storedRecipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(storedRecipes));
};


  
function renderRecipeList() {
     
    const recipeList = JSON.parse(localStorage.getItem('recipes'));
    
    if (recipeList !== null) {

        for (let i = 0; i <recipeList.length; i++) {
            imageReplace(recipeList[i]);
        }      
    }
}; 



function imageReplace (recipeList) {

    if (recipeList.image){
        aside.innerHTML = "";

        const imageEl = document.createElement('img');  
        aside.appendChild(imageEl);
        imageEl.id = "form-image";
        imageEl.src = recipeList.image; 

        buildRecipeElement(recipeList);

    } else {
        buildRecipeElement(recipeList);
    }
};




// Create a function that builds the recipe form elements and appends them to the DOM

function buildRecipeElement (recipeList) {
  
    const recipeInfo = template.content.cloneNode(true);

    recipeInfo.querySelector('h2').textContent = recipeList.title;
    recipeInfo.querySelector('blockquote').textContent = recipeList.description;
    recipeInfo.querySelector('#servings').textContent = recipeList.servings;
    recipeInfo.querySelector('#time').textContent = recipeList.time;

    recipeInfo.querySelector('#ingredients').style.display = 'none'; 
    recipeInfo.querySelector('#steps').style.display = 'none'; 
    recipeInfo.querySelector('#final').style.display = 'none';
  
    aside.appendChild(recipeInfo);
};


function renderIngredients(event) {
    event.preventDefault(); 

    aside.querySelector('#ingredients').style.display = 'block'; 

    const listItem = document.createElement('li');
    const ingredientValue = document.querySelector('#ingredient').value;
    listItem.textContent = ingredientValue; 
    aside.querySelector('#ingredients ul').appendChild(listItem);

    ingredientsArray.push(ingredientValue); 
    console.log(ingredientsArray);

    ingredientInput.value = "";

    stepsInput.style.display = "block";
    submitStep.style.display = "block";
    stepLabel.style.display = "block";
    stepHeader.style.display = "block";
}



function renderSteps(event) {
    event.preventDefault(); 

    aside.querySelector('#steps').style.display = 'block';
    aside.querySelector('#final').style.display = 'block'; 

    const stepItem = document.createElement('li');
    const stepItemValue = document.querySelector('#stepitem').value; 
    stepItem.textContent = stepItemValue; 
    aside.querySelector('#steps ol').appendChild(stepItem); 

    stepsArray.push(stepItemValue); 
    console.log(stepsArray);

    stepsInput.value = ""; 

    const submitButton = document.querySelector('#final');
    submitButton.addEventListener('click', loadLocalStorage);  
};


function loadLocalStorage () {
    let storedRecipes = JSON.parse(localStorage.getItem('recipes')) || []; 

    storedRecipes[0].ingredients = ingredientsArray;
    storedRecipes[0].steps = stepsArray;

    localStorage.setItem('recipes', JSON.stringify(storedRecipes));
};



function readLocalStorage() {

    let storedRecipes = JSON.parse(localStorage.getItem('recipe')) || []; 
  
    return storedRecipes; 
  
};


let redirectURL = '';

const redirectPage = function (url) {
        console.log("im alive");
          redirectURL = url;
          location.assign(url);
     };


function submitButtonEvent (event) {
    
        event.preventDefault(); 
        const submit = querySelector('#final');
        submit.addEventListener('click', redirectPage("recipe-final.html"));
        
    };


// Add an event listener to the form on submit. Call the function to handle the form submission.

submitBasics.addEventListener('click', recordRecipe); 

submitIngredient.addEventListener('click', renderIngredients);

submitStep.addEventListener('click', renderSteps);



//CLEAR LOCAL STORAGE IF/WHEN NECESSARY
//clearStorage(); 

function clearStorage () {
    localStorage.clear();
} 
  



