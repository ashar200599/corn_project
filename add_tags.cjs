const fs = require('fs');

const path = './src/data/dishes.ts';
let content = fs.readFileSync(path, 'utf8');

// Match everything inside DISHES: Dish[] = [ ... ];
const dishesStart = content.indexOf('export const DISHES: Dish[] = [');
const dishesEnd = content.lastIndexOf('];') + 2;

const before = content.substring(0, dishesStart);
const after = content.substring(dishesEnd);

let dishesArrayString = content.substring(content.indexOf('[', dishesStart), dishesEnd);

try {
  // It's not valid JSON, it's JS. Let's use eval to get the array
  // Wait, no, we can't eval easily if it uses variables or backticks.
  // We can just use a regex on each object string if we split carefully, or just
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('category: "Food"')) {
      if (!lines[i+1].includes('tags:')) {
         lines[i] = lines[i] + '\n    tags: ["Main Course"],';
      }
    } else if (lines[i].includes('category: "Beverage"')) {
      if (!lines[i+1].includes('tags:')) {
         lines[i] = lines[i] + '\n    tags: ["Drink", "Sweet"],';
      }
    }
  }
  fs.writeFileSync(path, lines.join('\n'));
  console.log("Done");
} catch(e) {
  console.error(e);
}
