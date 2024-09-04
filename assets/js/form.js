function buildForm () {

const h2EL = document.createElement('h2');
h2EL.textContent = "Add Your New Recipe"; 

const form = document.createElement("form");
//form.setAttribute("method", "post");
//form.setAttribute("action", "submit.php");

// Create an input element for recipe title
const title = document.createElement("input");
title.setAttribute("type", "text");
title.setAttribute("label", "Title");
title.setAttribute("id", "title");
title.setAttribute("placeholder", "Recipe Title");

 // Create an input element for description
 const description = document.createElement("textarea");
 description.setAttribute("type", "text");
 description.setAttribute("id", "description");
 description.setAttribute("placeholder", "Describe the recipe");

 // Create an input element for time
 const time = document.createElement("input");
 time.setAttribute("type", "text");
 time.setAttribute("id", "cook");
 time.setAttribute("placeholder", "Total Time to Prep and Cook");

// Create an input element for servings
const servings = document.createElement("input");
servings.setAttribute("type", "number");
servings.setAttribute("id", "text");
servings.setAttribute("placeholder", "Servings");

// Create an input element for ingredient
const ingredient = document.createElement("input");
ingredient.setAttribute("type", "text");
ingredient.setAttribute("id", "ingredient");
ingredient.setAttribute("placeholder", "Ingredient");

// create a submit button
const s = document.createElement("input");
s.setAttribute("type", "submit");
s.setAttribute("value", "Submit");
                      
form.appendChild(title); 
   
form.appendChild(description); 
    
form.appendChild(time); 
         
form.appendChild(servings); 
            
form.appendChild(ingredient); 
       
form.appendChild(s); 

const main = document.querySelector("main");
main.appendChild(h2EL);
main.appendChild(form);

};