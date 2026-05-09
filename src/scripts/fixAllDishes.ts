import fs from 'fs';
import path from 'path';
import { DISHES } from '../data/dishes.js';

let content = `export interface ScientificName {
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

const updatedDishes = DISHES.map(d => {
  return {
    ...d,
    servings: d.servings || 2,
    prepTime: d.prepTime || 15,
    cookTime: d.cookTime || 20
  };
});

content += JSON.stringify(updatedDishes, null, 2) + ";\n";
fs.writeFileSync(path.resolve(process.cwd(), 'src/data/dishes.ts'), content, 'utf8');
console.log('Fixed all over again via proper parsing!');
