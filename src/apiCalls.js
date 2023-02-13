function fetchRequest(type) {
  return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${type}`)
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

export default function fetchPromises() {
  const allUsers = fetchRequest('users')
  const allIngredients = fetchRequest('ingredients')
  const allRecipes = fetchRequest('recipes')
  return Promise.all([allUsers, allIngredients, allRecipes])
}





