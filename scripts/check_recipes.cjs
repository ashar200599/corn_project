const fs = require('fs');
const content = fs.readFileSync('src/data/dishes.ts', 'utf8');

const regex = /"id":\s*"([^"]+)"[\s\S]*?"recipe":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  const recipe = match[2];
  const idx = recipe.indexOf('### Instructions');
  if (idx !== -1) {
    const ingredients = recipe.substring(0, idx);
    const lines = ingredients.split('\\n');
    if (lines.length < 5) {
      console.log(id, '-->', lines);
    }
  }
}
