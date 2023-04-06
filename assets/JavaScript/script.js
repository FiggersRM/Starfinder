var ingrContainerEl = document.querySelector("#ingredient-container");
var AddtoListEl = document.querySelector("#add-food-btn");
var srchFoodinputEl = document.querySelector("#search-food");
var srchRecipesEl = document.querySelector("#srchRecipesBtn");
var ingrListTbl = document.querySelector("#project-display");
var foodCardEl = document.querySelector("#foodCards");
var recipeCardEl = document.querySelector("#recipeCards");
var saveBtns = document.querySelectorAll("#saveBtn");
var savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
var saveBtns;
var recipeIngredients = "";
var flIndex = 0;

function getRecipes(event) {
  recipeCardEl.innerHTML = "";
    const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f5dc3f0206msh1446f74fb905aebp15a66cjsn337892ca01af",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };
  var recipeURL =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" +
    recipeIngredients +
    "&number=10"; /*after MVP is finished, create a query for ?ranking=1or2 depending on if they want to maximize used ingredients or minimize missing*/
  var recipeIds = "";
  fetch(recipeURL, options)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (i != 0) recipeIds += "," + data[i].id;
        else {
          recipeIds += data[i].id;
        }
      }
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
            var saveBtn = document.createElement("button");
            saveBtn.setAttribute("id", "saveBtn");
            saveBtn.innerHTML = "Save Recipe"
            recipeLink.innerHTML = data[i].title;
            recipeLink.href = data[i].sourceUrl;
            recipeImg.src = data[i].image;
            cardHeader.appendChild(recipeLink);
            recipeCard.appendChild(cardHeader);
            recipeCard.appendChild(recipeImg);
            recipeCard.appendChild(saveBtn);
            recipeCardEl.appendChild(recipeCard);
          }
        });
        saveBtns = document.querySelectorAll("#saveBtn");
        saveBtns.addEventListener("click", saveRecipes);
    });

}
AddtoListEl.addEventListener("click", handleAddtoList);
srchRecipesEl.addEventListener("click", getRecipes);

function handleAddtoList(event) {
  event.preventDefault();
  console.log(srchFoodinputEl.value);
  var foodURL =
    "https://api.api-ninjas.com/v1/nutrition?query=" + srchFoodinputEl.value;
  console.log(foodURL);
 
  var foodcals = "";
  var foodnm = "";
  var foodsrv = "";
  var foodcarbs = "";
  var foodprotein = "";
  var foodsugar = "";
  var foodtotalfat = "";
  var newIngrItem = document.createElement("tr");
  var newIngrData = document.createElement("td");
  var newIngrRem = document.createElement('td');
  var newIngrRemBtn = document.createElement('button');
    '<td><button class="btn btn-sm btn-delete-project" >X</button></td>'
   ;
  fetch(foodURL, {
    method: "GET",
    url: foodURL,
    headers: { "X-Api-Key": "HXPI6N65ktX28fovUXZXpQ==oAgzQ7tYIp7Oinib" },
    contentType: "application/json",
  })
    .then(function (response) {
      console.log(response);
      return response.json();
      if (response.ok) {
        console.log("found");
    }
   
    })

    .then(function (data) {
      
    //   for (var i = 0; i < data.length; i++) {
       if (data.length != 0) {
     
      console.log(data[0].name + "here");
      foodnm += data[0].name;
      
      foodcals +=  data[0].calories;
    //   .then(function (data) {
       
        // foodnm += data[0].name;
        foodsrv += data[0].serving_size_g;
        // foodcals += data[0].calories;
        foodcarbs += data[0].carbohydrates_total_g;
        foodprotein += data[0].protein_g;
        foodsugar += data[0].sugar_g;
        foodtotalfat += data[0].fat_total_g;
        recipeIngredients +=  foodnm  + ","
        console.log(recipeIngredients)
    
      
    // create the table row and cells to add to the list
      ingrListTbl.appendChild(newIngrItem);
      newIngrItem.setAttribute('data-row-index',flIndex);
      newIngrItem.setAttribute('id','food-row-' + flIndex)
      newIngrItem.appendChild(newIngrData).textContent = foodnm;
      newIngrItem.appendChild(newIngrRem);
      newIngrRem.appendChild(newIngrRemBtn).textContent = "X";
      newIngrRemBtn.setAttribute('class','btn btn-sm btn-delete-project');
      newIngrRemBtn.setAttribute('data-btn-index',flIndex);
      newIngrRemBtn.addEventListener('click',  handleDeleteFood);
     
     // now increment the index for the number of rows in list
      flIndex = flIndex + 1;

      //convert data to an object
      srchFoodinputEl.value = "";
      var foodData = [
        foodnm,
        foodsrv,
        foodcals,
        foodcarbs,
        foodprotein,
        foodsugar,
        foodtotalfat,
      ];
   //end object
    
      var foodCard = document.createElement("card");
      var foodUl = document.createElement("ul");
      var foodHeader = document.createElement("h3");
      foodCardEl.appendChild(foodCard);
      foodCard.appendChild(foodHeader);
      foodCard.appendChild(foodUl);

      for (var i = 0; i < foodData.length; i++) {
        if (i === 0) {
            console.log("in here");
            foodHeader.textContent = foodData[i];
        } else if (i === 1) {
          var foodLi = document.createElement("li");
          foodLi.textContent = "Serving Size: " + foodData[i] + " grams";
          foodUl.appendChild(foodLi);
        } else if (i === 2) {
          var foodLi = document.createElement("li");
          foodLi.textContent = "Calories per Serving: " + foodData[i];
          foodUl.appendChild(foodLi);
        } else if (i === 3) {
          var foodLi = document.createElement("li");
          foodLi.textContent =
            "Carbohydrates per Serving: " + foodData[i] + " grams";
            foodUl.appendChild(foodLi);
        } else if (i === 4) {
          var foodLi = document.createElement("li");
          foodLi.textContent = "Protein per Serving: " + foodData[i] + " grams";
          foodUl.appendChild(foodLi);
        } else if (i === 5) {
          var foodLi = document.createElement("li");
          foodLi.textContent = "Sugars per Serving: " + foodData[i] + " grams";
          foodUl.appendChild(foodLi);
        } else {
          var foodLi = document.createElement("li");
          foodLi.textContent =
            "Total Fat per Serving: " + foodData[i] + " grams";
            foodUl.appendChild(foodLi);
        }
      }
     
    }
    // else food was not found - display modal message
    else {
       console.log( "modal")
       
       $( function() {
         $( "#dialog" ).dialog();
       } );
   
        document.addEventListener('DOMContentLoaded', () => {
            // Functions to open and close a modal
            function openModal($el) {
              $el.classList.add('is-active');
            }
          
            function closeModal($el) {
              $el.classList.remove('is-active');
            }
          
            function closeAllModals() {
              (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                closeModal($modal);
              });
            }
          
            // Add a click event on buttons to open a specific modal
            (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
              const modal = $trigger.dataset.target;
              const $target = document.getElementById(modal);
          
              $trigger.addEventListener('click', () => {
                openModal($target);
              });
            });
          
            // Add a click event on various child elements to close the parent modal
            (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
              const $target = $close.closest('.modal');
          
              $close.addEventListener('click', () => {
                closeModal($target);
              });
            });
          
            // Add a keyboard event to close all modals
            document.addEventListener('keydown', (event) => {
              const e = event || window.event;
          
              if (e.keyCode === 27) { // Escape key
                closeAllModals();
              }
            });
          });
    } // end of modal dialog popup
    })

      console.log(recipeIngredients);

    };

function saveRecipes(event) {
  console.log(this);
  var recipe = {

  }
}

function handleDeleteFood () {
    //now delete the row of the food item clicked x
    var rowToDel = parseInt($(this).attr('data-btn-index'));
    var delrow = this.parentNode.parentNode.rowIndex ;
    console.log("in the remove" + rowToDel + delrow);
    $(this).closest('tr').remove(); 
    
}



