const fs = require('fs');

let fileStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

const badBlock = `  }],
    "recipe": "### Ingredients\\n* Rice\\n* Ice\\n* Rice (Oryza sativa)\\n\\n### Instructions\\n1. Combine Korean gochujang and Rice (Oryza sativa) cakes with Indonesian aromatic roots and sambals.",
    "nutrition": {
      "calories": "500 kcal",
      "carbohydrates": "75g",
      "protein": "15g",
      "fat": "15g"
    },
    "healthBenefits": "Fusion of different spices.",
    "excessRisks": "High sodium.",
    "servings": 2,
    "prepTime": 15,
    "cookTime": 20
  }],
    "recipe": "### Ingredients\\n* Sugar\\n* Pandan\\n* Pandan (Pandanus amaryllifolius)\\n\\n### Instructions\\n1. Take croissant dough infused with Pandan (Pandanus amaryllifolius), roll it in sugar, and cook it in a waffle maker until caramelized.",
    "nutrition": {
      "calories": "450 kcal",
      "carbohydrates": "50g",
      "protein": "6g",
      "fat": "25g"
    },
    "healthBenefits": "Pandan (Pandanus amaryllifolius) offers relaxation.",
    "excessRisks": "High sugar and saturated fat.",
    "servings": 2,
    "prepTime": 15,
    "cookTime": 20`;

if (fileStr.includes(badBlock)) {
    fileStr = fileStr.replace(badBlock, '');
    fs.writeFileSync('src/data/dishes.ts', fileStr, 'utf8');
    console.log('Fixed syntax perfectly.');
} else {
    console.log('Bad block not found!');
}
