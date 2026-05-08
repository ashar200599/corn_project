const fs = require('fs');
const path = './src/data/dishes.ts';

let content = fs.readFileSync(path, 'utf8');

// Add variations to Dish interface
content = content.replace(
  'tags?: string[];',
  'tags?: string[];\n  variations?: string[];'
);

// We need to add variations field to all dishes in DISHES.
const variationsMapping = {
  "indo-nasi-goreng": ['Nasi Goreng Seafood', 'Nasi Goreng Kambing', 'Nasi Goreng Gila'],
  "indo-rendang": ['Rendang Ayam', 'Rendang Paru', 'Rendang Jengkol'],
  "indo-soto-ayam": ['Soto Betawi', 'Soto Madura', 'Soto Mie'],
  "indo-es-campur": ['Es Teler', 'Es Doger', 'Es Oyen'],
  "jp-sushi": ['Tuna Nigiri', 'Ebi Nigiri', 'Tamago Nigiri'],
  "jp-matcha": ['Hot Matcha Latte', 'Matcha Espresso', 'Oat Milk Matcha'],
  "it-pizza": ['Pizza Marinara', 'Pizza Napoletana', 'Pizza Quattro Formaggi'],
  "mx-tacos": ['Tacos de Asada', 'Tacos de Carnitas', 'Vegan Pastor'],
  "mx-horchata": ['Horchata de Fresa', 'Horchata con Cafe', 'Dairy-Free Horchata'],
  "th-pad-thai": ['Pad Thai with Chicken', 'Pad Thai with Tofu', 'Vegetarian Pad Thai'],
  "in-tikka-masala": ['Paneer Tikka Masala', 'Mutton Tikka Masala', 'Vegan Tikka Masala'],
  "kr-kimchi": ['Pork Belly Kimchi Jjigae', 'Tuna Kimchi Jjigae', 'Spam Kimchi Jjigae'],
  "fr-croissant": ['Almond Croissant', 'Chocolate Croissant (Pain au Chocolat)', 'Ham & Cheese Croissant'],
  "us-avocado-toast": ['Avocado Toast with Egg', 'Avocado Toast with Smoked Salmon', 'Spicy Avocado Toast']
};

for (const [id, variations] of Object.entries(variationsMapping)) {
  const searchPattern = new RegExp(`(id:\\s*"${id}",)`);
  const replaceString = `$1\n    variations: ${JSON.stringify(variations)},`;
  content = content.replace(searchPattern, replaceString);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully added variations');
