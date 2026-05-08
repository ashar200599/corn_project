const fs = require('fs');

function finalize() {
    const filePath = 'src/data/dishes.ts';
    let content = fs.readFileSync(filePath, 'utf8');

    // Split by dish object start.
    const dishes = content.split(/\n\s+{/);
    const header = dishes.shift(); 
    
    const transformedDishes = dishes.map((dishRaw) => {
        let dish = '  {' + dishRaw.replace(/^\s*{\s*/, ''); // Clean up any duplicate {
        
        // Extract scientificNames - handle both quoted and unquoted keys
        // Use a more inclusive regex
        const snMatch = dish.match(/\b"?scientificNames"?\s*:\s*\[([\s\S]*?)\]/i);
        if (!snMatch) return dish;
        
        const snListRaw = snMatch[1];
        const ingredients = [...snListRaw.matchAll(/(?:"ingredient"|ingredient)\s*:\s*"(.*?)"/g)].map(m => m[1]);
        const names = [...snListRaw.matchAll(/(?:"name"|name)\s*:\s*"(.*?)"/g)].map(m => m[1]);
        const scientificNames = ingredients.map((ing, i) => ({ ingredient: ing, name: names[i] }));

        if (scientificNames.length === 0) return dish;

        // Sort by length descending to avoid partial matches
        scientificNames.sort((a, b) => b.ingredient.length - a.ingredient.length);

        const replaceInString = (str) => {
            let result = str;
            for (const sn of scientificNames) {
                const escapedIng = sn.ingredient.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                
                // Match plural and generic forms
                // If it ends with s or es, replace the whole thing
                const pluralRegex = new RegExp(`\\b${escapedIng}(?:es|s)\\b`, 'gi');
                result = result.replace(pluralRegex, sn.name);
                
                const singularRegex = new RegExp(`\\b${escapedIng}\\b`, 'gi');
                result = result.replace(singularRegex, sn.name);

                // If word boundary doesn't work (e.g. in middle of word or with punctuation), just replace the string
                // But only if it's not already a scientific name (simple check)
                if (result === str) {
                    const fallbackRegex = new RegExp(escapedIng, 'gi');
                    result = result.replace(fallbackRegex, sn.name);
                }
            }
            return result;
        };

        // Transform ingredients array if it exists
        dish = dish.replace(/\b"?name"?\s*:\s*"(.*?)"/g, (match, name) => {
            const hasQuote = match.startsWith('"');
            const key = hasQuote ? '"name"' : 'name';
            return `${key}: "${replaceInString(name)}"`;
        });

        // Transform recipe string
        dish = dish.replace(/\b"?recipe"?\s*:\s*`([\s\S]*?)`/g, (match, recipe) => {
            const hasQuote = match.startsWith('"');
            const key = hasQuote ? '"recipe"' : 'recipe';
            return `${key}: \`${replaceInString(recipe)}\``;
        });

        return dish;
    });

    let newContent = header + '\n  ' + transformedDishes.join('\n  ').replace(/\n\s+\n/g, '\n');
    
    // Final cleanup of common artifacts
    const fixes = [
        ["Gallus gallus domesticuss", "Gallus gallus domesticus"],
        ["Capsicum annuumes", "Capsicum annuum"],
        ["Capsicum annuums", "Capsicum annuum"],
        ["Syzygium aromaticums", "Syzygium aromaticum"],
        ["Allium sativums", "Allium sativum"],
        ["Oryza sativas", "Oryza sativa"],
        ["Glycine maxes", "Glycine max"],
        ["Glycine maxs", "Glycine max"],
        ["Carideas", "Caridea"],
        ["Carideaes", "Caridea"],
        ["Bos tauruss", "Bos taurus"],
        ["Sus domesticuss", "Sus domesticus"],
        ["Persea americanas", "Persea americana"],
        ["Salmo salars", "Salmo salar"],
        ["Camellia sinensiss", "Camellia sinensis"],
        ["Solanum lycopersicums", "Solanum lycopersicum"],
        ["Zea mayses", "Zea mays"],
        ["Zea mayss", "Zea mays"],
        ["Ananas comosuss", "Ananas comosus"]
    ];

    for (const [wrong, right] of fixes) {
        newContent = newContent.split(wrong).join(right);
    }
    
    // Fix the double { again if any
    newContent = newContent.replace(/{\s+{/g, '{');

    fs.writeFileSync(filePath, newContent);
    console.log('Successfully finalized src/data/dishes.ts');
}

finalize();
