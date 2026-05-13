import { Dish } from './dishes';

export const MEXICO_DISHES: Dish[] = [
  {
    "id": "mx-pozole",
    "variations": [
      "Pozole Rojo",
      "Pozole Verde",
      "Pozole Blanco"
    ],
    "name": "Pozole",
    "desc": "A traditional soup or stew from Mexican cuisine. It is made from hominy with meat, and can be seasoned and garnished with shredded lettuce or cabbage, chile peppers, onion, garlic, radishes, avocado, salsa or limes.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Pozole?width=600&height=400&nologo=true",
    "emoji": "🍲",
    "country": "Mexico",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Corn",
        "name": "Zea mays"
      },
      {
        "ingredient": "Pork",
        "name": "Sus domesticus" // Pork
      }
    ],
    "ingredients": [
      { "name": "Pork shoulder", "quantity": 1, "unit": "kg" },
      { "name": "Hominy", "quantity": 800, "unit": "g" },
      { "name": "Dried Guajillo Chiles", "quantity": 4, "unit": "pcs" },
      { "name": "Garlic", "quantity": 3, "unit": "cloves" },
      { "name": "Salt", "quantity": 2, "unit": "tsp" }
    ],
    "recipe": "### Ingredients\n* Pork shoulder\n* Hominy\n* Dried Guajillo Chiles\n* Garlic\n* Salt\n\n### Instructions\n1. Cook the pork until tender in a large pot with salt and garlic.\n2. Rehydrate chiles, blend them into a smooth sauce, and strain.\n3. Add the sauce and hominy to the pork broth.\n4. Simmer for another hour.\n5. Serve with garnishes like radish, lime, and cabbage.",
    "nutrition": {
      "calories": "350 kcal",
      "carbohydrates": "35g",
      "protein": "25g",
      "fat": "12g"
    },
    "healthBenefits": "Good source of protein and complex carbohydrates.",
    "excessRisks": "High sodium content.",
    "servings": 6,
    "prepTime": 30,
    "cookTime": 120
  },
  {
    "id": "mx-mole-poblano",
    "variations": [
      "Chicken Mole",
      "Pork Mole",
      "Vegan Mole"
    ],
    "name": "Mole Poblano",
    "desc": "A traditional marinade and sauce originally used in Mexican cuisine. Thick, rich, chocolate-tinged and spicy, typically served over chicken.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Mole%20Poblano?width=600&height=400&nologo=true",
    "emoji": "🍛",
    "country": "Mexico",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Cacao",
        "name": "Theobroma cacao"
      },
      {
        "ingredient": "Chili",
        "name": "Capsicum"
      }
    ],
    "ingredients": [
      { "name": "Chicken pieces", "quantity": 1, "unit": "kg" },
      { "name": "Mole paste (chiles, nuts, spices, chocolate)", "quantity": 500, "unit": "g" },
      { "name": "Chicken broth", "quantity": 1, "unit": "L" },
      { "name": "Sesame seeds", "quantity": 2, "unit": "tbsp" }
    ],
    "recipe": "### Instructions\n1. Boil chicken until thoroughly cooked, reserving broth.\n2. In a separate pot, dissolve mole paste in the chicken broth, simmering until thickened.\n3. Pour hot mole sauce over the chicken.\n4. Garnish with toasted sesame seeds.",
    "nutrition": {
      "calories": "550 kcal",
      "carbohydrates": "40g",
      "protein": "35g",
      "fat": "30g"
    },
    "healthBenefits": "Rich in antioxidants from nuts, chiles, and chocolate.",
    "excessRisks": "Can be high in calories and fat depending on the paste.",
    "servings": 4,
    "prepTime": 20,
    "cookTime": 60
  },
  {
    "id": "mx-ceviche-moderno",
    "variations": [
      "Mango Habanero Ceviche",
      "Watermelon Ceviche",
      "Classic White Fish Ceviche"
    ],
    "name": "Modern Mexican Ceviche",
    "desc": "A fresh and modern take on traditional ceviche, often incorporating sweet fruits like mango or watermelon alongside spicy habanero.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Modern%20Mexican%20Ceviche?width=600&height=400&nologo=true",
    "emoji": "🍤",
    "country": "Mexico",
    "style": "Modern",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Lime",
        "name": "Citrus aurantiifolia"
      },
      {
        "ingredient": "Mango",
        "name": "Mangifera indica"
      }
    ],
    "ingredients": [
      { "name": "Fresh white fish (e.g., mahi-mahi), diced", "quantity": 500, "unit": "g" },
      { "name": "Fresh lime juice", "quantity": 1, "unit": "cup" },
      { "name": "Mango, finely diced", "quantity": 1, "unit": "cup" },
      { "name": "Red onion, thinly sliced", "quantity": 0.5, "unit": "cup" },
      { "name": "Cilantro, chopped", "quantity": 0.25, "unit": "cup" },
      { "name": "Habanero, minced", "quantity": 1, "unit": "pc" }
    ],
    "recipe": "### Instructions\n1. Marinate the diced fish in lime juice for 15-20 minutes until opaque.\n2. Drain excess juice if desired.\n3. Mix in the diced mango, red onion, habanero, and cilantro.\n4. Season with salt and pepper to taste.\n5. Serve immediately with tortilla chips.",
    "nutrition": {
      "calories": "220 kcal",
      "carbohydrates": "15g",
      "protein": "25g",
      "fat": "5g"
    },
    "healthBenefits": "Lean protein, high in Vitamin C.",
    "excessRisks": "Raw fish carries risk of foodborne illness if not handled properly.",
    "servings": 4,
    "prepTime": 25,
    "cookTime": 0
  },
  {
    "id": "mx-chiles-en-nogada",
    "variations": [
      "Traditional Pork",
      "Beef Picadillo",
      "Vegetarian Lentil"
    ],
    "name": "Chiles en Nogada",
    "desc": "Poblano chiles filled with picadillo (a mixture usually containing shredded meat, aromatics, fruits and spices) topped with a walnut-based cream sauce, called nogada, and pomegranate seeds, giving it the three colors of the Mexican flag.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Chiles%20en%20Nogada?width=600&height=400&nologo=true",
    "emoji": "🌶️",
    "country": "Mexico",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Poblano Pepper",
        "name": "Capsicum annuum"
      },
      {
        "ingredient": "Walnut",
        "name": "Juglans"
      },
      {
        "ingredient": "Pomegranate",
        "name": "Punica granatum"
      }
    ],
    "ingredients": [
      { "name": "Poblano chiles, roasted and peeled", "quantity": 4, "unit": "pcs" },
      { "name": "Ground pork/beef mixture", "quantity": 500, "unit": "g" },
      { "name": "Dried fruits (raisins, candied citron)", "quantity": 0.5, "unit": "cup" },
      { "name": "Walnuts, blanched", "quantity": 1, "unit": "cup" },
      { "name": "Crema or heavy cream", "quantity": 1, "unit": "cup" },
      { "name": "Pomegranate seeds", "quantity": 0.5, "unit": "cup" }
    ],
    "recipe": "### Instructions\n1. Sauté meat with aromatics, tomatoes, and dried fruits until cooked.\n2. Stuff the roasted and peeled poblanos with the meat mixture.\n3. Blend walnuts, crema, and a touch of sherry to make the nogada sauce.\n4. Pour sauce over the stuffed chiles and garnish with pomegranate seeds and parsley.",
    "nutrition": {
      "calories": "650 kcal",
      "carbohydrates": "35g",
      "protein": "25g",
      "fat": "45g"
    },
    "healthBenefits": "Good source of healthy fats and antioxidants.",
    "excessRisks": "High in calories and fat.",
    "servings": 4,
    "prepTime": 45,
    "cookTime": 30
  },
  {
    "id": "mx-aguachile",
    "variations": [
      "Aguachile Verde",
      "Aguachile Rojo",
      "Aguachile Negro"
    ],
    "name": "Aguachile",
    "desc": "A Mexican dish made of shrimp, submerged in liquid seasoned with chili peppers, lime juice, salt, cilantro, slices of cucumber and slices of onion.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Aguachile?width=600&height=400&nologo=true",
    "emoji": "🦐",
    "country": "Mexico",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Shrimp",
        "name": "Caridea"
      },
      {
        "ingredient": "Lime",
        "name": "Citrus aurantiifolia"
      }
    ],
    "ingredients": [
      { "name": "Raw shrimp, peeled and butterflied", "quantity": 500, "unit": "g" },
      { "name": "Lime juice", "quantity": 1, "unit": "cup" },
      { "name": "Serrano or Jalapeño peppers", "quantity": 2, "unit": "pcs" },
      { "name": "Cucumber, sliced half moons", "quantity": 1, "unit": "cup" },
      { "name": "Red onion, thinly sliced", "quantity": 0.5, "unit": "cup" }
    ],
    "recipe": "### Instructions\n1. Blend lime juice with chilies, cilantro, salt, and pepper to make the aguachile marinade.\n2. Toss shrimp with the marinade and let sit for 10-15 minutes in the fridge.\n3. Mix in cucumber and red onion.\n4. Serve immediately with tostadas.",
    "nutrition": {
      "calories": "180 kcal",
      "carbohydrates": "10g",
      "protein": "28g",
      "fat": "2g"
    },
    "healthBenefits": "Low calorie, high protein.",
    "excessRisks": "Raw seafood risk.",
    "servings": 4,
    "prepTime": 20,
    "cookTime": 0
  },
  {
    "id": "mx-mezcal-cocktail",
    "variations": [
      "Mezcal Paloma",
      "Smoked Mezcal Margarita",
      "Mezcal Mule"
    ],
    "name": "Modern Mezcal Cocktail",
    "desc": "An artisanal cocktail featuring Mezcal, offering a smoky complexity balanced with fresh citrus and modern syrups like agave or hibiscus.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Mezcal%20Cocktail?width=600&height=400&nologo=true",
    "emoji": "🍸",
    "country": "Mexico",
    "style": "Modern",
    "category": "Beverage",
    "scientificNames": [
      {
        "ingredient": "Agave",
        "name": "Agave"
      }
    ],
    "ingredients": [
      { "name": "Mezcal", "quantity": 2, "unit": "oz" },
      { "name": "Fresh grapefruit or lime juice", "quantity": 1, "unit": "oz" },
      { "name": "Agave nectar", "quantity": 0.5, "unit": "oz" },
      { "name": "Grapefruit soda (optional)", "quantity": 2, "unit": "oz" },
      { "name": "Tajin rim", "quantity": 1, "unit": "dash" }
    ],
    "recipe": "### Instructions\n1. Rim a glass with lime and Tajin.\n2. In a shaker, combine Mezcal, fresh juice, and agave nectar with ice.\n3. Shake well and strain into the rimmed glass filled with fresh ice.\n4. Top with grapefruit soda if desired.",
    "nutrition": {
      "calories": "180 kcal",
      "carbohydrates": "15g",
      "protein": "0g",
      "fat": "0g"
    },
    "healthBenefits": "Minimal compared to solid food.",
    "excessRisks": "Contains alcohol. Drink responsibly.",
    "servings": 1,
    "prepTime": 5,
    "cookTime": 0
  },
  {
    "id": "mx-tamarindo",
    "variations": [
      "Agua de Tamarindo",
      "Spicy Tamarindo",
      "Sparkling Tamarindo"
    ],
    "name": "Agua de Tamarindo",
    "desc": "A traditional, refreshing Mexican agua fresca made from tamarind pods, sugar, and water. It has a distinctive sweet and sour flavor.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Agua%20de%20Tamarindo?width=600&height=400&nologo=true",
    "emoji": "🍹",
    "country": "Mexico",
    "style": "Traditional",
    "category": "Beverage",
    "scientificNames": [
      {
        "ingredient": "Tamarind",
        "name": "Tamarindus indica"
      }
    ],
    "ingredients": [
      { "name": "Tamarind pods, shelled and deveined", "quantity": 15, "unit": "pcs" },
      { "name": "Water", "quantity": 2, "unit": "L" },
      { "name": "Sugar", "quantity": 0.75, "unit": "cup" }
    ],
    "recipe": "### Instructions\n1. Boil the tamarind pods in a few cups of water until soft (about 15 mins).\n2. Let cool, then mash the pulp to separate the seeds.\n3. Strain the pulp into a pitcher, discarding the seeds.\n4. Add remaining water and sugar. Stir well until dissolved. Chill before pouring over ice.",
    "nutrition": {
      "calories": "120 kcal",
      "carbohydrates": "30g",
      "protein": "1g",
      "fat": "0g"
    },
    "healthBenefits": "Tamarind is known for digestive benefits.",
    "excessRisks": "Can be high in added sugar.",
    "servings": 8,
    "prepTime": 30,
    "cookTime": 15
  },
  {
    "id": "mx-birria-tacos",
    "variations": [
      "QuesaBirria Tacos",
      "Beef Birria",
      "Goat Birria"
    ],
    "name": "Birria Tacos (Quesabirria)",
    "desc": "A modern twist on a traditional favorite: braised meat (often beef or goat) folded into a pan-fried corn tortilla with melted cheese, served with a side of rich consommé for dipping.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20food%20photography%20professional%20culinary%20shot%20of%20Birria%20Tacos?width=600&height=400&nologo=true",
    "emoji": "🌮",
    "country": "Mexico",
    "style": "Modern",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Beef",
        "name": "Bos taurus"
      },
      {
        "ingredient": "Corn",
        "name": "Zea mays"
      }
    ],
    "ingredients": [
      { "name": "Beef chuck roast", "quantity": 1, "unit": "kg" },
      { "name": "Dried Ancho and Guajillo chiles", "quantity": 6, "unit": "pcs" },
      { "name": "Oaxaca or Mozzarella Cheese", "quantity": 200, "unit": "g" },
      { "name": "Corn tortillas", "quantity": 12, "unit": "pcs" },
      { "name": "Spices (cinnamon, cloves, cumin, oregano)", "quantity": "to taste", "unit": "" }
    ],
    "recipe": "### Instructions\n1. Slow cook beef with the rehydrated chiles, aromatics, and spices until fall-apart tender.\n2. Shred the meat and reserve the cooking broth (consommé).\n3. Dip corn tortillas in the fat from the top of the consommé, place on a hot griddle.\n4. Add cheese and shredded meat. Fold in half and cook until crispy.\n5. Serve with a bowl of hot consommé sprinkled with cilantro and onion.",
    "nutrition": {
      "calories": "450 kcal",
      "carbohydrates": "30g",
      "protein": "35g",
      "fat": "25g"
    },
    "healthBenefits": "High in protein and comforting.",
    "excessRisks": "High fat and calorie content.",
    "servings": 4,
    "prepTime": 30,
    "cookTime": 180
  }
];
