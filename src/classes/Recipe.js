class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  getIngredientsList(ingredientsData) {
    const ingredientsListIDs = this.ingredients.map((ingredient) => {
      return ingredient.id;
    });
    const ingredientList = ingredientsData
      .filter((ingredient) => {
        return ingredientsListIDs.includes(ingredient.id);
      })
    return ingredientList;
  }

  getIngredientsName(ingredientsData) {
    const ingredientNames = this.getIngredientsList(ingredientsData)
      .map((ingredient) => {
        return ingredient.name;
      })
    return ingredientNames;
  }

  getIngredientsCost(ingredientsData) {
    const ingredientCost = this.getIngredientsList(ingredientsData)
      .map((ingredient) => {
        return ingredient.estimatedCostInCents;
      });

    let total = 0;

    ingredientCost.forEach((ingredient, index) => {
      total += ingredient * this.ingredients[index].quantity.amount;
    });

    return Number((total / 100).toFixed(2));
  }

  getInstructions() {
    let recipeInstructions = "";
    this.instructions.forEach((instruction) => {
      recipeInstructions += `<br> Step ${instruction.number}: ${instruction.instruction}</br>`;
    });
    return recipeInstructions;
  }
}

export default Recipe;
