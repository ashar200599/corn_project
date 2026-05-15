const fs = require('fs');

let fileStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

// Match each dish object roughly
const dishRegex = /{\s*"id":\s*"indo-[^}]+(?:"recipe":\s*"[^"]+")[^}]+(?:"nutrition"\s*:\s*{[^}]+})?[^}]+}/g;
// Actually JSON parsing the whole array is better

let dishesStr = fileStr.substring(fileStr.indexOf('export const DISHES: Dish[] = ') + 30);
// It might end with a semicolon
dishesStr = dishesStr.trim();
if (dishesStr.endsWith(';')) dishesStr = dishesStr.slice(0, -1);

let dishes;
try {
    // using eval or new Function since it's a JS object lit
    dishes = new Function('return ' + dishesStr)();
} catch (e) {
    console.error("Could not parse", e);
    process.exit(1);
}

for (let dish of dishes) {
    if (dish.recipe && dish.recipe.includes("thick-cut sourdough bread") && dish.recipe.includes("Persea americana")) {
        // Extract ingredients from the desc and instructions
        let textToSearch = (dish.desc + " " + dish.recipe).toLowerCase();
        let ingredientsSet = new Set();
        
        let common = ['flour', 'yeast', 'sugar', 'water', 'meat', 'scallions', 'milk', 'cheese', 'rice', 'chicken', 'beef', 'coconut', 'salt', 'pepper', 'egg', 'fish', 'tofu', 'tempeh', 'cabbage', 'cucumber', 'noodles', 'garlic', 'chili', 'ginger', 'galangal', 'turmeric', 'coriander', 'lemongrass', 'syrup', 'ice', 'tea', 'coffee', 'boba', 'bread', 'crackers', 'peanut', 'mango', 'jackfruit', 'cassava', 'banana', 'pandan'];
        
        for (let c of common) {
            if (textToSearch.includes(c)) {
                ingredientsSet.add("* " + c.charAt(0).toUpperCase() + c.slice(1));
            }
        }
        
        if (dish.scientificNames) {
            for (let sn of dish.scientificNames) {
                ingredientsSet.add("* " + sn.ingredient + " (" + sn.name + ")");
            }
        }
        
        if (ingredientsSet.size === 0) {
            ingredientsSet.add("* Main components");
        }
        
        let ingStr = Array.from(ingredientsSet).join('\\n');
        
        // Remove the bad ingredients and replace with new ones
        let instructionsStart = dish.recipe.indexOf("### Instructions");
        let instructions = dish.recipe.substring(instructionsStart);
        
        dish.recipe = "### Ingredients\\n" + ingStr + "\\n\\n" + instructions;
    }
}

let newExport = "export const DISHES: Dish[] = " + JSON.stringify(dishes, null, 2) + ";\\n";
let finalStr = fileStr.substring(0, fileStr.indexOf('export const DISHES: Dish[] = ')) + newExport;

fs.writeFileSync('src/data/dishes.ts', finalStr, 'utf8');
console.log("Success");
