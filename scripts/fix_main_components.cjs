const fs = require('fs');

let fileStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

const redoMatcher = /"recipe":\s*"### Ingredients\\n\* Main components\\n\\n### Instructions\\n([^"]+)"/g;

fileStr = fileStr.replace(redoMatcher, (match, instructions) => {
    const ingredientsSet = new Set();
    const common = ['flour', 'yeast', 'sugar', 'water', 'meat', 'scallions', 'milk', 'cheese', 'rice', 'chicken', 'beef', 'coconut', 'salt', 'pepper', 'egg', 'fish', 'tofu', 'tempeh', 'cabbage', 'cucumber', 'noodles', 'garlic', 'chili', 'ginger', 'galangal', 'turmeric', 'coriander', 'lemongrass', 'syrup', 'ice', 'tea', 'coffee', 'boba', 'bread', 'crackers', 'peanut', 'mango', 'jackfruit', 'cassava', 'banana', 'pandan'];
    
    let textToSearch = instructions.toLowerCase();
    
    for (let c of common) {
        if (textToSearch.includes(c)) {
            ingredientsSet.add("* " + c.charAt(0).toUpperCase() + c.slice(1));
        }
    }
    
    const snMatches = instructions.match(/([A-Z][a-z]+ \([A-Za-z ]+\))/g);
    if (snMatches) {
        for (let m of snMatches) {
            ingredientsSet.add("* " + m);
        }
    }
    
    if (ingredientsSet.size === 0) {
        ingredientsSet.add("* Secret components");
    }
    
    let ingStr = Array.from(ingredientsSet).join('\\n');
    return `"recipe": "### Ingredients\\n${ingStr}\\n\\n### Instructions\\n${instructions}"`;
});

fs.writeFileSync('src/data/dishes.ts', fileStr, 'utf8');
console.log("Success");
