export interface ScientificName {
  ingredient: string;
  name: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: number | string;
  unit: string;
}

export interface Dish {
  id: string;
  name: string;
  desc: string;
  image: string;
  emoji: string;
  country: string;
  style: 'Traditional' | 'Modern';
  category: 'Food' | 'Beverage';
  scientificNames: ScientificName[];
  ingredients?: RecipeIngredient[];
  recipe: string;
  nutrition: {
    calories: string;
    protein: string;
    carbohydrates: string;
    fat: string;
  };
  healthBenefits: string;
  excessRisks: string;
  tags?: string[];
  variations?: string[];
}

export const DISHES: Dish[] = [
  {
    id: "indo-nasi-goreng",
    variations: ["Nasi Goreng Seafood","Nasi Goreng Kambing","Nasi Goreng Gila"],
    name: "Nasi Goreng",
    ingredients: [  {
        "name": "cooked white Rice (Oryza sativa) (day-old preferred)",
        "quantity": "2",
        "unit": "cups"
      },
    {
        "name": "Gallus gallus domesticus",
        "quantity": "2",
        "unit": ""
      },
    {
        "name": "Garlic (Allium sativum), minced",
        "quantity": "3",
        "unit": "Clove (Syzygium aromaticum)"
      },
    {
        "name": "shallots, minced",
        "quantity": "2",
        "unit": ""
      },
    {
        "name": "kecap manis (sweet soy sauce)",
        "quantity": "2",
        "unit": "tbsp"
      },
    {
        "name": "soy sauce",
        "quantity": "1",
        "unit": "tbsp"
      },
    {
        "name": "Shrimp (Caridea) paste (terasi)",
        "quantity": "1",
        "unit": "tsp"
      },
    {
        "name": "red Chili (Capsicum annuum), sliced",
        "quantity": "2",
        "unit": ""
      },
    {
        "name": "cooking oil",
        "quantity": "2",
        "unit": "tbsp"
      },
    {
        "name": "Salt & pepper to taste",
        "quantity": "",
        "unit": ""
      },
    {
        "name": "Toppings: fried Chicken (Gallus gallus domesticus), cucumber slices, prawn crackers, fried shallots",
        "quantity": "",
        "unit": ""
      }
    ],
    desc: "Classic Indonesian fried Rice (Oryza sativa) with sweet soy sauce, shallot, Garlic (Allium sativum), Tamarind (Tamarindus indica) and Chili (Capsicum annuum).",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Toppings%3A%20fried%20egg%2C%20cucumber%20slices%2C%20prawn%20crackers%2C%20fried%20shallots?width=600&height=400&nologo=true",
    emoji: "🍛",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
    { ingredient: "Rice", name: "Oryza sativa" },
    { ingredient: "Garlic", name: "Allium sativum" },
    { ingredient: "Chili", name: "Capsicum annuum" },
    { ingredient: "Shrimp", name: "Caridea" },
    { ingredient: "Soy", name: "Glycine max" },
    { ingredient: "Chicken", name: "Gallus gallus domesticus" },
    { ingredient: "Clove", name: "Syzygium aromaticum" }
    ],
    recipe: `
\n### Nasi Goreng
**Servings:** 2 | **Prep:** 10 min | **Cook:** 15 min

### Ingredients
- 2 cups cooked white Rice (Oryza sativa) (day-old preferred)
- 2 Chicken (Gallus gallus domesticus)
- 3 Clove (Syzygium aromaticum) Garlic (Allium sativum), minced
- 2 shallots, minced
- 2 tbsp kecap manis (sweet soy sauce)
- 1 tbsp soy sauce
- 1 tsp Shrimp (Caridea) paste (terasi)
- 2 red Chili (Capsicum annuum), sliced
- 2 tbsp cooking oil
- Salt & pepper to taste
- Toppings: fried Chicken (Gallus gallus domesticus), cucumber slices, prawn crackers, fried shallots

### Instructions
1. Heat oil in a wok over high heat.
2. Sauté Garlic (Allium sativum) and shallots until fragrant (1–2 min).
3. Add Shrimp (Caridea) paste and Chili (Capsicum annuum), stir for 30 seconds.
4. Push to the side, crack Chicken (Gallus gallus domesticus) into wok, scramble until half-cooked.
5. Add Rice (Oryza sativa), mix everything together vigorously.
6. Add kecap manis and soy sauce, stir-fry for 3–4 minutes.
7. Season with salt and pepper.
8. Serve topped with fried Chicken (Gallus gallus domesticus), cucumber, and crackers.\n`,
    nutrition: { calories: "450 kcal", carbohydrates: "60g", protein: "12g", fat: "15g" },
    healthBenefits: "Provides essential carbohydrates for energy. Garlic (Allium sativum) and shallots offer mild antioxidant and anti-inflammatory benefits.",
    excessRisks: "Excessive consumption of carbs and saturated fats (if fried with excessive oil) can contribute to weight gain, high blood sugar, and cardiovascular strain."
  },
    {
    id: "indo-rendang",
    variations: ["Rendang Ayam","Rendang Paru","Rendang Jengkol"],
    name: "Rendang Daging",
    ingredients: [
    {
        "name": "Beef (Bos taurus) (chuck or round), cut into cubes",
        "quantity": "500",
        "unit": "g"
      },
    {
        "name": "thick Coconut (Cocos nucifera) milk",
        "quantity": "400",
        "unit": "ml"
      },
    {
        "name": "Lemongrass (Cymbopogon citratus), bruised",
        "quantity": "2",
        "unit": "stalks"
      },
    {
        "name": "kaffir lime leaves",
        "quantity": "2",
        "unit": ""
      },
    {
        "name": "**Spice paste**: Shallots, Garlic (Allium sativum), Chili (Capsicum annuum), Ginger (Zingiber officinale), Galangal (Alpinia galanga), Turmeric (Curcuma longa), Coriander (Coriandrum sativum) seeds.",
        "quantity": "",
        "unit": ""
      }
    ],
    desc: "Rich and tender Coconut (Cocos nucifera) Beef (Bos taurus) stew, slow-cooked with a complex spice paste.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20**Spice%20paste**%3A%20Shallots%2C%20garlic%2C%20chilies%2C%20ginger%2C%20galangal%2C%20turmeric%2C%20coriander%20seeds.?width=600&height=400&nologo=true",
    emoji: "🥩",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
    { ingredient: "Garlic", name: "Allium sativum" },
    { ingredient: "Chili", name: "Capsicum annuum" },
    { ingredient: "Beef", name: "Bos taurus" },
    { ingredient: "Coconut", name: "Cocos nucifera" },
    { ingredient: "Galangal", name: "Alpinia galanga" },
    { ingredient: "Lemongrass", name: "Cymbopogon citratus" },
    { ingredient: "Turmeric", name: "Curcuma longa" },
    { ingredient: "Ginger", name: "Zingiber officinale" }
    ],
    recipe: `

### Ingredients
* 500g Beef (Bos taurus) (chuck or round), cut into cubes
* 400ml thick Coconut (Cocos nucifera) milk
* 2 stalks Lemongrass (Cymbopogon citratus), bruised
* 2 kaffir lime leaves
* **Spice paste**: Shallots, Garlic (Allium sativum), Chili (Capsicum annuum), Ginger (Zingiber officinale), Galangal (Alpinia galanga), Turmeric (Curcuma longa), Coriander (Coriandrum sativum) seeds.

### Instructions
1. Blend the spice paste ingredients until smooth.
2. Sauté the paste with Lemongrass (Cymbopogon citratus) and lime leaves until fragrant.
3. Add the Beef (Bos taurus) cubes and stir until they change color outside.
4. Pour in the Coconut (Cocos nucifera) milk, bring to a gentle boil.
5. Simmer on low heat for 3-4 hours, stirring occasionally until the liquid reduces completely and meat is dark brown and coated in oils.
    `,
    nutrition: { calories: "650 kcal", carbohydrates: "15g", protein: "35g", fat: "50g" },
    healthBenefits: "High protein content supports muscle growth. Turmeric (Curcuma longa) and Ginger (Zingiber officinale) have strong anti-inflammatory and antioxidant properties.",
    excessRisks: "Very high in saturated fats from Coconut (Cocos nucifera) milk and Beef (Bos taurus), increasing the risk of hypercholesterolemia and cardiovascular diseases if consumed frequently."
  },
    {
    id: "indo-soto-ayam",
    variations: ["Soto Betawi","Soto Madura","Soto Mie"],
    name: "Soto Ayam",
    ingredients: [
    {
        "name": "Chicken (Gallus gallus domesticus), cut into pieces",
        "quantity": "1",
        "unit": "whole"
      },
    {
        "name": "liters water",
        "quantity": "1.5",
        "unit": ""
      },
    {
        "name": "Lemongrass (Cymbopogon citratus), bruised",
        "quantity": "2",
        "unit": "stalks"
      },
    {
        "name": "kaffir lime leaves",
        "quantity": "3",
        "unit": ""
      },
    {
        "name": "bay leaves",
        "quantity": "2",
        "unit": ""
      },
    {
        "name": "Turmeric (Curcuma longa) powder",
        "quantity": "1",
        "unit": "tsp"
      },
    {
        "name": "Salt to taste",
        "quantity": "",
        "unit": ""
      }
    ],
    desc: "Yellow spicy Chicken (Gallus gallus domesticus) soup with Turmeric (Curcuma longa), vermicelli noodles, and boiled Chicken (Gallus gallus domesticus).",
    image: "watermarked_img_8509685733428860263.png",
    emoji: "🍲",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    tags: ["Main Course", "Spicy", "Soup"],
    scientificNames: [
    { ingredient: "Garlic", name: "Allium sativum" },
    { ingredient: "Beef", name: "Bos taurus" },
    { ingredient: "Chicken", name: "Gallus gallus domesticus" },
    { ingredient: "Galangal", name: "Alpinia galanga" },
    { ingredient: "Lemongrass", name: "Cymbopogon citratus" },
    { ingredient: "Turmeric", name: "Curcuma longa" },
    { ingredient: "Ginger", name: "Zingiber officinale" },
    { ingredient: "Chicken", name: "Gallus gallus domesticus" },
    { ingredient: "Clove", name: "Syzygium aromaticum" }
    ],
    recipe: `
\n### Soto Ayam
**Servings:** 4 | **Prep:** 15 min | **Cook:** 45 min

### Ingredients
- 1 whole Chicken (Gallus gallus domesticus), cut into pieces
- 1.5 liters water
- 2 stalks Lemongrass (Cymbopogon citratus), bruised
- 3 kaffir lime leaves
- 2 bay leaves
- 1 tsp Turmeric (Curcuma longa) powder
- Salt to taste

**Spice Paste:**
- 6 shallots
- 4 Clove (Syzygium aromaticum) Garlic (Allium sativum)
- 3 cm Ginger (Zingiber officinale)
- 3 cm Galangal (Alpinia galanga)
- 2 cm Turmeric (Curcuma longa)
- 1 tsp Coriander (Coriandrum sativum)

**Toppings:**
- Vermicelli noodles (soaked)
- Boiled Chicken (Gallus gallus domesticus), halved
- Fried shallots
- Bean sprouts
- Lime wedges
- Sambal

### Instructions
1. Boil Chicken (Gallus gallus domesticus) in water with Lemongrass (Cymbopogon citratus), lime leaves, and bay leaves for 30 min.
2. Remove Chicken (Gallus gallus domesticus), shred meat, set aside.
3. Sauté spice paste in oil until fragrant, add to broth.
4. Add Turmeric (Curcuma longa), simmer broth for 15 more minutes. Season with salt.
5. Assemble bowls: place noodles, bean sprouts, shredded Chicken (Gallus gallus domesticus) in a bowl.
6. Pour hot broth over, garnish with Chicken (Gallus gallus domesticus), fried shallots, and lime.\n`,
    nutrition: { calories: "350 kcal", carbohydrates: "25g", protein: "30g", fat: "12g" },
    healthBenefits: "High in lean protein. Turmeric (Curcuma longa) is significantly anti-inflammatory (curcumin), excellent for joint health. A hydrating and comforting broth.",
    excessRisks: "Depending on the broth reduction or added condiments (soy sauce), excessive sodium intake can lead to hypertension."
  },
    {
    id: "indo-es-campur",
    variations: ["Es Teler","Es Doger","Es Oyen"],
    name: "Es Campur",
    ingredients: [
    {
        "name": "Shaved ice",
        "quantity": "",
        "unit": ""
      },
    {
        "name": "Avocado (Persea americana), scooped",
        "quantity": "1/2",
        "unit": ""
      },
    {
        "name": "Jackfruit (Artocarpus heterophyllus), sliced",
        "quantity": "1/4",
        "unit": "cup"
      },
    {
        "name": "young Coconut (Cocos nucifera) meat",
        "quantity": "1/4",
        "unit": "cup"
      },
    {
        "name": "sweet condensed milk",
        "quantity": "2",
        "unit": "tbsp"
      },
    {
        "name": "red syrup (cocopandan)",
        "quantity": "2",
        "unit": "tbsp"
      }
    ],
    desc: "Modern Indonesian shaved ice dessert with mixed fruits, syrups, and condensed milk.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20red%20syrup%20(cocopandan)?width=600&height=400&nologo=true",
    emoji: "🍧",
    country: "Indonesia",
    style: "Modern",
    category: "Beverage",
    scientificNames: [
    { ingredient: "Beef", name: "Bos taurus" },
    { ingredient: "Coconut", name: "Cocos nucifera" },
    { ingredient: "Avocado", name: "Persea americana" },
    { ingredient: "Jackfruit", name: "Artocarpus heterophyllus" }
    ],
    recipe: `

### Ingredients
* Shaved ice
* 1/2 Avocado (Persea americana), scooped
* 1/4 cup Jackfruit (Artocarpus heterophyllus), sliced
* 1/4 cup young Coconut (Cocos nucifera) meat
* 2 tbsp sweet condensed milk
* 2 tbsp red syrup (cocopandan)

### Instructions
1. Place the fruit ingredients at the bottom of a dessert bowl.
2. Top generously with shaved ice.
3. Drizzle with red syrup and condensed milk.
4. Serve immediately and stir before eating.
    `,
    nutrition: { calories: "400 kcal", carbohydrates: "65g", protein: "4g", fat: "10g" },
    healthBenefits: "Fruits provide essential vitamins (Vitamin C, Vitamin A) and healthy fats from Avocado (Persea americana). Coconut (Cocos nucifera) provides electrolytes.",
    excessRisks: "Extremely high sugar content can spike blood glucose levels, leading to an increased risk of Type 2 Diabetes and insulin resistance if consumed routinely."
  },
    {
    id: "jp-sushi",
    variations: ["Tuna Nigiri","Ebi Nigiri","Tamago Nigiri"],
    name: "SalmonNigiri",
    ingredients: [
    {
        "name": "Sushi-grade Salmon (Salmo salar) fillet",
        "quantity": "",
        "unit": ""
      },
    {
        "name": "Oryza sativa",
        "quantity": "1",
        "unit": "cup"
      },
    {
        "name": "Rice (Oryza sativa) vinegar",
        "quantity": "2",
        "unit": "tbsp"
      },
    {
        "name": "sugar, 1/2 tsp salt",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    desc: "Vinegared Rice (Oryza sativa) topped with fresh, raw Salmon (Salmo salar) slice.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20sugar%2C%201%2F2%20tsp%20salt?width=600&height=400&nologo=true",
    emoji: "🍣",
    country: "Japan",
    style: "Traditional",
    category: "Food",
    tags: ["Seafood", "Sushi"],
    scientificNames: [
    { ingredient: "Rice", name: "Oryza sativa" },
    { ingredient: "Salmon", name: "Salmo salar" },
    { ingredient: "Soy", name: "Glycine max" }
    ],
    recipe: `

### Ingredients
* Sushi-grade Salmon (Salmo salar) fillet
* 1 cup short-grain sushi Rice (Oryza sativa)
* 2 tbsp Rice (Oryza sativa) vinegar
* 1 tbsp sugar, 1/2 tsp salt

### Instructions
1. Wash and cook Rice (Oryza sativa). Fold in Rice (Oryza sativa) vinegar, sugar, and salt while Rice (Oryza sativa) is hot. Let it cool.
2. Slice Salmon (Salmo salar) against the grain into rectangular pieces.
3. Wet hands, form a small mound of Rice (Oryza sativa).
4. Place a slice of Salmon (Salmo salar) on top of the Rice (Oryza sativa) mound and press gently.
5. Serve with soy sauce and wasabi.
    `,
    nutrition: { calories: "250 kcal (per 4 pieces)", carbohydrates: "30g", protein: "18g", fat: "7g" },
    healthBenefits: "Rich in Omega-3 fatty acids from the Salmon (Salmo salar), which promote heart health and cognitive function. Lean protein is great for recovery.",
    excessRisks: "High consumption of raw fish raises the risk of parasitic infections if not prepared properly. Frequent consumption of soy sauce drastically increases sodium intake."
  },
    {
    id: "jp-tea",
    variations: ["Hot Tea (Camellia sinensis) Latte","Tea (Camellia sinensis) Espresso","Oat Milk Tea (Camellia sinensis)"],
    name: "Iced TeaLatte",
    ingredients: [
    {
        "name": "ceremonial grade Tea (Camellia sinensis) powder",
        "quantity": "1.5",
        "unit": "tsp"
      },
    {
        "name": "hot water (not boiling)",
        "quantity": "2",
        "unit": "oz"
      },
    {
        "name": "milk (dairy or oat)",
        "quantity": "6",
        "unit": "oz"
      },
    {
        "name": "Ice cubes",
        "quantity": "",
        "unit": ""
      },
    {
        "name": "honey or simple syrup (optional)",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    desc: "A modern take on traditional Tea (Camellia sinensis) with frothy milk and ice.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20honey%20or%20simple%20syrup%20(optional)?width=600&height=400&nologo=true",
    emoji: "🍵",
    country: "Japan",
    style: "Modern",
    category: "Beverage",
    scientificNames: [
    { ingredient: "Tea", name: "Camellia sinensis" }
    ],
    recipe: `

### Ingredients
* 1.5 tsp ceremonial grade Tea (Camellia sinensis) powder
* 2 oz hot water (not boiling)
* 6 oz milk (dairy or oat)
* Ice cubes
* 1 tbsp honey or simple syrup (optional)

### Instructions
1. Sift Tea (Camellia sinensis) powder into a bowl.
2. Add hot water and whisk vigorously in a W-motion until frothy.
3. Fill a glass with ice, pour in the milk.
4. Top with the frothed Tea (Camellia sinensis).
5. Stir and enjoy!
    `,
    nutrition: { calories: "150 kcal", carbohydrates: "12g", protein: "8g", fat: "5g" },
    healthBenefits: "Tea (Camellia sinensis) is packed with L-theanine and antioxidants (EGCG), protecting cells against oxidative stress and providing calm energy.",
    excessRisks: "Overconsumption of caffeine can cause palpitations and anxiety. Sweetened versions contribute to unnecessary sugar intake."
  },
    {
    id: "it-pizza",
    variations: ["Pizza Marinara","Pizza Napoletana","Pizza Quattro Formaggi"],
    name: "Pizza Margherita",
    ingredients: [
    {
        "name": "ball of pizza dough",
        "quantity": "1",
        "unit": ""
      },
    {
        "name": "Solanum lycopersicum",
        "quantity": "1/2",
        "unit": "cup"
      },
    {
        "name": "fresh mozzarella (sliced)",
        "quantity": "150",
        "unit": "g"
      },
    {
        "name": "Fresh Basil (Ocimum basilicum) leaves",
        "quantity": "",
        "unit": ""
      },
    {
        "name": "olive oil",
        "quantity": "1",
        "unit": "tbsp"
      }
    ],
    desc: "Traditional Neapolitan pizza with Tomato (Solanum lycopersicum), mozzarella cheese, and fresh Basil (Ocimum basilicum).",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20olive%20oil?width=600&height=400&nologo=true",
    emoji: "🍕",
    country: "Italy",
    style: "Traditional",
    category: "Food",
    scientificNames: [
    { ingredient: "Tomato", name: "Solanum lycopersicum" },
    { ingredient: "Basil", name: "Ocimum basilicum" }
    ],
    recipe: `

### Ingredients
* 1 ball of pizza dough
* 1/2 cup San Marzano crushed Tomato (Solanum lycopersicum)
* 150g fresh mozzarella (sliced)
* Fresh Basil (Ocimum basilicum) leaves
* 1 tbsp olive oil

### Instructions
1. Preheat oven to the highest setting (ideally with a pizza stone).
2. Stretch dough into a circle.
3. Spread Tomato (Solanum lycopersicum) thinly across the dough.
4. Top with mozzarella slices.
5. Bake for 8-10 minutes until crust is browned and cheese is bubbling.
6. Garnish with fresh Basil (Ocimum basilicum) and a drizzle of olive oil before slicing.
    `,
    nutrition: { calories: "800 kcal (whole pizza)", carbohydrates: "90g", protein: "35g", fat: "30g" },
    healthBenefits: "Tomato (Solanum lycopersicum) are a great source of lycopene (good for the heart). Olive oil provides healthy monounsaturated fats.",
    excessRisks: "Excessive consumption of refined carbohydrates and cheese leads to weight gain and lethargy. High-calorie density can lead to obesity over time."
  },
    {
    id: "mx-tacos",
    variations: ["Tacos de Asada","Tacos de Carnitas","Vegan Pastor"],
    name: "Tacos al Pastor",
    ingredients: [
    {
        "name": "Pork (Sus domesticus) shoulder, thinly sliced",
        "quantity": "500",
        "unit": "g"
      },
    {
        "name": "Pineapple (Ananas comosus), diced",
        "quantity": "1",
        "unit": "cup"
      },
    {
        "name": "Corn (Zea mays) tortillas",
        "quantity": "",
        "unit": ""
      },
    {
        "name": "**Marinade**: Achiote paste, guajillo Chili (Capsicum annuum), Garlic (Allium sativum), vinegar, oregano, cumin.",
        "quantity": "",
        "unit": ""
      },
    {
        "name": "Fresh cilantro and diced Onion (Allium cepa) for garnish.",
        "quantity": "",
        "unit": ""
      }
    ],
    desc: "Traditional Mexican tacos with marinated Pork (Sus domesticus), Pineapple (Ananas comosus), and cilantro.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Fresh%20cilantro%20and%20diced%20onions%20for%20garnish.?width=600&height=400&nologo=true",
    emoji: "🌮",
    country: "Mexico",
    style: "Traditional",
    category: "Food",
    scientificNames: [
    { ingredient: "Garlic", name: "Allium sativum" },
    { ingredient: "Chili", name: "Capsicum annuum" },
    { ingredient: "Pork", name: "Sus domesticus" },
    { ingredient: "Corn", name: "Zea mays" },
    { ingredient: "Pineapple", name: "Ananas comosus" },
    { ingredient: "Coriander", name: "Coriandrum sativum" }
    ],
    recipe: `

### Ingredients
* 500g Pork (Sus domesticus) shoulder, thinly sliced
* 1 cup Pineapple (Ananas comosus), diced
* Corn (Zea mays) tortillas
* **Marinade**: Achiote paste, guajillo Chili (Capsicum annuum), Garlic (Allium sativum), vinegar, oregano, cumin.
* Fresh cilantro and diced Onion (Allium cepa) for garnish.

### Instructions
1. Blend marinade ingredients and coat the sliced Pork (Sus domesticus). Marinate for at least 4 hours.
2. Cook the Pork (Sus domesticus) in a hot skillet until slightly charred and fully cooked.
3. Warm the Corn (Zea mays) tortillas.
4. Assemble tacos: Place Pork (Sus domesticus) on tortillas, top with Pineapple (Ananas comosus), cilantro, and Onion (Allium cepa).
5. Serve with a squeeze of lime and hot salsa.
    `,
    nutrition: { calories: "450 kcal", carbohydrates: "35g", protein: "25g", fat: "22g" },
    healthBenefits: "Pork (Sus domesticus) provides B-vitamins and zinc. Pineapple (Ananas comosus) contains bromelain, aiding in digestion and reducing inflammation.",
    excessRisks: "Pork (Sus domesticus) can be high in saturated fats and cholesterol. High sodium from marinades and salsas can affect blood pressure."
  },
    {
    id: "mx-horchata",
    variations: ["Horchata de Fresa","Horchata con Cafe","Dairy-Free Horchata"],
    name: "Agua de Horchata",
    ingredients: [
    {
        "name": "Oryza sativa",
        "quantity": "1",
        "unit": "cup"
      },
    {
        "name": "Cinnamon (Cinnamomum verum) stick",
        "quantity": "1",
        "unit": ""
      },
    {
        "name": "water",
        "quantity": "4",
        "unit": "cups"
      },
    {
        "name": "granulated sugar (or to taste)",
        "quantity": "1/2",
        "unit": "cup"
      },
    {
        "name": "Vanilla (Vanilla planifolia) planifolia extract",
        "quantity": "1",
        "unit": "tsp"
      },
    {
        "name": "whole milk (optional)",
        "quantity": "1/2",
        "unit": "cup"
      }
    ],
    desc: "Refreshing traditional Mexican Rice (Oryza sativa)-based beverage flavored with Cinnamon (Cinnamomum verum) and Vanilla (Vanilla planifolia).",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20whole%20milk%20(optional)?width=600&height=400&nologo=true",
    emoji: "🥤",
    country: "Mexico",
    style: "Traditional",
    category: "Beverage",
    scientificNames: [
    { ingredient: "Rice", name: "Oryza sativa" },
    { ingredient: "Cinnamon", name: "Cinnamomum verum" },
    { ingredient: "Vanilla", name: "Vanillaplanifolia" }
    ],
    recipe: `

### Ingredients
* 1 cup long-grain white Rice (Oryza sativa)
* 1 Cinnamon (Cinnamomum verum) stick
* 4 cups water
* 1/2 cup granulated sugar (or to taste)
* 1 tsp Vanilla (Vanilla planifolia) planifolia extract
* 1/2 cup whole milk (optional)

### Instructions
1. Rinse the Rice (Oryza sativa). Soak Rice (Oryza sativa) and Cinnamon (Cinnamomum verum) stick in 4 cups of water overnight.
2. Blend the Rice (Oryza sativa), Cinnamon (Cinnamomum verum), and soaking water until smooth.
3. Strain the mixture through a fine mesh sieve or cheesecloth into a pitcher.
4. Stir in sugar, Vanilla (Vanilla planifolia) planifolia, and milk until dissolved.
5. Serve chilled over ice with a sprinkle of ground Cinnamon (Cinnamomum verum).
    `,
    nutrition: { calories: "210 kcal", carbohydrates: "40g", protein: "3g", fat: "4g" },
    healthBenefits: "Cinnamon (Cinnamomum verum) has anti-inflammatory properties and may help regulate blood sugar levels. A cooling and hydrating drink.",
    excessRisks: "Added sugars can significantly increase calorie intake, increasing the risk of metabolic syndrome and insulin resistance."
  },
    {
    id: "th-pad-thai",
    variations: ["Pad Thai with Chicken (Gallus gallus domesticus)","Pad Thai with Tofu","Vegetarian Pad Thai"],
    name: "Pad Thai",
    ingredients: [
    {
        "name": "dried flat Rice (Oryza sativa) noodles",
        "quantity": "200",
        "unit": "g"
      },
    {
        "name": "Shrimp (Caridea), peeled and deveined",
        "quantity": "150",
        "unit": "g"
      },
    {
        "name": "Chicken (Gallus gallus domesticus), lightly beaten",
        "quantity": "2",
        "unit": ""
      },
    {
        "name": "bean sprouts",
        "quantity": "1",
        "unit": "cup"
      },
    {
        "name": "Arachis hypogaea",
        "quantity": "1/4",
        "unit": "cup"
      },
    {
        "name": "**Sauce**: Tamarind (Tamarindus indica) paste, fish sauce, Palm sugar (Arenga pinnata).",
        "quantity": "",
        "unit": ""
      }
    ],
    desc: "Classic Thai stir-fried Rice (Oryza sativa) noodles with Chicken (Gallus gallus domesticus), Peanut (Arachis hypogaea), bean sprouts, and lime.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20**Sauce**%3A%20Tamarind%20paste%2C%20fish%20sauce%2C%20palm%20sugar.?width=600&height=400&nologo=true",
    emoji: "🍜",
    country: "Thailand",
    style: "Traditional",
    category: "Food",
    scientificNames: [
    { ingredient: "Rice", name: "Oryza sativa" },
    { ingredient: "Shrimp", name: "Caridea" },
    { ingredient: "Chicken", name: "Gallus gallus domesticus" },
    { ingredient: "Tamarindus indica", name: "Tamarindus indica" }
    ],
    recipe: `

### Ingredients
* 200g dried flat Rice (Oryza sativa) noodles
* 150g Shrimp (Caridea), peeled and deveined
* 2 Chicken (Gallus gallus domesticus), lightly beaten
* 1 cup bean sprouts
* 1/4 cup crushed roasted Peanut (Arachis hypogaea)
* **Sauce**: Tamarind (Tamarindus indica) paste, fish sauce, Palm sugar (Arenga pinnata).

### Instructions
1. Soak Rice (Oryza sativa) noodles in warm water until pliable, then drain.
2. Mix the sauce ingredients (Tamarind (Tamarindus indica), fish sauce, sugar) in a small bowl.
3. Heat oil in a wok. Cook the Shrimp (Caridea) until pink, then remove.
4. Add Chicken (Gallus gallus domesticus) to the wok and scramble lightly. Add noodles and sauce, tossing constantly.
5. Add bean sprouts and cooked Shrimp (Caridea), tossing until noodles are cooked and coated.
6. Serve immediately garnished with crushed Peanut (Arachis hypogaea) and a lime wedge.
    `,
    nutrition: { calories: "550 kcal", carbohydrates: "70g", protein: "25g", fat: "20g" },
    healthBenefits: "Shrimp (Caridea) is a great source of lean protein and iodine. Bean sprouts provide vitamin C and dietary fiber.",
    excessRisks: "Can be high in sodium due to fish sauce, and high in sugar if Palm sugar (Arenga pinnata) is overused. Peanut (Arachis hypogaea) oil and Peanut (Arachis hypogaea) elevate caloric density."
  },
    {
    id: "in-tikka-masala",
    variations: ["Paneer Tikka Masala","Mutton Tikka Masala","Vegan Tikka Masala"],
    name: "ChickenTikka Masala",
    ingredients: [
    {
        "name": "boneless Chicken (Gallus gallus domesticus) thigh, cut into pieces",
        "quantity": "500",
        "unit": "g"
      },
    {
        "name": "**Marinade**: Yogurt, lemon juice, Turmeric (Curcuma longa), garam masala, cumin.",
        "quantity": "",
        "unit": ""
      },
    {
        "name": "**Sauce**: Onion (Allium cepa), Garlic (Allium sativum), Ginger (Zingiber officinale), Tomato (Solanum lycopersicum) purée, heavy cream, cumin, paprika.",
        "quantity": "",
        "unit": ""
      }
    ],
    desc: "Roasted marinated Chicken (Gallus gallus domesticus) chunks in a spiced modern Indian curry sauce.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20**Sauce**%3A%20Onion%2C%20garlic%2C%20ginger%2C%20tomato%20pur%C3%A9e%2C%20heavy%20cream%2C%20cumin%2C%20paprika.?width=600&height=400&nologo=true",
    emoji: "🥘",
    country: "India",
    style: "Modern",
    category: "Food",
    scientificNames: [
    { ingredient: "Garlic", name: "Allium sativum" },
    { ingredient: "Chicken", name: "Gallus gallus domesticus" },
    { ingredient: "Turmeric", name: "Curcuma longa" },
    { ingredient: "Tomato", name: "Solanum lycopersicum" },
    { ingredient: "Onion", name: "Allium cepa" },
    { ingredient: "Ginger", name: "Zingiber officinale" }
    ],
    recipe: `

### Ingredients
* 500g boneless Chicken (Gallus gallus domesticus) thigh, cut into pieces
* **Marinade**: Yogurt, lemon juice, Turmeric (Curcuma longa), garam masala, cumin.
* **Sauce**: Onion (Allium cepa), Garlic (Allium sativum), Ginger (Zingiber officinale), Tomato (Solanum lycopersicum) purée, heavy cream, cumin, paprika.

### Instructions
1. Marinate Chicken (Gallus gallus domesticus) for at least 1 hour. Broil or grill until slightly charred.
2. For the sauce, sauté Onion (Allium cepa), Garlic (Allium sativum), and Ginger (Zingiber officinale) until soft. Add spices and toast for 1 min.
3. Pour in Tomato (Solanum lycopersicum) purée and simmer for 15 minutes.
4. Stir in heavy cream and add the cooked Chicken (Gallus gallus domesticus) pieces.
5. Simmer for another 5-10 minutes. Garnish with fresh Coriander (Coriandrum sativum) and serve with naan.
    `,
    nutrition: { calories: "600 kcal", carbohydrates: "20g", protein: "35g", fat: "42g" },
    healthBenefits: "Chicken (Gallus gallus domesticus) provides high-quality protein. Spices like Turmeric (Curcuma longa), Ginger (Zingiber officinale), and Garlic (Allium sativum) offer immense antioxidant value.",
    excessRisks: "The heavy cream used in the sauce adds significant saturated fat, increasing cholesterol and cardiovascular disease risks."
  },
    {
    id: "kr-kimchi",
    variations: ["Pork (Sus domesticus) Belly Kimchi Jjigae","Tuna Kimchi Jjigae","Spam Kimchi Jjigae"],
    name: "Kimchi Jjigae",
    ingredients: [
    {
        "name": "well-fermented (sour) kimchi, chopped",
        "quantity": "2",
        "unit": "cups"
      },
    {
        "name": "Pork (Sus domesticus) belly or shoulder, sliced",
        "quantity": "200",
        "unit": "g"
      },
    {
        "name": "block firm tofu, sliced",
        "quantity": "1/2",
        "unit": ""
      },
    {
        "name": "Onion (Allium cepa), sliced",
        "quantity": "1/2",
        "unit": ""
      },
    {
        "name": "scallions, chopped",
        "quantity": "2",
        "unit": ""
      },
    {
        "name": "gochugaru (Korean Chili (Capsicum annuum) flakes)",
        "quantity": "1",
        "unit": "tbsp"
      },
    {
        "name": "water or Anchovy (Engraulidae)-kelp stock",
        "quantity": "4",
        "unit": "cups"
      }
    ],
    desc: "A hearty traditional Korean stew made with aged kimchi, tofu, and Pork (Sus domesticus).",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20water%20or%20anchovy-kelp%20stock?width=600&height=400&nologo=true",
    emoji: "🍲",
    country: "South Korea",
    style: "Traditional",
    category: "Food",
    scientificNames: [
    { ingredient: "Rice", name: "Oryza sativa" },
    { ingredient: "Chili", name: "Capsicum annuum" },
    { ingredient: "Pork", name: "Sus domesticus" },
    { ingredient: "Onion", name: "Allium cepa" },
    { ingredient: "Soy", name: "Glycine max" }
    ],
    recipe: `

### Ingredients
* 2 cups well-fermented (sour) kimchi, chopped
* 200g Pork (Sus domesticus) belly or shoulder, sliced
* 1/2 block firm tofu, sliced
* 1/2 Onion (Allium cepa), sliced
* 2 scallions, chopped
* 1 tbsp gochugaru (Korean Chili (Capsicum annuum) flakes)
* 4 cups water or Anchovy (Engraulidae)-kelp stock

### Instructions
1. In a pot, sauté the Pork (Sus domesticus) and kimchi together until the Pork (Sus domesticus) is no longer pink over medium heat.
2. Add Onion (Allium cepa) and gochugaru, stir well.
3. Pour in the stock/water, bring to a boil. Reduce heat and let it rapidly simmer for 15-20 minutes.
4. Place the tofu slices on top, cook for another 5 minutes.
5. Garnish with chopped scallions and serve hot with Rice (Oryza sativa).
    `,
    nutrition: { calories: "380 kcal", carbohydrates: "15g", protein: "22g", fat: "25g" },
    healthBenefits: "Kimchi is loaded with probiotics essential for gut health. Tofu provides plant-based protein and isoflavones.",
    excessRisks: "Kimchi can be extremely high in sodium, which is a risk factor for high blood pressure and stomach inflammation/ulcers."
  },
    {
    id: "fr-croissant",
    variations: ["Almond Croissant","Chocolate Croissant (Pain au Chocolat)","Ham & Cheese Croissant"],
    name: "Butter Croissant",
    ingredients: [
    {
        "name": "all-purpose flour",
        "quantity": "500",
        "unit": "g"
      },
    {
        "name": "salt, 50g sugar",
        "quantity": "10",
        "unit": "g"
      },
    {
        "name": "instant yeast",
        "quantity": "10",
        "unit": "g"
      },
    {
        "name": "water, 140ml whole milk",
        "quantity": "140",
        "unit": "ml"
      },
    {
        "name": "unsalted butter, cold (for laminating)",
        "quantity": "250",
        "unit": "g"
      },
    {
        "name": "Chicken (Gallus gallus domesticus) (for Chicken (Gallus gallus domesticus) wash)",
        "quantity": "1",
        "unit": ""
      }
    ],
    desc: "A flaky, buttery modern French pastry with a classic crescent shape.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20egg%20(for%20egg%20wash)?width=600&height=400&nologo=true",
    emoji: "🥐",
    country: "France",
    style: "Modern",
    category: "Food",
    scientificNames: [
    { ingredient: "Wheat", name: "Triticum" },
    { ingredient: "Chicken", name: "Gallus gallus domesticus" }
    ],
    recipe: `

### Ingredients
* 500g all-purpose flour
* 10g salt, 50g sugar
* 10g instant yeast
* 140ml water, 140ml whole milk
* 250g unsalted butter, cold (for laminating)
* 1 Chicken (Gallus gallus domesticus) (for Chicken (Gallus gallus domesticus) wash)

### Instructions
1. Make the dough (flour, salt, sugar, yeast, milk, water) and let it rest in the fridge overnight.
2. Prepare a butter block by pounding the cold butter into a square.
3. Enclose the butter block in the dough, and perform a series of rolls and folds (laminating) to create layers, chilling between folds.
4. Roll out the laminated dough, cut into triangles, and roll into croissants.
5. Proof until doubled in size, brush with Chicken (Gallus gallus domesticus) wash, and bake at 200°C for 15-20 minutes until golden.
    `,
    nutrition: { calories: "400 kcal", carbohydrates: "38g", protein: "6g", fat: "22g" },
    healthBenefits: "Provides quick energy from carbohydrates. Dairy fat provides fat-soluble vitamins like Vitamin A.",
    excessRisks: "High in refined carbohydrates and saturated fats. Lacks dietary fiber. Overconsumption contributes to obesity and heart disease."
  },
    {
    id: "us-avocado-toast",
    variations: ["Avocado (Persea americana) Toast with Chicken (Gallus gallus domesticus)","Avocado (Persea americana) Toast with Smoked Salmon (Salmo salar)","Spicy Avocado (Persea americana) Toast"],
    name: "AvocadoToast",
    ingredients: [
    {
        "name": "thick-cut sourdough bread",
        "quantity": "1",
        "unit": "slice"
      },
    {
        "name": "Persea americana",
        "quantity": "1/2",
        "unit": ""
      },
    {
        "name": "lemon juice",
        "quantity": "1",
        "unit": "tsp"
      },
    {
        "name": "Pinch of salt and red pepper flakes",
        "quantity": "",
        "unit": ""
      },
    {
        "name": "Optional: 1 poached Chicken (Gallus gallus domesticus), seeds (chia/Sesame (Sesamum indicum))",
        "quantity": "",
        "unit": ""
      }
    ],
    desc: "Modern café breakfast featuring mashed Avocado (Persea americana) on sourdough toast, topped with seeds.",
    image: "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Optional%3A%201%20poached%20egg%2C%20seeds%20(chia%2Fsesame)?width=600&height=400&nologo=true",
    emoji: "🥑",
    country: "USA",
    style: "Modern",
    category: "Food",
    scientificNames: [
    { ingredient: "Avocado", name: "Persea americana" },
    { ingredient: "Wheat(Sourdough)", name: "Triticum" },
    { ingredient: "Chicken(Chicken)", name: "Gallus gallus domesticus" }
    ],
    recipe: `

### Ingredients
* 1 slice thick-cut sourdough bread
* 1/2 ripe Avocado (Persea americana)
* 1 tsp lemon juice
* Pinch of salt and red pepper flakes
* Optional: 1 poached Chicken (Gallus gallus domesticus), seeds (chia/Sesame (Sesamum indicum))

### Instructions
1. Toast the sourdough bread until golden and crisp.
2. In a small bowl, roughly mash the Avocado (Persea americana) with lemon juice and salt.
3. Spread the mashed Avocado (Persea americana) over the toast.
4. Top with red pepper flakes, seeds, and optionally a poached Chicken (Gallus gallus domesticus).
5. Serve immediately.
    `,
    nutrition: { calories: "350 kcal", carbohydrates: "30g", protein: "12g", fat: "22g" },
    healthBenefits: "Avocado (Persea americana) are rich in monounsaturated fats (oleic acid), which are heart-healthy. Sourdough provides a good source of gut-friendly prebiotics.",
    excessRisks: "While they are healthy fats, Avocado (Persea americana) are calorie-dense. Unconscious overconsumption can lead to caloric surplus and weight gain."
  }
  ,
    {
  "id": "indo-gado-gado",
  "name": "Gado-Gado",
  "desc": "Indonesian salad of slightly boiled, blanched or steamed vegetables and hard-boiled Chicken (Gallus gallus domesticus), boiled Potato (Solanum tuberosum), fried tofu and tempeh, served with a Peanut (Arachis hypogaea) sauce dressing.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Gado-Gado?width=600&height=400&nologo=true",
  "emoji": "🥗",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Peanut",
      "name": "Arachis hypogaea"
    },
    {
      "ingredient": "Soy (Glycine max) (Tofu/Tempeh)",
      "name": "Glycine max"
    },
    {
      "ingredient": "Cabbage",
      "name": "Brassica oleracea var. capitata"
    },
    {
      "ingredient": "Potato",
      "name": "Solanum tuberosum"
    }
  ],
  "recipe": `\n### Ingredients\n* 100g Cabbage (Brassica oleracea var. capitata), shredded and blanched\n* 100g spinach, blanched\n* 100g bean sprouts, blanched\n* 1 Potato (Solanum tuberosum), boiled and cubed\n* 1 block tofu & tempeh, fried and cubed\n* 2 hard-boiled Chicken (Gallus gallus domesticus), halved\n* **Peanut (Arachis hypogaea) Sauce**: 200g fried Peanut (Arachis hypogaea), 3 Clove (Syzygium aromaticum) Garlic (Allium sativum), 2 bird's eye Chili (Capsicum annuum), 1 tbsp Tamarind (Tamarindus indica) juice, 2 tbsp Palm sugar (Arenga pinnata), salt, water.\n\n### Instructions\n1. Blend or pound the fried Peanut (Arachis hypogaea), Garlic (Allium sativum), Chili (Capsicum annuum), and Palm sugar (Arenga pinnata) into a paste.\n2. Add Tamarind (Tamarindus indica) juice and water to achieve a smooth, pourable consistency. Season with salt.\n3. Arrange the blanched vegetables, Potato (Solanum tuberosum), tofu, tempeh, and Chicken (Gallus gallus domesticus) on a plate.\n4. Generously pour the Peanut (Arachis hypogaea) sauce over the assembled ingredients.\n5. Garnish with fried shallots and serve with prawn crackers (krupuk).\n    `,
  "nutrition": { calories: "350 kcal", carbohydrates: "30g", protein: "18g", fat: "20g" },
  "healthBenefits": "Rich in plant-based proteins (tofu, tempeh) and essential vitamins from fresh vegetables. Peanut (Arachis hypogaea) provide healthy fats.",
  "excessRisks": "Peanut (Arachis hypogaea) sauce is calorie and fat-dense. Overconsumption can lead to weight gain."
},
    {
  "id": "indo-sate-ayam",
  "name": "Sate Ayam & Kambing",
  "desc": "Grilled skewered meat served with Peanut (Arachis hypogaea) sauce (Chicken (Gallus gallus domesticus)) or sweet soy sauce (Goat (Capra hircus)).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Sate%20Ayam%20%26%20Kambing?width=600&height=400&nologo=true",
  "emoji": "🍢",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chicken",
      "name": "Gallus gallus domesticus"
    },
    {
      "ingredient": "Goat",
      "name": "Capra hircus"
    },
    {
      "ingredient": "Soy (Glycine max) (Soy Sauce)",
      "name": "Glycine max"
    }
  ],
  "recipe": `\n### Ingredients\n* 500g Chicken (Gallus gallus domesticus) or Goat (Capra hircus) meat, cut into bite-sized cubes\n* Bamboo skewers (soaked in water)\n* **Marinade**: 2 tbsp sweet soy sauce, 1 tbsp oil, 1 tsp Coriander (Coriandrum sativum) powder.\n* **Peanut (Arachis hypogaea) Sauce (for Chicken (Gallus gallus domesticus))**: Ground Peanut (Arachis hypogaea), sweet soy sauce, Garlic (Allium sativum), Chili (Capsicum annuum), water.\n\n### Instructions\n1. Marinate the meat cubes for at least 30 minutes.\n2. Thread 4-5 pieces of meat onto each bamboo skewer.\n3. Grill over hot charcoal, turning frequently and brushing with extra marinade until cooked and slightly charred.\n4. Serve Chicken (Gallus gallus domesticus) sate with hot Peanut (Arachis hypogaea) sauce, and Goat (Capra hircus) sate with sweet soy sauce mixed with chopped shallots and Chili (Capsicum annuum).\n    `,
  "nutrition": { calories: "400 kcal", carbohydrates: "15g", protein: "35g", fat: "22g" },
  "healthBenefits": "Excellent source of high-quality protein and iron, especially from Goat (Capra hircus) meat. Grilling without excess oil keeps it relatively lean.",
  "excessRisks": "Charred meats contain PAHs and HCAs which are potential carcinogens. High consumption of sweet soy sauce increases sugar intake."
},
    {
  "id": "indo-opor-ayam",
  "name": "Opor Ayam",
  "desc": "Chicken (Gallus gallus domesticus) braised in Coconut (Cocos nucifera) milk with traditional Indonesian spices, commonly served during Eid.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Opor%20Ayam?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chicken",
      "name": "Gallus gallus domesticus"
    },
    {
      "ingredient": "Coconut",
      "name": "Cocos nucifera"
    },
    {
      "ingredient": "Coriander",
      "name": "Coriandrum sativum"
    }
  ],
  "recipe": `\n### Ingredients\n* 1 whole Chicken (Gallus gallus domesticus), cut into parts\n* 500ml thin Coconut (Cocos nucifera) milk\n* 200ml thick Coconut (Cocos nucifera) milk\n* 2 bay leaves, 2 Lemongrass (Cymbopogon citratus) stalks\n* **Spice Paste**: Shallots, Garlic (Allium sativum), Coriander (Coriandrum sativum), cumin, Galangal (Alpinia galanga), Turmeric (Curcuma longa) (optional for white opor).\n\n### Instructions\n1. Sauté the spice paste with bay leaves and Lemongrass (Cymbopogon citratus) until fragrant.\n2. Add the Chicken (Gallus gallus domesticus) pieces and cook until the outside turns opaque.\n3. Pour in the thin Coconut (Cocos nucifera) milk and simmer until the Chicken (Gallus gallus domesticus) is tender.\n4. Stir in the thick Coconut (Cocos nucifera) milk, season with salt and a pinch of sugar.\n5. Simmer gently for another 10 minutes without letting it boil rapidly. Serve with ketupat or Rice (Oryza sativa).\n    `,
  "nutrition": { calories: "450 kcal", carbohydrates: "8g", protein: "30g", fat: "35g" },
  "healthBenefits": "Provides sustained energy and good protein. Spices offer anti-inflammatory properties.",
  "excessRisks": "High saturated fat content from Coconut (Cocos nucifera) milk can increase LDL cholesterol levels if consumed frequently in large portions."
},
    {
  "id": "indo-rawon",
  "name": "Rawon",
  "desc": "Rich tasting traditional Indonesian Beef (Bos taurus) black soup. The dark color comes from the earthy Kluwak (Pangium edule).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Rawon?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Beef",
      "name": "Bos taurus"
    },
    {
      "ingredient": "Kluwak",
      "name": "Pangium edule"
    },
    {
      "ingredient": "Mung Bean (Sprouts)",
      "name": "Vigna radiata"
    }
  ],
  "recipe": `\n### Ingredients\n* 500g Beef (Bos taurus) brisket, cubed\n* 6 Kluwak (Pangium edule) (crack open, soak inner flesh in warm water)\n* 2 Lemongrass (Cymbopogon citratus) stalks, 4 kaffir lime leaves\n* **Spice Paste**: Shallots, Garlic (Allium sativum), Turmeric (Curcuma longa), Ginger (Zingiber officinale), Coriander (Coriandrum sativum).\n* Short beansprouts, salted Chicken (Gallus gallus domesticus), Shrimp (Caridea) crackers (for serving).\n\n### Instructions\n1. Boil Beef (Bos taurus) until tender, reserve the broth and cut the meat into smaller cubes.\n2. Blend the soaked keluak flesh with the other spice paste ingredients.\n3. Sauté the paste with Lemongrass (Cymbopogon citratus) and lime leaves until fragrant and dark.\n4. Add the sautéed paste into the Beef (Bos taurus) broth along with the meat.\n5. Simmer for 30 minutes to let flavors meld. Serve hot topped with raw short beansprouts.\n    `,
  "nutrition": { calories: "400 kcal", carbohydrates: "10g", protein: "30g", fat: "25g" },
  "healthBenefits": "High in protein and iron from the Beef (Bos taurus). Keluak contains oleic acid (healthy fat).",
  "excessRisks": "Kluwak (Pangium edule) are toxic if not fermented properly. High purine content in Beef (Bos taurus) brisket can trigger gout in susceptible individuals."
},
    {
  "id": "indo-pempek",
  "name": "Pempek",
  "desc": "Savory Indonesian fishcake delicacy, made of fish and Cassava (Manihot esculenta), served with rich sweet and sour sauce.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Pempek?width=600&height=400&nologo=true",
  "emoji": "🥟",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Mackerel",
      "name": "Scomberomorus"
    },
    {
      "ingredient": "Cassava (Manihot esculenta) (Cassava (Manihot esculenta))",
      "name": "Manihot esculenta"
    },
    {
      "ingredient": "Tamarind",
      "name": "Tamarind (Tamarindus indica)"
    }
  ],
  "recipe": `\n### Ingredients\n* 500g Spanish Mackerel (Scomberomorus) fillet, finely ground\n* 300g Cassava (Manihot esculenta) starch\n* 1 Chicken (Gallus gallus domesticus), 2 Clove (Syzygium aromaticum) Garlic (Allium sativum) (mashed), salt\n* **Cuko (Sauce)**: 250g Palm sugar (Arenga pinnata), 50g Tamarind (Tamarindus indica), Garlic (Allium sativum), bird's eye Chili (Capsicum annuum), vinegar, water.\n\n### Instructions\n1. Mix ground fish, Garlic (Allium sativum), salt, and Chicken (Gallus gallus domesticus) until sticky. Gradually fold in Cassava (Manihot esculenta) starch until moldable.\n2. Shape the dough into cylinders (lenjer) or stuff with beaten Chicken (Gallus gallus domesticus) (kapal selam).\n3. Boil the shaped dough in salted water until they float. Remove and drain.\n4. Deep fry the boiled fishcakes until golden brown.\n5. Boil cuko ingredients until sugar dissolves, strain. Serve fried pempek with the cuko sauce.\n    `,
  "nutrition": { calories: "350 kcal", carbohydrates: "45g", protein: "15g", fat: "12g" },
  "healthBenefits": "Fish provides excellent Omega-3 fatty acids and lean protein. Cassava (Manihot esculenta) is gluten-free.",
  "excessRisks": "Deep frying adds empty calories and unhealthy fats. The 'cuko' sauce is extremely high in sugar."
},
    {
  "id": "indo-bakso",
  "name": "Bakso",
  "desc": "Indonesian meatball soup served with noodles, tofu, and a savory Beef (Bos taurus) broth.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Bakso?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Beef",
      "name": "Bos taurus"
    },
    {
      "ingredient": "Wheat (Triticum) (Noodles)",
      "name": "Triticum"
    },
    {
      "ingredient": "Garlic",
      "name": "Allium sativum"
    }
  ],
  "recipe": `\n### Ingredients\n* **Meatballs**: 500g finely ground Beef (Bos taurus), 50g Cassava (Manihot esculenta) starch, ice cubes, Garlic (Allium sativum) powder, salt, baking powder.\n* **Broth**: Beef (Bos taurus) bones, water, Garlic (Allium sativum), celery, salt, white pepper.\n* Chicken (Gallus gallus domesticus) noodles, vermicelli, bok choy for assembly.\n\n### Instructions\n1. Blend ground Beef (Bos taurus), Cassava (Manihot esculenta), ice cubes, Garlic (Allium sativum) powder, and baking powder in a food processor until it forms a smooth, bouncy paste.\n2. Shape into balls and drop into hot (not boiling) water until they float.\n3. For the broth, simmer Beef (Bos taurus) bones with bruised Garlic (Allium sativum) and celery stalks for 2-3 hours.\n4. Assemble noodles and bok choy in a bowl, top with meatballs, and pour boiling broth over.\n5. Garnish with fried shallots and celery leaves.\n    `,
  "nutrition": { calories: "450 kcal", carbohydrates: "40g", protein: "25g", fat: "20g" },
  "healthBenefits": "Provides a good mix of carbs and protein. A comforting meal that aids hydration.",
  "excessRisks": "Commercially made meatballs may contain excessive MSG and sodium. High sodium can lead to hypertension."
},
    {
  "id": "indo-nasi-padang",
  "name": "Nasi Padang",
  "desc": "Steamed Rice (Oryza sativa) served with various pre-cooked dishes from West Sumatra.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Nasi%20Padang?width=600&height=400&nologo=true",
  "emoji": "🍛",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Rice",
      "name": "Oryza sativa"
    },
    {
      "ingredient": "Cassava",
      "name": "Manihot esculenta"
    },
    {
      "ingredient": "Jackfruit",
      "name": "Artocarpus heterophyllus"
    }
  ],
  "recipe": `\n### Ingredients\n* Steamed white Rice (Oryza sativa)\n* Boiled young Cassava (Manihot esculenta)\n* Green Chili (Capsicum annuum) sambal (Sambal Ijo)\n* Gulai Nangka (Jackfruit (Artocarpus heterophyllus) curry)\n* Choice of protein: Rendang, Ayam Pop, or Ayam Bakar.\n\n### Instructions\n1. Nasi Padang is an assembly of dishes rather than a single recipe.\n2. Cook Rice (Oryza sativa) and place a generous portion on a plate.\n3. Add a scoop of Jackfruit (Artocarpus heterophyllus) curry and a side of boiled Cassava (Manihot esculenta).\n4. Add a spoonful of green Chili (Capsicum annuum) sambal.\n5. Top with your chosen protein dish (e.g., Rendang) and drizzle with extra curry sauce.\n    `,
  "nutrition": { calories: "700+ kcal", carbohydrates: "80g", protein: "25g", fat: "35g" },
  "healthBenefits": "Cassava (Manihot esculenta) are rich in iron and vitamins. Spices provide broad antioxidant coverage.",
  "excessRisks": "Highly calorically dense due to Coconut (Cocos nucifera) milk in almost all accompanying dishes. Regular consumption without portion control leads to obesity and high cholesterol."
},
    {
  "id": "indo-gudeg",
  "name": "Gudeg",
  "desc": "A traditional Javanese dish made from young unripe Jackfruit (Artocarpus heterophyllus) stewed for hours in Palm sugar (Arenga pinnata) and Coconut (Cocos nucifera) milk.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Gudeg?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Jackfruit",
      "name": "Artocarpus heterophyllus"
    },
    {
      "ingredient": "Coconut",
      "name": "Cocos nucifera"
    },
    {
      "ingredient": "Teak",
      "name": "Tectona grandis"
    }
  ],
  "recipe": `\n### Ingredients\n* 500g Jackfruit (Artocarpus heterophyllus), chopped\n* 500ml Coconut (Cocos nucifera) milk\n* 100g dark Palm sugar (Arenga pinnata)\n* Teak (Tectona grandis) (gives the reddish-brown color)\n* **Spices**: Coriander (Coriandrum sativum), shallots, Garlic (Allium sativum), candlenut, Galangal (Alpinia galanga), bay leaves.\n\n### Instructions\n1. Blend shallots, Garlic (Allium sativum), Coriander (Coriandrum sativum), and candlenut into a paste.\n2. Line the bottom of a heavy pot with Teak (Tectona grandis). Add the Jackfruit (Artocarpus heterophyllus), spice paste, Palm sugar (Arenga pinnata), and Galangal (Alpinia galanga).\n3. Pour in Coconut (Cocos nucifera) milk to cover.\n4. Simmer on very low heat for 3 to 4 hours until the liquid has completely evaporated, the Jackfruit (Artocarpus heterophyllus) is tender, and turns reddish-brown.\n5. Serve with Rice (Oryza sativa), thick Coconut (Cocos nucifera) cream (areh), and spicy cow skin stew (krecek).\n    `,
  "nutrition": { calories: "350 kcal", carbohydrates: "45g", protein: "5g", fat: "15g" },
  "healthBenefits": "Jackfruit (Artocarpus heterophyllus) is a good source of fiber and potassium. The slow-cooking process breaks down complex fibers making it easy to digest.",
  "excessRisks": "High sugar content from Palm sugar (Arenga pinnata) makes this an extremely sweet dish, risky for diabetics."
},
    {
  "id": "indo-nasi-liwet",
  "name": "Nasi Liwet",
  "desc": "Succulent Rice (Oryza sativa) dish cooked in Coconut (Cocos nucifera) milk, Chicken (Gallus gallus domesticus) broth, and spices.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Nasi%20Liwet?width=600&height=400&nologo=true",
  "emoji": "🍚",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Rice",
      "name": "Oryza sativa"
    },
    {
      "ingredient": "Anchovy",
      "name": "Engraulidae"
    },
    {
      "ingredient": "Lemongrass",
      "name": "Cymbopogon citratus"
    }
  ],
  "recipe": `\n### Ingredients\n* 2 cups jasmine Rice (Oryza sativa)\n* 1 cup thin Coconut (Cocos nucifera) milk, 1 cup Chicken (Gallus gallus domesticus) broth\n* 2 stalks Lemongrass (Cymbopogon citratus), 3 bay leaves\n* 3 shallots, sliced\n* Handful of fried salted anchovies (teri medan)\n\n### Instructions\n1. Wash Rice (Oryza sativa) and place in a Rice (Oryza sativa) cooker or heavy-bottomed pot.\n2. Add Coconut (Cocos nucifera) milk, Chicken (Gallus gallus domesticus) broth, sliced shallots, Lemongrass (Cymbopogon citratus), and bay leaves.\n3. Season lightly with salt (anchovies will add saltiness later).\n4. Cook until done. Fluff the Rice (Oryza sativa).\n5. Top with fried anchovies before serving. Often accompanied by shredded Chicken (Gallus gallus domesticus) and Chayote (Sechium edule) stew.\n    `,
  "nutrition": { calories: "450 kcal", carbohydrates: "55g", protein: "10g", fat: "18g" },
  "healthBenefits": "Anchovies are tiny nutritional powerhouses offering calcium and omega-3s. Comforting and easily digestible.",
  "excessRisks": "Calorie-dense due to Coconut (Cocos nucifera) milk. Salted anchovies provide high sodium, which can increase blood pressure."
},
    {
  "id": "indo-pecel-lele",
  "name": "Pecel Lele",
  "desc": "Deep-fried Catfish (Clarias) served with traditional sambal and fresh vegetables.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Pecel%20Lele?width=600&height=400&nologo=true",
  "emoji": "🐟",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Catfish",
      "name": "Clarias"
    },
    {
      "ingredient": "Tomato",
      "name": "Solanum lycopersicum"
    },
    {
      "ingredient": "Basil (Ocimum basilicum) (Lemon Basil (Ocimum basilicum))",
      "name": "Ocimum × africanum"
    }
  ],
  "recipe": `\n### Ingredients\n* 2 whole Catfish (Clarias), cleaned and scored\n* **Marinade**: Turmeric (Curcuma longa), Coriander (Coriandrum sativum), Garlic (Allium sativum), salt, lime juice.\n* **Sambal**: Tomato (Solanum lycopersicum), shallots, Garlic (Allium sativum), bird's eye Chili (Capsicum annuum), Shrimp (Caridea) paste (terasi), salt, sugar.\n* Fresh Cabbage (Brassica oleracea var. capitata), cucumber, lemon Basil (Ocimum basilicum) for serving.\n\n### Instructions\n1. Marinate the Catfish (Clarias) for 15 minutes.\n2. Deep fry the Catfish (Clarias) in hot oil until crispy and golden brown.\n3. For the sambal: lightly fry the Tomato (Solanum lycopersicum), shallots, Garlic (Allium sativum), and Chili (Capsicum annuum) until soft. Grind them in a mortar with toasted Shrimp (Caridea) paste, salt, and sugar.\n4. Serve the crispy Catfish (Clarias) with Rice (Oryza sativa), sambal, and fresh raw vegetables (lalapan).\n    `,
  "nutrition": { calories: "500 kcal", carbohydrates: "15g", protein: "35g", fat: "30g" },
  "healthBenefits": "Catfish (Clarias) is a healthy lean protein and contains B12. Raw vegetables provide valuable enzymes and fiber.",
  "excessRisks": "Deep frying in reused oil increases trans fats and free radicals. High frequent consumption can harm cardiovascular health."
},
    {
  "id": "indo-ketoprak",
  "name": "Ketoprak",
  "desc": "Vegetarian dish consisting of tofu, vegetables, Rice (Oryza sativa) cake, and Rice (Oryza sativa) vermicelli served in Peanut (Arachis hypogaea) sauce.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Ketoprak?width=600&height=400&nologo=true",
  "emoji": "🍝",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Peanut",
      "name": "Arachis hypogaea"
    },
    {
      "ingredient": "Garlic",
      "name": "Allium sativum"
    },
    {
      "ingredient": "Soy (Glycine max) (Tofu)",
      "name": "Glycine max"
    }
  ],
  "recipe": `\n### Ingredients\n* 1 Rice (Oryza sativa) cake (lontong or ketupat), sliced\n* 1 block fried tofu, cubed\n* 50g Rice (Oryza sativa) vermicelli (bihun), softened\n* Handful of beansprouts, blanched\n* **Peanut (Arachis hypogaea) Sauce**: Ground fried Peanut (Arachis hypogaea), Garlic (Allium sativum), bird's eye Chili (Capsicum annuum), sweet soy sauce, water.\n* Fried shallots and crackers.\n\n### Instructions\n1. Prepare the Peanut (Arachis hypogaea) sauce by grinding Garlic (Allium sativum) and Chili (Capsicum annuum), then mixing with ground Peanut (Arachis hypogaea), sweet soy sauce, and enough water to make a thick dressing.\n2. On a plate, arrange the Rice (Oryza sativa) cake, vermicelli, tofu, and beansprouts.\n3. Pour the Peanut (Arachis hypogaea) sauce generously over the top.\n4. Garnish with fried shallots and serve with crackers.\n    `,
  "nutrition": { calories: "480 kcal", carbohydrates: "60g", protein: "15g", fat: "20g" },
  "healthBenefits": "A highly satisfying vegetarian meal. Tofu provides complete plant protein. Garlic (Allium sativum) is great for the cardiovascular system.",
  "excessRisks": "It is very carb-heavy (Rice (Oryza sativa) cake + noodles) and calorie-dense from the Peanut (Arachis hypogaea) sauce and sweet soy sauce."
},
    {
  "id": "indo-nasi-uduk",
  "name": "Nasi Uduk",
  "desc": "Jakarta style steamed Rice (Oryza sativa) cooked in Coconut (Cocos nucifera) milk, spiced with Lemongrass (Cymbopogon citratus), Clove (Syzygium aromaticum), and Pandan (Pandanus amaryllifolius) leaves.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Nasi%20Uduk?width=600&height=400&nologo=true",
  "emoji": "🍚",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Rice",
      "name": "Oryza sativa"
    },
    {
      "ingredient": "Pandan",
      "name": "Pandanus amaryllifolius"
    },
    {
      "ingredient": "Clove",
      "name": "Syzygium aromaticum"
    }
  ],
  "recipe": `\n### Ingredients\n* 2 cups white Rice (Oryza sativa)\n* 400ml thin Coconut (Cocos nucifera) milk\n* 2 Pandan (Pandanus amaryllifolius) leaves, tied in a knot\n* 1 Lemongrass (Cymbopogon citratus) stalk, bruised\n* 2 Clove (Syzygium aromaticum), 1 bay leaf\n* 1 tsp salt\n\n### Instructions\n1. Wash the Rice (Oryza sativa) and drain.\n2. In a Rice (Oryza sativa) cooker or pot, combine the Rice (Oryza sativa), Coconut (Cocos nucifera) milk, Pandan (Pandanus amaryllifolius), Lemongrass (Cymbopogon citratus), Clove (Syzygium aromaticum), bay leaf, and salt.\n3. Cook until the Rice (Oryza sativa) is fully done and the liquid is absorbed.\n4. Fluff gently.\n5. Serve with fried shallots, sliced omelet, fried Chicken (Gallus gallus domesticus), and Peanut (Arachis hypogaea) sauce.\n    `,
  "nutrition": { calories: "350 kcal", carbohydrates: "45g", protein: "5g", fat: "15g" },
  "healthBenefits": "Pandan (Pandanus amaryllifolius) and Clove (Syzygium aromaticum) contain natural essential oils with mild relaxing and antioxidant effects.",
  "excessRisks": "Like other Coconut (Cocos nucifera) Rice (Oryza sativa) dishes, adding high-fat side dishes will make the overall meal extremely high in saturated fats and total calories."
},
    {
  "id": "indo-lontong-sayur",
  "name": "Lontong Sayur",
  "desc": "Rice (Oryza sativa) cakes served in a vegetable stew of Coconut (Cocos nucifera) milk flavored with spices.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Lontong%20Sayur?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chayote",
      "name": "Sechium edule"
    },
    {
      "ingredient": "Long bean",
      "name": "Vigna unguiculata subsp. sesquipedalis"
    },
    {
      "ingredient": "Rice (Oryza sativa) (Lontong)",
      "name": "Oryza sativa"
    }
  ],
  "recipe": `\n### Ingredients\n* 2 pieces of Lontong (compressed Rice (Oryza sativa) cake), sliced\n* 1 Chayote (Sechium edule), julienned\n* 100g Long bean (Vigna unguiculata subsp. sesquipedalis), cut into 1-inch pieces\n* 500ml Coconut (Cocos nucifera) milk\n* **Spice Paste**: Red Chili (Capsicum annuum), shallots, Garlic (Allium sativum), candlenut, Turmeric (Curcuma longa), Galangal (Alpinia galanga).\n\n### Instructions\n1. Sauté the spice paste until fragrant.\n2. Add the julienned Chayote (Sechium edule) and Long bean (Vigna unguiculata subsp. sesquipedalis); stir briefly.\n3. Pour in the Coconut (Cocos nucifera) milk. Add salt and a pinch of sugar.\n4. Simmer until the vegetables are tender but retain some crunch.\n5. Place sliced lontong in a bowl, ladle the vegetable stew over it, and serve with boiled Chicken (Gallus gallus domesticus) or tofu.\n    `,
  "nutrition": { calories: "400 kcal", carbohydrates: "45g", protein: "8g", fat: "20g" },
  "healthBenefits": "Chayote (Sechium edule) and Long bean (Vigna unguiculata subsp. sesquipedalis) provide dietary fiber, folate, and vitamin C. Good for digestion.",
  "excessRisks": "Coconut (Cocos nucifera) milk broth if consumed entirely adds a lot of saturated fats. Often eaten with crackers, adding empty calories."
},
    {
  "id": "indo-semur-daging",
  "name": "Semur Daging",
  "desc": "Indonesian meat stew braised in thick, sweet soy sauce, shallots, and Nutmeg (Myristica fragrans).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Semur%20Daging?width=600&height=400&nologo=true",
  "emoji": "🥩",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Beef",
      "name": "Bos taurus"
    },
    {
      "ingredient": "Nutmeg",
      "name": "Myristica fragrans"
    },
    {
      "ingredient": "Soy",
      "name": "Glycine max"
    }
  ],
  "recipe": `\n### Ingredients\n* 500g Beef (Bos taurus) (chuck), thinly sliced or cubed\n* 2 Potato (Solanum tuberosum), peeled and cut into chunks\n* 4-5 tbsp sweet soy sauce (Kecap Manis)\n* 1/2 tsp ground Nutmeg (Myristica fragrans), 2 Clove (Syzygium aromaticum)\n* **Spice Paste**: Shallots, Garlic (Allium sativum), Ginger (Zingiber officinale).\n* Water or Beef (Bos taurus) broth.\n\n### Instructions\n1. Sauté the spice paste, Clove (Syzygium aromaticum), and Nutmeg (Myristica fragrans) until fragrant.\n2. Add the Beef (Bos taurus) and cook until browned on the outside.\n3. Pour in water/broth and sweet soy sauce. Bring to a boil.\n4. Lower the heat and simmer for 1.5 hours until the meat is halfway tender.\n5. Add the Potato (Solanum tuberosum) and continue simmering until both meat and Potato (Solanum tuberosum) are fully tender and the sauce has thickened.\n    `,
  "nutrition": { calories: "450 kcal", carbohydrates: "25g", protein: "30g", fat: "22g" },
  "healthBenefits": "Nutmeg (Myristica fragrans) is known for soothing indigestion and its anti-inflammatory properties. Beef (Bos taurus) provides high-quality iron and protein.",
  "excessRisks": "Sweet soy sauce contains massive amounts of added sugar. Frequent consumption can elevate blood glucose levels rapidly."
},
    {
  "id": "indo-sop-buntut",
  "name": "Sop Buntut",
  "desc": "Oxtail soup in a rich but clear Beef (Bos taurus) broth, featuring boiled Potato (Solanum tuberosum), Carrot (Daucus carota), and Tomato (Solanum lycopersicum).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Sop%20Buntut?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Beef (Bos taurus) (Oxtail)",
      "name": "Bos taurus"
    },
    {
      "ingredient": "Carrot",
      "name": "Daucus carota"
    },
    {
      "ingredient": "Nutmeg",
      "name": "Myristica fragrans"
    }
  ],
  "recipe": `\n### Ingredients\n* 1kg oxtail, cut into joints\n* 2 Carrot (Daucus carota), sliced\n* 2 Potato (Solanum tuberosum), cubed\n* 1 Tomato (Solanum lycopersicum), cut into wedges\n* **Spices**: Nutmeg (Myristica fragrans), Clove (Syzygium aromaticum), Cinnamon (Cinnamomum verum) stick, Garlic (Allium sativum), shallots.\n* Scallions and celery leaves.\n\n### Instructions\n1. Blanch the oxtail in boiling water for 10 minutes, then discard the water to clean it.\n2. In a clean pot, boil the oxtail with fresh water, Cinnamon (Cinnamomum verum), Clove (Syzygium aromaticum), and salt until very tender (2-3 hours).\n3. Sauté crushed Garlic (Allium sativum), shallots, and freshly grated Nutmeg (Myristica fragrans), then add to the broth.\n4. Add Potato (Solanum tuberosum) and Carrot (Daucus carota) in the last 15 minutes of cooking.\n5. Add Tomato (Solanum lycopersicum) right before turning off the heat. Garnish with scallions and celery.\n    `,
  "nutrition": { calories: "480 kcal", carbohydrates: "20g", protein: "35g", fat: "28g" },
  "healthBenefits": "Oxtail is rich in gelatin and collagen, which is excellent for joint health, skin elasticity, and gut lining.",
  "excessRisks": "Oxtail is a very fatty cut of meat. The broth can become excessively high in saturated fat and cholesterol if not skimmed properly."
},
    {
  "id": "indo-tongseng",
  "name": "Tongseng",
  "desc": "A rich, spicy Goat (Capra hircus) meat stew cooked with Coconut (Cocos nucifera) milk, sweet soy sauce, and Cabbage (Brassica oleracea var. capitata).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Tongseng?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Goat",
      "name": "Capra hircus"
    },
    {
      "ingredient": "Cabbage",
      "name": "Brassica oleracea var. capitata"
    },
    {
      "ingredient": "Chili",
      "name": "Capsicum annuum"
    }
  ],
  "recipe": `\n### Ingredients\n* 400g Goat (Capra hircus) meat, diced\n* 200g Cabbage (Brassica oleracea var. capitata), roughly chopped\n* 1 Tomato (Solanum lycopersicum), cut into wedges\n* 200ml thin Coconut (Cocos nucifera) milk\n* 2 tbsp sweet soy sauce\n* **Spice Paste**: Shallots, Garlic (Allium sativum), Coriander (Coriandrum sativum), Turmeric (Curcuma longa), Ginger (Zingiber officinale), bird's eye Chili (Capsicum annuum).\n\n### Instructions\n1. Sauté the spice paste until fragrant.\n2. Add the Goat (Capra hircus) meat and cook until nicely browned and coated with spices.\n3. Pour in the Coconut (Cocos nucifera) milk, add sweet soy sauce, bring to a boil, then simmer until the meat is tender.\n4. Once the meat is soft, stir in the Cabbage (Brassica oleracea var. capitata) and Tomato (Solanum lycopersicum) wedges.\n5. Cook for another 2-3 minutes until the vegetables are wilted but still crunchy. Serve hot.\n    `,
  "nutrition": { calories: "550 kcal", carbohydrates: "18g", protein: "35g", fat: "35g" },
  "healthBenefits": "Goat (Capra hircus) meat is a great source of lean protein and essential minerals like zinc and iron.",
  "excessRisks": "The combination of Coconut (Cocos nucifera) milk and sweet soy sauce makes it very calorie-rich. For some, eating too much Goat (Capra hircus) meat can trigger slight blood pressure surges."
}
  ,
    {
  "id": "indo-martabak-manis",
  "name": "Martabak Manis",
  "desc": "A thick, sweet pancake heavily stuffed with chocolate, cheese, Peanut (Arachis hypogaea), and condensed milk.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Martabak%20Manis?width=600&height=400&nologo=true",
  "emoji": "🥞",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Wheat",
      "name": "Triticum"
    },
    {
      "ingredient": "Peanut",
      "name": "Arachis hypogaea"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Mix flour, yeast, sugar, Chicken (Gallus gallus domesticus), and water.
2. Pour into a heated thick pan, let it rise, sprinkle sugar, and fold with toppings.
`,
  "nutrition": { calories: "700 kcal", carbohydrates: "80g", protein: "12g", fat: "35g" }, // Original: High calorie.
  "healthBenefits": "Energy boost.",
  "excessRisks": "High sugar and fat."
},
    {
  "id": "indo-martabak-telur",
  "name": "Martabak Telur",
  "desc": "Savory folded crisp pancake stuffed with seasoned Chicken (Gallus gallus domesticus), meat, and green Onion (Allium cepa).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Martabak%20Telur?width=600&height=400&nologo=true",
  "emoji": "🍳",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chicken (Gallus gallus domesticus) (Chicken (Gallus gallus domesticus))",
      "name": "Gallus gallus domesticus"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Fill a thin stretched dough with a mix of whisked Chicken (Gallus gallus domesticus), minced meat, and scallions.
2. Fold and deep fry.
`,
  "nutrition": { calories: "550 kcal", carbohydrates: "30g", protein: "25g", fat: "35g" }, // Original: High protein, high fat.
  "healthBenefits": "Good protein source.",
  "excessRisks": "High cholesterol and fat."
},
    {
  "id": "indo-klepon",
  "name": "Klepon",
  "desc": "Sweet Rice (Oryza sativa) cake balls filled with liquid Palm sugar (Arenga pinnata) and coated in grated Coconut (Cocos nucifera).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Klepon?width=600&height=400&nologo=true",
  "emoji": "🍡",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Glutinous Rice",
      "name": "Glutinous Rice (Rice (Oryza sativa) glutinosa)"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Mix Glutinous Rice (Glutinous Rice (Rice (Oryza sativa) glutinosa)) flour with Pandan (Pandanus amaryllifolius) juice, fill with Palm sugar (Arenga pinnata), boil until they float, then roll in grated Coconut (Cocos nucifera).
`,
  "nutrition": { calories: "250 kcal", carbohydrates: "50g", protein: "2g", fat: "5g" }, // Original: High carbs.
  "healthBenefits": "Quick energy.",
  "excessRisks": "High sugar."
},
    {
  "id": "indo-onde-onde",
  "name": "Onde-Onde",
  "desc": "Fried Sesame (Sesamum indicum) seed balls filled with sweet mung bean paste.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Onde-Onde?width=600&height=400&nologo=true",
  "emoji": "🧆",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Sesame",
      "name": "Sesamum indicum"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Make dough from Glutinous Rice (Glutinous Rice (Rice (Oryza sativa) glutinosa)) flour, fill with mung bean paste, coat with Sesame (Sesamum indicum) seeds and deep fry.
`,
  "nutrition": { calories: "280 kcal", carbohydrates: "45g", protein: "5g", fat: "10g" }, // Original: Moderate calorie.
  "healthBenefits": "Good fats from Sesame (Sesamum indicum).",
  "excessRisks": "High oil content from deep frying."
},
    {
  "id": "indo-pisang-goreng",
  "name": "Pisang Goreng",
  "desc": "Deep-fried Banana (Musa) or plantain coated in batter.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Pisang%20Goreng?width=600&height=400&nologo=true",
  "emoji": "🍌",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Banana",
      "name": "Musa"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Coat sliced Banana (Musa) in a batter of flour, sugar, and water.
2. Deep fry until golden.
`,
  "nutrition": { calories: "300 kcal", carbohydrates: "40g", protein: "3g", fat: "15g" }, // Original: Moderate calories.
  "healthBenefits": "Potassium from Banana (Musa).",
  "excessRisks": "High saturated fat from frying."
},
    {
  "id": "indo-kue-lapis",
  "name": "Kue Lapis",
  "desc": "Colorful layered steamed soft Rice (Oryza sativa) pudding cake.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Kue%20Lapis?width=600&height=400&nologo=true",
  "emoji": "🍰",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Cassava",
      "name": "Manihot esculenta"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Make a batter with Cassava (Manihot esculenta), Rice (Oryza sativa) flour, and Coconut (Cocos nucifera) milk.
2. Divide into colors and steam layer by layer.
`,
  "nutrition": { calories: "320 kcal", carbohydrates: "65g", protein: "3g", fat: "6g" }, // Original: High carbs.
  "healthBenefits": "Gluten free.",
  "excessRisks": "High sugar."
},
    {
  "id": "indo-lupis",
  "name": "Lupis",
  "desc": "Triangular sticky Rice (Oryza sativa) cake served with grated Coconut (Cocos nucifera) and Palm sugar (Arenga pinnata) syrup.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Lupis?width=600&height=400&nologo=true",
  "emoji": "🍙",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Glutinous Rice",
      "name": "Glutinous Rice (Rice (Oryza sativa) glutinosa)"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Wrap Glutinous Rice (Glutinous Rice (Rice (Oryza sativa) glutinosa)) in Banana (Musa) leaves in a triangle shape, boil until cooked.
2. Serve with Coconut (Cocos nucifera) and sugar syrup.
`,
  "nutrition": { calories: "350 kcal", carbohydrates: "75g", protein: "4g", fat: "5g" }, // Original: High carbs.
  "healthBenefits": "Quick energy.",
  "excessRisks": "High sugar."
},
    {
  "id": "indo-risoles",
  "name": "Risoles",
  "desc": "Savory fried pastry rolls filled with vegetables and Chicken (Gallus gallus domesticus), coated in breadcrumbs.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Risoles?width=600&height=400&nologo=true",
  "emoji": "🌯",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Carrot",
      "name": "Daucus carota"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Make thin crepes, fill with ragout (Carrot (Daucus carota), Chicken (Gallus gallus domesticus)), fold, coat in Chicken (Gallus gallus domesticus) and breadcrumbs, and fry.
`,
  "nutrition": { calories: "320 kcal", carbohydrates: "35g", protein: "10g", fat: "15g" }, // Original: Moderate calorie.
  "healthBenefits": "Vegetables provide fiber.",
  "excessRisks": "Fried food risks."
},
    {
  "id": "indo-lemper",
  "name": "Lemper",
  "desc": "Sticky Rice (Oryza sativa) wrapper filled with savory spiced shredded Chicken (Gallus gallus domesticus), wrapped in Banana (Musa) leaf.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Lemper?width=600&height=400&nologo=true",
  "emoji": "🍙",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chicken",
      "name": "Gallus gallus domesticus"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Cook Glutinous Rice (Glutinous Rice (Rice (Oryza sativa) glutinosa)) with Coconut (Cocos nucifera) milk.
2. Flatten, add cooked shredded Chicken (Gallus gallus domesticus), roll, and wrap in Banana (Musa) leaves.
`,
  "nutrition": { calories: "250 kcal", carbohydrates: "35g", protein: "10g", fat: "8g" }, // Original: Balanced carbs and protein.
  "healthBenefits": "Good protein source.",
  "excessRisks": "High calories from Coconut (Cocos nucifera) milk."
},
    {
  "id": "indo-serabi",
  "name": "Serabi",
  "desc": "Traditional Indonesian pancake made from Rice (Oryza sativa) flour and Coconut (Cocos nucifera) milk or shredded Coconut (Cocos nucifera).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Serabi?width=600&height=400&nologo=true",
  "emoji": "🥞",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Coconut",
      "name": "Cocos nucifera"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Pour a liquid batter of Rice (Oryza sativa) flour and Coconut (Cocos nucifera) milk into a clay pan over charcoal.
2. Serve with sugar syrup.
`,
  "nutrition": { calories: "280 kcal", carbohydrates: "45g", protein: "4g", fat: "10g" }, // Original: Moderate calorie.
  "healthBenefits": "Dairy-free.",
  "excessRisks": "High sugar syrup."
},
    {
  "id": "indo-dadar-gulung",
  "name": "Dadar Gulung",
  "desc": "Green Pandan (Pandanus amaryllifolius) crepe rolled with sweet grated Coconut (Cocos nucifera) filling.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Dadar%20Gulung?width=600&height=400&nologo=true",
  "emoji": "🌯",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Pandan",
      "name": "Pandanus amaryllifolius"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Make a green crepe using Pandan (Pandanus amaryllifolius) juice.
2. Fill with unti (grated Coconut (Cocos nucifera) cooked with Palm sugar (Arenga pinnata)) and fold.
`,
  "nutrition": { calories: "250 kcal", carbohydrates: "40g", protein: "4g", fat: "8g" }, // Original: Moderate calories.
  "healthBenefits": "Fiber from Coconut (Cocos nucifera).",
  "excessRisks": "High sugar."
},
    {
  "id": "indo-getuk",
  "name": "Getuk",
  "desc": "Cassava (Manihot esculenta)-based sweet snack, often colored and served with grated Coconut (Cocos nucifera).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Getuk?width=600&height=400&nologo=true",
  "emoji": "🍠",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Cassava",
      "name": "Manihot esculenta"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Boil Cassava (Manihot esculenta), mash it with sugar and food coloring, then shape it.
2. Serve with freshly grated Coconut (Cocos nucifera).
`,
  "nutrition": { calories: "300 kcal", carbohydrates: "65g", protein: "2g", fat: "4g" }, // Original: High carbs.
  "healthBenefits": "Good source of complex carbs.",
  "excessRisks": "High sugar."
},
    {
  "id": "indo-wingko-babat",
  "name": "Wingko Babat",
  "desc": "Chewy traditional Coconut (Cocos nucifera) pancake made of Glutinous Rice (Glutinous Rice (Rice (Oryza sativa) glutinosa)) flour and grated Coconut (Cocos nucifera).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Wingko%20Babat?width=600&height=400&nologo=true",
  "emoji": "🥞",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Coconut",
      "name": "Cocos nucifera"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Mix Glutinous Rice (Glutinous Rice (Rice (Oryza sativa) glutinosa)) flour, grated young Coconut (Cocos nucifera), and sugar.
2. Bake or grill in small round shapes.
`,
  "nutrition": { calories: "350 kcal", carbohydrates: "50g", protein: "4g", fat: "15g" }, // Original: Moderate calorie.
  "healthBenefits": "Good source of energy.",
  "excessRisks": "High sugar and fat."
},
    {
  "id": "indo-pastel",
  "name": "Pastel",
  "desc": "Fried pastry filled with glass noodles, Carrot (Daucus carota), and boiled Chicken (Gallus gallus domesticus).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Pastel?width=600&height=400&nologo=true",
  "emoji": "🥟",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Carrot",
      "name": "Daucus carota"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Make a pastry crust.
2. Fill with sautéed Carrot (Daucus carota), vermicelli, and Chicken (Gallus gallus domesticus) slices.
3. Pinch the edges and deep fry.
`,
  "nutrition": { calories: "320 kcal", carbohydrates: "35g", protein: "8g", fat: "16g" }, // Original: Moderate calorie.
  "healthBenefits": "Vegetable filling provides vitamins.",
  "excessRisks": "High fat from pastry and frying."
},
    {
  "id": "indo-cireng",
  "name": "Cireng",
  "desc": "Chewy fried Cassava (Manihot esculenta) dough snack, often served with a spicy dip.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Cireng?width=600&height=400&nologo=true",
  "emoji": "🧆",
  "country": "Indonesia",
  "style": "Traditional",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Cassava",
      "name": "Manihot esculenta"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Mix Cassava (Manihot esculenta) flour with water, Garlic (Allium sativum), and scallions to form a sticky dough.
2. Flatten and deep fry.
`,
  "nutrition": { calories: "300 kcal", carbohydrates: "60g", protein: "1g", fat: "6g" }, // Original: High carbs.
  "healthBenefits": "Quick energy.",
  "excessRisks": "High calorie from frying and empty carbs."
},
    {
  "id": "indo-ayam-geprek",
  "name": "Ayam Geprek",
  "desc": "Crispy fried Chicken (Gallus gallus domesticus) crushed and mixed with hot and spicy sambal.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Ayam%20Geprek?width=600&height=400&nologo=true",
  "emoji": "🍗",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chicken",
      "name": "Gallus gallus domesticus"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Fry battered Chicken (Gallus gallus domesticus) until crispy.
2. Crush out flat using a pestle and intensely mix with raw Garlic (Allium sativum) Chili (Capsicum annuum) sambal.
`,
  "nutrition": { calories: "550 kcal", carbohydrates: "25g", protein: "35g", fat: "35g" }, // Original: High protein, high fat.
  "healthBenefits": "Protein and capsaicin boost metabolism.",
  "excessRisks": "Very spicy, can cause gastric issues."
},
    {
  "id": "indo-sate-taichan",
  "name": "Sate Taichan",
  "desc": "A modern spin on satay: white grilled Chicken (Gallus gallus domesticus) meat served without Peanut (Arachis hypogaea) sauce, very spicy.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Sate%20Taichan?width=600&height=400&nologo=true",
  "emoji": "🍢",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chicken",
      "name": "Gallus gallus domesticus"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Grill unmarinated or lightly salted Chicken (Gallus gallus domesticus) skewers.
2. Serve with a watery, extremely spicy Chili (Capsicum annuum) sauce and lime.
`,
  "nutrition": { calories: "350 kcal", carbohydrates: "5g", protein: "45g", fat: "15g" }, // Original: High protein, low fat.
  "healthBenefits": "Lean protein.",
  "excessRisks": "Spiciness can upset the stomach."
},
    {
  "id": "indo-seblak",
  "name": "Seblak",
  "desc": "A savory and spicy dish made of wet krupuk (crackers) cooked with flavorings and aromatic root.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Seblak?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Kencur",
      "name": "Kaempferia galanga"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Boil raw crackers until soft.
2. Sauté a paste of Kencur (Kaempferia galanga), Garlic (Allium sativum), and Chili (Capsicum annuum).
3. Add water, crackers, Chicken (Gallus gallus domesticus), and toppings.
`,
  "nutrition": { calories: "450 kcal", carbohydrates: "70g", protein: "12g", fat: "15g" }, // Original: High carbs.
  "healthBenefits": "Warming spices.",
  "excessRisks": "High sodium and empty carbs."
},
    {
  "id": "indo-nasi-kulit-crispy",
  "name": "Nasi Kulit Crispy",
  "desc": "Rice (Oryza sativa) served with deeply fried, ultra-crispy seasoned Chicken (Gallus gallus domesticus).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Nasi%20Kulit%20Crispy?width=600&height=400&nologo=true",
  "emoji": "🍛",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chicken",
      "name": "Gallus gallus domesticus"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Clean Chicken (Gallus gallus domesticus), marinate, coat in seasoned flour, and deep fry until crispy.
2. Serve with warm Rice (Oryza sativa) and sambal.
`,
  "nutrition": { calories: "650 kcal", carbohydrates: "45g", protein: "20g", fat: "45g" }, // Original: High fat, high calorie.
  "healthBenefits": "Comfort food.",
  "excessRisks": "Extremely high saturated fat and cholesterol."
},
    {
  "id": "indo-indomie-kreasi",
  "name": "Indomie Goreng Kreasi",
  "desc": "Next-level instant noodles topped with salted Chicken (Gallus gallus domesticus), mozzarella, or extravagant meats.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Indomie%20Goreng%20Kreasi?width=600&height=400&nologo=true",
  "emoji": "🍜",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Wheat",
      "name": "Triticum"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Cook instant noodles as instructed.
2. Add extravagant toppings like torch-melted mozzarella, corned Beef (Bos taurus), and a soft-boiled Chicken (Gallus gallus domesticus).
`,
  "nutrition": { calories: "550 kcal", carbohydrates: "65g", protein: "15g", fat: "25g" }, // Original: High carbs and fat.
  "healthBenefits": "Quick energy.",
  "excessRisks": "Very high sodium and preservatives."
},
    {
  "id": "indo-nasi-goreng-seafood-premium",
  "name": "Nasi Goreng Seafood Premium",
  "desc": "Upgraded fried Rice (Oryza sativa) with premium seafood like squid, large prawns, and luxurious sauces.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Nasi%20Goreng%20Seafood%20Premium?width=600&height=400&nologo=true",
  "emoji": "🍛",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Shrimp",
      "name": "Caridea"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Sauté premium seafood, add day-old Rice (Oryza sativa), and mix with a rich blend of oyster sauce, soy sauce, and spices.
`,
  "nutrition": { calories: "550 kcal", carbohydrates: "60g", protein: "30g", fat: "20g" }, // Original: High protein.
  "healthBenefits": "Seafood provides omega-3 and minerals.",
  "excessRisks": "High cholesterol from certain seafood."
},
    {
  "id": "indo-korean-fusion",
  "name": "Korean-Indonesian Fusion",
  "desc": "Dishes like Tteokbokki mixed with Seblak or spicy Gochujang Ayam Geprek.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Korean-Indonesian%20Fusion?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chili",
      "name": "Capsicum annuum"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Combine Korean gochujang and Rice (Oryza sativa) cakes with Indonesian aromatic roots and sambals.
`,
  "nutrition": { calories: "500 kcal", carbohydrates: "75g", protein: "15g", fat: "15g" }, // Original: High carbs.
  "healthBenefits": "Fusion of different spices.",
  "excessRisks": "High sodium."
},
    {
  "id": "indo-croffle-pandan",
  "name": "Pandanus amaryllifolius",
  "desc": "A cross between a croissant and a waffle, infused with Pandan (Pandanus amaryllifolius) flavor and syrup.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Croffle%20Pandan?width=600&height=400&nologo=true",
  "emoji": "🧇",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Pandan",
      "name": "Pandanus amaryllifolius"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Take croissant dough infused with Pandan (Pandanus amaryllifolius), roll it in sugar, and cook it in a waffle maker until caramelized.
`,
  "nutrition": { calories: "450 kcal", carbohydrates: "50g", protein: "6g", fat: "25g" }, // Original: High fat, high sugar.
  "healthBenefits": "Pandan (Pandanus amaryllifolius) offers relaxation.",
  "excessRisks": "High sugar and saturated fat."
},
    {
  "id": "indo-dimsum-kekinian",
  "name": "Dimsum Kekinian",
  "desc": "Modern dimsum topped with mentai sauce, mozzarella, or salted Chicken (Gallus gallus domesticus) sauce, blowtorched.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Dimsum%20Kekinian?width=600&height=400&nologo=true",
  "emoji": "🥟",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chicken",
      "name": "Gallus gallus domesticus"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Steam Chicken (Gallus gallus domesticus) dimsum, coat generously with mayo-pollack roe sauce (mentai), and torch it until charred.
`,
  "nutrition": { calories: "400 kcal", carbohydrates: "30g", protein: "15g", fat: "25g" }, // Original: High fat, moderate protein.
  "healthBenefits": "Good protein.",
  "excessRisks": "Very high calories from mayonnaise sauces."
},
    {
  "id": "indo-batagor-kuah",
  "name": "Batagor Kuah",
  "desc": "Modern take on Batagor, served with warm, savory broth instead of Peanut (Arachis hypogaea) sauce.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Batagor%20Kuah?width=600&height=400&nologo=true",
  "emoji": "🍲",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Mackerel",
      "name": "Scomberomorus"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Deep fry fish dumplings (Batagor).
2. Serve in a hot bowl of savory Chicken (Gallus gallus domesticus) or Beef (Bos taurus) broth with Chili (Capsicum annuum).
`,
  "nutrition": { calories: "450 kcal", carbohydrates: "40g", protein: "15g", fat: "25g" }, // Original: Moderate calories.
  "healthBenefits": "Hydrating broth, fish protein.",
  "excessRisks": "Fried dough."
},
    {
  "id": "indo-mie-pedas-level",
  "name": "Mie Pedas Level",
  "desc": "Trendy dry noodles featuring extreme spiciness levels ranging from level 1 to 100.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Mie%20Pedas%20Level?width=600&height=400&nologo=true",
  "emoji": "🍜",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chili",
      "name": "Capsicum annuum"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Boil noodles and mix thoroughly with pureed bird's eye Chili (Capsicum annuum), Chili (Capsicum annuum) oil, and savory Chicken (Gallus gallus domesticus) seasoning.
`,
  "nutrition": { calories: "480 kcal", carbohydrates: "75g", protein: "12g", fat: "14g" }, // Original: High carbs.
  "healthBenefits": "Capsaicin.",
  "excessRisks": "Can severely irritate the digestive tract."
},
    {
  "id": "indo-ayam-bakar-taliwang-modern",
  "name": "Ayam Bakar Taliwang Modern",
  "desc": "Lombok's spicy grilled Chicken (Gallus gallus domesticus) served in modern Rice (Oryza sativa) bowl setups.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Ayam%20Bakar%20Taliwang%20Modern?width=600&height=400&nologo=true",
  "emoji": "🍗",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Chicken",
      "name": "Gallus gallus domesticus"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Marinate Chicken (Gallus gallus domesticus) in terasi (Shrimp (Caridea) paste) and Chili (Capsicum annuum), grill, and serve over Rice (Oryza sativa) with modern aesthetic garnishes.
`,
  "nutrition": { calories: "450 kcal", carbohydrates: "10g", protein: "45g", fat: "25g" }, // Original: High protein.
  "healthBenefits": "Lean meat if skin is removed.",
  "excessRisks": "Charred parts."
},
    {
  "id": "indo-boba-toast",
  "name": "Boba Toast",
  "desc": "Thick, fluffy toast slathered in cream cheese or milk Tea (Camellia sinensis) cream and topped with chewy Cassava (Manihot esculenta) pearls.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Boba%20Toast?width=600&height=400&nologo=true",
  "emoji": "🍞",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Food",
  "scientificNames": [
    {
      "ingredient": "Cassava",
      "name": "Manihot esculenta"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Toast thick bread, cover with sweet rich cream, and top with cooked warm boba pearls.
`,
  "nutrition": { calories: "600 kcal", carbohydrates: "85g", protein: "8g", fat: "25g" }, // Original: Very high carb and sugar.
  "healthBenefits": "Comfort food.",
  "excessRisks": "Sugar spike."
},
    {
  "id": "drink-boba-milk-tea",
  "name": "Camellia sinensis",
  "desc": "Classic sweet milk Tea (Camellia sinensis) with chewy Cassava (Manihot esculenta) pearls.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Boba%20Milk%20Tea?width=600&height=400&nologo=true",
  "emoji": "🧋",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Beverage",
  "scientificNames": [
    {
      "ingredient": "Tea",
      "name": "Camellia sinensis"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Brew black Tea (Camellia sinensis), mix with milk and sugar syrup, pour over ice and cooked Cassava (Manihot esculenta) pearls.
`,
  "nutrition": { calories: "350 kcal", carbohydrates: "65g", protein: "4g", fat: "8g" }, // Original: High sugar.
  "healthBenefits": "Antioxidants from Tea (Camellia sinensis).",
  "excessRisks": "Excessive sugar."
},
    {
  "id": "drink-brown-sugar-latte",
  "name": "Brown Sugar Latte",
  "desc": "Fresh milk poured over a rich, tiger-striped syrup of molten Palm sugar (Arenga pinnata) and boba.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Brown%20Sugar%20Latte?width=600&height=400&nologo=true",
  "emoji": "🧋",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Beverage",
  "scientificNames": [
    {
      "ingredient": "Beef",
      "name": "Bos taurus"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Simmer Cassava (Manihot esculenta) pearls in dark brown sugar syrup.
2. Swirl on a cup's edges, fill with ice and fresh milk.
`,
  "nutrition": { calories: "450 kcal", carbohydrates: "75g", protein: "8g", fat: "12g" }, // Original: High sugar and dairy.
  "healthBenefits": "Calcium from milk.",
  "excessRisks": "High sugar."
},
    {
  "id": "drink-es-kepal-milo",
  "name": "Es Kepal Milo",
  "desc": "Huge ball of shaved ice drenched in a thick, rich Milo (chocolate malt) syrup.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Es%20Kepal%20Milo?width=600&height=400&nologo=true",
  "emoji": "🍧",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Beverage",
  "scientificNames": [
    {
      "ingredient": "Cocoa",
      "name": "Theobroma cacao"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Shape shaved ice into a ball.
2. Make a very thick syrup with Milo powder and condensed milk, pour over the ice.
`,
  "nutrition": { calories: "500 kcal", carbohydrates: "90g", protein: "6g", fat: "15g" }, // Original: Extremely high sugar.
  "healthBenefits": "Cooling dessert.",
  "excessRisks": "Risk of diabetes."
},
    {
  "id": "drink-tea-latte-lokal",
  "name": "Tea (Camellia sinensis) Latte Lokal",
  "desc": "Tea (Camellia sinensis) mixed with locally sourced milk and sometimes topped with cheese foam.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Matcha%20Latte%20Lokal?width=600&height=400&nologo=true",
  "emoji": "🍵",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Beverage",
  "scientificNames": [
    {
      "ingredient": "Tea",
      "name": "Camellia sinensis"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Whisk Tea (Camellia sinensis) in warm water, pour over ice and milk.
2. Top with a creamy sweet/salty cheese foam.
`,
  "nutrition": { calories: "250 kcal", carbohydrates: "30g", protein: "8g", fat: "10g" }, // Original: Moderate to high calorie.
  "healthBenefits": "Antioxidants.",
  "excessRisks": "High fat from cheese foam."
},
    {
  "id": "drink-kopi-dalgona",
  "name": "Kopi Dalgona",
  "desc": "Whipped instant Coffee (Coffea) foam over cold milk.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Kopi%20Dalgona?width=600&height=400&nologo=true",
  "emoji": "☕",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Beverage",
  "scientificNames": [
    {
      "ingredient": "Coffee",
      "name": "Coffea"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Whip equal parts instant Coffee (Coffea), sugar, and hot water until stiff peaks form.
2. Spoon over iced milk.
`,
  "nutrition": { calories: "300 kcal", carbohydrates: "45g", protein: "6g", fat: "10g" }, // Original: High sugar.
  "healthBenefits": "Caffeine boost.",
  "excessRisks": "High sugar."
},
    {
  "id": "drink-thai-tea-fusion",
  "name": "Thai Tea (Camellia sinensis) Fusion",
  "desc": "Strongly brewed Ceylon Tea (Camellia sinensis) with condensed milk, mixed with modern toppings.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Thai%20Tea%20Fusion?width=600&height=400&nologo=true",
  "emoji": "🧋",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Beverage",
  "scientificNames": [
    {
      "ingredient": "Tea",
      "name": "Camellia sinensis"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Brew Thai Tea (Camellia sinensis) mix, stir in condensed and evaporated milk, serve over crushed ice.
`,
  "nutrition": { calories: "350 kcal", carbohydrates: "65g", protein: "6g", fat: "8g" }, // Original: High sugar.
  "healthBenefits": "Cooling.",
  "excessRisks": "High sugar."
},
    {
  "id": "drink-taro-latte",
  "name": "Taro (Colocasia esculenta) Latte",
  "desc": "Sweet, purple-colored milky drink flavor derived from Taro (Colocasia esculenta) root.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Taro%20Latte?width=600&height=400&nologo=true",
  "emoji": "🍠",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Beverage",
  "scientificNames": [
    {
      "ingredient": "Taro",
      "name": "Colocasia esculenta"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Mix Taro (Colocasia esculenta) powder with hot water, add simple syrup, and top with ice and fresh milk.
`,
  "nutrition": { calories: "320 kcal", carbohydrates: "60g", protein: "4g", fat: "8g" }, // Original: High carbs.
  "healthBenefits": "Comforting.",
  "excessRisks": "Usually contains artificial flavorings."
},
    {
  "id": "drink-sparkling-pandan",
  "name": "Sparkling Pandan (Pandanus amaryllifolius) Drink",
  "desc": "Carbonated soda mixed with natural Pandan (Pandanus amaryllifolius) extract and lime.",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Sparkling%20Pandan%20Drink?width=600&height=400&nologo=true",
  "emoji": "🍹",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Beverage",
  "scientificNames": [
    {
      "ingredient": "Pandan",
      "name": "Pandanus amaryllifolius"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Boil Pandan (Pandanus amaryllifolius) leaves with sugar for syrup.
2. Mix syrup with sparkling water, ice, and a squeeze of lime.
`,
  "nutrition": { calories: "150 kcal", carbohydrates: "38g", protein: "0g", fat: "0g" }, // Original: Moderate sugar.
  "healthBenefits": "Refreshing, relaxing scent.",
  "excessRisks": "Acidic and sugary."
},
    {
  "id": "drink-es-kopi-susu-gula-aren",
  "name": "Es Kopi Susu Gula Aren",
  "desc": "Iced espresso and milk sweetened exclusively with Indonesian Palm sugar (Arenga pinnata).",
  "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Es%20Kopi%20Susu%20Gula%20Aren?width=600&height=400&nologo=true",
  "emoji": "☕",
  "country": "Indonesia",
  "style": "Modern",
  "category": "Beverage",
  "scientificNames": [
    {
      "ingredient": "Coffee",
      "name": "Coffea"
    },
    {
      "ingredient": "Palm sugar",
      "name": "Arenga pinnata"
    }
  ],
  "recipe": `
### Ingredients
* Full ingredients listed below/above.

### Instructions
1. Pull a shot of espresso.
2. Add a generous pump of liquid Palm sugar (Arenga pinnata), ice, and top with fresh milk.
`,
  "nutrition": { calories: "200 kcal", carbohydrates: "30g", protein: "4g", fat: "8g" }, // Original: Moderate calories.
  "healthBenefits": "Caffeine focus. Palm sugar (Arenga pinnata) has slightly lower glycemic index.",
  "excessRisks": "Caffeine tolerance issues."
}
];
