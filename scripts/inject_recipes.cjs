const fs = require('fs');

const fixes = {
  "indo-martabak-manis": [
    "* 250g all-purpose Flour",
    "* 1 tsp Yeast",
    "* 50g Sugar",
    "* 300ml Water",
    "* 2 Chicken (Gallus gallus domesticus) eggs",
    "* Sweetened condensed milk & various toppings"
  ],
  "indo-martabak-telur": [
    "* Spring roll or martabak wrappers",
    "* 200g minced Meat (Beef or Mutton)",
    "* 3 stalks Scallions, chopped",
    "* 3 Chicken (Gallus gallus domesticus) eggs"
  ],
  "indo-klepon": [
    "* 250g Glutinous Rice (Oryza sativa) flour",
    "* 50ml Pandan (Pandanus amaryllifolius) juice",
    "* 100g Palm sugar",
    "* Grated Coconut (Cocos nucifera)"
  ],
  "indo-onde-onde": [
    "* 250g Glutinous Rice (Oryza sativa) flour",
    "* 100g Mung bean paste",
    "* White Sesame (Sesamum indicum) seeds"
  ],
  "indo-pisang-goreng": [
    "* 5 ripe Banana (Musa)",
    "* 150g all-purpose Flour",
    "* 2 tbsp Sugar",
    "* Water & Ice (for crispy batter)",
    "* Frying oil"
  ],
  "indo-kue-lapis": [
    "* 150g Cassava (Manihot esculenta) (Tapioca) flour",
    "* 150g Rice (Oryza sativa) flour",
    "* 800ml Coconut (Cocos nucifera) milk",
    "* 250g Sugar",
    "* Food coloring"
  ],
  "indo-lupis": [
    "* 300g Glutinous Rice (Oryza sativa)",
    "* Banana (Musa) leaves for wrapping",
    "* Grated Coconut (Cocos nucifera)",
    "* Palm sugar syrup"
  ],
  "indo-risoles": [
    "* Crepe wrappers (Flour, Milk, Eggs)",
    "* 1 Carrot (Daucus carota), diced",
    "* 150g shredded Chicken (Gallus gallus domesticus)",
    "* Bread crumbs & frying oil"
  ],
  "indo-lemper": [
    "* 300g Glutinous Rice (Oryza sativa)",
    "* 200ml Coconut (Cocos nucifera) milk",
    "* 200g shredded Chicken (Gallus gallus domesticus)",
    "* Banana (Musa) leaves for wrapping"
  ],
  "indo-serabi": [
    "* 200g Rice (Oryza sativa) flour",
    "* 500ml Coconut (Cocos nucifera) milk",
    "* 2 tbsp Sugar",
    "* Palm sugar syrup"
  ],
  "indo-dadar-gulung": [
    "* 150g all-purpose Flour",
    "* 50ml Pandan (Pandanus amaryllifolius) juice",
    "* 1 Chicken (Gallus gallus domesticus) egg",
    "* Grated Coconut (Cocos nucifera) mixed with Palm sugar"
  ],
  "indo-getuk": [
    "* 500g boiled Cassava (Manihot esculenta)",
    "* 100g Sugar",
    "* Grated Coconut (Cocos nucifera)"
  ],
  "indo-wingko-babat": [
    "* 250g Glutinous Rice (Oryza sativa) flour",
    "* 250g grated Coconut (Cocos nucifera)",
    "* 150g Sugar",
    "* 100ml Coconut (Cocos nucifera) milk"
  ],
  "indo-pastel": [
    "* Pastry dough (Flour, Margarine, Water, Ice)",
    "* 1 Carrot (Daucus carota), diced",
    "* 150g shredded Chicken (Gallus gallus domesticus)",
    "* Rice vermicelli"
  ],
  "indo-cireng": [
    "* 250g Cassava (Manihot esculenta) flour (Tapioca)",
    "* 2 Clove (Syzygium aromaticum) Garlic (Allium sativum), minced",
    "* 1 stalk Scallions, chopped",
    "* 200ml boiling Water",
    "* Frying oil"
  ],
  "indo-ayam-geprek": [
    "* 1 piece fried Chicken (Gallus gallus domesticus)",
    "* 2 Clove (Syzygium aromaticum) Garlic (Allium sativum)",
    "* 5-10 bird's eye Chili (Capsicum annuum)",
    "* Salt and seasoning"
  ],
  "indo-sate-taichan": [
    "* 200g Chicken (Gallus gallus domesticus) breast, cubed",
    "* Limes & Salt",
    "* 10 bird's eye Chili (Capsicum annuum)",
    "* 2 Clove (Syzygium aromaticum) Garlic (Allium sativum)",
    "* Skewers"
  ],
  "indo-seblak": [
    "* 100g raw tapioca Crackers, soaked",
    "* 1 piece Chicken (Gallus gallus domesticus) egg",
    "* 2 cm Kencur (Kaempferia galanga)",
    "* 2 Clove (Syzygium aromaticum) Garlic (Allium sativum)",
    "* 5 bird's eye Chili (Capsicum annuum)",
    "* Water and seasonings"
  ],
  "indo-nasi-kulit-crispy": [
    "* 100g Chicken (Gallus gallus domesticus) skin",
    "* Seasoned Flour batter",
    "* Warm white Rice (Oryza sativa)",
    "* Sambal"
  ],
  "indo-indomie-kreasi": [
    "* 1 pack instant Noodles",
    "* 50g corned Beef (Bos taurus)",
    "* 1 Chicken (Gallus gallus domesticus) egg",
    "* Cheese or other toppings"
  ],
  "indo-nasi-goreng-seafood-premium": [
    "* 2 cups cooked white Rice (Oryza sativa)",
    "* 150g premium Seafood (squid, prawns)",
    "* 2 tbsp Oyster sauce & Soy sauce",
    "* Spices (Garlic, shallots, chili)"
  ],
  "indo-dimsum-kekinian": [
    "* 200g minced Chicken (Gallus gallus domesticus) & shrimp",
    "* Dumpling wrappers",
    "* Mentai sauce (mayo, pollack roe)",
    "* Soy sauce & Tea for serving"
  ],
  "indo-batagor-kuah": [
    "* 150g Fish paste (tenggiri)",
    "* Dumpling wrappers & tofu",
    "* Chicken (Gallus gallus domesticus) or Beef (Bos taurus) broth",
    "* Chili (Capsicum annuum) and scallions"
  ],
  "indo-mie-pedas-level": [
    "* 1 portion fresh or instant Noodles",
    "* 10-20 bird's eye Chili (Capsicum annuum), pureed",
    "* Minced Chicken (Gallus gallus domesticus) topping",
    "* Chili oil"
  ],
  "indo-ayam-bakar-taliwang-modern": [
    "* 1 whole Chicken (Gallus gallus domesticus)",
    "* 1 tsp terasi (Shrimp (Caridea) paste)",
    "* 5 bird's eye Chili (Capsicum annuum)",
    "* Served with Rice (Oryza sativa)",
    "* Modern garnishes"
  ],
  "indo-boba-toast": [
    "* 2 slices thick Bread",
    "* 50g cooked Boba pearls",
    "* Sweet cream cheese or custard"
  ],
  "drink-boba-milk-tea": [
    "* 1 cup Black Tea (Camellia sinensis)",
    "* 2 tbsp Sugar & Syrup",
    "* 50ml Milk",
    "* 30g Boba (Cassava/Manihot esculenta pearls)",
    "* Ice cubes"
  ],
  "drink-brown-sugar-latte": [
    "* 30ml Brown Sugar Syrup",
    "* 150ml Milk",
    "* 30g Boba (Cassava/Manihot esculenta pearls)",
    "* Ice cubes"
  ],
  "drink-es-kepal-milo": [
    "* Shaved Ice",
    "* Chocolate Malt powder",
    "* Sweetened condensed Milk",
    "* Chocolate Syrup"
  ],
  "drink-tea-latte-lokal": [
    "* 1 cup brewed Tea (Camellia sinensis)",
    "* 50ml Milk",
    "* Cream Cheese & Sea Salt (for foam)",
    "* Ice cubes"
  ],
  "drink-kopi-dalgona": [
    "* 2 tbsp instant Coffee (Coffea)",
    "* 2 tbsp Sugar",
    "* 2 tbsp hot Water",
    "* 150ml Milk & Ice"
  ],
  "drink-thai-tea-fusion": [
    "* 1 cup strong Thai Tea (Camellia sinensis)",
    "* 50ml condensed Milk",
    "* Evaporated milk",
    "* Ice cubes"
  ],
  "drink-taro-latte": [
    "* 2 tbsp Taro (Colocasia esculenta) powder",
    "* 150ml Milk",
    "* Sugar Syrup",
    "* Ice cubes & Water"
  ],
  "drink-sparkling-pandan": [
    "* 1 shot Pandan (Pandanus amaryllifolius) extract",
    "* 200ml Sparkling Water",
    "* 1 tbsp Sugar Syrup",
    "* Ice cubes"
  ],
  "drink-es-kopi-susu-gula-aren": [
    "* 1 shot Espresso",
    "* 30ml Palm Sugar (Gula Aren) syrup",
    "* 150ml Milk",
    "* Ice cubes"
  ]
};

let dStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

for (const [id, ingArray] of Object.entries(fixes)) {
  const regex = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"recipe":\\s*")([^"]+)(")`, 'g');
  dStr = dStr.replace(regex, (match, prefix, recipeObj, suffix) => {
    // Current recipe text
    const idx = recipeObj.indexOf('### Instructions');
    if (idx !== -1) {
      const instructions = recipeObj.substring(idx);
      const newRecipe = '### Ingredients\\n' + ingArray.join('\\n') + '\\n\\n' + instructions;
      return prefix + newRecipe + suffix;
    }
    return match;
  });
}

fs.writeFileSync('src/data/dishes.ts', dStr, 'utf8');
console.log("Recipes injected!");
