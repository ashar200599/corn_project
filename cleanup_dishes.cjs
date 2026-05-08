const fs = require('fs');

function cleanup() {
    const filePath = 'src/data/dishes.ts';
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix the double braces mess
    // Patterns like:
    //   {  {
    //   {  { ingredient: ...
    content = content.replace(/\s+{\s+{/g, '\n  {');
    // Also handle possible duplicates from my faulty join
    content = content.replace(/\n  {\n  {/g, '\n  {');

    // 2. Fix the double 's' at the end of scientific names
    // This is tricky but we can target the known ones or use a general rule.
    // Most scientific names here end in 'a', 'us', 'um', 'ix', etc.
    // If it ends in 'us' and followed by another 's', it's likely a plural residue.
    
    // Identified artifacts:
    // Gallus gallus domesticuss -> Gallus gallus domesticus
    // Capsicum annuumes -> Capsicum annuum (wait, plural of chili was chilies or chilis?)
    // Capsicum annuum + es if the original was chilies.
    
    // Let's manually fix the most obvious ones.
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
        const regex = new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        content = content.replace(regex, right);
    }

    fs.writeFileSync(filePath, content);
    console.log('Successfully cleaned up src/data/dishes.ts');
}

cleanup();
