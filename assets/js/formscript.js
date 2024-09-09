//VARIABLES

//Create variable for the aside and section elements

const aside = document.querySelector('aside');
const recipePicture = document.querySelector('.headerimage')
const submitButton = document.querySelector('#final');
const template = document.querySelector('#recipe-template');
const finalTemplate = document.querySelector("#recipe-final");
const formSection = document.querySelector('#form-section');

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


//Create submit button variables for the buttons on the form 

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
    cookTime: timeInput.value,
    image: imageInput.value,
    ingredients: ingredientInput.value,
    steps: stepsInput.value
    
} 

//Handle the error if there is not enough info submitted in the form

const errorMessage = document.querySelector('#errorMsg');
errorMessage.textContent = ""; 
const errorMessage2 = document.querySelector("#errorMsg2");
errorMessage2.textContent = "";
const errorMessage3 = document.querySelector("#errorMsg3");
errorMessage3.textContent = "";


//FUNCTIONS 

//On Load only show the first Step 1 form fields and not steps 2 or 3

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


//When the first Step 1 button is clicked, check to make sure the fields are filled out and if they are not, ask them to complete all the basic element input fields. 
//If the fields are all filled out, call the ImageReplace function and show the ingredients portion of the form. 

function recordRecipe(event) {
    event.preventDefault();

    if (!titleInput.value || !descriptionInput.value || !servingsInput.value || !timeInput.value) {
      
        errorMessage.textContent = "Please fill out all the recipe basic elements."
     
    } else {

    errorMessage.textContent = ""; 
        
    ingredientInput.style.display = "block";
    submitIngredient.style.display = "block";
    ingredientHeader.style.display = "block";
    ingredientLabel.style.display = "block";  

    imageReplace();
        
    }
 
};

//Show the image the user has provided instead of the stock image. And call the buildRecipeElement function.  Leave the stock image if no image is provided.  

function imageReplace () {

    let imageElement = document.querySelector('#recipeImage');

    if (imageInput.value){
      
        imageElement.src = imageInput.value;
   

    } else {
         
        imageElement.src = "assets/images/istockphoto-1490291782-612x612.jpg";
    };

    buildRecipeElement();
};
       
   


//Render the image on the final recipe screen after recipe form submission

function renderImage () {
    aside.innerHTML = "";

    let imageEl = document.createElement('img');  
    
    imageEl = document.createElement('img');  
    aside.appendChild(imageEl);
    imageEl.id = "form-image";

    if (imageInput.value){
   
        imageEl.src = imageInput.value; 
   

    } else {
         
        imageEl.src = "assets/images/istockphoto-1490291782-612x612.jpg";
        imageInput.value = "assets/images/istockphoto-1490291782-612x612.jpg";
    };

    imageEl.style.display = "inline"; 

};



// Build the Basic Recipe from the elements the user has provided.  

function buildRecipeElement () {

    let templateArea = document.querySelector('#basics');

    if (!templateArea) {

    const template = document.getElementById("recipe-template");
  
    const recipeInfo = template.content.cloneNode(true);

    recipeInfo.querySelector('h2').textContent = titleInput.value;
    recipeInfo.querySelector('blockquote').textContent = descriptionInput.value;
    recipeInfo.querySelector('#servings').textContent = servingsInput.value;
    recipeInfo.querySelector('#time').textContent = timeInput.value;

    recipeInfo.querySelector('#ingredients').style.display = 'none'; 
    recipeInfo.querySelector('#steps').style.display = 'none'; 
    recipeInfo.querySelector('#final').style.display = 'none';
  
    aside.appendChild(recipeInfo);

    }


};


//When the user clicks on adding an ingredient, render the list of ingredients on the side of the page and reveal the Step 3 Cooking Steps input part of the form. 
//Add ingredients to the ingredients array.  

function renderIngredients(event) {

    event.preventDefault(); 

    if (!ingredientInput.value) {
      
        errorMessage2.textContent = "Please add one ingredient."
     
    } else {

        errorMessage2.textContent = "";

    aside.querySelector('#ingredients').style.display = 'block'; 

    const listItem = document.createElement('li');
    const ingredientValue = document.querySelector('#ingredient').value;
    listItem.textContent = ingredientValue; 
    aside.querySelector('#ingredients ul').appendChild(listItem);

    ingredientsArray.push(ingredientValue); 
    ingredientInput.value = "";

    stepsInput.style.display = "block";
    submitStep.style.display = "block";
    stepLabel.style.display = "block";
    stepHeader.style.display = "block";
    }
};


//When the user clicks on adding a cooking step, render the list of steps on the side of the page.  Add the steps to the Steps Array.  Activate the "final recipe" button.  

function renderSteps(event) {
    event.preventDefault(); 

    if (!stepsInput.value) {
      
        errorMessage3.textContent = "Please add one step."
     
    } else {

        errorMessage3.textContent = ""; 

    aside.querySelector('#steps').style.display = 'block';
    aside.querySelector('#final').style.display = 'block'; 

    const stepItem = document.createElement('li');
    const stepItemValue = document.querySelector('#stepitem').value; 
    stepItem.textContent = stepItemValue; 
    aside.querySelector('#steps ol').appendChild(stepItem); 

    stepsArray.push(stepItemValue);

    stepsInput.value = ""; 

    const submitButton = document.querySelector('#final');
    submitButton.addEventListener('click', loadLocalStorage);  

    }
};


//When the view final recipe button is clicked, create the recipe object from the input values and the arrays.  Push the recipe object to local storage.  
//Call the buildFinalFunction. 

function loadLocalStorage () {

    let storedRecipes = JSON.parse(localStorage.getItem('recipeStorage')) || []; 
  
    recipe = {
        title: titleInput.value, 
        description: descriptionInput.value,
        servings: servingsInput.value,
        cookTime: timeInput.value,
        image: imageInput.value,
        ingredients: ingredientsArray,
        steps: stepsArray
    }

    if (recipe.image.length === 0) {
        recipe.image = "assets/images/istockphoto-1490291782-612x612.jpg";
    }

    storedRecipes.push(recipe);

    localStorage.setItem('recipeStorage', JSON.stringify(storedRecipes));

    buildFinalRecipe(); 

};


window.onload = (event) => {
    getRandomIngredients(); 

};

// EVENT LISTENERS FOR THE 3 FORM BUTTONS (basics, ingredients, and steps)

submitBasics.addEventListener('click', recordRecipe); 

submitIngredient.addEventListener('click', renderIngredients);

submitStep.addEventListener('click', renderSteps);

btnSurprise.addEventListener('click', showIngredientModal);



//CLEAR LOCAL STORAGE IF/WHEN NECESSARY
//clearStorage(); 

function clearStorage () {
    localStorage.clear();
} 




  



