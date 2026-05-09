import fs from 'fs';
import path from 'path';
import { DISHES } from '../data/dishes.js';

const outPath = path.resolve(process.cwd(), "src/data/dishes.ts");

const cleanedDishes = DISHES.map(d => {
  let recipe = d.recipe;
  
  // Regex to remove the noisy metadata if it exists at the start
  // Matches the , \n servings: ... \n ... pattern
  recipe = recipe.replace(/^,\n\s+servings: \d+,\n\s+prepTime: \d+,\n\s+cookTime: \d+\n/gm, '');
  recipe = recipe.replace(/^,\n\s+"servings": \d+,\n\s+"prepTime": \d+,\n\s+"cookTime": \d+\n/gm, '');

  // Removes the bolded servings line if it exists
  recipe = recipe.replace(/\*\*\s*Servings:\s*\*\*\s*\d+\s*\|\s*\*\*\s*Prep:\s*\*\*\s*\d+\s*min\s*\|\s*\*\*\s*Cook:\s*\*\*\s*\d+\s*min\s*\n+/g, '');
  
  // Clean up potential double newlines
  recipe = recipe.trim();
  
  return { ...d, recipe };
});

// We need to re-write the file
const header = `export interface ScientificName {
  ingredient: string;
  name: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: number | string;
  unit: string;
}

export interface Dish {
  id: string;
  name: string;
  desc: string;
  image: string;
  emoji: string;
  country: string;
  style: 'Traditional' | 'Modern';
  category: 'Food' | 'Beverage';
  scientificNames: ScientificName[];
  ingredients?: RecipeIngredient[];
  recipe: string;
  nutrition: {
    calories: string;
    protein: string;
    carbohydrates: string;
    fat: string;
  };
  healthBenefits: string;
  excessRisks?: string;
  tags?: string[];
  variations?: string[];
  servings?: number;
  prepTime?: number;
  cookTime?: number;
}

export const DISHES: Dish[] = `;

const content = header + JSON.stringify(cleanedDishes, null, 2) + ";\n";
fs.writeFileSync(outPath, content, 'utf8');
console.log('Cleaned recipes.');
