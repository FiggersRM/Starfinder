var ingrContainerEl = document.querySelector('#ingredient-container');
var AddtoListEl = document.querySelector('#add-food-btn');
var srchFoodinputEl = document.querySelector('#search-food');
var ingrListTbl = document.querySelector('#project-display');



// var query = document.querySelector('#search-food');

function getRecipes() {
var recipeURL ="https://api.spoonacular.com/recipes/findByIngredients" /* add ingredients in a string at the end using a query with ?ingredients= */ + "?number=10" /*after MVP is finished, create a query for ?ranking=1or2 depending on if they want to maximize used ingredients or minimize missing*/
var recipeIds = "";
fetch(recipeURL)
.then(function (reponse) {
    console.log(response);
    return response.json();
})
.then(function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        if(i != 0)
        recipeIds += "," + data[i].id;
        else {
            recipeIds += data[i].id;
        }
    }
});
fetch("https://api.spoonacular.com/recipes/informationBulk?ids=" + recipeIds)
.then(function (response) {
    return response;
})
.then(function (data) {
    for (var i = 0; i < data.length; i++) {
        /*add code to create cards in the html file with the details of the recipe*/
    }
})
}
/*getRecipes(); - put inside of the click event listener for the search recipes button*/


// console.log(srchFoodinputEl.value);


//This is the event listener for the add to list button
AddtoListEl.addEventListener('click',handleAddtoList);
console.log("here1");
//  SrchRecipeEl.addEventListener('click',getRecipes);

function handleAddtoList(event) {
 event.preventDefault();
 console.log("her21");
 console.log(srchFoodinputEl.value);

      var foodURL ="https://api.api-ninjas.com/v1/nutrition?query=" + srchFoodinputEl.value; 
        console.log(foodURL);
    var foodcals = "";
    var foodnm = "";
    var foodsrv = "";
    var newIngrItem = document.createElement('tr');
    var newIngrData = document.createElement('td');
    var newIngrRem = document.createElement('td');
    
    fetch(foodURL,{
        method: 'GET',
        url: foodURL,
        headers: { 'X-Api-Key': 'HXPI6N65ktX28fovUXZXpQ==oAgzQ7tYIp7Oinib'},
        contentType: 'application/json'
        })
    .then(function (response) {
        console.log(response);
        return response.json();
        
    })
    .then(function (data) {
        console.log(data); 
        
        for (var i = 0; i < data.length; i++) {
            if(i != 0) {
            foodnm += "," + data[i].name;
            foodcals += "," +  data[i].calories;
            }
            else {
                foodcals += data[i].calories;
                foodnm +=  data[i].name;
                foodsrv += data[i].serving_size_g;
            }
            console.log(foodcals); console.log(foodnm);console.log(foodsrv);
            ingrListTbl.appendChild(newIngrItem);
            newIngrItem.appendChild(newIngrData).textContent = foodnm;
            newIngrItem.appendChild(newIngrRem).textContent = 'X';
            // ingrListUL.appendChild('li').textContent = foodnm;
        }
    });
    }
    