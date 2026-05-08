const fs = require('fs');

function applyScientificNames() {
    const filePath = 'src/data/dishes.ts';
    let content = fs.readFileSync(filePath, 'utf8');

    // Split by dish object start.
    // Dishes start with { and end with }, or }, 
    // They are usually indented with 2 or 4 spaces.
    
    // Let's use a split that looks for the start of a dish object.
    const dishes = content.split(/\n\s+{/);
    const header = dishes.shift(); 
    
    const transformedDishes = dishes.map((dishRaw) => {
        let dish = '  {' + dishRaw;
        
        // Extract scientificNames - handle both quoted and unquoted keys
        const snMatch = dish.match(/scientificNames:\s*\[([\s\S]*?)\]/) || dish.match(/"scientificNames":\s*\[([\s\S]*?)\]/);
        if (!snMatch) return dish;
        
        const snListRaw = snMatch[1];
        const snRegex = /(?:ingredient|"ingredient"):\s*"(.*?)",\s*(?:name|"name"):\s*"(.*?)"/g;
        const scientificNames = [];
        let m;
        while ((m = snRegex.exec(snListRaw)) !== null) {
            scientificNames.push({ ingredient: m[1], name: m[2] });
        }

        if (scientificNames.length === 0) return dish;

        // Sort by length descending to avoid partial matches
        scientificNames.sort((a, b) => b.ingredient.length - a.ingredient.length);

        const replaceInString = (str) => {
            let result = str;
            for (const sn of scientificNames) {
                const escapedIng = sn.ingredient.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                
                // 1. Try to match plural form (adding 's' or 'es' or 'ies'?)
                // For now just 's' and 'es'
                const pluralRegex = new RegExp(`(${escapedIng}es|${escapedIng}s)`, 'gi');
                result = result.replace(pluralRegex, sn.name);
                
                // 2. Match singular with word boundary if possible, or just the string
                const singularRegex = new RegExp(escapedIng, 'gi');
                result = result.replace(singularRegex, sn.name);
            }
            return result;
        };

        // Transform ingredients array if it exists
        dish = dish.replace(/(?:"name"|name):\s*"(.*?)"/g, (match, name) => {
            const quote = match.startsWith('"') ? '"' : '';
            const key = quote ? '"name"' : 'name';
            return `${key}: "${replaceInString(name)}"`;
        });

        // Transform recipe string
        dish = dish.replace(/(?:"recipe"|recipe):\s*`([\s\S]*?)`/g, (match, recipe) => {
            const quote = match.startsWith('"') ? '"' : '';
            const key = quote ? '"recipe"' : 'recipe';
            return `${key}: \`${replaceInString(recipe)}\``;
        });

        return dish;
    });

    const newContent = header + transformedDishes.join('\n  {');
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully updated scientific names in src/data/dishes.ts');
}

applyScientificNames();
