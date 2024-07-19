import React, { useState } from 'react';

const CalorieIntakePlan = () => {
    const [foodOptionsHtml, setFoodOptionsHtml] = useState('');
    const [dietPlanHtml, setDietPlanHtml] = useState('');
    const [calorieIntake, setCalorieIntake] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const currentWeight = parseFloat(document.getElementById('currentWeight').value);
        const dreamWeight = parseFloat(document.getElementById('dreamWeight').value);
        const dietPreference = document.getElementById('dietPreference').value;

        if (isNaN(currentWeight) || isNaN(dreamWeight)) {
            alert('Please enter valid numbers for both weights.');
            return;
        }

        const weightDifference = Math.abs(currentWeight - dreamWeight);
        let calorieIntake;

        if (currentWeight > dreamWeight) {
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
                { name: 'Bottle gourd', amount: '100 gm', calories: 11 },
                { name: 'Ridge gourd', amount: '100 gm', calories: 13 },
                { name: 'Bitter gourd', amount: '100 gm', calories: 21 },
                { name: 'Capsicum', amount: '100 gm', calories: 16 },
                { name: 'Fenugreek leaves (cooked)', amount: '100 gm', calories: 34 },
                { name: 'Radish leaves', amount: '100 gm', calories: 26 },
                { name: 'Spinach', amount: '100 gm', calories: 24 },
                { name: 'Pumpkin', amount: '100 gm', calories: 23 },
                { name: 'Zucchini', amount: '100 gm', calories: 20 },
                { name: 'Drumsticks', amount: '100 gm', calories: 67 },
                { name: 'Tomato', amount: '100 gm', calories: 21 },
                { name: 'Sprouts', amount: '100 gm', calories: 44 },
                { name: 'French beans', amount: '100 gm', calories: 24 },
                { name: 'Kidney beans', amount: '1 cup', calories: 337 },
                { name: 'Soya beans', amount: '1 cup', calories: 446 },
                { name: 'Beans', amount: '1 cup', calories: 40 },
                { name: 'Peas', amount: '1 cup', calories: 118 },
                { name: 'Lady’s finger', amount: '1 cup', calories: 150 },
                { name: 'Cabbage', amount: '1 cup', calories: 60 },
                { name: 'Cauliflower', amount: '1 cup', calories: 150 },
                { name: 'Broccoli', amount: '1 cup', calories: 40 },
                { name: 'Brinjal', amount: '1 cup', calories: 40 },
                { name: 'Cottage cheese', amount: '100 gm', calories: 258 },
                { name: 'Palak paneer', amount: '1 cup', calories: 280 },
                { name: 'Fried potato', amount: '1 cup', calories: 200 },
                { name: 'Mashed potatoes', amount: '1 cup', calories: 100 },
                { name: 'Sweet potato', amount: '1 cup', calories: 96 },
                { name: 'Mushrooms', amount: '1 cup', calories: 296 },
                { name: 'Mixed Veggies', amount: '1 cup', calories: 80 },
                { name: 'Vegetable Curry', amount: '1 cup', calories: 130 }
            ],
            nonveg: [
                { name: 'Cream', amount: '50g', calories: 105 },
                { name: 'Cheese', amount: '50g', calories: 155 },
                { name: 'Butter', amount: '1 tablespoon', calories: 45 },
                { name: 'Ghee', amount: '1 tablespoon', calories: 45 },
                { name: 'Whole milk', amount: '1 cup', calories: 150 },
                { name: 'Egg', amount: '1', calories: 75 },
                { name: 'Boiled egg', amount: '1', calories: 80 },
                { name: 'Scrambled egg', amount: '1', calories: 80 },
                { name: 'Fried egg', amount: '1', calories: 110 },
                { name: 'Omelette', amount: '1', calories: 120 },
                { name: 'Meat', amount: '1 plate', calories: 450 },
                { name: 'Mutton biryani', amount: '1 cup', calories: 225 },
                { name: 'Fried chicken', amount: '1 serving', calories: 200 },
                { name: 'Chicken curry', amount: '1 serving', calories: 225 },
                { name: 'Tandoori Chicken', amount: '1 serving', calories: 260 },
                { name: 'Butter chicken', amount: '1 serving', calories: 490 },
                { name: 'Chicken tikka masala', amount: '1 serving', calories: 457 },
                { name: 'Fried fish', amount: '1 serving', calories: 140 },
                { name: 'Salmon', amount: '100g', calories: 172 },
                { name: 'Pomfret', amount: '100g', calories: 123 },
                { name: 'Squid', amount: '100g', calories: 80 },
                { name: 'Crab', amount: '100g', calories: 81 },
                { name: 'Prawn', amount: '100g', calories: 65 },
                { name: 'Cooked chicken', amount: '100g', calories: 200 },
                { name: 'Cooked pork', amount: '100g', calories: 230 }
            ]
        };

        const options = dietPreference === 'nonveg' ? [...foodOptions.veg, ...foodOptions.nonveg] : foodOptions[dietPreference];
        let selectedFoods = [];
        let totalCalories = 0;

        const getRandomFood = () => options[Math.floor(Math.random() * options.length)];

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

        let foodOptionsHtml = '<ul class="list-disc pl-5">';
        selectedFoods.forEach(food => {
            foodOptionsHtml += `<li>${food.name} - ${food.amount} (${food.calories} calories)</li>`;
        });
        foodOptionsHtml += '</ul>';

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let dietPlanHtml = '<table class="min-w-full divide-y divide-gray-200 mt-4"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breakfast</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lunch</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dinner</th></tr></thead><tbody class="bg-white divide-y divide-gray-200">';

        const getMeal = (minItems, maxItems, calories) => {
            let meal = [];
            let mealCalories = 0;
            const numItems = Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

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
        };

        days.forEach(day => {
            const dailyCalories = calorieIntake / 3;
            const breakfast = getMeal(2, 3, dailyCalories);
            const lunch = getMeal(4, 5, dailyCalories);
            const dinner = getMeal(5, 6, dailyCalories);

            dietPlanHtml += `<tr><td class="px-6 py-4 whitespace-nowrap">${day}</td><td class="px-6 py-4 whitespace-nowrap">${breakfast}</td><td class="px-6 py-4 whitespace-nowrap">${lunch}</td><td class="px-6 py-4 whitespace-nowrap">${dinner}</td></tr>`;
        });

        dietPlanHtml += '</tbody></table>';

        setFoodOptionsHtml(foodOptionsHtml);
        setDietPlanHtml(dietPlanHtml);
        setCalorieIntake(calorieIntake);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Calorie Intake and Diet Plan</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    id="currentWeight"
                    placeholder="Current Weight"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    type="number"
                    id="dreamWeight"
                    placeholder="Dream Weight"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <select
                    id="dietPreference"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="veg">Vegetarian</option>
                    <option value="nonveg">Non-Vegetarian</option>
                </select>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Generate Diet Plan
                </button>
            </form>
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Selected Foods</h2>
                <div dangerouslySetInnerHTML={{ __html: foodOptionsHtml }} />
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold">7-Day Diet Plan</h2>
                <div dangerouslySetInnerHTML={{ __html: dietPlanHtml }} />
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Total Calories per Day</h2>
                <p className="text-lg">{calorieIntake} calories</p>
            </div>
        </div>
    );
};

export default CalorieIntakePlan;
