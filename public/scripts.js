function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

async function getMeals() {
  const diningRequest = await fetch('/api/wholeMeal');
  const diningData = await diningRequest.json();
  return diningData;
}
async function createWholeMealTable() {
  const results = await getMeals();
  const meals = results.data;
  const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selectedMeals = mealArray.map((element) => {
    const random = getRandomIntInclusive(0, meals.length - 1);
    return meals[random];
  });

  selectedMeals.forEach((meal) => {
    targetBox = document.querySelector('.tbl-body');
    const appendItem = document.createElement('tr');
    appendItem.classList.add('tbl-row');
    appendItem.innerHTML = `
        <td>${meal.meal_name}</td>
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

async function createWholeMealChart() {
  const results = await getMeals();
  const meals = results.data;
  const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selectedMeals = mealArray.map((element) => {
    const random = getRandomIntInclusive(0, meals.length - 1);
    return meals[random];
  });

  const calDataPoints = [];
  const carbDataPoints = [];
  const sodDataPoints = [];
  const proDataPoints = [];
  const fatDataPoints = [];
  const cholDataPoints = [];

  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Meal Macro Chart',
      fontFamily: 'Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif'
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries

    },
    data: [
      {
        type: 'stackedBar',
        name: 'Calories',
        showInLegend: true,
        dataPoints: calDataPoints
      },
      {
        type: 'stackedBar',
        name: 'Carbs',
        showInLegend: true,
        dataPoints: carbDataPoints
      },
      {
        type: 'stackedBar',
        name: 'Sodium',
        showInLegend: true,
        dataPoints: sodDataPoints
      },
      {
        type: 'stackedBar',
        name: 'Protein',
        showInLegend: true,
        dataPoints: proDataPoints
      },
      {
        type: 'stackedBar',
        name: 'Fat',
        showInLegend: true,
        dataPoints: fatDataPoints
      }, {
        type: 'stackedBar',
        name: 'Cholesterol',
        showInLegend: true,
        dataPoints: cholDataPoints
      }
    ]
  });
  selectedMeals.forEach((meal) => {
    calDataPoints.push({label: meal.meal_name, y: meal.calories});
    carbDataPoints.push({label: meal.meal_name, y: meal.carbs});
    sodDataPoints.push({label: meal.meal_name, y: meal.sodium});
    proDataPoints.push({label: meal.meal_name, y: meal.protein});
    fatDataPoints.push({label: meal.meal_name, y: meal.fat});
    cholDataPoints.push({label: meal.meal_name, y: meal.cholesterol});
  });
  chart.render();
  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

async function windowActions() {
  createWholeMealTable();
  createWholeMealChart();
}

window.onload = windowActions;