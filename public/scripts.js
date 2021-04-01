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
  const macroRequest = await fetch('/api/macros');
  const macroData = await macroRequest.json();

  console.log('inside populateRestaurants');



  diningData.forEach((mealRow) => {
    targetBox = document.querySelector('.tbl-body');
    const appendItem = document.createElement('tr');
    console.log('inside dining forEach');
    appendItem.classList.add('tbl-row');
    appendItem.innerHTML = `
      <td>${mealRow.meal_id}</td>
      <td>${mealRow.meal_name}</td>
      `;
    targetBox.append(appendItem);
  });

  macroData.forEach((mealRow) => {
    targetBox = document.querySelector('.tbl-body');
    const appendItem = document.createElement('tr');
    console.log('inside macro forEach');
    appendItem.classList.add('tbl-row');
    appendItem.innerHTML = `
      <td>${mealRow.calories}</td>
      <td>${mealRow.carbs}</td>
      <td>${mealRow.sodium}</td>
      <td>${mealRow.protein}</td>
      <td>${mealRow.fat}</td>
      <td>${mealRow.cholesterol}</td>
      `;
    targetBox.append(appendItem);
  });
  
}

// THE FOLLOWING 3 FUNCTIONS WORK
async function getMeals() {
  console.log('meal data request');
  const diningRequest = await fetch('/api/meals');
  const diningData = await diningRequest.json();
  return diningData;
}

async function getMacros() {
  console.log('macro data request');
  const macroRequest = await fetch('/api/macros');
  const macroData = await macroRequest.json();
  return macroData;
}

function setComplexMealData(mealData) {
  localStorage.setItem('mealData', JSON.stringify(mealData));
}

function setComplexMacrosData(macrosData) {
  localStorage.setItem('macrosData', JSON.stringify(macrosData));
}

async function windowActions() {
  console.log('loaded window');
  // const leMealMacros = await getMealMacroInfo();
  // console.table()


  const meals = await getMeals();
  const macros = await getMacros();
  // console.table(meals);

  // CODE FROM SET TO POPULATE WORKS
  setComplexMealData(meals);
  setComplexMacrosData(macros);

  const storedMeals = localStorage.getItem('mealData');
  const storedMealData = JSON.parse(storedMeals);
  // console.log('storedMeals', storedMeals);
  console.log('storedMealData', storedMealData);

  const storedMacros = localStorage.getItem('macrosData');
  const storedMacroData = JSON.parse(storedMacros);
  // console.log('storedMacros', storedMacros);
  console.log('storedMacroData', storedMacroData);

  populateRestaurants([storedMealData, storedMacroData]);


}

window.onload = windowActions;
// const tableRow = document.querySelector('.tbl-row');
