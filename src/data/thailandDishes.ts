import { Dish } from './dishes';

export const THAILAND_DISHES: Dish[] = [
  {
    "id": "th-tom-yum",
    "variations": [
      "Tom Yum Goong (Shrimp)",
      "Tom Yum Gai (Chicken)",
      "Clear Broth Tom Yum"
    ],
    "name": "Tom Yum",
    "desc": "A type of hot and sour Thai soup, usually cooked with shrimp (goong).",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Tom%20Yum%20soup?width=600&height=400&nologo=true",
    "emoji": "🍲",
    "country": "Thailand",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Lemongrass",
        "name": "Cymbopogon citratus"
      },
      {
        "ingredient": "Galangal",
        "name": "Alpinia galanga"
      }
    ],
    "ingredients": [
      { "name": "Shrimp (Head-on and shell-on)", "quantity": 500, "unit": "g" },
      { "name": "Lemongrass stalks, smashed", "quantity": 3, "unit": "pcs" },
      { "name": "Galangal, sliced", "quantity": 1, "unit": "piece" },
      { "name": "Kaffir lime leaves", "quantity": 10, "unit": "leaves" },
      { "name": "Bird's eye chilies", "quantity": 5, "unit": "pcs" },
      { "name": "Lime juice", "quantity": 3, "unit": "tbsp" },
      { "name": "Fish sauce", "quantity": 3, "unit": "tbsp" },
      { "name": "Chili paste (Nam Prik Pao)", "quantity": 2, "unit": "tbsp" }
    ],
    "recipe": "### Instructions\n1. Boil water or shrimp stock with lemongrass, galangal, and kaffir lime leaves.\n2. Add chili paste, fish sauce, and fresh chilies.\n3. Add mushrooms and shrimp, cooking until the shrimp turn pink.\n4. Turn off the heat and stir in fresh lime juice before serving.",
    "nutrition": {
      "calories": "280 kcal",
      "carbohydrates": "12g",
      "protein": "30g",
      "fat": "10g"
    },
    "healthBenefits": "Packed with immune-boosting herbs.",
    "excessRisks": "Can be high in sodium.",
    "servings": 2,
    "prepTime": 15,
    "cookTime": 15
  },
  {
    "id": "th-green-curry",
    "variations": [
      "Chicken Green Curry",
      "Beef Green Curry",
      "Vegan Green Curry"
    ],
    "name": "Green Curry (Kaeng Khiao Wan)",
    "desc": "A central Thai variety of curry, known for its sweet and spicy profile and its green color originating from green chilies.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Thai%20Green%20Curry?width=600&height=400&nologo=true",
    "emoji": "🍛",
    "country": "Thailand",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Coconut",
        "name": "Cocos nucifera"
      },
      {
        "ingredient": "Chili",
        "name": "Capsicum frutescens"
      }
    ],
    "ingredients": [
      { "name": "Green curry paste", "quantity": 4, "unit": "tbsp" },
      { "name": "Coconut milk", "quantity": 400, "unit": "ml" },
      { "name": "Chicken breast, sliced", "quantity": 400, "unit": "g" },
      { "name": "Thai eggplant", "quantity": 1, "unit": "cup" },
      { "name": "Sweet basil leaves", "quantity": 1, "unit": "cup" }
    ],
    "recipe": "### Instructions\n1. Sauté green curry paste in a minimal amount of coconut milk until fragrant and oil separates.\n2. Add sliced chicken and cook until the exterior is white.\n3. Add the rest of the coconut milk and bring to a simmer.\n4. Add Thai eggplants and cook until soft.\n5. Garnish with sweet basil and sliced red chilies.",
    "nutrition": {
      "calories": "450 kcal",
      "carbohydrates": "15g",
      "protein": "28g",
      "fat": "32g"
    },
    "healthBenefits": "Rich in spices and herbs.",
    "excessRisks": "High saturated fat content from coconut milk.",
    "servings": 3,
    "prepTime": 15,
    "cookTime": 20
  },
  {
    "id": "th-massaman-curry",
    "variations": [
      "Beef Massaman",
      "Chicken Massaman",
      "Lamb Massaman"
    ],
    "name": "Massaman Curry",
    "desc": "A rich, relatively mild Thai curry. It is an interpretation of a Persian dish, blending spices like cardamom and cinnamon with Thai ingredients.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Massaman%20Curry?width=600&height=400&nologo=true",
    "emoji": "🍲",
    "country": "Thailand",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Potato",
        "name": "Solanum tuberosum"
      },
      {
        "ingredient": "Cardamom",
        "name": "Elettaria cardamomum"
      }
    ],
    "ingredients": [
      { "name": "Beef chuck, cubed", "quantity": 500, "unit": "g" },
      { "name": "Massaman curry paste", "quantity": 4, "unit": "tbsp" },
      { "name": "Coconut milk", "quantity": 400, "unit": "ml" },
      { "name": "Potatoes, cubed", "quantity": 300, "unit": "g" },
      { "name": "Roasted peanuts", "quantity": 0.5, "unit": "cup" }
    ],
    "recipe": "### Instructions\n1. Braise the beef chuck in diluted coconut milk until tender (1.5-2 hours).\n2. Skim some coconut fat, sauté the Massaman paste until aromatic.\n3. Add the beef, the remaining coconut milk, potatoes, and peanuts.\n4. Simmer until potatoes are fully cooked. Season with fish sauce, tamarind paste, and palm sugar.",
    "nutrition": {
      "calories": "550 kcal",
      "carbohydrates": "30g",
      "protein": "30g",
      "fat": "35g"
    },
    "healthBenefits": "Good source of protein and heart-healthy nuts.",
    "excessRisks": "High in calories and fat.",
    "servings": 4,
    "prepTime": 20,
    "cookTime": 120
  },
  {
    "id": "th-pad-krapow",
    "variations": [
      "Pork Pad Krapow",
      "Chicken Pad Krapow",
      "Tofu Pad Krapow"
    ],
    "name": "Pad Krapow (Holy Basil Stir-fry)",
    "desc": "One of the most popular Thai street food dishes, featuring minced meat stir-fried with Thai holy basil, garlic, and chilies, usually topped with a fried egg.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Pad%20Krapow?width=600&height=400&nologo=true",
    "emoji": "🍳",
    "country": "Thailand",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Holy Basil",
        "name": "Ocimum tenuiflorum"
      },
      {
        "ingredient": "Garlic",
        "name": "Allium sativum"
      }
    ],
    "ingredients": [
      { "name": "Minced pork or chicken", "quantity": 300, "unit": "g" },
      { "name": "Garlic, minced", "quantity": 4, "unit": "cloves" },
      { "name": "Bird's eye chilies, pounded", "quantity": 5, "unit": "pcs" },
      { "name": "Holy basil leaves", "quantity": 1, "unit": "cup" },
      { "name": "Oyster sauce", "quantity": 1, "unit": "tbsp" },
      { "name": "Soy sauce", "quantity": 1, "unit": "tbsp" }
    ],
    "recipe": "### Instructions\n1. Heat oil in a wok on high heat, toss in garlic and chilies until fragrant.\n2. Add the minced meat and stir-fry until mostly cooked.\n3. Add oyster sauce, soy sauce, and a pinch of sugar.\n4. Toss in the holy basil and stir rapidly for 15 seconds until wilted. Serve with rice and a fried egg.",
    "nutrition": {
      "calories": "350 kcal",
      "carbohydrates": "5g",
      "protein": "25g",
      "fat": "25g"
    },
    "healthBenefits": "High protein, basil provides antioxidants.",
    "excessRisks": "Can be greasy depending on the meat blend used.",
    "servings": 2,
    "prepTime": 10,
    "cookTime": 10
  },
  {
    "id": "th-mango-sticky-rice-modern",
    "variations": [
      "Butterfly Pea Sticky Rice",
      "Pandan Sticky Rice",
      "Black Glutinous Rice"
    ],
    "name": "Modern Mango Sticky Rice",
    "desc": "A contemporary presentation of the classic Thai dessert, sometimes using butterfly pea flowers for blue rice, served with perfectly ripened coconut-infused mango slices.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Modern%20Mango%20Sticky%20Rice?width=600&height=400&nologo=true",
    "emoji": "🥭",
    "country": "Thailand",
    "style": "Modern",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Mango",
        "name": "Mangifera indica"
      },
      {
        "ingredient": "Glutinous Rice",
        "name": "Oryza sativa glutinosa"
      }
    ],
    "ingredients": [
      { "name": "Glutinous rice", "quantity": 1.5, "unit": "cups" },
      { "name": "Coconut milk", "quantity": 1, "unit": "cup" },
      { "name": "Sugar", "quantity": 0.5, "unit": "cup" },
      { "name": "Ripe mango, sliced", "quantity": 2, "unit": "pcs" },
      { "name": "Butterfly pea flower extract (optional)", "quantity": 1, "unit": "tbsp" }
    ],
    "recipe": "### Instructions\n1. Soak the glutinous rice for at least 4 hours (or in butterfly pea water for a blue hue), then steam until tender.\n2. Heat coconut milk with sugar and a pinch of salt until dissolved.\n3. Pour the hot coconut mixture over the cooked hot sticky rice. Cover and let it absorb for 20 minutes.\n4. Serve the infused rice with freshly sliced mango and top with crunchy mung beans and extra coconut cream.",
    "nutrition": {
      "calories": "400 kcal",
      "carbohydrates": "65g",
      "protein": "4g",
      "fat": "15g"
    },
    "healthBenefits": "Mangoes are rich in Vitamin C and A.",
    "excessRisks": "High sugar and glycemic index.",
    "servings": 4,
    "prepTime": 240,
    "cookTime": 25
  },
  {
    "id": "th-thai-tea-smoothie",
    "variations": [
      "Boba Thai Tea Frappe",
      "Vegan Thai Tea Smoothie",
      "Volcano Thai Tea"
    ],
    "name": "Modern Thai Tea Frappe",
    "desc": "A blended, modern variation of traditional Thai iced tea, sometimes topped with whipped cream, boba, or cheese foam.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Thai%20Tea%20Frappe?width=600&height=400&nologo=true",
    "emoji": "🧋",
    "country": "Thailand",
    "style": "Modern",
    "category": "Beverage",
    "scientificNames": [
      {
        "ingredient": "Tea",
        "name": "Camellia sinensis"
      }
    ],
    "ingredients": [
      { "name": "Thai tea mix", "quantity": 3, "unit": "tbsp" },
      { "name": "Boiling water", "quantity": 1, "unit": "cup" },
      { "name": "Sweetened condensed milk", "quantity": 3, "unit": "tbsp" },
      { "name": "Evaporated milk", "quantity": 2, "unit": "tbsp" },
      { "name": "Ice cubes", "quantity": 2, "unit": "cups" }
    ],
    "recipe": "### Instructions\n1. Steep the Thai tea mix in boiling water for 5 minutes. Strain the tea leaves.\n2. Stir in sweetened condensed milk and evaporated milk while the tea is still hot.\n3. Let it cool slightly, then pour the mixture into a blender with ice.\n4. Blend until smooth. Top with whipped cream or serve over tapioca pearls.",
    "nutrition": {
      "calories": "250 kcal",
      "carbohydrates": "40g",
      "protein": "5g",
      "fat": "8g"
    },
    "healthBenefits": "Tea provides antioxidants.",
    "excessRisks": "High in sugar.",
    "servings": 1,
    "prepTime": 10,
    "cookTime": 0
  },
  {
    "id": "th-som-tum",
    "variations": [
      "Som Tum Thai (Peanuts)",
      "Som Tum Pu (Crab)",
      "Som Tum Pla Ra (Fermented Fish)"
    ],
    "name": "Som Tum (Green Papaya Salad)",
    "desc": "A spicy, sweet, and sour salad made from shredded unripe papaya. An absolute staple of Northeastern (Isan) Thai cuisine.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Green%20Papaya%20Salad?width=600&height=400&nologo=true",
    "emoji": "🥗",
    "country": "Thailand",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Papaya",
        "name": "Carica papaya"
      },
      {
        "ingredient": "Peanut",
        "name": "Arachis hypogaea"
      }
    ],
    "ingredients": [
      { "name": "Unripe green papaya, shredded", "quantity": 2, "unit": "cups" },
      { "name": "Cherry tomatoes, halved", "quantity": 0.5, "unit": "cup" },
      { "name": "Long beans, cut", "quantity": 0.25, "unit": "cup" },
      { "name": "Garlic", "quantity": 2, "unit": "cloves" },
      { "name": "Bird's eye chilies", "quantity": 3, "unit": "pcs" },
      { "name": "Lime juice", "quantity": 2, "unit": "tbsp" },
      { "name": "Fish sauce", "quantity": 1.5, "unit": "tbsp" },
      { "name": "Palm sugar", "quantity": 1, "unit": "tbsp" },
      { "name": "Roasted peanuts", "quantity": 2, "unit": "tbsp" }
    ],
    "recipe": "### Instructions\n1. In a mortar and pestle, pound the garlic and chilies until crushed.\n2. Add palm sugar, fish sauce, and lime juice; mix until the sugar dissolves.\n3. Add long beans and cherry tomatoes, bruising them slightly with the pestle.\n4. Toss in the shredded green papaya and combine well. Mix in peanuts before serving.",
    "nutrition": {
      "calories": "150 kcal",
      "carbohydrates": "20g",
      "protein": "4g",
      "fat": "7g"
    },
    "healthBenefits": "Low calorie, high in Vitamin C and fiber.",
    "excessRisks": "Can be highly spicy and high in sodium.",
    "servings": 2,
    "prepTime": 15,
    "cookTime": 0
  },
  {
    "id": "th-khao-soi",
    "variations": [
      "Chicken Khao Soi",
      "Beef Khao Soi",
      "Vegan Tofu Khao Soi"
    ],
    "name": "Khao Soi",
    "desc": "A Northern Thai coconut curry noodle soup. It features a mix of boiled and crispy deep-fried egg noodles in a rich, aromatic broth.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Khao%20Soi?width=600&height=400&nologo=true",
    "emoji": "🍜",
    "country": "Thailand",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Wheat (Noodes)",
        "name": "Triticum"
      },
      {
        "ingredient": "Turmeric",
        "name": "Curcuma longa"
      }
    ],
    "ingredients": [
      { "name": "Egg noodles", "quantity": 200, "unit": "g" },
      { "name": "Chicken drumsticks", "quantity": 4, "unit": "pcs" },
      { "name": "Khao Soi curry paste", "quantity": 3, "unit": "tbsp" },
      { "name": "Coconut milk", "quantity": 400, "unit": "ml" },
      { "name": "Chicken broth", "quantity": 2, "unit": "cups" }
    ],
    "recipe": "### Instructions\n1. Deep fry a small handful of egg noodles to use as a crunchy garnish.\n2. Boil the rest of the egg noodles and set aside.\n3. Sauté the curry paste in coconut cream until fragrant. Add the chicken drumsticks.\n4. Pour in remaining coconut milk and broth; simmer until chicken is fully cooked.\n5. Serve broth over soft noodles, top with crispy noodles, pickled mustard greens, shallots, and lime.",
    "nutrition": {
      "calories": "600 kcal",
      "carbohydrates": "50g",
      "protein": "30g",
      "fat": "35g"
    },
    "healthBenefits": "Turmeric provides anti-inflammatory benefits.",
    "excessRisks": "High in calories, sodium, and saturated fat.",
    "servings": 4,
    "prepTime": 20,
    "cookTime": 45
  }
];
