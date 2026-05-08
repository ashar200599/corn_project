const fs = require('fs');

let content = fs.readFileSync('src/data/dishes.ts', 'utf8');

// Replace any remaining string nutrition
const stringNutritionRegex = /"nutrition":\s*"([^"]+)",/g;

content = content.replace(stringNutritionRegex, (match, val) => {
  // val is the string, e.g., "High calorie."
  // Let's replace it with an object
  return `"nutrition": { calories: "Unknown", carbohydrates: "Unknown", protein: "Unknown", fat: "Unknown" }, // Original: ${val}`;
});

fs.writeFileSync('src/data/dishes.ts', content);
console.log('Fixed remaining string nutrition');
