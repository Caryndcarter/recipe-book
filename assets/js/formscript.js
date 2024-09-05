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
        
    ingredientInput.style.display = "block";
    submitIngredient.style.display = "block";
    ingredientHeader.style.display = "block";
    ingredientLabel.style.display = "block";  

    imageReplace();
        
    }
 
};

//Show the image the user has provided instead of the stock image. And call the buildRecipeElement function.  Leave the stock image if no image is provided.  

function imageReplace () {

    if (imageInput.value){
        renderImage(); 
        buildRecipeElement();

    } else {
        buildRecipeElement();
    }
};

function renderImage () {
    aside.innerHTML = "";

    const imageEl = document.createElement('img');  
    aside.appendChild(imageEl);
    imageEl.id = "form-image";
    imageEl.src = imageInput.value; 
};



// Build the Basic Recipe from the elements the user has provided.  

function buildRecipeElement () {

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
};


//When the user clicks on adding an ingredient, render the list of ingredients on the side of the page and reveal the Step 3 Cooking Steps input part of the form. 
//Add ingredients to the ingredients array.  

function renderIngredients(event) {

    event.preventDefault(); 

    if (!ingredientInput.value) {
      
        errorMessage2.textContent = "Please add one ingredient."
     
    } else {

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

    storedRecipes.push(recipe);

    localStorage.setItem('recipeStorage', JSON.stringify(storedRecipes));

    buildFinalRecipe(); 

};


//When the view final recipe button is clicked, use the final recipe template and render the final recipe.  Clear the right section of the screen and append the final recipe.  

function buildFinalRecipe () {

    const finalTemplate = document.getElementById("recipe-final");
  
    const recipeFinal = finalTemplate.content.cloneNode(true);

    recipeFinal.querySelector('#final-title').textContent = titleInput.value; 
    recipeFinal.querySelector('#final-description').textContent = descriptionInput.value; 
    recipeFinal.querySelector('#final-servings').textContent = servingsInput.value;
    recipeFinal.querySelector('#final-time').textContent = timeInput.value; 

    for (let i = 0; i <ingredientsArray.length; i++) {
        const ingItem = document.createElement('li');
        const ingValue = ingredientsArray[i]; 
        ingItem.textContent = ingValue; 
        recipeFinal.querySelector('#final-ingredients ul').appendChild(ingItem);
    }      

    for (let i = 0; i <stepsArray.length; i++) {
        const stepItem = document.createElement('li');
        const stepsValue = stepsArray[i]; 
        stepItem.textContent = stepsValue; 
        recipeFinal.querySelector('#final-steps ol').appendChild(stepItem);
    }   

    renderImage(); 

    formSection.innerHTML = "";
    formSection.appendChild(recipeFinal);


};
  

// EVENT LISTENERS FOR THE 3 FORM BUTTONS (basics, ingredients, and steps)

submitBasics.addEventListener('click', recordRecipe); 

submitIngredient.addEventListener('click', renderIngredients);

submitStep.addEventListener('click', renderSteps);



//CLEAR LOCAL STORAGE IF/WHEN NECESSARY
//clearStorage(); 

function clearStorage () {
    localStorage.clear();
} 
















  //  Create a function called `storeLocalStorage` that takes a given object and saves the new data to the existing recipe data in local storage.
  
//function storeLocalStorage(recipe) {
  
    //let storedRecipes = readLocalStorage();      
  
        ///storedRecipes.push(recipe);
        //localStorage.setItem('recipes', JSON.stringify(storedRecipes));
//};


  
/*function renderRecipeList() {
     
    const recipeList = JSON.parse(localStorage.getItem('recipes'));
    
    if (recipeList !== null) {

        for (let i = 0; i <recipeList.length; i++) {
            imageReplace(recipeList[i]);
        }      
    }
}; */



/*




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

*/

  



