import { expect } from "chai";
import testRecipeData from "../src/data/testRecipes";
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

  it('should save recipes', () => {
    user.recipesToCook = [595736]
    user.favoriteRecipe(testRecipeData);
    expect(user.favorites).to.deep.equal([testRecipeData[0]]);
  });

  it('should remove recipes', () => {
    user.removeRecipes(testRecipeData[0]);
    expect(user.favorites).to.deep.equal([]);
  });

  it('should filter recipes by tag', () => {
    user.recipesToCook = [595736, 678353, 412309];
    user.favoriteRecipe(testRecipeData)
    expect(user.filterFavTag('lunch')).to.deep.equal([testRecipeData[1]]);
  });

  it('should filter recipes by name', () => {
    user.recipesToCook = [595736, 678353, 412309];
    user.favoriteRecipe(testRecipeData)
    expect(user.filterFavName('Loaded Chocolate Chip Pudding Cookie Cups'.toLowerCase())).to.deep.equal([testRecipeData[0]]);
  });
});