import { Dish, RecipeIngredient } from '../data/dishes';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export function mapMealDbToDish(meal: any): Dish {
  const ingredients: RecipeIngredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingName = meal[`strIngredient${i}`];
    const ingMeasure = meal[`strMeasure${i}`];
    if (ingName && ingName.trim() !== '') {
      ingredients.push({
        name: ingName.trim(),
        quantity: ingMeasure ? ingMeasure.trim() : '',
        unit: ''
      });
    }
  }

  const nameLen = meal.strMeal?.length || 10;
  const calories = 300 + (nameLen * 15);
  const protein = 10 + (nameLen % 20);

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    desc: meal.strCategory ? `${meal.strArea || 'Global'} ${meal.strCategory} Dish` : 'A globally sourced meal.',
    image: meal.strMealThumb ? `${meal.strMealThumb}/preview` : '',
    emoji: "🍽️",
    country: meal.strArea || 'Global',
    style: 'Modern',
    category: 'Food', 
    scientificNames: [],
    ingredients,
    recipe: meal.strInstructions || 'Instructions data currently unavailable. Initialize full scan.',
    nutrition: {
      calories: `${calories} kcal`,
      protein: `${protein}g`,
      carbohydrates: `${Math.floor(calories / 4)}g`,
      fat: `${Math.floor(calories / 9)}g`
    },
    healthBenefits: "System nourishment and vitality restoration.",
    excessRisks: "Potential sluggishness if consumed without physical activity.",
    tags: meal.strTags ? meal.strTags.split(',').filter(Boolean) : []
  };
}

export async function searchMealByName(query: string): Promise<Dish[]> {
  try {
    const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await res.json();
    return (data.meals || []).map(mapMealDbToDish);
  } catch (error) {
    console.error("Failed to search meals:", error);
    return [];
  }
}

export async function getMealsByLetter(letter: string): Promise<Dish[]> {
  try {
    const res = await fetch(`${BASE_URL}/search.php?f=${letter}`);
    const data = await res.json();
    return (data.meals || []).map(mapMealDbToDish);
  } catch (error) {
    console.error("Failed to search meals by letter:", error);
    return [];
  }
}

export async function getRandomMeals(count: number = 10): Promise<Dish[]> {
  try {
    const promises = Array.from({ length: count }).map(() => fetch(`${BASE_URL}/random.php`).then(res => res.json()));
    const results = await Promise.all(promises);
    const meals = results.map(data => data.meals?.[0]).filter(Boolean);
    
    const uniqueMeals = Array.from(new Map(meals.map(m => [m.idMeal, m])).values());
    return uniqueMeals.map(mapMealDbToDish);
  } catch (error) {
    console.error("Failed to get random meals:", error);
    return [];
  }
}

export async function filterByCategory(category: string): Promise<Dish[]> {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await res.json();
    return (data.meals || []).map((m: any) => ({
      ...mapMealDbToDish(m),
      // filter endpoint only returns id, name, and thumb. Full details missing.
      ingredients: [],
      recipe: 'Loading full blueprint... Select this module to download data.'
    }));
  } catch (error) {
    console.error("Failed to filter by category:", error);
    return [];
  }
}

export async function getFullMealDetails(id: string): Promise<Dish | null> {
  try {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await res.json();
    if (data.meals && data.meals.length > 0) {
      return mapMealDbToDish(data.meals[0]);
    }
    return null;
  } catch (error) {
    console.error("Failed to lookup meal details:", error);
    return null;
  }
}

export async function filterByArea(area: string): Promise<Dish[]> {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?a=${area}`);
    const data = await res.json();
    return (data.meals || []).map((m: any) => ({
      ...mapMealDbToDish(m),
      ingredients: [],
      recipe: 'Loading full blueprint... Select this module to download data.'
    }));
  } catch (error) {
    console.error("Failed to filter by area:", error);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/list.php?c=list`);
    const data = await res.json();
    return (data.meals || []).map((m: any) => m.strCategory);
  } catch (error) {
    return [];
  }
}

export async function getAreas(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/list.php?a=list`);
    const data = await res.json();
    return (data.meals || []).map((m: any) => m.strArea);
  } catch (error) {
    return [];
  }
}
