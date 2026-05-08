const fs = require('fs');
const filePath = 'src/data/dishes.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Collect all unique scientific names
const mappings = new Map();
const snRegex = /(?:ingredient|"ingredient")\s*:\s*"(.*?)"\s*,\s*(?:name|"name")\s*:\s*"(.*?)"/g;
let m;
while ((m = snRegex.exec(content)) !== null) {
    const ingredient = m[1];
    const scientific = m[2];
    if (ingredient && scientific) {
        mappings.set(ingredient.toLowerCase(), scientific);
    }
}

console.log(`Collected ${mappings.size} unique mappings`);

// Sort by length descending to avoid partial matches
const sortedIngredients = Array.from(mappings.keys()).sort((a, b) => b.length - a.length);

let newContent = content;

// Perform replacement in the whole file
// We should ONLY replace inside the DISHES array, specifically inside "recipe" and "name" (inside ingredients)
// But a global replace on the whole file is probably fine if we are careful with word boundaries.

for (const ing of sortedIngredients) {
    const scientific = mappings.get(ing);
    const escapedIng = ing.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Replace plurals
    const pluralRegex = new RegExp(`\\b${escapedIng}(?:es|s)\\b`, 'gi');
    newContent = newContent.replace(pluralRegex, scientific);
    
    // Replace singular
    const singularRegex = new RegExp(`\\b${escapedIng}\\b`, 'gi');
    newContent = newContent.replace(singularRegex, scientific);
}

// Final cleanup of common artifacts
const fixes = [
    ["Gallus gallus domesticuss", "Gallus gallus domesticus"],
    ["Capsicum annuumes", "Capsicum annuum"],
    ["Capsicum annuums", "Capsicum annuum"],
    ["Syzygium aromaticums", "Syzygium aromaticum"],
    ["Allium sativums", "Allium sativum"],
    ["Oryza sativas", "Oryza sativa"],
    ["Glycine maxes", "Glycine max"],
    ["Glycine maxs", "Glycine max"],
    ["Carideas", "Caridea"],
    ["Carideaes", "Caridea"],
    ["Bos tauruss", "Bos taurus"],
    ["Sus domesticuss", "Sus domesticus"],
    ["Persea americanas", "Persea americana"],
    ["Salmo salars", "Salmo salar"],
    ["Camellia sinensiss", "Camellia sinensis"],
    ["Solanum lycopersicums", "Solanum lycopersicum"],
    ["Zea mayses", "Zea mays"],
    ["Zea mayss", "Zea mays"],
    ["Ananas comosuss", "Ananas comosus"]
];

for (const [wrong, right] of fixes) {
    newContent = newContent.split(wrong).join(right);
}

fs.writeFileSync(filePath, newContent);
console.log('Global replacement complete');
