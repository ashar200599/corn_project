const fs = require('fs');
let code = fs.readFileSync('src/data/dishes.ts', 'utf8');

code = code.replace(/(?:(["'])?image\1?\s*:\s*)(["'])(.+?)\2/g, (match, quoteKey, quoteVal, url, offset, string) => {
    if (url === 'string') return match; // skip interface

    // Extract the dish name
    const upToHere = string.substring(0, offset);
    // Find the last "name" field
    const nameMatches = [...upToHere.matchAll(/(?:(["'])?name\1?\s*:\s*)(["'])(.+?)\2/g)];
    let name = "dish";
    if (nameMatches.length > 0) {
        name = nameMatches[nameMatches.length - 1][3];
    }
    
    if (name === "string") return match;

    const prompt = `Delicious high quality food photography professional culinary shot of ${name}`;
    const newUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=400&nologo=true`;
    
    const keyStr = quoteKey ? `${quoteKey}image${quoteKey}` : 'image';
    return `${keyStr}: "${newUrl}"`;
});

fs.writeFileSync('src/data/dishes.ts', code);
console.log("Updated images.");
