const fs = require('fs');

const mappings = {
    'id-bir-pletok': '/fonts/images/dishes/indo_beverages_traditioanl/indo_bir_pletok.png',
    'id-bandrek': '/fonts/images/dishes/indo_beverages_traditioanl/indo_bandrek.png',
    'indo-bandrek': '/fonts/images/dishes/indo_beverages_traditioanl/indo_bandrek.png',
    'indo-ayam-geprek': '/fonts/images/dishes/indo_food_modern/indo_ayam_geprek.png',
    'indo-sate-taichan': '/fonts/images/dishes/indo_food_modern/indo_sate_taichan.png',
    'indo-seblak': '/fonts/images/dishes/indo_food_modern/indo_seblak.png',
    'indo-nasi-kulit-crispy': '/fonts/images/dishes/indo_food_modern/indo_ayam_crispy.png',
    'indo-indomie-kreasi': '/fonts/images/dishes/indo_food_modern/indo_indomie_goreng_kreasi.png',
    'indo-dimsum-kekinian': '/fonts/images/dishes/indo_food_modern/indo_dimsum_kekinian.png',
    'indo-batagor-kuah': '/fonts/images/dishes/indo_food_modern/indo_batagor.png',
    'indo-mie-pedas-level': '/fonts/images/dishes/indo_food_modern/indo_mie_pedas.png'
};

const fileList = [
    'src/data/dishes.ts',
    'src/data/indonesiaBeverages.ts'
];

for (const filePath of fileList) {
    if (!fs.existsSync(filePath)) continue;
    let fileStr = fs.readFileSync(filePath, 'utf8');

    for (const [id, imagePath] of Object.entries(mappings)) {
        const idRegex = new RegExp(`"id":\\s*"${id}"[\\s\\S]*?"image":\\s*"([^"]+)"`);
        
        fileStr = fileStr.replace(idRegex, (match, currentImage) => {
            return match.replace(`"image": "${currentImage}"`, `"image": "${imagePath}"`);
        });
    }

    fs.writeFileSync(filePath, fileStr, 'utf8');
}

console.log("Images updated successfully!");
