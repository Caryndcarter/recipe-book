const homeButton = document.querySelector("#home-button");
const addRecipeButton = document.querySelector("#add-recipe-button");
const main = document.querySelector('main');

let allRecipes = [];

function navigateHome() {
    console.log('navigating home');
}

function navigateAddRecipe() {
    console.log('adding new recipe');
    buildElement(); 
    buildForm(); 
}


function buildElement () {
    const formEL = document.createElement('form');
    main.appendChild(formEL);
    
    const h2EL = document.createElement('h2');
    const labelEL = document.createElement('label');
    labelEL.setAttribute("value", "Title");
    const inputEL = document.createElement("input");

    formEL.appendChild(h2EL);
    formEL.appendChild(labelEL);
    formEL.appendChild(inputEL);

    h2EL.textContent = "Recipe Description"; 
};




function addNewRecipe(recipeTitle, recipeDescription, recipeServings, recipeCookTime, recipeIngredients, recipeSteps) {
    let newRecipe = {
        title: recipeTitle,
        description: recipeDescription,
        servings: recipeServings,
        cookTime: recipeCookTime,
        ingredients: recipeIngredients,
        steps: recipeSteps,
    }
    allRecipes.push(newRecipe);
    localStorage.setItem("recipeStorage", JSON.stringify(allRecipes));
}

// add sample recipe
addNewRecipe(
    "Pie Crust Cookies", 
    "Flaky and buttery cookies with a delicious cinnamon sugar crust.",
    12,
    "50 minutes",
    ["1 premade pie crust",
    "all purpose flour for dusting",
    "1 large egg",
    "1 teaspoon whole milk",
    "2 tablespoons granulated sugar",
    "3/4 teaspoon ground cinnamon",
    "1/8 teaspoon kosher salt",
    "1 1/2 tablespoons unsalted butter, melted and cooled"],
    ["Gather all ingredients. Preheat the oven to 375 degrees F (190 degrees C). Line 2 large rimmed baking sheets with parchment paper; set aside.",
    "Roll premade pie crust to 1/8-inch thickness on a lightly floured work surface, and cut using desired cookie cutter shapes.",
    "Transfer cut-outs to prepared baking sheets, leaving about a 1/2-inch space between each cookie. Repeat with remaining dough, rerolling scraps once.",
    "Whisk together egg and milk in a small bowl until combined. Using a pastry brush, brush the tops of each cookie evenly with egg mixture; discard remaining egg mixture. Whisk together sugar, cinnamon, and salt in a small bowl until evenly combined, sprinkle evenly over brushed cookies.",
    "Bake cookies, one baking sheet at a time, in the preheated oven until the edges and bottoms of cookies just become golden brown, about 15 minutes.",
    "Remove from oven and brush tops of each cookie lightly with melted butter, let cool slightly on baking sheet, about 5 minutes. Serve warm."]
);

homeButton.addEventListener("click", navigateHome);
addRecipeButton.addEventListener("click", navigateAddRecipe);