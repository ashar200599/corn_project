const fs = require('fs');

const path = './src/data/dishes.ts';
let content = fs.readFileSync(path, 'utf8');

const newDishes = [
  // Traditional Indonesian Food
  {
    id: "indo-martabak-manis",
    name: "Martabak Manis",
    desc: "A thick, sweet pancake heavily stuffed with chocolate, cheese, peanuts, and condensed milk.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600",
    emoji: "🥞",
    country: "Indonesia",
    style: "Traditional",
    category: "Food",
    scientificNames: [{ ingredient: "Wheat", name: "Triticum" }, { ingredient: "Peanut", name: "Arachis hypogaea" }],
    recipe: "Mix flour, yeast, sugar, eggs, and water. Pour into a heated thick pan, let it rise, sprinkle sugar, and fold with toppings.",
    nutrition: "High calorie.", healthBenefits: "Energy boost.", excessRisks: "High sugar and fat."
  },
  {
    id: "indo-martabak-telur", name: "Martabak Telur", desc: "Savory folded crisp pancake stuffed with seasoned eggs, meat, and green onions.", image: "https://images.unsplash.com/photo-1604586071064-94b39178cbcd?auto=format&fit=crop&q=80&w=600", emoji: "🍳", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Chicken (Egg)", name: "Gallus gallus domesticus" }], recipe: "Fill a thin stretched dough with a mix of whisked eggs, minced meat, and scallions. Fold and deep fry.", nutrition: "High protein, high fat.", healthBenefits: "Good protein source.", excessRisks: "High cholesterol and fat."
  },
  {
    id: "indo-klepon", name: "Klepon", desc: "Sweet rice cake balls filled with liquid palm sugar and coated in grated coconut.", image: "https://images.unsplash.com/photo-1620959223395-5ff1ecbae5ec?auto=format&fit=crop&q=80&w=600", emoji: "🍡", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Glutinous Rice", name: "Oryza sativa glutinosa" }], recipe: "Mix glutinous rice flour with pandan juice, fill with palm sugar, boil until they float, then roll in grated coconut.", nutrition: "High carbs.", healthBenefits: "Quick energy.", excessRisks: "High sugar."
  },
  {
    id: "indo-onde-onde", name: "Onde-Onde", desc: "Fried sesame seed balls filled with sweet mung bean paste.", image: "https://images.unsplash.com/photo-1541595180632-4742e97aa6fc?auto=format&fit=crop&q=80&w=600", emoji: "🧆", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Sesame", name: "Sesamum indicum" }], recipe: "Make dough from glutinous rice flour, fill with mung bean paste, coat with sesame seeds and deep fry.", nutrition: "Moderate calorie.", healthBenefits: "Good fats from sesame.", excessRisks: "High oil content from deep frying."
  },
  {
    id: "indo-pisang-goreng", name: "Pisang Goreng", desc: "Deep-fried banana or plantain coated in batter.", image: "https://images.unsplash.com/photo-1627042633096-74fc2256c701?auto=format&fit=crop&q=80&w=600", emoji: "🍌", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Banana", name: "Musa" }], recipe: "Coat sliced bananas in a batter of flour, sugar, and water. Deep fry until golden.", nutrition: "Moderate calories.", healthBenefits: "Potassium from bananas.", excessRisks: "High saturated fat from frying."
  },
  {
    id: "indo-kue-lapis", name: "Kue Lapis", desc: "Colorful layered steamed soft rice pudding cake.", image: "https://images.unsplash.com/photo-1596485888916-2a7f05eb4398?auto=format&fit=crop&q=80&w=600", emoji: "🍰", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Tapioca", name: "Manihot esculenta" }], recipe: "Make a batter with tapioca, rice flour, and coconut milk. Divide into colors and steam layer by layer.", nutrition: "High carbs.", healthBenefits: "Gluten free.", excessRisks: "High sugar."
  },
  {
    id: "indo-lupis", name: "Lupis", desc: "Triangular sticky rice cake served with grated coconut and palm sugar syrup.", image: "https://images.unsplash.com/photo-1555507036-ab1e40315bfa?auto=format&fit=crop&q=80&w=600", emoji: "🍙", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Glutinous Rice", name: "Oryza sativa glutinosa" }], recipe: "Wrap glutinous rice in banana leaves in a triangle shape, boil until cooked. Serve with coconut and sugar syrup.", nutrition: "High carbs.", healthBenefits: "Quick energy.", excessRisks: "High sugar."
  },
  {
    id: "indo-risoles", name: "Risoles", desc: "Savory fried pastry rolls filled with vegetables and chicken, coated in breadcrumbs.", image: "https://images.unsplash.com/photo-1549420993-9c8daee26a11?auto=format&fit=crop&q=80&w=600", emoji: "🌯", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Carrot", name: "Daucus carota" }], recipe: "Make thin crepes, fill with ragout (carrots, chicken), fold, coat in egg and breadcrumbs, and fry.", nutrition: "Moderate calorie.", healthBenefits: "Vegetables provide fiber.", excessRisks: "Fried food risks."
  },
  {
    id: "indo-lemper", name: "Lemper", desc: "Sticky rice wrapper filled with savory spiced shredded chicken, wrapped in banana leaf.", image: "https://images.unsplash.com/photo-1626200925565-d04b684ec810?auto=format&fit=crop&q=80&w=600", emoji: "🍙", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Chicken", name: "Gallus gallus domesticus" }], recipe: "Cook glutinous rice with coconut milk. Flatten, add cooked shredded chicken, roll, and wrap in banana leaves.", nutrition: "Balanced carbs and protein.", healthBenefits: "Good protein source.", excessRisks: "High calories from coconut milk."
  },
  {
    id: "indo-serabi", name: "Serabi", desc: "Traditional Indonesian pancake made from rice flour and coconut milk or shredded coconut.", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600", emoji: "🥞", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Coconut", name: "Cocos nucifera" }], recipe: "Pour a liquid batter of rice flour and coconut milk into a clay pan over charcoal. Serve with sugar syrup.", nutrition: "Moderate calorie.", healthBenefits: "Dairy-free.", excessRisks: "High sugar syrup."
  },
  {
    id: "indo-dadar-gulung", name: "Dadar Gulung", desc: "Green pandan crepe rolled with sweet grated coconut filling.", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=600", emoji: "🌯", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Pandan", name: "Pandanus amaryllifolius" }], recipe: "Make a green crepe using pandan juice. Fill with unti (grated coconut cooked with palm sugar) and fold.", nutrition: "Moderate calories.", healthBenefits: "Fiber from coconut.", excessRisks: "High sugar."
  },
  {
    id: "indo-getuk", name: "Getuk", desc: "Cassava-based sweet snack, often colored and served with grated coconut.", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600", emoji: "🍠", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Cassava", name: "Manihot esculenta" }], recipe: "Boil cassava, mash it with sugar and food coloring, then shape it. Serve with freshly grated coconut.", nutrition: "High carbs.", healthBenefits: "Good source of complex carbs.", excessRisks: "High sugar."
  },
  {
    id: "indo-wingko-babat", name: "Wingko Babat", desc: "Chewy traditional coconut pancake made of glutinous rice flour and grated coconut.", image: "https://images.unsplash.com/photo-1555507036-ab1e40315bfa?auto=format&fit=crop&q=80&w=600", emoji: "🥞", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Coconut", name: "Cocos nucifera" }], recipe: "Mix glutinous rice flour, grated young coconut, and sugar. Bake or grill in small round shapes.", nutrition: "Moderate calorie.", healthBenefits: "Good source of energy.", excessRisks: "High sugar and fat."
  },
  {
    id: "indo-pastel", name: "Pastel", desc: "Fried pastry filled with glass noodles, carrots, and boiled egg.", image: "https://images.unsplash.com/photo-1549420993-9c8daee26a11?auto=format&fit=crop&q=80&w=600", emoji: "🥟", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Carrot", name: "Daucus carota" }], recipe: "Make a pastry crust. Fill with sautéed carrots, vermicelli, and egg slices. Pinch the edges and deep fry.", nutrition: "Moderate calorie.", healthBenefits: "Vegetable filling provides vitamins.", excessRisks: "High fat from pastry and frying."
  },
  {
    id: "indo-cireng", name: "Cireng", desc: "Chewy fried tapioca dough snack, often served with a spicy dip.", image: "https://images.unsplash.com/photo-1627042633096-74fc2256c701?auto=format&fit=crop&q=80&w=600", emoji: "🧆", country: "Indonesia", style: "Traditional", category: "Food", scientificNames: [{ ingredient: "Tapioca", name: "Manihot esculenta" }], recipe: "Mix tapioca flour with water, garlic, and scallions to form a sticky dough. Flatten and deep fry.", nutrition: "High carbs.", healthBenefits: "Quick energy.", excessRisks: "High calorie from frying and empty carbs."
  },

  // Modern Indonesian Food
  {
    id: "indo-ayam-geprek", name: "Ayam Geprek", desc: "Crispy fried chicken crushed and mixed with hot and spicy sambal.", image: "https://images.unsplash.com/photo-1626200925565-d04b684ec810?auto=format&fit=crop&q=80&w=600", emoji: "🍗", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Chicken", name: "Gallus gallus domesticus" }], recipe: "Fry battered chicken until crispy. Crush out flat using a pestle and intensely mix with raw garlic chili sambal.", nutrition: "High protein, high fat.", healthBenefits: "Protein and capsaicin boost metabolism.", excessRisks: "Very spicy, can cause gastric issues."
  },
  {
    id: "indo-sate-taichan", name: "Sate Taichan", desc: "A modern spin on satay: white grilled chicken meat served without peanut sauce, very spicy.", image: "https://images.unsplash.com/photo-1541595180632-4742e97aa6fc?auto=format&fit=crop&q=80&w=600", emoji: "🍢", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Chicken", name: "Gallus gallus domesticus" }], recipe: "Grill unmarinated or lightly salted chicken skewers. Serve with a watery, extremely spicy chili sauce and lime.", nutrition: "High protein, low fat.", healthBenefits: "Lean protein.", excessRisks: "Spiciness can upset the stomach."
  },
  {
    id: "indo-seblak", name: "Seblak", desc: "A savory and spicy dish made of wet krupuk (crackers) cooked with flavorings and aromatic root.", image: "https://images.unsplash.com/photo-1548811264-b04037593c72?auto=format&fit=crop&q=80&w=600", emoji: "🍲", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Lesser Galangal", name: "Kaempferia galanga" }], recipe: "Boil raw crackers until soft. Sauté a paste of lesser galangal, garlic, and chilies. Add water, crackers, egg, and toppings.", nutrition: "High carbs.", healthBenefits: "Warming spices.", excessRisks: "High sodium and empty carbs."
  },
  {
    id: "indo-nasi-kulit-crispy", name: "Nasi Kulit Crispy", desc: "Rice served with deeply fried, ultra-crispy seasoned chicken skin.", image: "https://images.unsplash.com/photo-1626200925565-d04b684ec810?auto=format&fit=crop&q=80&w=600", emoji: "🍛", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Chicken Skin", name: "Gallus gallus domesticus" }], recipe: "Clean chicken skin, marinate, coat in seasoned flour, and deep fry until crispy. Serve with warm rice and sambal.", nutrition: "High fat, high calorie.", healthBenefits: "Comfort food.", excessRisks: "Extremely high saturated fat and cholesterol."
  },
  {
    id: "indo-indomie-kreasi", name: "Indomie Goreng Kreasi", desc: "Next-level instant noodles topped with salted egg, mozzarella, or extravagant meats.", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=600", emoji: "🍜", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Wheat", name: "Triticum" }], recipe: "Cook instant noodles as instructed. Add extravagant toppings like torch-melted mozzarella, corned beef, and a soft-boiled egg.", nutrition: "High carbs and fat.", healthBenefits: "Quick energy.", excessRisks: "Very high sodium and preservatives."
  },
  {
    id: "indo-nasi-goreng-seafood-premium", name: "Nasi Goreng Seafood Premium", desc: "Upgraded fried rice with premium seafood like squid, large prawns, and luxurious sauces.", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600", emoji: "🍛", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Shrimp", name: "Caridea" }], recipe: "Sauté premium seafood, add day-old rice, and mix with a rich blend of oyster sauce, soy sauce, and spices.", nutrition: "High protein.", healthBenefits: "Seafood provides omega-3 and minerals.", excessRisks: "High cholesterol from certain seafood."
  },
  {
    id: "indo-korean-fusion", name: "Korean-Indonesian Fusion", desc: "Dishes like Tteokbokki mixed with Seblak or spicy Gochujang Ayam Geprek.", image: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&q=80&w=600", emoji: "🍲", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Chili", name: "Capsicum annuum" }], recipe: "Combine Korean gochujang and rice cakes with Indonesian aromatic roots and sambals.", nutrition: "High carbs.", healthBenefits: "Fusion of different spices.", excessRisks: "High sodium."
  },
  {
    id: "indo-croffle-pandan", name: "Croffle Pandan", desc: "A cross between a croissant and a waffle, infused with pandan flavor and syrup.", image: "https://images.unsplash.com/photo-1555507036-ab1e40315bfa?auto=format&fit=crop&q=80&w=600", emoji: "🧇", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Pandan", name: "Pandanus amaryllifolius" }], recipe: "Take croissant dough infused with pandan, roll it in sugar, and cook it in a waffle maker until caramelized.", nutrition: "High fat, high sugar.", healthBenefits: "Pandan offers relaxation.", excessRisks: "High sugar and saturated fat."
  },
  {
    id: "indo-dimsum-kekinian", name: "Dimsum Kekinian", desc: "Modern dimsum topped with mentai sauce, mozzarella, or salted egg sauce, blowtorched.", image: "https://images.unsplash.com/photo-1620959223395-5ff1ecbae5ec?auto=format&fit=crop&q=80&w=600", emoji: "🥟", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Chicken", name: "Gallus gallus domesticus" }], recipe: "Steam chicken dimsum, coat generously with mayo-pollack roe sauce (mentai), and torch it until charred.", nutrition: "High fat, moderate protein.", healthBenefits: "Good protein.", excessRisks: "Very high calories from mayonnaise sauces."
  },
  {
    id: "indo-batagor-kuah", name: "Batagor Kuah", desc: "Modern take on Batagor, served with warm, savory broth instead of peanut sauce.", image: "https://images.unsplash.com/photo-1549420993-9c8daee26a11?auto=format&fit=crop&q=80&w=600", emoji: "🍲", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Mackerel", name: "Scomberomorus" }], recipe: "Deep fry fish dumplings (Batagor). Serve in a hot bowl of savory chicken or beef broth with chili.", nutrition: "Moderate calories.", healthBenefits: "Hydrating broth, fish protein.", excessRisks: "Fried dough."
  },
  {
    id: "indo-mie-pedas-level", name: "Mie Pedas Level", desc: "Trendy dry noodles featuring extreme spiciness levels ranging from level 1 to 100.", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=600", emoji: "🍜", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Chili", name: "Capsicum annuum" }], recipe: "Boil noodles and mix thoroughly with pureed bird's eye chilies, chili oil, and savory chicken seasoning.", nutrition: "High carbs.", healthBenefits: "Capsaicin.", excessRisks: "Can severely irritate the digestive tract."
  },
  {
    id: "indo-ayam-bakar-taliwang-modern", name: "Ayam Bakar Taliwang Modern", desc: "Lombok's spicy grilled chicken served in modern rice bowl setups.", image: "https://images.unsplash.com/photo-1627042633096-74fc2256c701?auto=format&fit=crop&q=80&w=600", emoji: "🍗", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Chicken", name: "Gallus gallus domesticus" }], recipe: "Marinate chicken in terasi (shrimp paste) and chilies, grill, and serve over rice with modern aesthetic garnishes.", nutrition: "High protein.", healthBenefits: "Lean meat if skin is removed.", excessRisks: "Charred parts."
  },
  {
    id: "indo-boba-toast", name: "Boba Toast", desc: "Thick, fluffy toast slathered in cream cheese or milk tea cream and topped with chewy tapioca pearls.", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=600", emoji: "🍞", country: "Indonesia", style: "Modern", category: "Food", scientificNames: [{ ingredient: "Tapioca", name: "Manihot esculenta" }], recipe: "Toast thick bread, cover with sweet rich cream, and top with cooked warm boba pearls.", nutrition: "Very high carb and sugar.", healthBenefits: "Comfort food.", excessRisks: "Sugar spike."
  },

  // Modern Beverage Drink
  {
    id: "drink-boba-milk-tea", name: "Boba Milk Tea", desc: "Classic sweet milk tea with chewy tapioca pearls.", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600", emoji: "🧋", country: "Indonesia", style: "Modern", category: "Beverage", scientificNames: [{ ingredient: "Tea", name: "Camellia sinensis" }], recipe: "Brew black tea, mix with milk and sugar syrup, pour over ice and cooked tapioca pearls.", nutrition: "High sugar.", healthBenefits: "Antioxidants from tea.", excessRisks: "Excessive sugar."
  },
  {
    id: "drink-brown-sugar-latte", name: "Brown Sugar Latte", desc: "Fresh milk poured over a rich, tiger-striped syrup of molten palm sugar and boba.", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600", emoji: "🧋", country: "Indonesia", style: "Modern", category: "Beverage", scientificNames: [{ ingredient: "Cow's Milk", name: "Bos taurus" }], recipe: "Simmer tapioca pearls in dark brown sugar syrup. Swirl on a cup's edges, fill with ice and fresh milk.", nutrition: "High sugar and dairy.", healthBenefits: "Calcium from milk.", excessRisks: "High sugar."
  },
  {
    id: "drink-es-kepal-milo", name: "Es Kepal Milo", desc: "Huge ball of shaved ice drenched in a thick, rich Milo (chocolate malt) syrup.", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600", emoji: "🍧", country: "Indonesia", style: "Modern", category: "Beverage", scientificNames: [{ ingredient: "Cocoa", name: "Theobroma cacao" }], recipe: "Shape shaved ice into a ball. Make a very thick syrup with Milo powder and condensed milk, pour over the ice.", nutrition: "Extremely high sugar.", healthBenefits: "Cooling dessert.", excessRisks: "Risk of diabetes."
  },
  {
    id: "drink-matcha-latte-lokal", name: "Matcha Latte Lokal", desc: "Matcha mixed with locally sourced milk and sometimes topped with cheese foam.", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600", emoji: "🍵", country: "Indonesia", style: "Modern", category: "Beverage", scientificNames: [{ ingredient: "Matcha", name: "Camellia sinensis" }], recipe: "Whisk matcha in warm water, pour over ice and milk. Top with a creamy sweet/salty cheese foam.", nutrition: "Moderate to high calorie.", healthBenefits: "Antioxidants.", excessRisks: "High fat from cheese foam."
  },
  {
    id: "drink-kopi-dalgona", name: "Kopi Dalgona", desc: "Whipped instant coffee foam over cold milk.", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600", emoji: "☕", country: "Indonesia", style: "Modern", category: "Beverage", scientificNames: [{ ingredient: "Coffee", name: "Coffea" }], recipe: "Whip equal parts instant coffee, sugar, and hot water until stiff peaks form. Spoon over iced milk.", nutrition: "High sugar.", healthBenefits: "Caffeine boost.", excessRisks: "High sugar."
  },
  {
    id: "drink-thai-tea-fusion", name: "Thai Tea Fusion", desc: "Strongly brewed Ceylon tea with condensed milk, mixed with modern toppings.", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600", emoji: "🧋", country: "Indonesia", style: "Modern", category: "Beverage", scientificNames: [{ ingredient: "Tea", name: "Camellia sinensis" }], recipe: "Brew Thai tea mix, stir in condensed and evaporated milk, serve over crushed ice.", nutrition: "High sugar.", healthBenefits: "Cooling.", excessRisks: "High sugar."
  },
  {
    id: "drink-taro-latte", name: "Taro Latte", desc: "Sweet, purple-colored milky drink flavor derived from taro root.", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600", emoji: "🍠", country: "Indonesia", style: "Modern", category: "Beverage", scientificNames: [{ ingredient: "Taro", name: "Colocasia esculenta" }], recipe: "Mix taro powder with hot water, add simple syrup, and top with ice and fresh milk.", nutrition: "High carbs.", healthBenefits: "Comforting.", excessRisks: "Usually contains artificial flavorings."
  },
  {
    id: "drink-sparkling-pandan", name: "Sparkling Pandan Drink", desc: "Carbonated soda mixed with natural pandan extract and lime.", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600", emoji: "🍹", country: "Indonesia", style: "Modern", category: "Beverage", scientificNames: [{ ingredient: "Pandan", name: "Pandanus amaryllifolius" }], recipe: "Boil pandan leaves with sugar for syrup. Mix syrup with sparkling water, ice, and a squeeze of lime.", nutrition: "Moderate sugar.", healthBenefits: "Refreshing, relaxing scent.", excessRisks: "Acidic and sugary."
  },
  {
    id: "drink-es-kopi-susu-gula-aren", name: "Es Kopi Susu Gula Aren", desc: "Iced espresso and milk sweetened exclusively with Indonesian palm sugar.", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600", emoji: "☕", country: "Indonesia", style: "Modern", category: "Beverage", scientificNames: [{ ingredient: "Coffee", name: "Coffea" }, { ingredient: "Palm Sugar", name: "Arenga pinnata" }], recipe: "Pull a shot of espresso. Add a generous pump of liquid palm sugar, ice, and top with fresh milk.", nutrition: "Moderate calories.", healthBenefits: "Caffeine focus. Palm sugar has slightly lower glycemic index.", excessRisks: "Caffeine tolerance issues."
  }
];

let modifiedContent = content.replace(
  /\];\s*$/, // find the end of the array
  '  ,\n  ' + newDishes.map(d => JSON.stringify(d, null, 2)).join(',\n  ') + '\n];\n'
);

fs.writeFileSync(path, modifiedContent);
console.log('Successfully added more dishes to dishes.ts');
