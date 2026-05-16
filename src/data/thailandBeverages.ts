import { Dish } from './dishes';

export const THAILAND_TRADITIONAL_BEVERAGES: Dish[] = [
  {
    id: "th-cha-yen",
    name: "Cha Yen (Thai Iced Tea)",
    variations: ["With Milk", "Without Milk (Cha Dum Yen)", "With Boba"],
    desc: "A strongly brewed black tea spiced with star anise, crushed tamarind, and cardamom, sweetened and served over ice with condensed milk.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20photography%20of%20Cha%20Yen%20Thai%20Iced%20Tea%20in%20a%20tall%20glass?width=600&height=400&nologo=true",
    emoji: "🧋",
    country: "Thailand",
    style: "Traditional",
    category: "Beverage",
    scientificNames: [
      { ingredient: "Tea", name: "Camellia sinensis" },
      { ingredient: "Star Anise", name: "Illicium verum" }
    ],
    recipe: "### Ingredients\n* 2 tbsp Thai Black Tea Mix (Camellia sinensis)\n* 1 Star Anise (Illicium verum)\n* 2 tbsp Sweetened Condensed Milk\n* 1 tbsp Evaporated Milk\n* Sugar to taste\n* Crushed Ice\n\n### Instructions\n1. Brew the Thai black tea with star anise in hot water for 5 minutes.\n2. Strain the tea leaves and stir in sugar and sweetened condensed milk while hot.\n3. Pour over a glass filled with crushed ice.\n4. Top with evaporated milk before serving.",
    nutrition: {
      calories: "220 kcal",
      carbohydrates: "35g",
      protein: "4g",
      fat: "6g"
    }
  },
  {
    id: "th-oliang",
    name: "Oliang (Thai Iced Coffee)",
    variations: ["Black (Oliang)", "With Milk (Kafae Boran)", "With Condensed Milk"],
    desc: "A traditional Thai iced coffee brewed from a blend of Robusta coffee beans, roasted corn, soybeans, and sesame seeds.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20photography%20of%20Oliang%20Thai%20Iced%20Coffee?width=600&height=400&nologo=true",
    emoji: "🧊",
    country: "Thailand",
    style: "Traditional",
    category: "Beverage",
    scientificNames: [
      { ingredient: "Coffee", name: "Coffea canephora" },
      { ingredient: "Corn", name: "Zea mays" }
    ],
    recipe: "### Ingredients\n* 3 tbsp Oliang powder (blend of Coffea canephora, Zea mays, soybeans)\n* 1 cup Boiling Water\n* 2 tbsp Sugar\n* Ice\n\n### Instructions\n1. Add Oliang powder to a traditional Thai coffee filter (tung tom kafe) and place over a pitcher.\n2. Pour boiling water through the powder and let it steep for several minutes.\n3. Add sugar and stir until dissolved.\n4. Pour over a glass full of ice.",
    nutrition: {
      calories: "90 kcal",
      carbohydrates: "22g",
      protein: "1g",
      fat: "0g"
    }
  },
  {
    id: "th-nam-takhrai",
    name: "Nam Takhrai (Lemongrass Tea)",
    variations: ["Hot Lemongrass Tea", "Iced Lemongrass", "Lemongrass Pandan"],
    desc: "A refreshing, aromatic traditional herbal drink made by boiling lemongrass stalks, often sweetened with sugar or honey.",
    image: "https://image.pollinations.ai/prompt/Delicious%20refreshing%20glass%20of%20Nam%20Takhrai%20Lemongrass%20Tea%20with%20ice?width=600&height=400&nologo=true",
    emoji: "🌱",
    country: "Thailand",
    style: "Traditional",
    category: "Beverage",
    scientificNames: [
      { ingredient: "Lemongrass", name: "Cymbopogon citratus" }
    ],
    recipe: "### Ingredients\n* 3 stalks Lemongrass (Cymbopogon citratus)\n* 4 cups Water\n* Sugar or Honey to taste\n* Lime wedges (optional)\n\n### Instructions\n1. Wash and lightly bruise the lemongrass stalks.\n2. Boil the water, add the lemongrass, and simmer for 10-15 minutes.\n3. Remove from heat, strain out the stalks, and sweeten with sugar or honey.\n4. Serve hot or chilled over ice, optionally with a squeeze of lime.",
    nutrition: {
      calories: "45 kcal",
      carbohydrates: "12g",
      protein: "0g",
      fat: "0g"
    }
  }
];
