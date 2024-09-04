const homeButton = document.querySelector("#home-button");
const addRecipeButton = document.querySelector("#add-recipe-button");
const mainEl = document.querySelector('#container')

let allRecipes = [];
const storedRecipes = JSON.parse(localStorage.getItem("recipeStorage"));
console.log(storedRecipes);
if (storedRecipes !== null) {
    allRecipes = storedRecipes;
};

function recipeClicked(recipeId) {
    console.log(`recipe ${recipeId} clicked`);
}



function addNewRecipe(recipeTitle, recipeDescription, recipeImage, recipeServings, recipeCookTime, recipeIngredients, recipeSteps) {
    let newRecipe = {
        title: recipeTitle,
        description: recipeDescription,
        image: recipeImage,
        servings: recipeServings,
        cookTime: recipeCookTime,
        ingredients: recipeIngredients,
        steps: recipeSteps,
    }
    allRecipes.push(newRecipe);
    localStorage.setItem("recipeStorage", JSON.stringify(allRecipes));
    createRecipeCards();
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
            console.log(data.staticRecipes)
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

            // create and append recipe image
            let recipeImage = document.createElement('img');
            recipeImage.setAttribute('src', recipe.image);
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
    console.log('navigating home');
        
    // fetch static recipes from json file if there are no recipes already in the allRecipes array
    if (allRecipes === null || allRecipes.length === 0) {
        console.log('no recipes to log; getting static data');
        await getStaticData();        
    }

    createRecipeCards();    
}

function navigateAddRecipe() {
    console.log('adding new recipe');

    // add sample recipe
    // addNewRecipe(
    //     "Sample Recipe", 
    //     "Flaky and buttery cookies with a delicious cinnamon sugar crust.",
    //     "https://placehold.co/600x400",
    //     12,
    //     "50 minutes",
    //     ["1 premade pie crust",
    //     "all purpose flour for dusting",
    //     "1 large egg",
    //     "1 teaspoon whole milk",
    //     "2 tablespoons granulated sugar",
    //     "3/4 teaspoon ground cinnamon",
    //     "1/8 teaspoon kosher salt",
    //     "1 1/2 tablespoons unsalted butter, melted and cooled"],
    //     ["Gather all ingredients. Preheat the oven to 375 degrees F (190 degrees C). Line 2 large rimmed baking sheets with parchment paper; set aside.",
    //     "Roll premade pie crust to 1/8-inch thickness on a lightly floured work surface, and cut using desired cookie cutter shapes.",
    //     "Transfer cut-outs to prepared baking sheets, leaving about a 1/2-inch space between each cookie. Repeat with remaining dough, rerolling scraps once.",
    //     "Whisk together egg and milk in a small bowl until combined. Using a pastry brush, brush the tops of each cookie evenly with egg mixture; discard remaining egg mixture. Whisk together sugar, cinnamon, and salt in a small bowl until evenly combined, sprinkle evenly over brushed cookies.",
    //     "Bake cookies, one baking sheet at a time, in the preheated oven until the edges and bottoms of cookies just become golden brown, about 15 minutes.",
    //     "Remove from oven and brush tops of each cookie lightly with melted butter, let cool slightly on baking sheet, about 5 minutes. Serve warm."]
    // );
}

homeButton.addEventListener("click", navigateHome);
addRecipeButton.addEventListener("click", navigateAddRecipe);

navigateHome();