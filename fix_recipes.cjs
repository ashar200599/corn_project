const fs = require('fs');
const content = fs.readFileSync('src/data/dishes.ts', 'utf8');

// Match all objects in the DISHES array. 
// We will replace the "recipe" fields.
let updatedContent = content;

const regex = /(recipe:\s*)([`"'])([\s\S]*?)\2/g;

updatedContent = updatedContent.replace(regex, (match, prefix, quote, recipeText) => {
    if (!recipeText.includes('Ingredients') || !recipeText.includes('Instructions')) {
        // Form a new recipe markdown
        // If it's a short string like "Mix flour..."
        const sentences = recipeText.split('.').map(s => s.trim()).filter(s => s.length > 0);
        let instructionsText = '';
        sentences.forEach((s, idx) => {
            instructionsText += `${idx + 1}. ${s}.\n`;
        });
        
        const newRecipe = `\n### Ingredients\n* See ingredients list.\n\n### Instructions\n${instructionsText}`;
        console.log("Updated a short recipe.");
        return `recipe: \`${newRecipe}\``;
    } else {
        // Replace **Ingredients:** and **Instructions:** with ### Ingredients and ### Instructions if any
        let newT = recipeText.replace(/\*\*(Ingredients|Instructions):\*\*/g, '### $1');
        
        // Let's also check if the instructions are numbered.
        const instructionsParts = newT.split('### Instructions');
        if (instructionsParts.length > 1) {
            let inst = instructionsParts[1];
            // Split by lines
            let lines = inst.split('\n');
            let isNumbered = lines.some(l => /^\s*\d+\.\s/.test(l));
            if (!isNumbered) {
                // Number them
                let counter = 1;
                for (let i = 0; i < lines.length; i++) {
                    let l = lines[i].trim();
                    if (l.length > 10 && !/^\s*[*>-]\s/.test(l)) { // if not empty and not empty-ish
                        lines[i] = `${counter}. ${l}`;
                        counter++;
                    }
                }
                inst = lines.join('\n');
                newT = instructionsParts[0] + '### Instructions' + inst;
                console.log("Numbered instructions for a recipe.");
            }
        }

        return `recipe: \`${newT}\``;
    }
});

fs.writeFileSync('src/data/dishes.ts', updatedContent, 'utf8');
console.log('Modified dishes.ts');
