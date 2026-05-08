const fs = require("fs");
let content = fs.readFileSync("src/data/dishes.ts", "utf8");

const regex = /"nutrition":\s*"Calories:\s*([^|]+)\s*\|\s*Carbohydrates:\s*([^|]+)\s*\|\s*Protein:\s*([^|]+)\s*\|\s*Fat:\s*([^"]+)",/g;

content = content.replace(regex, (match, cal, carbs, prot, fat) => {
  return `"nutrition": { calories: "${cal.trim()}", carbohydrates: "${carbs.trim()}", protein: "${prot.trim()}", fat: "${fat.trim()}" },`;
});

fs.writeFileSync("src/data/dishes.ts", content);
console.log("Updated dishes.ts with double quotes");
