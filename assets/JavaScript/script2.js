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
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var card = document.createElement("card");
            card.setAttribute("class", "card column is-3 m-2");
            var imgDiv = document.createElement("div");
            imgDiv.setAttribute("class", "card-image has-text-centered");
            card.appendChild(imgDiv);
            var imgFig = document.createElement("figure");
            imgFig.setAttribute("class", "image is-128x128 is-inline-block");
            imgDiv.appendChild(imgFig);
            var img = document.createElement("img");
            img.src= data[i].image;
            imgFig.appendChild(img);
            var cardContent = document.createElement("div");
            cardContent.setAttribute("class", "card-content");
            card.appendChild(cardContent);
            var content = document.createElement("div");
            content.setAttribute("class", "content");
            cardContent.appendChild(content);
            var link = document.createElement("a");
            link.href = data[i].sourceUrl;
            link.innerHTML = data[i].title;
            content.appendChild(link);
            var footer = document.createElement("footer");
            footer.setAttribute("class", "card-footer");
            card.appendChild(footer);
            var deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "button is-primary mb-3");
            deleteBtn.setAttribute("id", data[i].id);
            deleteBtn.innerHTML = "Delete Recipe";
            footer.appendChild(deleteBtn);
            recipeCardEl.appendChild(card);
            console.log(card);
            deleteBtn.addEventListener("click", deleteRecipe);
      }
    });

    function deleteRecipe (event) {
      var foodId = $(this).attr("id");
      recipeIds = JSON.parse(localStorage.getItem("savedRecipes"));
      console.log(recipeIds);
      newRecIds = recipeIds.toString();
      console.log(newRecIds);
      var newIds = newRecIds.replace(foodId + ",", "");
      var recipeIds = newIds;
      localStorage.setItem("savedRecipes", JSON.stringify(recipeIds));
      this.parentNode.parentNode.remove();
    }