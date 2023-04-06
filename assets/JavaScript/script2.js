var recipeIds = JSON.parse(localStorage.getItem("savedRecipes"));
var recipeCardEl = document.querySelector("#recipeCards");
const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f5dc3f0206msh1446f74fb905aebp15a66cjsn337892ca01af",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };
  fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + recipeIds,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.length);
      for (var i = 0; i < data.length; i++) {
        var recipeCard = document.createElement("card");
        recipeCard.setAttribute("class", "recipeCard");
        var cardHeader = document.createElement("div");
        var recipeImg = document.createElement("img");
        var recipeLink = document.createElement("a");
        // saveBtn.setAttribute("class", "saveBtn");
        recipeLink.innerHTML = data[i].title;
        recipeLink.href = data[i].sourceUrl;
        recipeImg.src = data[i].image;
        cardHeader.appendChild(recipeLink);
        recipeCard.appendChild(cardHeader);
        recipeCard.appendChild(recipeImg);
        recipeCardEl.appendChild(recipeCard);
      }
    });