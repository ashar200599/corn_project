import { DISHES, Dish } from "../data/dishes.js";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  console.log("Starting enrichment for", DISHES.length, "dishes...");

  const missingDishes = DISHES.filter(d => !d.servings || d.servings === 0 || !d.prepTime || d.prepTime === 0 || !d.cookTime || d.cookTime === 0);
  
  if (missingDishes.length === 0) {
    console.log("All dishes already have servings, prepTime, and cookTime.");
    return;
  }

  console.log(`Found ${missingDishes.length} dishes missing info. Generating...`);

  const dishNames = missingDishes.map(d => ({ id: d.id, name: d.name }));
  
  const prompt = `
For the following list of dishes, estimate the standard servings, prepTime (in minutes), and cookTime (in minutes).
Return ONLY a JSON array of objects with keys "id", "servings", "prepTime", and "cookTime".

Dishes:
${JSON.stringify(dishNames, null, 2)}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const text = response.text || "[]";
  const results: { id: string, servings: number, prepTime: number, cookTime: number }[] = JSON.parse(text);

  const resultMap = new Map(results.map(r => [r.id, r]));

  const updatedDishes = DISHES.map(d => {
    if (resultMap.has(d.id)) {
      const res = resultMap.get(d.id)!;
      return {
        ...d,
        servings: res.servings,
        prepTime: res.prepTime,
        cookTime: res.cookTime
      };
    }
    return d;
  });

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
  excessRisks: string;
  tags?: string[];
  variations?: string[];
  servings?: number;
  prepTime?: number;
  cookTime?: number;
}

export const DISHES: Dish[] = `;

  const output = header + JSON.stringify(updatedDishes, null, 2) + ";\n";
  
  const outPath = path.resolve(process.cwd(), "src/data/dishes.ts");
  fs.writeFileSync(outPath, output, "utf-8");
  
  console.log("Successfully updated dishes.ts with servings, prepTime, and cookTime.");
}

run().catch(console.error);
