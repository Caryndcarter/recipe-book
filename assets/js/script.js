const homeButton = document.querySelector("#home-button");
const headerTextHome = document.querySelector('#headerTextHome');
const addRecipeButton = document.querySelector("#add-recipe-button");
const mainEl = document.querySelector('#container');

const btnSurprise = document.querySelector('#btnSurprise');

let allRecipes = [];
let allRandomIngredients = [];
let newRandomIngredient = '';


const storedRecipes = JSON.parse(localStorage.getItem("recipeStorage")) || [];
if (storedRecipes !== null) {
    allRecipes = storedRecipes;
};


//When the view final recipe button is clicked, use the final recipe template and render the final recipe.  Clear the right section of the screen and append the final recipe.  

function buildFinalRecipe () {

    const formSection = document.querySelector('#form-section');
    const surpriseButton = document.querySelector('#btnSurprise');
    surpriseButton.style.display = "inline"; 

    let storedRecipes = JSON.parse(localStorage.getItem('recipeStorage')) || []; 
    const recipeId = storedRecipes.length -1; 

    const finalTemplate = document.getElementById("recipe-final");
  
    const recipeFinal = finalTemplate.content.cloneNode(true);

    recipeFinal.querySelector('#final-title').textContent = storedRecipes[recipeId].title; 
    recipeFinal.querySelector('#final-description').textContent = storedRecipes[recipeId].description; 
    recipeFinal.querySelector('#final-servings').textContent = storedRecipes[recipeId].servings;
    recipeFinal.querySelector('#final-time').textContent = storedRecipes[recipeId].cookTime; 
    recipeFinal.querySelector('#recipeId').textContent = recipeId; 

    for (let i = 0; i <storedRecipes[recipeId].ingredients.length; i++) {
        const ingItem = document.createElement('li');
        const ingValue = storedRecipes[recipeId].ingredients[i]; 
        ingItem.textContent = ingValue; 
        recipeFinal.querySelector('#final-ingredients ul').appendChild(ingItem);
    }      

    for (let i = 0; i <storedRecipes[recipeId].steps.length; i++) {
        const stepItem = document.createElement('li');
        const stepsValue = storedRecipes[recipeId].steps[i]; 
        stepItem.textContent = stepsValue; 
        recipeFinal.querySelector('#final-steps ol').appendChild(stepItem);
    }   

    renderImage(); 

    formSection.innerHTML = "";
    formSection.appendChild(recipeFinal);


};


//Function to render the final recipe if recipe is clicked on the homepage.  
function recipeClicked(recipeId) {
    mainEl.innerHTML = ""; 
    btnSurprise.style.display = 'inline';

    const finalTemplate = document.getElementById("recipe-final2");
  
    const recipeFinal = finalTemplate.content.cloneNode(true);

    recipeFinal.querySelector('#final-title').textContent = allRecipes[recipeId].title; 
    recipeFinal.querySelector('#recipeId').textContent = recipeId;
    recipeFinal.querySelector('#final-description').textContent = allRecipes[recipeId].description; 
    recipeFinal.querySelector('#final-servings').textContent = allRecipes[recipeId].servings;
    recipeFinal.querySelector('#final-time').textContent = allRecipes[recipeId].cookTime; 

    for (let i = 0; i <allRecipes[recipeId].ingredients.length; i++) {
        const ingItem = document.createElement('li');
        const ingValue = allRecipes[recipeId].ingredients[i]; 
        ingItem.textContent = ingValue; 
        recipeFinal.querySelector('#final-ingredients2 ul').appendChild(ingItem);
    };      

    for (let i = 0; i <allRecipes[recipeId].steps.length; i++) {
        const stepItem = document.createElement('li');
        const stepsValue = allRecipes[recipeId].steps[i]; 
        stepItem.textContent = stepsValue; 
        recipeFinal.querySelector('#final-steps2 ol').appendChild(stepItem);
    };   

    const sectionEL = recipeFinal.querySelector('#recipe-show');
    const asideEL = recipeFinal.querySelector('#aside-final');

    //show the image for the recipe
        asideEL.innerHTML = "";
        const imageEl = document.createElement('img');  
        asideEL.appendChild(imageEl);
        imageEl.id = "form-image";
        imageEl.classList.add('img-fluid');

    if (allRecipes[recipeId].image) {
        imageEl.src = allRecipes[recipeId].image;  

    }  else {
        imageEl.src ="assets/images/istockphoto-1490291782-612x612.jpg"; 
    }

    mainEl.appendChild(recipeFinal);

    // if this recipe is not a static recipe, allow user to delete the recipe by adding the delete button
    if (recipeId > 2) {
        // add event listener to surprise ingredient button
        const btnDelete = document.querySelector('#deleteRecipeButton');
        btnDelete.addEventListener("click", showDeleteModal);
        btnDelete.style.display = 'inline';
    }
};

function showIngredientModal() {
    // get random ingredient from list of all random ingredients

   const randomIndex = Math.floor(Math.random() * allRandomIngredients.length);
    newRandomIngredient = allRandomIngredients[randomIndex];
    document.querySelector('.modal-body').innerHTML = newRandomIngredient;
    // show modal
    $('#ingredientModal').modal('show')

}; 

function ingredientModalCancel() {
    // hide modal without making any changes
    $('#ingredientModal').modal('hide')
}

function ingredientModalConfirm() {
    // get id of the recipe that is being viewed
    let recipeId = document.querySelector('#recipeId').textContent;

    allRecipes =  JSON.parse(localStorage.getItem('recipeStorage'));

    // add the random ingredient to the recipe
    allRecipes[recipeId].ingredients.push(newRandomIngredient);
    // update localStorage with the updated recipe
    localStorage.setItem("recipeStorage", JSON.stringify(allRecipes));
    // reload recipe page to show added ingredient
    if (window.location.pathname === '/recipe-book/index.html' || window.location.pathname === '/index.html') {
        recipeClicked(recipeId);
    } else {
        buildFinalRecipe(); 
    } 
    
    // hide modal
    $('#ingredientModal').modal('hide')
}

function showDeleteModal() {
    // show modal
    $('#deleteModal').modal('show')
}

function deleteModalCancel() {
    // hide modal without making any changes
    $('#deleteModal').modal('hide')
}

function deleteModalConfirm() {
    // get id of the recipe that is being viewed
    let recipeId = document.querySelector('#recipeId').textContent;  
    // remove one element from the allRecipes array at the recipeId index
    allRecipes.splice(recipeId, 1);
    // update local storage
    localStorage.setItem('recipeStorage', JSON.stringify(allRecipes));
    // hide modal
    $('#deleteModal').modal('hide')
    // redirect to home page
    navigateHome();
}

// function to fetch static starter recipes from JSON file
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function getStaticData() {
    const url = "./assets/static/starter-recipes.json";
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            // add all static recipes to the allRecipes array and update local storage
            for (let i = 0; i < data.staticRecipes.length; i++) {
                const element = data.staticRecipes[i];
                allRecipes.push(element);                
            }
            localStorage.setItem("recipeStorage", JSON.stringify(allRecipes))
            createRecipeCards();
        })                
        .catch((error) => 
                console.error("Unable to fetch data:", error))
    
}

async function getRandomIngredients() {
    const url = "./assets/static/random-ingredients.json";
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            // load random ingredients list into allRandomIngredients array
            for (let i = 0; i < data.randomIngredients.length; i++) {
                const element = data.randomIngredients[i];
                allRandomIngredients.push(element);                
            }
        })                
        .catch((error) => 
                console.error("Unable to fetch random ingredients data:", error))
}

function createRecipeCards() {
    // clear the main element before repopulating
    mainEl.innerHTML = '';

    // create and append framework for the card elements
    const cardFramework = document.createElement('div');
    cardFramework.setAttribute('class', 'row no-gutters card-deck');

    // create, append, and add event listener a card element for each recipe in the list of all recipes
    if (allRecipes !== null && allRecipes.length > 0) {
        for (let i = 0; i < allRecipes.length; i++) {
            const recipe = allRecipes[i];

            // create the bootstrap column div and add classes
            let bootstrapColumn = document.createElement('div');
            bootstrapColumn.setAttribute('class', 'col-md-6 col-lg-4 mb-4'); 

            // create the new card div and add classes
            let newCard = document.createElement('div');
            newCard.setAttribute('class', 'card h-100 clickableRecipe');

            // set the id of the new card to the index of the associated recipe object
            newCard.setAttribute('id', i);
            newCard.addEventListener('click', function() {
                recipeClicked(i);
            });

            // create and append recipe image if there is an image associated with the recipe            
            let recipeImage = document.createElement('img');
            if (recipe.image !== '' && recipe.image !== null) {
                recipeImage.setAttribute('src', recipe.image);
            } else {
                recipeImage.setAttribute('src', 'assets/images/istockphoto-1490291782-612x612.jpg')
            }
            recipeImage.setAttribute('class', 'card-img-top');
            recipeImage.setAttribute('alt', 'Recipe Image');
            newCard.append(recipeImage);

            // create and append card body
            let cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');
            newCard.append(cardBody);

            // create and append card body title and description
            let cardTitle = document.createElement('h5');
            cardTitle.setAttribute('class', 'card-title');
            cardTitle.innerHTML = recipe.title;
            cardBody.append(cardTitle);

            let cardDesc = document.createElement('p');
            cardDesc.setAttribute('class', 'card-text');
            cardDesc.innerHTML = recipe.description;
            cardBody.append(cardDesc);

            // create and append card footer
            let cardFooter = document.createElement('div');
            cardFooter.setAttribute('class', 'card-footer d-flex justify-content-between align-items-center');
            newCard.append(cardFooter);

            // create and append both footer text items
            let cookTimeText = document.createElement('small');
            cookTimeText.setAttribute('class', 'text-muted cook-time');
            cookTimeText.innerHTML = recipe.cookTime;
            cardFooter.append(cookTimeText);
            
            let totalServingsText = document.createElement('small');
            totalServingsText.setAttribute('class', 'text-muted total-servings');
            totalServingsText.innerHTML = `${recipe.servings} servings`;
            cardFooter.append(totalServingsText);

            bootstrapColumn.append(newCard);
            // append the new card to the card framework
            cardFramework.append(bootstrapColumn);
        }
    } else {
        console.log('No recipes to create cards for');
    }
    mainEl.append(cardFramework);
}

async function navigateHome() {
    // determine if website is being run locally or on github pages because the path is slightly different
    if (window.location.protocol === 'https:') {
        if (window.location.pathname !== '/recipe-book/index.html') {
            window.location.pathname = '/recipe-book/index.html';
        }
    } else {
        if (window.location.pathname !== '/index.html') {
            window.location.pathname = '/index.html';
        }
    }    
    
    createRecipeCards();

    // hide surprise ingredient button
    document.querySelector('#btnSurprise').style.display = 'none';

    // add event listener to surprise ingredient button
    btnSurprise.addEventListener("click", showIngredientModal);
    
    // fetch static recipes from json file if there are no recipes already in the allRecipes array
    if (allRecipes === null || allRecipes.length < 3) {
        // if there are less than three recipes (representing at least the static data), clear the allRecipes array and get the static data
        allRecipes = [];
        localStorage.setItem('recipeStorage', JSON.stringify(allRecipes));
        await getStaticData();        
    }
}

function navigateAddRecipe() {
    // determine if website is being run locally or on github pages because the path is slightly different
    if (window.location.protocol === 'https:') {
        window.location.pathname = '/recipe-book/recipe-form.html';
    } else {
        window.location.pathname = '/recipe-form.html';
    }
}

homeButton.addEventListener("click", navigateHome);
headerTextHome.addEventListener("click", navigateHome);
addRecipeButton.addEventListener("click", navigateAddRecipe);

window.onload = (event) => {


//On Load only show the first Step 1 form fields and not steps 2 or 3

/*window.onload = function() {
    ingredientInput.style.display = "none";
    stepsInput.style.display = "none";
    submitIngredient.style.display = "none";
    submitStep.style.display = "none";
    ingredientHeader.style.display = "none";
    stepHeader.style.display = "none";
    ingredientLabel.style.display = "none";
    stepLabel.style.display = "none";
//};
*/

    if ((window.location.protocol === 'https:' && (window.location.pathname === '/recipe-book/' || window.location.pathname === '/recipe-book/index.html')) 
        || (window.location.protocol === 'http:' && window.location.pathname === '/index.html')) {
        navigateHome();
       
    }    

    getRandomIngredients();
};
