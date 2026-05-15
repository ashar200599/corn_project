const fs = require('fs');

const dishesRaw = fs.readFileSync('src/data/dishes.ts', 'utf8');

// Parse the dishes out of the file
const scriptStart = dishesRaw.indexOf('export const DISHES: Dish[] = [');

let newRaw = dishesRaw;

const matches = dishesRaw.matchAll(/"recipe": "### Ingredients\\n\* Full ingredients listed below\/above\.\\n\\n### Instructions\\n([^"]+)"/g);
for (const match of matches) {
    const fullMatch = match[0];
    const instructions = match[1];
    
    // Attempt to find the ingredients for this specific dish
    // We'll just look backwards from this match for the ingredients array
    const beforeBlock = dishesRaw.substring(0, match.index);
    const ingredientsMatch = beforeBlock.match(/"ingredients": \[\s*([\s\S]*?)\s*\]/g);
    
    if (ingredientsMatch && ingredientsMatch.length > 0) {
        // Last one
        const lastIng = ingredientsMatch[ingredientsMatch.length - 1];
        
        // Parse that block somewhat manually
        const ingLines = lastIng.match(/"name": "([^"]+)"/g);
        if (ingLines) {
            let markdownIng = "";
            for (const line of ingLines) {
                const name = line.match(/"name": "([^"]+)"/)[1];
                markdownIng += `* ${name}\\n`;
            }
            
            const newRecipe = `"recipe": "### Ingredients\\n${markdownIng}\\n### Instructions\\n${instructions}"`;
            newRaw = newRaw.replace(fullMatch, newRecipe);
        }
    }
}

fs.writeFileSync('src/data/dishes.ts', newRaw, 'utf8');
console.log("Updated recipes");
