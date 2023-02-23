class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.recipesToCook = user.recipesToCook;
    this.favorites = []
  }

  favoriteRecipe(allRecipes) {
    this.favorites = allRecipes.filter(recipe => this.recipesToCook.includes(recipe.id))
  }

  removeRecipes(recipe) {
    this.favorites.splice(recipe, 1);
  }

  filterFavTag(tag) {
    const filteredRecipe = this.favorites.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
    return filteredRecipe;
  }

  filterFavName(name) {
    const filteredName = this.favorites.filter((recipe) => {
      return recipe.name.toLowerCase().includes(name);
    });
    return filteredName;
  }
}

export default User;
