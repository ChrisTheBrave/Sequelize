async function populateRestaurants() {
  const diningRequest = await fetch('/api/meals');
  const meals = await diningRequest.json();
  const macroRequest = await fetch('/api/macros');
  const macros = await macroRequest.json();

  const mealTable = meals.map((meal) => {
    const macrosForMeal = macros.find((macro) => macro.meal_id === meal.meal_id);
    return {
      id: meal.meal_id,
      name: meal.meal_name,
      calories: macrosForMeal.calories,
      carbs: macrosForMeal.carbs,
      sodium: macrosForMeal.sodium,
      protein: macrosForMeal.protein,
      fat: macrosForMeal.fat,
      cholesterol: macrosForMeal.cholesterol
    };
  });

  mealTable.forEach((meal) => {
    targetBox = document.querySelector('.tbl-body');
    const appendItem = document.createElement('tr');
    appendItem.classList.add('tbl-row');
    appendItem.innerHTML = `
        <td>${meal.id}</td>
        <td>${meal.name}</td>
        <td>${meal.calories}</td>
        <td>${meal.carbs}</td>
        <td>${meal.sodium}</td>
        <td>${meal.protein}</td>
        <td>${meal.fat}</td>
        <td>${meal.cholesterol}</td>
        `;
    targetBox.append(appendItem);
  });
}

async function getMeals() {
  const diningRequest = await fetch('/api/meals');
  const diningData = await diningRequest.json();
  return diningData;
}

async function getMacros() {
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
  const meals = await getMeals();
  const macros = await getMacros();

  setComplexMealData(meals);
  setComplexMacrosData(macros);

  const storedMeals = localStorage.getItem('mealData');
  const storedMealData = JSON.parse(storedMeals);

  const storedMacros = localStorage.getItem('macrosData');
  const storedMacroData = JSON.parse(storedMacros);

  populateRestaurants([storedMealData, storedMacroData]);
}

window.onload = windowActions;