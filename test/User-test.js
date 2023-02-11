import { expect } from "chai";
import RecipeRepository from "../src/classes/RecipeRepository";
import testRecipeData from "../src/data/testRecipes";
import Recipe from "../src/classes/Recipe";
import ingredientsData from "../src/data/testIngredients";
import User from "../src/classes/User";
import testUserData from "../src/data/testUsers";

describe('User', () => {
  let user;
  beforeEach(() => {
    user = new User(testUserData);
  });

  it('should be a function', () => {
    expect(user).to.be.instanceOf(User);
  });

  it('should have a name', () => {
    expect(user.name).to.equal("Saige O'Kon");
  });

  it('should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a pantry', () => {
    expect(user.pantry).to.deep.equal(testUserData.pantry);
  });

  it('should save recipes', () => {
    user.recipesToCook(testRecipeData[0]);
    expect(user.favorites).to.deep.equal([testRecipeData[0]]);
  });

  it('should remove recipes', () => {
    user.recipesToCook(testRecipeData[0]);
    user.removeRecipes(testRecipeData[0]);
    expect(user.favorites).to.deep.equal([]);
  });

  it('should filter recipes by tag', () => {
    user.recipesToCook(testRecipeData[0]);
    user.recipesToCook(testRecipeData[1]);
    user.recipesToCook(testRecipeData[2]);
    expect(user.filterFavTag('lunch')).to.deep.equal([testRecipeData[1]]);
  });

  it('should filter recipes by name', () => {
    user.recipesToCook(testRecipeData[0]);
    user.recipesToCook(testRecipeData[1]);
    user.recipesToCook(testRecipeData[2]);
    expect(user.filterFavName('Loaded Chocolate Chip Pudding Cookie Cups'.toLowerCase())).to.deep.equal([testRecipeData[0]]);
  });
});