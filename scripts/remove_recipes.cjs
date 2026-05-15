const fs = require('fs');

let fileStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

// The exported array looks like export const DISHES: Dish[] = [ ... ];
// A simple way to filter out is to parse the JSON array if possible.
// Wait, dishes.ts contains imports like: import { SOUTH_KOREA_DISHES } from './southKoreaDishes'; 
// and the export might contain spreads: `...SOUTH_KOREA_DISHES` at the end
// Let's use a regex to replace these objects.

function removeDishById(content, id) {
    const regex = new RegExp(`\\s*\\{[^{]*"id":\\s*"${id}"[\\s\\S]*?\\},?`, 'g');
    return content.replace(regex, '');
}

fileStr = removeDishById(fileStr, 'indo-korean-fusion');
fileStr = removeDishById(fileStr, 'indo-croffle-pandan');

// Cleanup any trailing commas before the closing brace/bracket if left over by regex
// Actually, it's safer to just run this regex:
fileStr = fileStr.replace(/,\s*,/g, ',');
fileStr = fileStr.replace(/,\s*]/g, ']');

fs.writeFileSync('src/data/dishes.ts', fileStr, 'utf8');
console.log("Recipes removed.");
