































































































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

var query = $(#userinput);

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
    headers: { 'X-Api-Key': 'HXPI6N65ktX28fovUXZXpQ==oAgzQ7tYIp7Oinib'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
//This is the event listener for the add to list button
AddtoListEl.addEventListener('submit', handleAddtoList);
SrchRecipeEl.addEventListener('submit',handleSrchRecipes);

