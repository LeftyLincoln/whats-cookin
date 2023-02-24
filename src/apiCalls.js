import resolvePromises from "./scripts";

function fetchRequest(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

function postRequest(recipe) {
  fetch('http://localhost:3001/api/v1/usersRecipes', {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if(!response.ok) {
      throw new Error(response.status)
    } else {
      resolvePromises()
    }
  })
  .catch(error => console.log(error));
};

function fetchPromises() {
  const allUsers = fetchRequest('users');
  const allIngredients = fetchRequest('ingredients');
  const allRecipes = fetchRequest('recipes');
  return Promise.all([allUsers, allIngredients, allRecipes]);
};

export { fetchPromises, postRequest };




