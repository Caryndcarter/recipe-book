// Create a variable that selects the main element, and a variable that selects the back button element
const aside = document.querySelector('aside');
//const backButton = document.querySelector('#back');

// Create a function that builds an element and appends it to the DOM

function buildElement () {
    const articleEl = document.createElement('article');
    aside.appendChild(articleEl);

    const h2EL = document.createElement('h2');
    const blockquoteEL = document.createElement('blockquote');
    const pEL = document.createElement("p");

    articleEl.appendChild(h2EL);
    articleEl.appendChild(blockquoteEL);
    articleEl.appendChild(pEL);

    h2EL.textContent = blogPost.username; 
    blockquoteEL.textContent = blogPost.title;
    pEL.textContent = blogPost.content;
  
};

// Create a function that handles the case where there are no blog posts to display

function noRecipes(blogPosts) {

    if (blogPosts == null) {
        main.innerHTML = '';
        const empty = document.createElement('h2');
        main.appendChild(empty);
        empty.textContent = 
         "No Blog posts yet...";     
      }
}

// Create a function called `renderBlogList` that renders the list of blog posts if they exist. If not, call the no posts function.

function renderBlogList() {
     
    main.innerHTML = '';
    
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
    
    if (blogPosts !== null) {

        for (let i = 0; i <blogPosts.length; i++) {
            buildElement(blogPosts[i]);
        }
            
    } else {
        noBlogs(blogPosts); 
    }
  }
  

function clearStorage () {
    localStorage.clear();
}  


// Call the `renderBlogList` function
renderBlogList(); 

//clearStorage(); 


// Redirect to the home page using the `redirectPage` function found in logic.js when the back button is clicked

//backButton.addEventListener('click', function () {
    //redirectPage("./index.html");
//})