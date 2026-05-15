const fs = require('fs');
let fileStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

// replace occurrences that look like eggs
fileStr = fileStr.replace(/(\d+)\s+Chicken \(Gallus gallus domesticus\)([,\s]+lightly beaten)/g, '$1 Eggs$2');
fileStr = fileStr.replace(/crack Chicken \(Gallus gallus domesticus\) into wok/g, 'crack eggs into wok');
fileStr = fileStr.replace(/- 2 Chicken \(Gallus gallus domesticus\)\\n/g, '- 2 Eggs\\n');
fileStr = fileStr.replace(/Chicken \(Gallus gallus domesticus\) eggs/g, 'Eggs');
fileStr = fileStr.replace(/Chicken \(Gallus gallus domesticus\) wash/g, 'Egg wash');
fileStr = fileStr.replace(/1 piece Chicken \(Gallus gallus domesticus\) egg/g, '1 Egg');
fileStr = fileStr.replace(/whisked Chicken \(Gallus gallus domesticus\)/g, 'whisked Eggs');
fileStr = fileStr.replace(/sugar, Chicken \(Gallus gallus domesticus\), and water/g, 'sugar, eggs, and water');

// Let's also fix indo-martabak-manis "Chicken (Gallus gallus domesticus)"
fileStr = fileStr.replace(/sugar, Chicken \(Gallus gallus domesticus\), and water/g, 'sugar, eggs, and water');
fileStr = fileStr.replace(/coat in Chicken \(Gallus gallus domesticus\) and breadcrumbs/g, 'coat in egg and breadcrumbs');


fs.writeFileSync('src/data/dishes.ts', fileStr, 'utf8');
console.log("Anomalies fixed!");
