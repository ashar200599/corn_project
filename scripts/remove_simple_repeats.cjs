const fs = require('fs');

let fileStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

const recipeRegex = /"recipe":\s*"### Ingredients\\n([\s\S]*?)\\n\\n### Instructions/g;

fileStr = fileStr.replace(recipeRegex, (match, ingredientsBlock) => {
    const lines = ingredientsBlock.split('\\n');
    let linesToKeep = [];
    
    for (let i = 0; i < lines.length; i++) {
        const lineA = lines[i].replace(/^[-*]\s*/, '').trim();
        if (!lineA) continue;
        
        let shouldRemove = false;
        
        // If lineA DOES NOT have a parentheses
        if (!lineA.includes('(')) {
            for (let j = 0; j < lines.length; j++) {
                if (i === j) continue;
                const lineB = lines[j].replace(/^[-*]\s*/, '').trim();
                
                // If lineB has parentheses and starts with lineA
                if (lineB.includes('(') && lineB.toLowerCase().includes(lineA.toLowerCase())) {
                    shouldRemove = true;
                    break;
                }
            }
        }
        
        if (!shouldRemove) {
            linesToKeep.push(lines[i]);
        }
    }
    
    return `"recipe": "### Ingredients\\n${linesToKeep.join('\\n')}\\n\\n### Instructions`;
});

fs.writeFileSync('src/data/dishes.ts', fileStr, 'utf8');
console.log('Fixed simple repeats.');
