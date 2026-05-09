import fs from 'fs';
import path from 'path';

// This script will read dishes.ts, match the DISHES array, and add servings, prepTime, and cookTime to any dish lacking it.

const outPath = path.resolve(process.cwd(), "src/data/dishes.ts");
let content = fs.readFileSync(outPath, "utf-8");

// Simple AI logic encoded in script to map dish names to sensible times
const knownTimes: Record<string, [number, number, number]> = {
  "indo-rendang": [4, 30, 240], "indo-soto-ayam": [4, 20, 60], "indo-es-campur": [2, 15, 0],
  "jp-sushi": [2, 30, 0], "jp-tea": [1, 5, 5], "it-pizza": [3, 20, 15], "mx-tacos": [2, 20, 15],
  "mx-horchata": [4, 10, 0], "th-pad-thai": [2, 15, 15], "in-tikka-masala": [4, 20, 45],
  "kr-kimchi": [8, 60, 0], "fr-croissant": [4, 120, 25], "us-avocado-toast": [1, 5, 5]
};

// We will use a regex-based parser or just evaluate it
// Wait, regex might fail for large objects. Let's do string manipulation.

const lines = content.split('\\n');
let replaced = 0;
let dishId = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/^\s*"id":\s*"([^"]+)"/);
  if (idMatch) {
    dishId = idMatch[1];
  } else {
    const idMatchUnquoted = line.match(/^\s*id:\s*"([^"]+)"/);
    if (idMatchUnquoted) dishId = idMatchUnquoted[1];
  }
  
  if (line.includes('"excessRisks":')) {
    // Add serving, prepTime, cookTime right after this
    const nextLine = lines[i+1] || "";
    if (!nextLine.includes("servings")) {
      const times = knownTimes[dishId] || [2, 15, 20];
      const additional = ',\n  "servings": ' + times[0] + ',\n  "prepTime": ' + times[1] + ',\n  "cookTime": ' + times[2];
      lines[i] = line + additional;
      replaced++;
    }
  } else if (line.includes('excessRisks:')) {
    const nextLine = lines[i+1] || "";
    if (!nextLine.includes("servings")) {
      const times = knownTimes[dishId] || [2, 15, 20];
      const additional = ',\n    servings: ' + times[0] + ',\n    prepTime: ' + times[1] + ',\n    cookTime: ' + times[2];
      lines[i] = line + additional;
      replaced++;
    }
  }
}

fs.writeFileSync(outPath, lines.join('\\n'), "utf-8");
console.log("Updated " + replaced + " dishes.");
