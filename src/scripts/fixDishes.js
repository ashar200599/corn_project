import fs from 'fs';
import path from 'path';
const file = path.resolve(process.cwd(), 'src/data/dishes.ts');
let content = fs.readFileSync(file, 'utf8');

// The script added things like:
// ,\n  "servings": 2,\n  "prepTime": 15,\n  "cookTime": 20
// right after 'excessRisks: "..."' or similar.
// But some got injected into recipe: "### Instructions,
// Let's just fix the broken literal at line 2543.

content = content.replace(/"### Instructions,\n\s*"servings": \d+,\n\s*"prepTime": \d+,\n\s*"cookTime": \d+\\n/, '"### Instructions\\n');
// Let's find all instances of ',\n  "servings"' inside "recipe: "..."
// Actually it's easier to find '"servings":' and just see if there's syntax errors.
// Let's write a program that uses regex to find broken literals.
// Wait, the string was:
// recipe: "### Instructions,
//   "servings": 2,
//   "prepTime": 15,
//   "cookTime": 20\n1. Prepare sushi rice.\n2. Shape rice.\n3. Add toppings.",
// So I will replace it.
content = content.replace(/recipe: "### Instructions,\n\s*"servings": \d+,\n\s*"prepTime": \d+,\n\s*"cookTime": \d+\\n/g, 'recipe: "### Instructions\\n');
content = content.replace(/recipe: "### Instructions,\\n\s*"servings": \d+,\\n\s*"prepTime": \d+,\\n\s*"cookTime": \d+\\n/g, 'recipe: "### Instructions\\n');
content = content.replace(/recipe: "### Instructions,\n\s*servings: \d+,\n\s*prepTime: \d+,\n\s*cookTime: \d+\\n/g, 'recipe: "### Instructions\\n');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed file.');
