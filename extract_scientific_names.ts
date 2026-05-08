import { GoogleGenAI, Type } from "@google/genai";
import { DISHES } from "./src/data/dishes";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function extractScientificNames(dishName: string, recipe: string, currentIngredients: any[]) {
    const prompt = `
        You are a botanist and zoologist. 
        Given the dish name, recipe, and ingredients below, extract all significant biological ingredients (plants, animals, fungi) and provide their common name and scientific name.
        
        Dish: ${dishName}
        Recipe: ${recipe}
        Ingredients: ${JSON.stringify(currentIngredients)}
        
        Return the result as a JSON array of objects with "ingredient" and "name" keys.
        Example: [{"ingredient": "Rice", "name": "Oryza sativa"}, {"ingredient": "Chicken", "name": "Gallus gallus domesticus"}]
        Only return the JSON array, no other text.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            ingredient: { type: Type.STRING },
                            name: { type: Type.STRING }
                        },
                        required: ["ingredient", "name"]
                    }
                }
            }
        });
        
        const text = response.text;
        if (text) {
            return JSON.parse(text);
        }
        return [];
    } catch (error) {
        console.error(`Error extracting for ${dishName}:`, error);
        return [];
    }
}

async function run() {
    const updatedDishes = [];
    for (const dish of DISHES) {
        process.stdout.write(`Processing ${dish.name}... `);
        const names = await extractScientificNames(dish.name, dish.recipe, dish.ingredients || []);
        dish.scientificNames = names;
        updatedDishes.push(dish);
        console.log("Done.");
    }

    // Now we need to update src/data/dishes.ts
    // This is a bit tricky to do perfectly without a proper parser, but we can regenerate the structure.
    // However, the original file might have complex objects/backticks.
    // Let's try to just update the specific sections or write a clean new version if we can.
    
    // For simplicity in this environment, I'll update the file by reading it and replacing the scientificNames blocks.
    let fileContent = fs.readFileSync(path.join(process.cwd(), "src/data/dishes.ts"), "utf8");
    
    for (const dish of updatedDishes) {
        const idRegex = new RegExp(`id:\\s*"${dish.id}"`, "g");
        // We find the block for this dish
        // This is still risky. Let's try to be clever.
        // Actually, the user just wants the field populated.
        // I can use a simpler approach: replace the scientificNames: [...] with the new one.
    }
    
    // Better: let's use a temporary file to store the mapping and then spend another tool call to apply it with a script.
    fs.writeFileSync("scientific_names_map.json", JSON.stringify(updatedDishes.map(d => ({id: d.id, names: d.scientificNames})), null, 2));
    console.log("Mapping saved to scientific_names_map.json");
}

run();
