import { expect } from "chai";
import RecipeRepository from "../src/classes/RecipeRepository";
import testRecipeData from "../src/data/testRecipes";
import Recipe from "../src/classes/Recipe";
import ingredientsData from "../src/data/testIngredients";

describe("Recipe class", () => {
  let recipeRepo;
  let recipeData;
  let recipeClass;
  let ingredientList;
  beforeEach(() => {
    recipeData = testRecipeData;
    recipeRepo = new RecipeRepository(recipeData);
    recipeClass = new Recipe(recipeData[0]);
    ingredientList = ingredientsData;
  });

  it("Should be a function", () => {
    expect(recipeClass).to.be.instanceOf(Recipe);
  });

  it("Should have an id", () => {
    expect(recipeClass.id).to.equal(recipeData[0].id);
  });

  it("Should have an image", () => {
    expect(recipeClass.image).to.equal(recipeData[0].image);
  });

  it("Should have an ingredients list", () => {
    expect(recipeClass.ingredients).to.equal(recipeData[0].ingredients);
  });

  it("Should have an instructions list", () => {
    expect(recipeClass.instructions).to.equal(recipeData[0].instructions);
  });

  it("Should have a name", () => {
    expect(recipeClass.name).to.equal(recipeData[0].name);
  });

  it("Should have tags", () => {
    expect(recipeClass.tags).to.equal(recipeData[0].tags);
  });

  it("Should get a list of ingredients by name", () => {
    
    expect(recipeClass.getIngredientsName(ingredientsData)).to.deep.equal([
      "wheat flour",
      "bicarbonate of soda",
      "eggs",
      "sucrose",
      "instant vanilla pudding",
      "brown sugar",
      "salt",
      "fine sea salt",
      "semi sweet chips",
      "unsalted butter",
      "vanilla",
    ]);
  });

  it("Should give a total cost for the ingredients", () => {
    expect(recipeClass.getIngredientsCost(ingredientsData)).to.equal(177.76);
  });

  it("Should give instructions", () => {
    expect(recipeClass.getInstructions()).to.equal(
      ` Step 1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy. Step 2: Add egg and vanilla and mix until combined. Step 3: Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees. Step 4: Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt. Step 5: Bake for 9 to 10 minutes, or until you see the edges start to brown. Step 6: Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.`
    );
  });
});