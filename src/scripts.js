import "./styles.css";
import "./images/turing-logo.png";
import RecipeRepository from "../src/classes/RecipeRepository";
import Recipe from "../src/classes/Recipe";
import User from "../src/classes/User";
import MicroModal from "micromodal";
import { fetchPromises, postRequest } from './apiCalls'

// Query Selectors

const recipeContainer = document.querySelector(".recipe-container");
const filterTags = document.querySelector(".filter-tags");
const searchRecipeInput = document.querySelector(".search-recipe");
const searchBtn = document.querySelector(".search-btn");
const modalTitle = document.querySelector(".modal-title");
const modalContent = document.querySelector(".modal-content");
const favoriteHeading = document.querySelector(".favorites-section-button");
const homeBtn = document.querySelector(".home-button");

// Global Variables
let allIngredients;
let recipeRepo;
let randomUser;
let allRecipes;

// Event Listeners

window.addEventListener("load", () => {
  resolvePromises();
});

recipeContainer.addEventListener("click", (e) => {
  selectRecipe(e);
});

filterTags.addEventListener("click", (e) => {
  filterByTag(e);
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  filterByName();
});

favoriteHeading.addEventListener("click", () => {
  showFavorites();
});

homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  goHome();
});

// Functions

function resolvePromises() {
  let allUsers;
  fetchPromises()
    .then((data) => {
      allUsers = data[0].map((user) => new User(user));
      allIngredients = data[1].map((ingredient) => ingredient);
      allRecipes = data[2].map((recipe) => new Recipe(recipe));
    })
    .then(() => {
      recipeRepo = new RecipeRepository(allRecipes);
      displayRecipes(recipeRepo.recipes);
      setUser(allUsers);
      renderTags();
      randomUser.favoriteRecipe(allRecipes)
      console.log(randomUser.favorites)
    });
}

function displayRecipes(recipeArray) {
  recipeContainer.innerHTML = "";
  recipeArray.forEach((recipe) => {
    recipeContainer.innerHTML += `
    <div id="${recipe.id}" class="recipe-card">
      <img class="recipe-img"
        src="${recipe.image}"
      />
      <p class="recipe-name">${recipe.name}</p>
      <button class="favorite-button" id="favorite${recipe.id}">♥</button>
    </div>
    `;
  });
}

function showFull(e) {
  let target = e.target.parentElement.id;
  MicroModal.show("modal-1");
  let targetedRecipe = recipeRepo.recipes.find((recipe) => {
    return recipe.id === Number(target);
  });
  modalTitle.innerText = `${targetedRecipe.name}`;
  modalContent.innerHTML = `
    <img class="modal-img" src="${targetedRecipe.image}"
    <p class="modal-ingredients"><span class="bolder">Ingredients:</span> ${targetedRecipe.getIngredientsName(allIngredients)}</p>
    <p class="modal-instructions">${targetedRecipe.getInstructions()}</p>
    <div class="cost-container">
      <p class="modal-cost">$${targetedRecipe.getIngredientsCost(allIngredients)}</p>
    </div>
  `;
};

function filterByTag(e) {
  let target = e.target.className;
  recipeContainer.innerHTML = "";
  let filteredRecipes;
  if (recipeContainer.classList.contains("favorites")) {
    filteredRecipes = randomUser.filterFavTag(target);
  } else {
    filteredRecipes = recipeRepo.filterTag(target);
  }
  homeBtn.classList.remove("hidden");
  displayRecipes(filteredRecipes);
}

function filterByName() {
  let input = searchRecipeInput.value.toLowerCase();
  let filteredRecipes;
  recipeContainer.innerHTML = "";
  if (recipeContainer.classList.contains("favorites")) {
    filteredRecipes = randomUser.filterFavName(input);
  } else {
    filteredRecipes = recipeRepo.filterName(input);
  }
  homeBtn.classList.remove("hidden");
  displayRecipes(filteredRecipes);
}

function setUser(arr) {
  // let randomUserIndex = arr[Math.floor(Math.random() * arr.length)];
  randomUser = arr[0]
}

function saveRecipe(e) {
  let target = e.target.parentElement.id;
  let locateRecipe = recipeRepo.recipes.find((recipe) => {
    return recipe.id === Number(target);
  });
  let favoriteButton = document.getElementById(`favorite${target}`);
  favoriteButton.classList.add("favorite-button-clicked");
  postRequest({userID: randomUser.id, recipeID: locateRecipe.id})
  console.log(randomUser.favorites)
}

function selectRecipe(e) {
  if (e.target.className === "favorite-button") {
    saveRecipe(e);
  } else if (
    e.target.className === "recipe-img" ||
    e.target.className === "recipe-name"
  ) {
    showFull(e);
  }
}

function showFavorites() {
  recipeContainer.classList.add("favorites");
  homeBtn.classList.remove("hidden");
  randomUser.favoriteRecipe(allRecipes);
  console.log(randomUser.favorites)
  displayRecipes(randomUser.favorites);
}

function goHome() {
  recipeContainer.classList.remove("favorites");
  homeBtn.classList.add("hidden");
  displayRecipes(recipeRepo.recipes);
}

function renderTags() {
  let filterList = recipeRepo.recipes.flatMap((recipe) => {
    return recipe.tags;
  });
  let uniqueList = [...new Set(filterList)];
  filterTags.innerHTML = "";
  uniqueList.sort().forEach((tag) => {
    filterTags.innerHTML += `<p class="${tag}" id="tagNameFilter">${tag.toUpperCase()}</p>`;
  });
}
