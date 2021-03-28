// async function populateRestaurants() {
//   const diningRequest = await fetch('/api/meals');
//   const diningData = await diningRequest.json();
//   console.log('inside populateRestaurants');

//   diningData.data.forEach((restaurant) => {
//     const appendItem = document.createElement('div');
//     console.log('inside populateRestaurants');
//     appendItem.classList.add('tile');
//     appendItem.innerHTML = `
//       <article class="tile is-child box has-background-link-dark">
//       <span class="subtitle has-text-light has-text-weight-bold">
//         ${restaurant.hall_address.split(',')[0]}
//       </span>
//       <br>
//       <span>
//         ${restaurant.hall_address.split(',')[1]}
//       </span>
//       </article>`;
//     targetBox.append(appendItem);
//   });
// }

async function populateRestaurants() {
  const diningRequest = await fetch('/api/meals');
  const diningData = await diningRequest.json();
  console.log('inside populateRestaurants');

  diningData.forEach((mealRow) => {
    targetBox = document.querySelector('.tbl-body');
    const appendItem = document.createElement('tr');
    console.log('inside forEach');
    appendItem.classList.add('tbl-row');
    appendItem.innerHTML = `
      <td>${mealRow.meal_id}</td>
      <td>${mealRow.meal_name}</td>
      `;
    targetBox.append(appendItem);
  });
}

async function getMeals() {
  console.log('meal data request');
  const diningRequest = await fetch('/api/meals');
  const diningData = await diningRequest.json();
  return diningData;
}

// async function getMacros() {
//   console.log('macro data request');
//   const macroRequest = await fetch('/api/meals');
//   const macroData = await macroRequest.json();
//   return macroData;
// }

async function setBasicData() {
  localStorage.setItem('myCat', 'Tom');
}

function getBasicData() {
  return localStorage.getItem('myCat');
}

function setComplexData(data) {
  localStorage.setItem('data', JSON.stringify(data));
}

async function windowActions() {
  console.log('loaded window');
  const meals = await getMeals();
  // console.table(meals);

  // start unrelated exercise
//   setBasicData();
//   const cat = getBasicData();
//   console.log(cat);

  setComplexData(meals);
  const storedMeals = localStorage.getItem('data');
  const storedMealData = JSON.parse(storedMeals);
  console.log(storedMeals);
  console.log(storedMealData);

  populateRestaurants(storedMealData);
}



window.onload = windowActions;
// const tableRow = document.querySelector('.tbl-row');
