// Create a variable that selects the form element

const form = document.querySelector('#firstForm');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const servingsInput = document.querySelector('#servings');
const timeInput = document.querySelector('#time');
let errorMessage = document.querySelector('#error')


errorMessage.textContent = ""; 

function recordRecipe(event) {

// Create a function that handles the form submission. Grab the form data and store it in local storage, then redirect to the blog page using the `redirectPage` function. If the form is submitted with missing data, display an error message to the user.

if (!titleInput.value || !descriptionInput.value || !servingsInput.value || !timeInpute.value) {
        event.preventDefault();
        errorMessage.textContent = "Please complete the form."
     
    } else {
        event.preventDefault();    
        let recipe = {
            title: titleInput.value, 
            description: descriptionInput.value,
            servings: servingsInput.value,
            time: timeInput.value
        }     

    storeLocalStorage(recipe);

    redirectPage("./recipe-form-ingredients.html"); 
        
    }
 
}
 
  // Add an event listener to the form on submit. Call the function to handle the form submission.

form.addEventListener('submit', recordRecipe);


  


