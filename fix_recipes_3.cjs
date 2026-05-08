const fs = require('fs');

let content = fs.readFileSync('src/data/dishes.ts', 'utf8');

const regex = /("?recipe"?\s*:\s*)([`"'])([\s\S]*?)\2/g;

let updatedContent = content.replace(regex, (match, prefix, quote, recipeText) => {
    // Standardize sections
    let newText = recipeText
        .replace(/\*\*(Ingredients):\*\*/gi, '### Ingredients')
        .replace(/\*\*(Instructions):\*\*/gi, '### Instructions');

    if (!newText.includes('### Ingredients') || !newText.includes('### Instructions')) {
        let sentences = newText
            .replace(/### Ingredients/g, '')
            .replace(/### Instructions/g, '')
            .split('.')
            .map(s => s.trim().replace(/\\n/g, '').replace(/\n/g, ''))
            .filter(s => s.length > 0);
            
        let instructionsText = '';
        sentences.forEach((s, idx) => {
            instructionsText += `${idx + 1}. ${s}.\n`;
        });

        newText = `\n### Ingredients\n* Full ingredients listed below/above.\n\n### Instructions\n${instructionsText}`;
    } else {
        // Ensure instructions are numbered
        const parts = newText.split('### Instructions');
        if (parts.length > 1) {
            let inst = parts[1];
            let lines = inst.split('\\n');
            if (lines.length <= 1) lines = inst.split('\n'); // try actual newline
            let isNumbered = lines.some(l => /^\s*\d+\.\s/.test(l));
            if (!isNumbered) {
                let counter = 1;
                for (let i = 0; i < lines.length; i++) {
                    let l = lines[i].trim();
                    if (l.length > 5 && !/^\s*[*>-]\s/.test(l) && !/^\s*\d+\.\s/.test(l)) {
                        lines[i] = `${counter}. ${l}`;
                        counter++;
                    }
                }
                inst = lines.join('\n');
                newText = parts[0] + '### Instructions\n' + inst;
            }
        }
    }
    
    // Always use backticks for the recipe so we can use newlines
    // Escape any backticks inside the text just in case
    newText = newText.replace(/`/g, '\\`');
    
    return `${prefix}\`${newText}\``;
});

fs.writeFileSync('src/data/dishes.ts', updatedContent, 'utf8');
console.log('Done!');
