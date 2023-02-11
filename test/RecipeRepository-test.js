import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import testRecipeData from '../src/data/testRecipes';

describe('Recipe', () => {
  let recipeRepo;
  let recipeData;
  beforeEach(() => {
    recipeData = testRecipeData;
    recipeRepo = new RecipeRepository(recipeData);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should accept a parameter of recipes', () => {
    expect(recipeRepo.recipes).to.deep.equal(recipeData);
  });

  it('should have a method that filters by tag', () => {
    expect(recipeRepo.filterTag("main course")).to.deep.equal([recipeData[1]]);
  });

  it('should have a method that filter by name', () => {
    expect(recipeRepo.filterName("Loaded Chocolate Chip Pudding Cookie Cups".toLowerCase())).to.deep.equal([recipeData[0]]);
    expect(recipeRepo.filterName('Loaded Chocolate'.toLowerCase())).to.deep.equal([recipeData[0]]);
  });
});