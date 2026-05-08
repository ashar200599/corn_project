const fs = require('fs');

const path = './src/data/dishes.ts';
let content = fs.readFileSync(path, 'utf8');

const newDishes = [
  {
    id: "indo-gado-gado",
    name: "Gado-Gado",
    desc: "Indonesian salad of slightly boiled, blanched or steamed vegetables and hard-boiled eggs, boiled potato, fried tofu and tempeh, served with a peanut sauce dressing.",
    image: "https://images.unsplash.com/photo-1604586071064-94b39178cbcd?auto=format&fit=crop&q=80&w=600",
    emoji: "🥗",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Peanut", name: "Arachis hypogaea" },
      { ingredient: "Soybean (Tofu/Tempeh)", name: "Glycine max" },
      { ingredient: "Cabbage", name: "Brassica oleracea var. capitata" },
      { ingredient: "Potato", name: "Solanum tuberosum" }
    ],
    recipe: `
### Ingredients
* 100g cabbage, shredded and blanched
* 100g spinach, blanched
* 100g bean sprouts, blanched
* 1 potato, boiled and cubed
* 1 block tofu & tempeh, fried and cubed
* 2 hard-boiled eggs, halved
* **Peanut Sauce**: 200g fried peanuts, 3 cloves garlic, 2 bird's eye chilies, 1 tbsp tamarind juice, 2 tbsp palm sugar, salt, water.

### Instructions
1. Blend or pound the fried peanuts, garlic, chilies, and palm sugar into a paste.
2. Add tamarind juice and water to achieve a smooth, pourable consistency. Season with salt.
3. Arrange the blanched vegetables, potato, tofu, tempeh, and eggs on a plate.
4. Generously pour the peanut sauce over the assembled ingredients.
5. Garnish with fried shallots and serve with prawn crackers (krupuk).
    `,
    nutrition: "Calories: 350 kcal | Carbohydrates: 30g | Protein: 18g | Fat: 20g",
    healthBenefits: "Rich in plant-based proteins (tofu, tempeh) and essential vitamins from fresh vegetables. Peanuts provide healthy fats.",
    excessRisks: "Peanut sauce is calorie and fat-dense. Overconsumption can lead to weight gain."
  },
  {
    id: "indo-sate-ayam",
    name: "Sate Ayam & Kambing",
    desc: "Grilled skewered meat served with peanut sauce (chicken) or sweet soy sauce (goat).",
    image: "https://images.unsplash.com/photo-1541595180632-4742e97aa6fc?auto=format&fit=crop&q=80&w=600",
    emoji: "🍢",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Chicken", name: "Gallus gallus domesticus" },
      { ingredient: "Goat", name: "Capra hircus" },
      { ingredient: "Soybean (Soy Sauce)", name: "Glycine max" }
    ],
    recipe: `
### Ingredients
* 500g chicken or goat meat, cut into bite-sized cubes
* Bamboo skewers (soaked in water)
* **Marinade**: 2 tbsp sweet soy sauce, 1 tbsp oil, 1 tsp coriander powder.
* **Peanut Sauce (for chicken)**: Ground peanuts, sweet soy sauce, garlic, chili, water.

### Instructions
1. Marinate the meat cubes for at least 30 minutes.
2. Thread 4-5 pieces of meat onto each bamboo skewer.
3. Grill over hot charcoal, turning frequently and brushing with extra marinade until cooked and slightly charred.
4. Serve chicken sate with hot peanut sauce, and goat sate with sweet soy sauce mixed with chopped shallots and chilies.
    `,
    nutrition: "Calories: 400 kcal | Carbohydrates: 15g | Protein: 35g | Fat: 22g",
    healthBenefits: "Excellent source of high-quality protein and iron, especially from goat meat. Grilling without excess oil keeps it relatively lean.",
    excessRisks: "Charred meats contain PAHs and HCAs which are potential carcinogens. High consumption of sweet soy sauce increases sugar intake."
  },
  {
    id: "indo-opor-ayam",
    name: "Opor Ayam",
    desc: "Chicken braised in coconut milk with traditional Indonesian spices, commonly served during Eid.",
    image: "https://images.unsplash.com/photo-1627042633096-74fc2256c701?auto=format&fit=crop&q=80&w=600",
    emoji: "🍲",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Chicken", name: "Gallus gallus domesticus" },
      { ingredient: "Coconut", name: "Cocos nucifera" },
      { ingredient: "Coriander", name: "Coriandrum sativum" }
    ],
    recipe: `
### Ingredients
* 1 whole chicken, cut into parts
* 500ml thin coconut milk
* 200ml thick coconut milk
* 2 bay leaves, 2 lemongrass stalks
* **Spice Paste**: Shallots, garlic, coriander, cumin, galangal, turmeric (optional for white opor).

### Instructions
1. Sauté the spice paste with bay leaves and lemongrass until fragrant.
2. Add the chicken pieces and cook until the outside turns opaque.
3. Pour in the thin coconut milk and simmer until the chicken is tender.
4. Stir in the thick coconut milk, season with salt and a pinch of sugar.
5. Simmer gently for another 10 minutes without letting it boil rapidly. Serve with ketupat or rice.
    `,
    nutrition: "Calories: 450 kcal | Carbohydrates: 8g | Protein: 30g | Fat: 35g",
    healthBenefits: "Provides sustained energy and good protein. Spices offer anti-inflammatory properties.",
    excessRisks: "High saturated fat content from coconut milk can increase LDL cholesterol levels if consumed frequently in large portions."
  },
  {
    id: "indo-rawon",
    name: "Rawon",
    desc: "Rich tasting traditional Indonesian beef black soup. The dark color comes from the earthy keluak nut.",
    image: "https://images.unsplash.com/photo-1626200925565-d04b684ec810?auto=format&fit=crop&q=80&w=600",
    emoji: "🍲",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Beef", name: "Bos taurus" },
      { ingredient: "Keluak Nut", name: "Pangium edule" },
      { ingredient: "Mung Bean (Sprouts)", name: "Vigna radiata" }
    ],
    recipe: `
### Ingredients
* 500g beef brisket, cubed
* 6 keluak nuts (crack open, soak inner flesh in warm water)
* 2 lemongrass stalks, 4 kaffir lime leaves
* **Spice Paste**: Shallots, garlic, turmeric, ginger, coriander.
* Short beansprouts, salted egg, shrimp crackers (for serving).

### Instructions
1. Boil beef until tender, reserve the broth and cut the meat into smaller cubes.
2. Blend the soaked keluak flesh with the other spice paste ingredients.
3. Sauté the paste with lemongrass and lime leaves until fragrant and dark.
4. Add the sautéed paste into the beef broth along with the meat.
5. Simmer for 30 minutes to let flavors meld. Serve hot topped with raw short beansprouts.
    `,
    nutrition: "Calories: 400 kcal | Carbohydrates: 10g | Protein: 30g | Fat: 25g",
    healthBenefits: "High in protein and iron from the beef. Keluak contains oleic acid (healthy fat).",
    excessRisks: "Keluak nuts are toxic if not fermented properly. High purine content in beef brisket can trigger gout in susceptible individuals."
  },
  {
    id: "indo-pempek",
    name: "Pempek",
    desc: "Savory Indonesian fishcake delicacy, made of fish and tapioca, served with rich sweet and sour sauce.",
    image: "https://images.unsplash.com/photo-1620959223395-5ff1ecbae5ec?auto=format&fit=crop&q=80&w=600",
    emoji: "🥟",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Mackerel Fish", name: "Scomberomorus" },
      { ingredient: "Cassava (Tapioca)", name: "Manihot esculenta" },
      { ingredient: "Tamarind", name: "Tamarindus indica" }
    ],
    recipe: `
### Ingredients
* 500g Spanish Mackerel fillet, finely ground
* 300g tapioca starch
* 1 egg, 2 cloves garlic (mashed), salt
* **Cuko (Sauce)**: 250g palm sugar, 50g tamarind, garlic, bird's eye chilies, vinegar, water.

### Instructions
1. Mix ground fish, garlic, salt, and egg until sticky. Gradually fold in tapioca starch until moldable.
2. Shape the dough into cylinders (lenjer) or stuff with beaten eggs (kapal selam).
3. Boil the shaped dough in salted water until they float. Remove and drain.
4. Deep fry the boiled fishcakes until golden brown.
5. Boil cuko ingredients until sugar dissolves, strain. Serve fried pempek with the cuko sauce.
    `,
    nutrition: "Calories: 350 kcal | Carbohydrates: 45g | Protein: 15g | Fat: 12g",
    healthBenefits: "Fish provides excellent Omega-3 fatty acids and lean protein. Tapioca is gluten-free.",
    excessRisks: "Deep frying adds empty calories and unhealthy fats. The 'cuko' sauce is extremely high in sugar."
  },
  {
    id: "indo-bakso",
    name: "Bakso",
    desc: "Indonesian meatball soup served with noodles, tofu, and a savory beef broth.",
    image: "https://images.unsplash.com/photo-1549420993-9c8daee26a11?auto=format&fit=crop&q=80&w=600",
    emoji: "🍲",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Beef", name: "Bos taurus" },
      { ingredient: "Wheat (Noodles)", name: "Triticum" },
      { ingredient: "Garlic", name: "Allium sativum" }
    ],
    recipe: `
### Ingredients
* **Meatballs**: 500g finely ground beef, 50g tapioca starch, ice cubes, garlic powder, salt, baking powder.
* **Broth**: Beef bones, water, garlic, celery, salt, white pepper.
* Egg noodles, vermicelli, bok choy for assembly.

### Instructions
1. Blend ground beef, tapioca, ice cubes, garlic powder, and baking powder in a food processor until it forms a smooth, bouncy paste.
2. Shape into balls and drop into hot (not boiling) water until they float.
3. For the broth, simmer beef bones with bruised garlic and celery stalks for 2-3 hours.
4. Assemble noodles and bok choy in a bowl, top with meatballs, and pour boiling broth over.
5. Garnish with fried shallots and celery leaves.
    `,
    nutrition: "Calories: 450 kcal | Carbohydrates: 40g | Protein: 25g | Fat: 20g",
    healthBenefits: "Provides a good mix of carbs and protein. A comforting meal that aids hydration.",
    excessRisks: "Commercially made meatballs may contain excessive MSG and sodium. High sodium can lead to hypertension."
  },
  {
    id: "indo-nasi-padang",
    name: "Nasi Padang",
    desc: "Steamed rice served with various pre-cooked dishes from West Sumatra.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600",
    emoji: "🍛",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Rice", name: "Oryza sativa" },
      { ingredient: "Cassava Leaves", name: "Manihot esculenta" },
      { ingredient: "Jackfruit", name: "Artocarpus heterophyllus" }
    ],
    recipe: `
### Ingredients
* Steamed white rice
* Boiled young cassava leaves
* Green chili sambal (Sambal Ijo)
* Gulai Nangka (Young jackfruit curry)
* Choice of protein: Rendang, Ayam Pop, or Ayam Bakar.

### Instructions
1. Nasi Padang is an assembly of dishes rather than a single recipe.
2. Cook rice and place a generous portion on a plate.
3. Add a scoop of young jackfruit curry and a side of boiled cassava leaves.
4. Add a spoonful of green chili sambal.
5. Top with your chosen protein dish (e.g., Rendang) and drizzle with extra curry sauce.
    `,
    nutrition: "Calories: 700+ kcal | Carbohydrates: 80g | Protein: 25g | Fat: 35g",
    healthBenefits: "Cassava leaves are rich in iron and vitamins. Spices provide broad antioxidant coverage.",
    excessRisks: "Highly calorically dense due to coconut milk in almost all accompanying dishes. Regular consumption without portion control leads to obesity and high cholesterol."
  },
  {
    id: "indo-gudeg",
    name: "Gudeg",
    desc: "A traditional Javanese dish made from young unripe jackfruit stewed for hours in palm sugar and coconut milk.",
    image: "https://images.unsplash.com/photo-1596485888916-2a7f05eb4398?auto=format&fit=crop&q=80&w=600",
    emoji: "🍲",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Young Jackfruit", name: "Artocarpus heterophyllus" },
      { ingredient: "Coconut", name: "Cocos nucifera" },
      { ingredient: "Teak Leaves", name: "Tectona grandis" }
    ],
    recipe: `
### Ingredients
* 500g young jackfruit, chopped
* 500ml coconut milk
* 100g dark palm sugar
* Teak leaves (gives the reddish-brown color)
* **Spices**: Coriander, shallots, garlic, candlenut, galangal, bay leaves.

### Instructions
1. Blend shallots, garlic, coriander, and candlenut into a paste.
2. Line the bottom of a heavy pot with teak leaves. Add the jackfruit, spice paste, palm sugar, and galangal.
3. Pour in coconut milk to cover.
4. Simmer on very low heat for 3 to 4 hours until the liquid has completely evaporated, the jackfruit is tender, and turns reddish-brown.
5. Serve with rice, thick coconut cream (areh), and spicy cow skin stew (krecek).
    `,
    nutrition: "Calories: 350 kcal | Carbohydrates: 45g | Protein: 5g | Fat: 15g",
    healthBenefits: "Jackfruit is a good source of fiber and potassium. The slow-cooking process breaks down complex fibers making it easy to digest.",
    excessRisks: "High sugar content from palm sugar makes this an extremely sweet dish, risky for diabetics."
  },
  {
    id: "indo-nasi-liwet",
    name: "Nasi Liwet",
    desc: "Succulent rice dish cooked in coconut milk, chicken broth, and spices.",
    image: "https://images.unsplash.com/photo-1626200925565-d04b684ec810?auto=format&fit=crop&q=80&w=600",
    emoji: "🍚",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Rice", name: "Oryza sativa" },
      { ingredient: "Anchovy", name: "Engraulidae" },
      { ingredient: "Lemongrass", name: "Cymbopogon citratus" }
    ],
    recipe: `
### Ingredients
* 2 cups jasmine rice
* 1 cup thin coconut milk, 1 cup chicken broth
* 2 stalks lemongrass, 3 bay leaves
* 3 shallots, sliced
* Handful of fried salted anchovies (teri medan)

### Instructions
1. Wash rice and place in a rice cooker or heavy-bottomed pot.
2. Add coconut milk, chicken broth, sliced shallots, lemongrass, and bay leaves.
3. Season lightly with salt (anchovies will add saltiness later).
4. Cook until done. Fluff the rice.
5. Top with fried anchovies before serving. Often accompanied by shredded chicken and chayote stew.
    `,
    nutrition: "Calories: 450 kcal | Carbohydrates: 55g | Protein: 10g | Fat: 18g",
    healthBenefits: "Anchovies are tiny nutritional powerhouses offering calcium and omega-3s. Comforting and easily digestible.",
    excessRisks: "Calorie-dense due to coconut milk. Salted anchovies provide high sodium, which can increase blood pressure."
  },
  {
    id: "indo-pecel-lele",
    name: "Pecel Lele",
    desc: "Deep-fried catfish served with traditional sambal and fresh vegetables.",
    image: "https://images.unsplash.com/photo-1627042633096-74fc2256c701?auto=format&fit=crop&q=80&w=600",
    emoji: "🐟",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Catfish", name: "Clarias" },
      { ingredient: "Tomato", name: "Solanum lycopersicum" },
      { ingredient: "Basil (Lemon Basil)", name: "Ocimum × africanum" }
    ],
    recipe: `
### Ingredients
* 2 whole catfish, cleaned and scored
* **Marinade**: Turmeric, coriander, garlic, salt, lime juice.
* **Sambal**: Tomatoes, shallots, garlic, bird's eye chilies, shrimp paste (terasi), salt, sugar.
* Fresh cabbage, cucumber, lemon basil for serving.

### Instructions
1. Marinate the catfish for 15 minutes.
2. Deep fry the catfish in hot oil until crispy and golden brown.
3. For the sambal: lightly fry the tomatoes, shallots, garlic, and chilies until soft. Grind them in a mortar with toasted shrimp paste, salt, and sugar.
4. Serve the crispy catfish with rice, sambal, and fresh raw vegetables (lalapan).
    `,
    nutrition: "Calories: 500 kcal | Carbohydrates: 15g | Protein: 35g | Fat: 30g",
    healthBenefits: "Catfish is a healthy lean protein and contains B12. Raw vegetables provide valuable enzymes and fiber.",
    excessRisks: "Deep frying in reused oil increases trans fats and free radicals. High frequent consumption can harm cardiovascular health."
  },
  {
    id: "indo-ketoprak",
    name: "Ketoprak",
    desc: "Vegetarian dish consisting of tofu, vegetables, rice cake, and rice vermicelli served in peanut sauce.",
    image: "https://images.unsplash.com/photo-1604586071064-94b39178cbcd?auto=format&fit=crop&q=80&w=600",
    emoji: "🍝",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Peanut", name: "Arachis hypogaea" },
      { ingredient: "Garlic", name: "Allium sativum" },
      { ingredient: "Soybean (Tofu)", name: "Glycine max" }
    ],
    recipe: `
### Ingredients
* 1 rice cake (lontong or ketupat), sliced
* 1 block fried tofu, cubed
* 50g rice vermicelli (bihun), softened
* Handful of beansprouts, blanched
* **Peanut Sauce**: Ground fried peanuts, garlic, bird's eye chili, sweet soy sauce, water.
* Fried shallots and crackers.

### Instructions
1. Prepare the peanut sauce by grinding garlic and chili, then mixing with ground peanuts, sweet soy sauce, and enough water to make a thick dressing.
2. On a plate, arrange the rice cake, vermicelli, tofu, and beansprouts.
3. Pour the peanut sauce generously over the top.
4. Garnish with fried shallots and serve with crackers.
    `,
    nutrition: "Calories: 480 kcal | Carbohydrates: 60g | Protein: 15g | Fat: 20g",
    healthBenefits: "A highly satisfying vegetarian meal. Tofu provides complete plant protein. Garlic is great for the cardiovascular system.",
    excessRisks: "It is very carb-heavy (rice cake + noodles) and calorie-dense from the peanut sauce and sweet soy sauce."
  },
  {
    id: "indo-nasi-uduk",
    name: "Nasi Uduk",
    desc: "Jakarta style steamed rice cooked in coconut milk, spiced with lemongrass, cloves, and pandan leaves.",
    image: "https://images.unsplash.com/photo-1626200925565-d04b684ec810?auto=format&fit=crop&q=80&w=600",
    emoji: "🍚",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Rice", name: "Oryza sativa" },
      { ingredient: "Pandan", name: "Pandanus amaryllifolius" },
      { ingredient: "Clove", name: "Syzygium aromaticum" }
    ],
    recipe: `
### Ingredients
* 2 cups white rice
* 400ml thin coconut milk
* 2 pandan leaves, tied in a knot
* 1 lemongrass stalk, bruised
* 2 cloves, 1 bay leaf
* 1 tsp salt

### Instructions
1. Wash the rice and drain.
2. In a rice cooker or pot, combine the rice, coconut milk, pandan, lemongrass, cloves, bay leaf, and salt.
3. Cook until the rice is fully done and the liquid is absorbed.
4. Fluff gently.
5. Serve with fried shallots, sliced omelet, fried chicken, and peanut sauce.
    `,
    nutrition: "Calories: 350 kcal | Carbohydrates: 45g | Protein: 5g | Fat: 15g",
    healthBenefits: "Pandan and cloves contain natural essential oils with mild relaxing and antioxidant effects.",
    excessRisks: "Like other coconut rice dishes, adding high-fat side dishes will make the overall meal extremely high in saturated fats and total calories."
  },
  {
    id: "indo-lontong-sayur",
    name: "Lontong Sayur",
    desc: "Rice cakes served in a vegetable stew of coconut milk flavored with spices.",
    image: "https://images.unsplash.com/photo-1548811264-b04037593c72?auto=format&fit=crop&q=80&w=600",
    emoji: "🍲",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Chayote", name: "Sechium edule" },
      { ingredient: "Long Bean", name: "Vigna unguiculata subsp. sesquipedalis" },
      { ingredient: "Rice (Lontong)", name: "Oryza sativa" }
    ],
    recipe: `
### Ingredients
* 2 pieces of Lontong (compressed rice cake), sliced
* 1 chayote, julienned
* 100g long beans, cut into 1-inch pieces
* 500ml coconut milk
* **Spice Paste**: Red chilies, shallots, garlic, candlenut, turmeric, galangal.

### Instructions
1. Sauté the spice paste until fragrant.
2. Add the julienned chayote and long beans; stir briefly.
3. Pour in the coconut milk. Add salt and a pinch of sugar.
4. Simmer until the vegetables are tender but retain some crunch.
5. Place sliced lontong in a bowl, ladle the vegetable stew over it, and serve with boiled egg or tofu.
    `,
    nutrition: "Calories: 400 kcal | Carbohydrates: 45g | Protein: 8g | Fat: 20g",
    healthBenefits: "Chayote and long beans provide dietary fiber, folate, and vitamin C. Good for digestion.",
    excessRisks: "Coconut milk broth if consumed entirely adds a lot of saturated fats. Often eaten with crackers, adding empty calories."
  },
  {
    id: "indo-semur-daging",
    name: "Semur Daging",
    desc: "Indonesian meat stew braised in thick, sweet soy sauce, shallots, and nutmeg.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600",
    emoji: "🥩",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Beef", name: "Bos taurus" },
      { ingredient: "Nutmeg", name: "Myristica fragrans" },
      { ingredient: "Soybean", name: "Glycine max" }
    ],
    recipe: `
### Ingredients
* 500g beef (chuck), thinly sliced or cubed
* 2 potatoes, peeled and cut into chunks
* 4-5 tbsp sweet soy sauce (Kecap Manis)
* 1/2 tsp ground nutmeg, 2 cloves
* **Spice Paste**: Shallots, garlic, ginger.
* Water or beef broth.

### Instructions
1. Sauté the spice paste, cloves, and nutmeg until fragrant.
2. Add the beef and cook until browned on the outside.
3. Pour in water/broth and sweet soy sauce. Bring to a boil.
4. Lower the heat and simmer for 1.5 hours until the meat is halfway tender.
5. Add the potatoes and continue simmering until both meat and potatoes are fully tender and the sauce has thickened.
    `,
    nutrition: "Calories: 450 kcal | Carbohydrates: 25g | Protein: 30g | Fat: 22g",
    healthBenefits: "Nutmeg is known for soothing indigestion and its anti-inflammatory properties. Beef provides high-quality iron and protein.",
    excessRisks: "Sweet soy sauce contains massive amounts of added sugar. Frequent consumption can elevate blood glucose levels rapidly."
  },
  {
    id: "indo-sop-buntut",
    name: "Sop Buntut",
    desc: "Oxtail soup in a rich but clear beef broth, featuring boiled potatoes, carrots, and tomatoes.",
    image: "https://images.unsplash.com/photo-1548811264-b04037593c72?auto=format&fit=crop&q=80&w=600",
    emoji: "🍲",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Beef (Oxtail)", name: "Bos taurus" },
      { ingredient: "Carrot", name: "Daucus carota" },
      { ingredient: "Nutmeg", name: "Myristica fragrans" }
    ],
    recipe: `
### Ingredients
* 1kg oxtail, cut into joints
* 2 carrots, sliced
* 2 potatoes, cubed
* 1 tomato, cut into wedges
* **Spices**: Nutmeg, cloves, cinnamon stick, garlic, shallots.
* Scallions and celery leaves.

### Instructions
1. Blanch the oxtail in boiling water for 10 minutes, then discard the water to clean it.
2. In a clean pot, boil the oxtail with fresh water, cinnamon, cloves, and salt until very tender (2-3 hours).
3. Sauté crushed garlic, shallots, and freshly grated nutmeg, then add to the broth.
4. Add potatoes and carrots in the last 15 minutes of cooking.
5. Add tomatoes right before turning off the heat. Garnish with scallions and celery.
    `,
    nutrition: "Calories: 480 kcal | Carbohydrates: 20g | Protein: 35g | Fat: 28g",
    healthBenefits: "Oxtail is rich in gelatin and collagen, which is excellent for joint health, skin elasticity, and gut lining.",
    excessRisks: "Oxtail is a very fatty cut of meat. The broth can become excessively high in saturated fat and cholesterol if not skimmed properly."
  },
  {
    id: "indo-tongseng",
    name: "Tongseng",
    desc: "A rich, spicy goat meat stew cooked with coconut milk, sweet soy sauce, and cabbage.",
    image: "https://images.unsplash.com/photo-1627042633096-74fc2256c701?auto=format&fit=crop&q=80&w=600",
    emoji: "🍲",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [
      { ingredient: "Goat", name: "Capra hircus" },
      { ingredient: "Cabbage", name: "Brassica oleracea var. capitata" },
      { ingredient: "Chili", name: "Capsicum annuum" }
    ],
    recipe: `
### Ingredients
* 400g goat meat, diced
* 200g cabbage, roughly chopped
* 1 tomato, cut into wedges
* 200ml thin coconut milk
* 2 tbsp sweet soy sauce
* **Spice Paste**: Shallots, garlic, coriander, turmeric, ginger, bird's eye chilies.

### Instructions
1. Sauté the spice paste until fragrant.
2. Add the goat meat and cook until nicely browned and coated with spices.
3. Pour in the coconut milk, add sweet soy sauce, bring to a boil, then simmer until the meat is tender.
4. Once the meat is soft, stir in the cabbage and tomato wedges.
5. Cook for another 2-3 minutes until the vegetables are wilted but still crunchy. Serve hot.
    `,
    nutrition: "Calories: 550 kcal | Carbohydrates: 18g | Protein: 35g | Fat: 35g",
    healthBenefits: "Goat meat is a great source of lean protein and essential minerals like zinc and iron.",
    excessRisks: "The combination of coconut milk and sweet soy sauce makes it very calorie-rich. For some, eating too much goat meat can trigger slight blood pressure surges."
  }
];

let modifiedContent = content.replace(
  /\];\s*$/, // find the end of the array
  '  ,\n  ' + newDishes.map(d => JSON.stringify(d, null, 2)).join(',\n  ') + '\n];\n'
);

fs.writeFileSync(path, modifiedContent);
console.log('Successfully updated dishes.ts');
