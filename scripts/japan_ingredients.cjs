const fs = require('fs');

const jpIngredients = {
  "jp-sushi": [
    "* 2 cups Sushi Rice (Oryza sativa)",
    "* 3 tbsp Rice Vinegar",
    "* Fresh Fish (Tuna, Salmon, or Whitefish)",
    "* Nori (Seaweed) sheets",
    "* Wasabi and Soy sauce"
  ],
  "jp-sashimi": [
    "* Fresh, sushi-grade Fish (Tuna, Salmon, Yellowtail)",
    "* Daikon radish, shredded",
    "* Shiso leaves",
    "* Soy sauce and Wasabi"
  ],
  "jp-ramen": [
    "* 2 portions Ramen noodles",
    "* 4 cups Pork or Chicken broth",
    "* 2 tbsp Miso or Soy sauce base (Tare)",
    "* Chashu (Braised Pork belly)",
    "* Soft-boiled egg (Ajitsuke Tamago)",
    "* Scallions and Nori"
  ],
  "jp-udon": [
    "* 2 portions Udon noodles",
    "* 4 cups Dashi broth",
    "* 2 tbsp Soy sauce",
    "* 1 tbsp Mirin",
    "* Kamaboko (Fish Cake)",
    "* Scallions and Tempura flakes"
  ],
  "jp-soba": [
    "* 2 portions Soba (Buckwheat) noodles",
    "* Tsuyu (Dipping sauce: Dashi, Soy sauce, Mirin)",
    "* Scallions",
    "* Wasabi",
    "* Nori strips"
  ],
  "jp-tempura": [
    "* Prawns and mixed vegetables (Sweet potato, Eggplant)",
    "* 1 cup Tempura flour (or Cake flour and cornstarch)",
    "* 1 cup Ice water",
    "* Frying oil",
    "* Tentsuyu (Tempura dipping sauce)"
  ],
  "jp-tonkatsu": [
    "* 2 Pork loin cutlets",
    "* Salt and Pepper",
    "* Flour, Egg, and Panko breadcrumbs",
    "* Frying oil",
    "* Shredded cabbage and Tonkatsu sauce"
  ],
  "jp-yakitori": [
    "* 300g Chicken thigh, cut into pieces",
    "* Scallions (Tokyo Negi)",
    "* Bamboo skewers",
    "* Yakitori sauce (Soy sauce, Mirin, Sake, Sugar) or Salt"
  ],
  "jp-sukiyaki": [
    "* Thinly sliced Beef (Miyazaki or Wagyu)",
    "* Tofu, Negi (Scallions), Mushrooms (Shiitake, Enoki)",
    "* Shirataki noodles",
    "* Sukiyaki sauce (Soy sauce, Sugar, Sake, Mirin)",
    "* Raw egg for dipping"
  ],
  "jp-shabu": [
    "* Thinly sliced Beef or Pork",
    "* mixed Vegetables (Cabbage, Mushrooms, Carrots)",
    "* Kombu (Kelp) broth",
    "* Ponzu sauce and Sesame sauce for dipping"
  ],
  "jp-miso": [
    "* 4 cups Dashi broth",
    "* 3 tbsp Miso paste",
    "* Silken Tofu, cubed",
    "* Wakame (Dried seaweed)",
    "* Scallions"
  ],
  "jp-onigiri": [
    "* 2 cups cooked Japanese short-grain Rice (Oryza sativa)",
    "* Salt",
    "* Fillings (Salted salmon, Tuna mayo, or Pickled plum)",
    "* Nori (Seaweed) strips"
  ],
  "jp-takoyaki": [
    "* 1 cup Takoyaki flour mix",
    "* 1 or 2 Eggs and Water",
    "* Boiled Octopus (Tako), cubed",
    "* Tenkasu (Tempura flakes), pickled red ginger, scallions",
    "* Takoyaki sauce, Mayo, Bonito flakes, Aonori"
  ],
  "jp-okonomiyaki": [
    "* 1 cup Okonomiyaki flour",
    "* 1 Egg and Water or Dashi",
    "* 2 cups shredded Cabbage",
    "* Pork belly slices",
    "* Okonomiyaki sauce, Mayo, Bonito flakes, Aonori"
  ],
  "jp-gyoza": [
    "* 1 pack Gyoza wrappers",
    "* 200g Minced Pork",
    "* 1 cup finely chopped Cabbage",
    "* Garlic, Ginger, Soy sauce, Sesame oil",
    "* Frying oil and Water for steaming"
  ],
  "jp-yakisoba": [
    "* 2 portions Yakisoba noodles",
    "* 100g sliced Pork belly",
    "* Cabbage, Carrots, Bean sprouts",
    "* Yakisoba sauce",
    "* Aonori and Pickled red ginger"
  ],
  "jp-karaage": [
    "* 300g Chicken thigh, cut into pieces",
    "* Marinade (Soy sauce, Sake, Ginger, Garlic)",
    "* Potato starch or Cornstarch",
    "* Frying oil",
    "* Lemon wedges"
  ],
  "jp-mochi": [
    "* 2 cups Glutinous Rice (Oryza sativa) flour (Mochiko/Shiratamako)",
    "* 1/4 cup Sugar",
    "* 1 cup Water",
    "* Potato starch (for dusting)",
    "* Sweet Red Bean paste (Anko) or Ice cream for filling"
  ],
  "jp-matcha": [
    "* 1 tsp Ceremonial grade Matcha powder",
    "* 2 oz Hot water (around 175°F/80°C)",
    "* (Optional) Wagashi (traditional Japanese sweets) to serve with"
  ],
  "jp-tea": [
    "* 1 tbsp loose leaf Green Tea (Sencha, Genmaicha, or Hojicha)",
    "* Hot water (temperature varies by tea type)"
  ]
};

let dStr = fs.readFileSync('src/data/dishes.ts', 'utf8');

for (const [id, ingArray] of Object.entries(jpIngredients)) {
  const regex = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"recipe":\\s*")([^"]+)(")`, 'g');
  dStr = dStr.replace(regex, (match, prefix, recipeObj, suffix) => {
    // If the recipe already has "### Ingredients"
    if (recipeObj.includes("### Ingredients")) {
      // Just check if it has valid stuff. If it has less than 5 lines, we can replace it.
      const ingredientsSection = recipeObj.split('### Instructions')[0];
      const lines = ingredientsSection.split('\\n').filter(l => l.trim().length > 0 && !l.includes('###'));
      if (lines.length >= 3) {
        return match; // It's fine
      }
    }
    
    // Replace by prefixing Ingredients
    // It might only have "### Instructions" or be completely empty.
    let newRecipe = '';
    const ingSection = '### Ingredients\\n' + ingArray.join('\\n') + '\\n\\n';
    
    const idx = recipeObj.indexOf('### Instructions');
    if (idx !== -1) {
      newRecipe = ingSection + recipeObj.substring(idx);
    } else {
      // It has no instructions section?
      newRecipe = ingSection + "### Instructions\\n1. Prepare and combine the ingredients according to traditional Japanese culinary techniques.";
    }
    
    return prefix + newRecipe + suffix;
  });
}

fs.writeFileSync('src/data/dishes.ts', dStr, 'utf8');
console.log("Japanese recipes updated!");
