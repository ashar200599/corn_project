import { Dish } from './dishes';

export const USA_DISHES: Dish[] = [
  {
    "id": "usa-hamburger",
    "variations": [
      "Cheeseburger",
      "Bacon Burger",
      "Smashburger"
    ],
    "name": "Classic Burger",
    "desc": "A traditional American dish consisting of a cooked beef patty placed inside a sliced bun, often served with lettuce, tomato, onion, and various sauces.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20culinary%20shot%20of%20classic%20American%20hamburger%20with%20cheese%20lettuce%20tomato%20and%20fries?width=600&height=400&nologo=true",
    "emoji": "🍔",
    "country": "USA",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Beef",
        "name": "Bos taurus"
      },
      {
        "ingredient": "Wheat (Bun)",
        "name": "Triticum aestivum"
      }
    ],
    "ingredients": [
      { "name": "Ground beef", "quantity": 150, "unit": "g" },
      { "name": "Burger bun", "quantity": 1, "unit": "pc" },
      { "name": "Lettuce leaf", "quantity": 1, "unit": "pc" },
      { "name": "Tomato slice", "quantity": 1, "unit": "pc" },
      { "name": "Cheddar cheese", "quantity": 1, "unit": "slice" }
    ],
    "recipe": "### Instructions\n1. Form ground beef into a patty and season with salt and pepper.\n2. Grill or pan-fry the patty until cooked to your desired level.\n3. Toast the burger bun slightly.\n4. Place lettuce and tomato on the bottom bun, add the cooked patty, top with cheese to melt.\n5. Add sauces of choice and top with the other half of the bun.",
    "nutrition": {
      "calories": "550 kcal",
      "carbohydrates": "40g",
      "protein": "30g",
      "fat": "30g"
    },
    "healthBenefits": "High in protein and iron.",
    "excessRisks": "Can be high in saturated fat and sodium if consumed excessively.",
    "servings": 1,
    "prepTime": 10,
    "cookTime": 10
  },
  {
    "id": "usa-clam-chowder",
    "variations": [
      "New England Clam Chowder",
      "Manhattan Clam Chowder"
    ],
    "name": "Clam Chowder",
    "desc": "A rich, creamy traditional American soup containing clams and broth, along with diced potatoes and onions, originating in the Northeastern United States.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20culinary%20shot%20of%20New%20England%20Clam%20Chowder%20in%20a%20bowl%20with%20oyster%20crackers?width=600&height=400&nologo=true",
    "emoji": "🍲",
    "country": "USA",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Clam",
        "name": "Bivalvia"
      },
      {
        "ingredient": "Potato",
        "name": "Solanum tuberosum"
      }
    ],
    "ingredients": [
      { "name": "Chopped clams", "quantity": 200, "unit": "g" },
      { "name": "Potatoes, diced", "quantity": 150, "unit": "g" },
      { "name": "Heavy cream", "quantity": 100, "unit": "ml" },
      { "name": "Onion, chopped", "quantity": 50, "unit": "g" },
      { "name": "Clam juice/broth", "quantity": 250, "unit": "ml" }
    ],
    "recipe": "### Instructions\n1. Sauté the chopped onion in butter until translucent.\n2. Add diced potatoes and clam broth, simmering until potatoes are tender.\n3. Stir in the chopped clams and heavy cream.\n4. Heat gently without bringing to a boil to prevent the cream from curdling.\n5. Season with salt, pepper, and serve hot with oyster crackers.",
    "nutrition": {
      "calories": "350 kcal",
      "carbohydrates": "25g",
      "protein": "15g",
      "fat": "20g"
    },
    "healthBenefits": "Clams provide vitamin B12 and iron.",
    "excessRisks": "High in calories and saturated fats due to heavy cream.",
    "servings": 2,
    "prepTime": 15,
    "cookTime": 25
  },
  {
    "id": "usa-avocado-toast",
    "variations": [
      "Avocado Toast with Egg",
      "Spicy Avocado Toast"
    ],
    "name": "Avocado Toast",
    "desc": "A popular modern American brunch classic featuring sliced or mashed avocado spread onto toasted artisanal bread, garnished with various toppings.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20culinary%20shot%20of%20modern%20Avocado%20Toast%20with%20poached%20egg%20and%20microgreens?width=600&height=400&nologo=true",
    "emoji": "🥑",
    "country": "USA",
    "style": "Modern",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Avocado",
        "name": "Persea americana"
      },
      {
        "ingredient": "Wheat (Bread)",
        "name": "Triticum"
      }
    ],
    "ingredients": [
      { "name": "Ripe avocado", "quantity": 1, "unit": "pc" },
      { "name": "Sourdough bread", "quantity": 2, "unit": "slices" },
      { "name": "Lemon juice", "quantity": 1, "unit": "tbsp" },
      { "name": "Sea salt and black pepper", "quantity": 1, "unit": "pinch" },
      { "name": "Red pepper flakes", "quantity": 0.5, "unit": "tsp" }
    ],
    "recipe": "### Instructions\n1. Toast the slices of sourdough bread until crispy and golden.\n2. Halve and pit the avocado, then scoop the flesh into a bowl.\n3. Mash the avocado with a fork, mixing in the lemon juice, salt, and pepper.\n4. Spread the mashed avocado evenly onto the toasted bread.\n5. Garnish with red pepper flakes and optional toppings like microgreens or a poached egg.",
    "nutrition": {
      "calories": "280 kcal",
      "carbohydrates": "24g",
      "protein": "6g",
      "fat": "18g"
    },
    "healthBenefits": "Rich in healthy monounsaturated fats and dietary fiber.",
    "excessRisks": "High caloric density.",
    "servings": 1,
    "prepTime": 5,
    "cookTime": 5
  },
  {
    "id": "usa-sweet-tea",
    "variations": [
      "Southern Sweet Tea",
      "Peach Sweet Tea",
      "Lemon Sweet Tea"
    ],
    "name": "Sweet Tea",
    "desc": "A hallmark traditional beverage of the American South, made by brewing black tea and sweetening it generously with sugar while still hot, then served over ice.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20culinary%20shot%20of%20Southern%20Sweet%20Tea%20in%20a%20glass%20with%20ice%20and%20lemon?width=600&height=400&nologo=true",
    "emoji": "🥤",
    "country": "USA",
    "style": "Traditional",
    "category": "Beverage",
    "scientificNames": [
      {
        "ingredient": "Tea",
        "name": "Camellia sinensis"
      },
      {
        "ingredient": "Sugar Cane",
        "name": "Saccharum officinarum"
      }
    ],
    "ingredients": [
      { "name": "Black tea bags", "quantity": 4, "unit": "pcs" },
      { "name": "Water", "quantity": 1, "unit": "L" },
      { "name": "Granulated sugar", "quantity": 150, "unit": "g" },
      { "name": "Baking soda (optional)", "quantity": 1, "unit": "pinch" },
      { "name": "Ice cubes", "quantity": 2, "unit": "cups" }
    ],
    "recipe": "### Instructions\n1. Bring half of the water to a boil in a saucepan.\n2. Remove from heat, add tea bags, and steep for 5-7 minutes.\n3. Discard tea bags. Add sugar and a pinch of baking soda (to reduce bitterness) while the tea is hot, stirring until dissolved.\n4. Add the remaining cold water and mix.\n5. Chill in the refrigerator and serve in glasses completely filled with ice.",
    "nutrition": {
      "calories": "110 kcal",
      "carbohydrates": "28g",
      "protein": "0g",
      "fat": "0g"
    },
    "healthBenefits": "Tea provides mild caffeine and antioxidants.",
    "excessRisks": "High in free sugars, increasing risk of metabolic issues.",
    "servings": 4,
    "prepTime": 5,
    "cookTime": 10
  },
  {
    "id": "usa-kombucha",
    "variations": [
      "Ginger Kombucha",
      "Mixed Berry Kombucha"
    ],
    "name": "Kombucha",
    "desc": "A popular modern American health beverage, this lightly effervescent, fermented sweetened black or green tea is renowned for its probiotic properties.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20culinary%20shot%20of%20Kombucha%20fermented%20drink%20in%20a%20glass%20bottle%20with%20berries?width=600&height=400&nologo=true",
    "emoji": "🫙",
    "country": "USA",
    "style": "Modern",
    "category": "Beverage",
    "scientificNames": [
      {
        "ingredient": "Tea",
        "name": "Camellia sinensis"
      },
      {
        "ingredient": "SCOBY",
        "name": "Symbiotic Culture of Bacteria and Yeast"
      }
    ],
    "ingredients": [
      { "name": "Brewed sweetened tea", "quantity": 1, "unit": "L" },
      { "name": "Active Kombucha SCOBY", "quantity": 1, "unit": "pc" },
      { "name": "Starter tea (from previous batch)", "quantity": 100, "unit": "ml" },
      { "name": "Fruit pieces (for flavoring)", "quantity": 50, "unit": "g" }
    ],
    "recipe": "### Instructions\n1. Combine the cooled, sweetened brewed tea with the starter tea in a large glass jar.\n2. Gently place the SCOBY into the liquid.\n3. Cover the jar with a tightly woven cloth and secure with a rubber band. Let sit at room temperature for 7-14 days.\n4. Remove the SCOBY. Transfer the liquid into sealable bottles, adding fruit pieces for flavor.\n5. Seal and let ferment for an additional 2-3 days for carbonation, then refrigerate before serving.",
    "nutrition": {
      "calories": "30 kcal",
      "carbohydrates": "7g",
      "protein": "0g",
      "fat": "0g"
    },
    "healthBenefits": "Contains probiotics that may support gut health.",
    "excessRisks": "May contain trace amounts of alcohol; acidic nature can be harsh on dental enamel.",
    "servings": 4,
    "prepTime": 20,
    "cookTime": 0
  },
  {
    "id": "usa-mac-and-cheese",
    "variations": [
      "Baked Macaroni and Cheese",
      "Lobster Mac and Cheese"
    ],
    "name": "Macaroni and Cheese",
    "desc": "A beloved traditional American comfort food dish consisting of cooked macaroni pasta and a rich, creamy cheese sauce, often baked with a breadcrumb crust.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20culinary%20shot%20of%20traditional%20American%20baked%20Macaroni%20and%20Cheese%20in%20a%20casserole%20dish?width=600&height=400&nologo=true",
    "emoji": "🧀",
    "country": "USA",
    "style": "Traditional",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Wheat (Macaroni)",
        "name": "Triticum aestivum"
      },
      {
        "ingredient": "Milk (Cheese)",
        "name": "Bos taurus"
      }
    ],
    "ingredients": [
      { "name": "Macaroni pasta", "quantity": 250, "unit": "g" },
      { "name": "Cheddar cheese", "quantity": 200, "unit": "g" },
      { "name": "Whole milk", "quantity": 400, "unit": "ml" },
      { "name": "Butter", "quantity": 50, "unit": "g" },
      { "name": "All-purpose flour", "quantity": 50, "unit": "g" }
    ],
    "recipe": "### Instructions\n1. Boil the macaroni pasta in salted water until al dente, then drain.\n2. In a large saucepan, melt the butter and whisk in the flour to create a roux, cooking for 1-2 minutes.\n3. Gradually whisk in the milk until the mixture is smooth and thickened.\n4. Remove from heat and stir in the grated cheddar cheese until completely melted.\n5. Fold the cooked pasta into the cheese sauce. Optionally, transfer to a baking dish, top with breadcrumbs, and bake at 180°C (350°F) until golden brown.",
    "nutrition": {
      "calories": "600 kcal",
      "carbohydrates": "50g",
      "protein": "25g",
      "fat": "30g"
    },
    "healthBenefits": "Provides calcium and protein from the cheese and milk.",
    "excessRisks": "Very high in calories and saturated fats.",
    "servings": 4,
    "prepTime": 15,
    "cookTime": 25
  },
  {
    "id": "usa-poke-bowl",
    "variations": [
      "Ahi Tuna Poke Bowl",
      "Spicy Salmon Poke Bowl"
    ],
    "name": "Poke Bowl",
    "desc": "Originally from Hawaii, this dish has become a modern American mainland staple. It features diced raw fish served over rice with various vibrant vegetable toppings and sauces.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20culinary%20shot%20of%20modern%20Hawaiian%20Ahi%20Tuna%20Poke%20Bowl%20with%20avocado%20edamame%20and%20rice?width=600&height=400&nologo=true",
    "emoji": "🥗",
    "country": "USA",
    "style": "Modern",
    "category": "Food",
    "scientificNames": [
      {
        "ingredient": "Tuna",
        "name": "Thunnini"
      },
      {
        "ingredient": "Rice",
        "name": "Oryza sativa"
      }
    ],
    "ingredients": [
      { "name": "Sushi-grade Ahi Tuna", "quantity": 200, "unit": "g" },
      { "name": "Sushi rice", "quantity": 150, "unit": "g" },
      { "name": "Soy sauce", "quantity": 2, "unit": "tbsp" },
      { "name": "Sesame oil", "quantity": 1, "unit": "tbsp" },
      { "name": "Toppings (Avocado, Edamame, Seaweed, Scallions)", "quantity": 100, "unit": "g" }
    ],
    "recipe": "### Instructions\n1. Cook the sushi rice and season it lightly with rice vinegar, sugar, and salt. Allow it to cool.\n2. Cut the sushi-grade ahi tuna into bite-sized cubes.\n3. In a bowl, toss the cubed tuna gently with soy sauce, sesame oil, and sliced scallions to marinate.\n4. Place a base of the seasoned sushi rice in a serving bowl.\n5. Top the rice with the marinated tuna and arrange your chosen toppings beautifully around it. Garnish with sesame seeds before serving.",
    "nutrition": {
      "calories": "450 kcal",
      "carbohydrates": "45g",
      "protein": "35g",
      "fat": "15g"
    },
    "healthBenefits": "Rich in lean protein and omega-3 fatty acids from the fish.",
    "excessRisks": "Consuming raw fish carries a risk of foodborne illness if not handled properly. Soy sauce adds significant sodium.",
    "servings": 2,
    "prepTime": 20,
    "cookTime": 15
  },
  {
    "id": "usa-root-beer-float",
    "variations": [
      "Cola Float",
      "Cream Soda Float"
    ],
    "name": "Root Beer Float",
    "desc": "A nostalgic and traditional American diner beverage-dessert hybrid, created by dropping scoops of vanilla ice cream into a tall glass of bubbly root beer.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20culinary%20shot%20of%20traditional%20American%20Root%20Beer%20Float%20with%20vanilla%20ice%20cream%20in%20a%20tall%20glass?width=600&height=400&nologo=true",
    "emoji": "🍺",
    "country": "USA",
    "style": "Traditional",
    "category": "Beverage",
    "scientificNames": [
      {
        "ingredient": "Sassafras (traditional Root Beer flavoring)",
        "name": "Sassafras albidum"
      },
      {
        "ingredient": "Milk (Ice Cream)",
        "name": "Bos taurus"
      }
    ],
    "ingredients": [
      { "name": "Root beer", "quantity": 350, "unit": "ml" },
      { "name": "Vanilla ice cream", "quantity": 2, "unit": "scoops" }
    ],
    "recipe": "### Instructions\n1. Chill a tall soda glass in the freezer for about 10 minutes.\n2. Place one scoop of vanilla ice cream into the bottom of the chilled glass.\n3. Slowly pour the root beer over the ice cream. Pouring at an angle helps minimize overflowing foam.\n4. Gently add the second scoop of ice cream on top so it floats in the foam.\n5. Serve immediately with a straw and a long spoon.",
    "nutrition": {
      "calories": "320 kcal",
      "carbohydrates": "55g",
      "protein": "4g",
      "fat": "10g"
    },
    "healthBenefits": "Provides a quick source of energy and calcium from the ice cream.",
    "excessRisks": "Extremely high in sugar and calories.",
    "servings": 1,
    "prepTime": 5,
    "cookTime": 0
  },
  {
    "id": "usa-nitro-cold-brew",
    "variations": [
      "Vanilla Nitro Cold Brew",
      "Sweet Cream Nitro"
    ],
    "name": "Nitro Cold Brew",
    "desc": "A sleek, modern American coffee innovation where cold brew coffee is infused with nitrogen gas, giving it a rich, creamy head and smooth texture, similar to a stout beer.",
    "image": "https://image.pollinations.ai/prompt/Delicious%20high%20quality%20culinary%20shot%20of%20modern%20American%20Nitro%20Cold%20Brew%20coffee%20in%20a%20glass%20with%20cascading%20foam?width=600&height=400&nologo=true",
    "emoji": "☕",
    "country": "USA",
    "style": "Modern",
    "category": "Beverage",
    "scientificNames": [
      {
        "ingredient": "Coffee",
        "name": "Coffea arabica"
      },
      {
        "ingredient": "Nitrogen Gas",
        "name": "N2"
      }
    ],
    "ingredients": [
      { "name": "Coarsely ground coffee", "quantity": 100, "unit": "g" },
      { "name": "Filtered water", "quantity": 1, "unit": "L" },
      { "name": "Nitrogen charger (if using home dispenser)", "quantity": 1, "unit": "pc" }
    ],
    "recipe": "### Instructions\n1. Steep the ground coffee in the filtered water at room temperature or in the fridge for 12-24 hours to create a cold brew concentrate.\n2. Strain the cold brew thoroughly through a fine mesh sieve or coffee filter to remove all grounds.\n3. Dilute the concentrate with water to your preferred strength.\n4. Pour the cold cold brew into a nitro dispenser or whipped cream dispenser and charge it with a nitrogen cartridge.\n5. Dispense the coffee into a glass quickly to enjoy the beautiful cascading effect and creamy micro-foam head.",
    "nutrition": {
      "calories": "5 kcal",
      "carbohydrates": "1g",
      "protein": "0g",
      "fat": "0g"
    },
    "healthBenefits": "High in caffeine and antioxidants, naturally sweeter and less acidic than hot brewed coffee.",
    "excessRisks": "High caffeine content can lead to jitteriness or sleep disruption if consumed late in the day.",
    "servings": 4,
    "prepTime": 15,
    "cookTime": 86400
  }
];
