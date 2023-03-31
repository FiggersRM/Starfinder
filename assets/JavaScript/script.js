
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