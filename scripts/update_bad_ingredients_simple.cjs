const fs = require('fs');

let fileStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

const badRecipeBeginning = `### Ingredients\\n* thick-cut sourdough bread\\n* Persea americana\\n* lemon juice\\n* Pinch of salt and red pepper flakes\\n* Optional: 1 poached Chicken (Gallus gallus domesticus), seeds (chia/Sesame (Sesamum indicum))\\n\\n### Instructions\\n`;

let lines = fileStr.split('\\n');
let newLines = [];
let i = 0;

while (i < lines.length) {
    if (lines[i].includes('* thick-cut sourdough bread')) {
        // we found the start
        // wait, it is a single string in the json.
        // Let's just do a simple string replace all.
    }
    i++;
}

// Better way
const badString = '"recipe": "### Ingredients\\n* thick-cut sourdough bread\\n* Persea americana\\n* lemon juice\\n* Pinch of salt and red pepper flakes\\n* Optional: 1 poached Chicken (Gallus gallus domesticus), seeds (chia/Sesame (Sesamum indicum))\\n\\n### Instructions\\n';

let parts = fileStr.split(badString);
let newStr = parts[0];

for (let j = 1; j < parts.length; j++) {
    // parts[j] contains everything after the "### Instructions\n" up to the next badString.
    // the end of the instructions is the next double quote.
    let endOfRecipe = parts[j].indexOf('",\\n');
    let instructions = parts[j].substring(0, endOfRecipe);
    
    // Now generate ingredients from it
    const ingredientsSet = new Set();
    const common = ['flour', 'yeast', 'sugar', 'water', 'meat', 'scallions', 'milk', 'cheese', 'rice', 'chicken', 'beef', 'coconut', 'salt', 'pepper', 'egg', 'fish', 'tofu', 'tempeh', 'cabbage', 'cucumber', 'noodles', 'garlic', 'chili', 'ginger', 'galangal', 'turmeric', 'coriander', 'lemongrass', 'syrup', 'ice', 'tea', 'coffee', 'boba', 'bread', 'crackers', 'peanut', 'mango', 'jackfruit', 'cassava', 'banana', 'pandan'];
    
    let textToSearch = instructions.toLowerCase();
    
    for (let c of common) {
        if (textToSearch.includes(c)) {
            ingredientsSet.add("* " + c.charAt(0).toUpperCase() + c.slice(1));
        }
    }
    
    const snMatches = instructions.match(/([A-Z][a-z]+ \\([A-Za-z ]+\\))/g);
    if (snMatches) {
        for (let m of snMatches) {
            ingredientsSet.add("* " + m);
        }
    }
    
    if (ingredientsSet.size === 0) {
        ingredientsSet.add("* Main components");
    }
    
    let ingStr = Array.from(ingredientsSet).join('\\n');
    
    let newRecipeBlock = `"recipe": "### Ingredients\\n${ingStr}\\n\\n### Instructions\\n` + parts[j];
    newStr += newRecipeBlock;
}

fs.writeFileSync('src/data/dishes.ts', newStr, 'utf8');
console.log("Replaced perfectly!");
