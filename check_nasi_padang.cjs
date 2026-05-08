const fs = require('fs');
const filePath = 'src/data/dishes.ts';
const content = fs.readFileSync(filePath, 'utf8');
const dishes = content.split(/\n\s+{/);
console.log('Total dishes split:', dishes.length);
const nasiPadang = dishes.find(d => d.includes('indo-nasi-padang'));
if (nasiPadang) {
    console.log('Found Nasi Padang block');
    console.log('Block start:', nasiPadang.substring(0, 500));
    const snMatch = nasiPadang.match(/(?:"scientificNames"|scientificNames)\s*:\s*\[([\s\S]*?)\]/);
    if (snMatch) {
        console.log('Found scientificNames block');
        const snListRaw = snMatch[1];
        const snRegex = /(?:ingredient|"ingredient"):\s*"(.*?)",\s*(?:name|"name"):\s*"(.*?)"/g;
        let m;
        while ((m = snRegex.exec(snListRaw)) !== null) {
            console.log(`Found mapping: ${m[1]} -> ${m[2]}`);
        }
    } else {
        console.log('Could not find scientificNames block in Nasi Padang');
    }
} else {
    console.log('Could not find Nasi Padang block');
}
