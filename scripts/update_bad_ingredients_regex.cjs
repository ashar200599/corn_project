const fs = require('fs');

let fileStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

const badMatcher = /"recipe":\s*"### Ingredients\\n\* thick-cut sourdough bread\\n\* Persea americana\\n\* lemon juice\\n\* Pinch of salt and red pepper flakes\\n\* Optional: 1 poached Chicken \\(Gallus gallus domesticus\\), seeds \\(chia\/Sesame \\(Sesamum indicum\\)\\)\\n\\n### Instructions\\n([^"]+)"/g;

fileStr = fileStr.replace(badMatcher, (match, instructions) => {
    // try to find the dish block
    const ingredientsSet = new Set();
    const common = ['flour', 'yeast', 'sugar', 'water', 'meat', 'scallions', 'milk', 'cheese', 'rice', 'chicken', 'beef', 'coconut', 'salt', 'pepper', 'egg', 'fish', 'tofu', 'tempeh', 'cabbage', 'cucumber', 'noodles', 'garlic', 'chili', 'ginger', 'galangal', 'turmeric', 'coriander', 'lemongrass', 'syrup', 'ice', 'tea', 'coffee', 'boba', 'bread', 'crackers', 'peanut', 'mango', 'jackfruit', 'cassava', 'banana', 'pandan'];
    
    let textToSearch = instructions.toLowerCase();
    
    for (let c of common) {
        if (textToSearch.includes(c)) {
            ingredientsSet.add("* " + c.charAt(0).toUpperCase() + c.slice(1));
        }
    }
    
    // Extracted scientific names roughly
    const snMatches = instructions.match(/([A-Z][a-z]+ \([A-Za-z ]+\))/g);
    if (snMatches) {
        for (let m of snMatches) {
            ingredientsSet.add("* " + m);
        }
    }
    
    if (ingredientsSet.size === 0) {
        ingredientsSet.add("* Main components");
    }
    
    let ingStr = Array.from(ingredientsSet).join('\\n');
    return `"recipe": "### Ingredients\\n${ingStr}\\n\\n### Instructions\\n${instructions}"`;
});

// Since the user asked specifically about:
// "Update all dishes ingridients if 'Full ingredients listed below/above' appear in all the dishes recipe"
// Let's also match exactly "Full ingredients listed below/above." just in case there are any remaining that my manual script didn't process
const fullIngMatcher = /"recipe":\s*"### Ingredients\\n\* Full ingredients listed below\/above\.\\n\\n### Instructions\\n([^"]+)"/g;

fileStr = fileStr.replace(fullIngMatcher, (match, instructions) => {
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
        ingredientsSet.add("* Main components");
    }
    
    let ingStr = Array.from(ingredientsSet).join('\\n');
    return `"recipe": "### Ingredients\\n${ingStr}\\n\\n### Instructions\\n${instructions}"`;
});

fs.writeFileSync('src/data/dishes.ts', fileStr, 'utf8');
console.log("Success");
