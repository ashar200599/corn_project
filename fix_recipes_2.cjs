const fs = require('fs');

let content = fs.readFileSync('src/data/dishes.ts', 'utf8');

const regex = /(ingredients:\s*\[[\s\S]*?\][\s\S]*?recipe:\s*)([`"'])([\s\S]*?)\2/g;

let updatedContent = content.replace(regex, (match, prefix, quote, recipeText) => {
    // Standardize sections
    let newText = recipeText
        .replace(/\*\*(Ingredients):\*\*/g, '### Ingredients')
        .replace(/\*\*(Instructions):\*\*/g, '### Instructions');

    if (!newText.includes('Ingredients') || !newText.includes('Instructions')) {
        // Find ingredients from the prefix
        let ingredientsList = '';
        const ingredientsMatch = prefix.match(/ingredients:\s*\[([\s\S]*?)\]/);
        if (ingredientsMatch) {
            try {
                // simple extraction of "name", "quantity", "unit"
                const blocks = ingredientsMatch[1].match(/\{[^\}]*\}/g);
                if (blocks) {
                    blocks.forEach(block => {
                        const nameMatch = block.match(/"name":\s*"([^"]*)"/);
                        const qtyMatch = block.match(/"quantity":\s*"([^"]*)"/);
                        const unitMatch = block.match(/"unit":\s*"([^"]*)"/);
                        const quantity = qtyMatch && qtyMatch[1] ? qtyMatch[1] : '';
                        const unit = unitMatch && unitMatch[1] ? unitMatch[1] : '';
                        const name = nameMatch && nameMatch[1] ? nameMatch[1] : '';
                        ingredientsList += `* ${quantity} ${unit} ${name}\n`.trim() + '\n';
                    });
                }
            } catch (e) {}
        }
        if (!ingredientsList) ingredientsList = '* See ingredients list.\n';

        let sentences = newText.split('.').map(s => s.trim().replace(/\\n/g, '')).filter(s => s.length > 0);
        let instructionsText = '';
        sentences.forEach((s, idx) => {
            instructionsText += `${idx + 1}. ${s}.\n`;
        });

        newText = `\n### Ingredients\n${ingredientsList}\n### Instructions\n${instructionsText}`;
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
                    if (l.length > 10 && !/^\s*[*>-]\s/.test(l)) {
                        lines[i] = `${counter}. ${l}`;
                        counter++;
                    }
                }
                inst = lines.join('\n');
                newText = parts[0] + '### Instructions\n' + inst;
            }
        }
    }
    
    return `${prefix}\`${newText}\``;
});

fs.writeFileSync('src/data/dishes.ts', updatedContent, 'utf8');
console.log('Done!');
