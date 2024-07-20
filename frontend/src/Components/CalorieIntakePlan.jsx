import React, { useState } from 'react';

const CalorieIntakePlan = () => {
  const [currentWeight, setCurrentWeight] = useState('');
  const [dreamWeight, setDreamWeight] = useState('');
  const [dietPreference, setDietPreference] = useState('veg');
  const [foodOptionsHtml, setFoodOptionsHtml] = useState('');
  const [dietPlanHtml, setDietPlanHtml] = useState('');
  const [totalCaloriesHtml, setTotalCaloriesHtml] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentWeightValue = parseFloat(currentWeight);
    const dreamWeightValue = parseFloat(dreamWeight);

    if (isNaN(currentWeightValue) || isNaN(dreamWeightValue)) {
      alert('Please enter valid numbers for both weights.');
      return;
    }

    const weightDifference = Math.abs(currentWeightValue - dreamWeightValue);
    let calorieIntake;

    if (currentWeightValue > dreamWeightValue) {
      if (weightDifference <= 10) {
        calorieIntake = 1500;
      } else if (weightDifference <= 16) {
        calorieIntake = 1700;
      } else if (weightDifference <= 22) {
        calorieIntake = 1800;
      } else {
        calorieIntake = 2000;
      }
    } else {
      if (weightDifference <= 10) {
        calorieIntake = 2500;
      } else if (weightDifference <= 16) {
        calorieIntake = 2600;
      } else if (weightDifference <= 22) {
        calorieIntake = 2800;
      } else {
        calorieIntake = 3000;
      }
    }

    const foodOptions = {
      veg: [
        { name: 'Boiled Vegetable', amount: '200 gm', calories: 220 },
        { name: 'Curd And Rice', amount: '200 gm', calories: 200 },
        { name: 'Healthy Sprouts With Salad and Curd', amount: '200 gm', calories: 250 },
        { name: 'Roasted Peanuts', amount: '200 gm', calories: 3100 },
        { name: 'Fenugreek leaves (cooked)', amount: '200 gm', calories: 68 },
        { name: 'Radish leaves', amount: '200 gm', calories: 52 },
        { name: 'French beans', amount: '200 gm', calories: 48 },
        { name: 'Kidney beans', amount: '2 cups', calories: 674 },
        { name: 'Soya beans', amount: '2 cups', calories: 892 },
        { name: 'Ghee Roti', amount: '1 pcs', calories: 90 },
        { name: 'Peas', amount: '2 cups', calories: 236 },
        { name: 'Bread With Peanut Butter', amount: '4 pcs', calories: 150 },
        { name: 'Oats With Milk Honey', amount: '2 cups', calories: 300 },
        { name: 'Broccoli', amount: '2 cups', calories: 80 },
        { name: 'Cottage cheese', amount: '200 gm', calories: 516 },
        { name: 'Palak paneer', amount: '2 cups', calories: 560 },
        { name: 'Fried potato', amount: '2 cups', calories: 400 },
        { name: 'Mashed potatoes', amount: '2 cups', calories: 200 },
        { name: 'Sweet potato', amount: '2 cups', calories: 192 },
        { name: 'Mushrooms', amount: '2 cups', calories: 592 },
        { name: 'Mixed Veggies', amount: '2 cups', calories: 160 },
        { name: 'Vegetable Curry', amount: '2 cups', calories: 260 }
      ],
      nonveg: [
        { name: 'Cream', amount: '100g', calories: 210 },
        { name: 'Cheese', amount: '100g', calories: 310 },
        { name: 'Butter', amount: '2 tablespoons', calories: 90 },
        { name: 'Ghee', amount: '2 tablespoons', calories: 90 },
        { name: 'Boiled egg', amount: '2', calories: 160 },
        { name: 'Scrambled egg', amount: '2', calories: 160 },
        { name: 'Fried egg', amount: '2', calories: 220 },
        { name: 'Omelette', amount: '2', calories: 240 },
        { name: 'Meat', amount: '2 plates', calories: 900 },
        { name: 'Mutton biryani', amount: '2 cups', calories: 450 },
        { name: 'Fried chicken', amount: '2 servings', calories: 400 },
        { name: 'Chicken curry', amount: '2 servings', calories: 450 },
        { name: 'Tandoori Chicken', amount: '2 servings', calories: 520 },
        { name: 'Butter chicken', amount: '2 servings', calories: 980 },
        { name: 'Chicken tikka masala', amount: '2 servings', calories: 914 },
        { name: 'Fried fish', amount: '2 servings', calories: 280 },
        { name: 'Pomfret', amount: '200g', calories: 246 },
        { name: 'Crab', amount: '200g', calories: 162 },
        { name: 'Prawn', amount: '200g', calories: 130 },
        { name: 'Cooked chicken', amount: '200g', calories: 400 },
        { name: 'Cooked pork', amount: '200g', calories: 460 }
      ]
    };

    const options = dietPreference === 'nonveg' ? [...foodOptions.veg, ...foodOptions.nonveg] : foodOptions[dietPreference];
    let selectedFoods = [];
    let totalCalories = 0;

    function getRandomFood() {
      return options[Math.floor(Math.random() * options.length)];
    }

    while (totalCalories < calorieIntake) {
      const food = getRandomFood();
      if (totalCalories + food.calories > calorieIntake) {
        break;
      }
      selectedFoods.push(food);
      totalCalories += food.calories;
    }

    if (totalCalories < calorieIntake) {
      while (totalCalories < calorieIntake) {
        const food = getRandomFood();
        selectedFoods.push(food);
        totalCalories += food.calories;
      }
    }

    const foodOptionsHtml = selectedFoods.map((food, index) => (
      <li key={index}>{`${food.name} - ${food.amount} (${food.calories} calories)`}</li>
    ));

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let dietPlanHtml = [];

    function getMeal(numItems, calories) {
      let meal = [];
      let mealCalories = 0;

      while (mealCalories < calories && meal.length < numItems) {
        const food = getRandomFood();
        if (mealCalories + food.calories > calories) {
          break;
        }
        meal.push(food);
        mealCalories += food.calories;
      }

      if (mealCalories < calories) {
        while (mealCalories < calories) {
          const food = getRandomFood();
          meal.push(food);
          mealCalories += food.calories;
        }
      }
      return meal.map(food => `${food.name} (${food.amount})`).join(', ');
    }

    days.forEach((day) => {
      const dailyCalories = calorieIntake / 3;
      const breakfast = getMeal(2, dailyCalories);
      const lunch = getMeal(5, dailyCalories);
      const dinner = getMeal(6, dailyCalories);

      dietPlanHtml.push(
        <tr key={day}>
          <td className="border px-4 py-2">{day}</td>
          <td className="border px-4 py-2">{breakfast}</td>
          <td className="border px-4 py-2">{lunch}</td>
          <td className="border px-4 py-2">{dinner}</td>
        </tr>
      );
    });

    setFoodOptionsHtml(foodOptionsHtml);
    setDietPlanHtml(dietPlanHtml);
    setTotalCaloriesHtml(
      <p>{`Needed: ${calorieIntake} calories per day`}</p>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md text-gray-700">
      <h1 className="text-3xl font-bold mb-6">Calorie Intake and Diet Plan</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="number"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          placeholder="Current Weight"
          required
          className="block w-full p-3 border rounded mb-3 bg-gray-300 text-black"
        />
        <input
          type="number"
          value={dreamWeight}
          onChange={(e) => setDreamWeight(e.target.value)}
          placeholder="Dream Weight"
          required
          className="block w-full p-3 border rounded mb-3 bg-gray-300 text-black"
        />
        <select
          value={dietPreference}
          onChange={(e) => setDietPreference(e.target.value)}
          required
          className="block w-full p-3 border rounded mb-3 bg-gray-300 text-black"
        >
          <option value="veg">Vegetarian</option>
          <option value="nonveg">Non-Vegetarian</option>
        </select>
        <div className='flex justify-center items-center'>
            <button type="submit" className="w-72  bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 text-white p-3 rounded">Generate Diet Plan</button>
        </div>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-3">Selected Foods</h2>
        <ul>{foodOptionsHtml}</ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3">7-Day Diet Plan</h2>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Day</th>
              <th className="border px-4 py-2">Breakfast</th>
              <th className="border px-4 py-2">Lunch</th>
              <th className="border px-4 py-2">Dinner</th>
            </tr>
          </thead>
          <tbody>{dietPlanHtml}</tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3">Total Calories</h2>
        {totalCaloriesHtml}
      </div>
    </div>
  );
};

export default CalorieIntakePlan;
