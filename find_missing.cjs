const fs = require('fs');

const globalMapping = {
    "Oryza sativa glutinosa": "Glutinous Rice",
    "Oryza sativa": "Rice",
    "Gallus gallus domesticus": "Chicken",
    "Allium sativum": "Garlic",
    "Capsicum annuum": "Chili",
    "Caridea": "Shrimp",
    "Bos taurus": "Beef",
    "Cocos nucifera": "Coconut",
    "Cymbopogon citratus": "Lemongrass",
    "Zingiber officinale": "Ginger",
    "Alpinia galanga": "Galangal",
    "Curcuma longa": "Turmeric",
    "Coriandrum sativum": "Coriander",
    "Persea americana": "Avocado",
    "Artocarpus heterophyllus": "Jackfruit",
    "Salmo salar": "Salmon",
    "Camellia sinensis": "Tea",
    "Solanum lycopersicum": "Tomato",
    "Ocimum basilicum": "Basil",
    "Sus domesticus": "Pork",
    "Ananas comosus": "Pineapple",
    "Zea mays": "Corn",
    "Allium cepa": "Onion",
    "Cinnamomum verum": "Cinnamon",
    "Vanilla planifolia": "Vanilla",
    "Arachis hypogaea": "Peanut",
    "Tamarindus indica": "Tamarind",
    "Engraulidae": "Anchovy",
    "Brassica oleracea var. capitata": "Cabbage",
    "Solanum tuberosum": "Potato",
    "Capra hircus": "Goat",
    "Pandanus amaryllifolius": "Pandan",
    "Pangium edule": "Kluwak",
    "Vigna radiata": "Mung bean",
    "Scomberomorus": "Mackerel",
    "Manihot esculenta": "Cassava",
    "Triticum": "Wheat",
    "Tectona grandis": "Teak",
    "Clarias": "Catfish",
    "Ocimum × africanum": "Lemon basil",
    "Myristica fragrans": "Nutmeg",
    "Daucus carota": "Carrot",
    "Sesamum indicum": "Sesame",
    "Musa": "Banana",
    "Kaempferia galanga": "Kencur",
    "Theobroma cacao": "Cocoa",
    "Coffea": "Coffee",
    "Colocasia esculenta": "Taro",
    "Arenga pinnata": "Palm sugar",
    "Sechium edule": "Chayote",
    "Vigna unguiculata subsp. sesquipedalis": "Long bean",
    "Syzygium aromaticum": "Clove",
    "Tamarindus": "Tamarind",
    "Glycine max": "Soy"
};

const filePath = 'src/data/dishes.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Find all capitalized two-word names that might be scientific names
// but are not in the mapping.
const potentialScientificNames = content.match(/[A-Z][a-z]+ [a-z]+/g);
const uniqPotential = [...new Set(potentialScientificNames)];

const missing = uniqPotential.filter(name => {
    // Basic check if it looks like a scientific name (two words, first capitalized)
    // and if it's not in our mapping
    return !globalMapping[name] && !Object.values(globalMapping).map(v => v + " (*" + name + "*)").includes(name);
});

console.log('Missing potential scientific names:', missing);
