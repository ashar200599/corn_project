const fs = require('fs');

const rawList = `Pizza Napoletana
Spaghetti Carbonara
Lasagne al Forno
Risotto alla Milanese
Osso Buco
Bistecca alla Fiorentina
Cacio e Pepe
Amatriciana
Penne all'Arrabbiata
Saltimbocca alla Romana
Ribollita
Minestrone
Gnocchi al Pomodoro
Tagliatelle al Ragù (Bolognese)
Pappardelle al Cinghiale
Orecchiette con Cime di Rapa
Trippa alla Romana
Baccalà alla Livornese
Caponata
Arancini
Supplì
Bruschetta
Panzanella
Vitello Tonnato
Polenta e Funghi
Cacciucco (Tuscan Fish Stew)
Porchetta
Involtini
Farinata
Zuppa di Pesce
🍮 Traditional Snacks & Desserts
Tiramisu
Cannoli
Panna Cotta
Gelato
Sfogliatella
Torta della Nonna
Zeppole
Panettone
Pandoro
Biscotti
Amaretti
Cassata Siciliana
Granita
Bomboloni
Struffoli
Crostata
Zabaglione
Semifreddo
Budino di Riso
Ricciarelli
🍷 Traditional Beverages
Espresso
Cappuccino
Macchiato
Americano
Caffè Latte
Chianti (Red Wine)
Barolo
Brunello di Montalcino
Prosecco
Limoncello
Grappa
Campari
Aperol Spritz
Negroni
Sambuca
Fernet-Branca
Amaretto
Vin Santo
Acqua Minerale Frizzante
Chinotto
🆕 Modern & Trending Food
Truffle Pizza
Burrata e Pomodorini
Black Squid Ink Pasta
Lobster Linguine
Pizza al Taglio (Gourmet Toppings)
Wagyu Beef Tagliatelle
Stracciatella e Bresaola
Focaccia Gourmet
Poke Bowl Italian Style
Smash Burger Italian Style
Carbonara Ramen Fusion
Burrata Toast
Mortadella Sandwich (Renaissance Style)
Rainbow Lasagne
Pistachio Pesto Pasta
🧁 Modern & Trending Desserts
Pistachio Tiramisu
Croissant Brioche (Cornetto Gourmet)
Bomboloni Nutella & Pistachio
Affogato al Caffè (Gourmet Style)
Gelato Sandwich
Matcha Panna Cotta
Strawberry Tiramisu
Croffles Italian Style
Ricotta Cheesecake
Mochi Gelato Fusion
🧋 Modern & Trending Beverages
Pistachio Latte
Shakerato (Iced Espresso)
Espresso Tonic
Aperol Spritz (Modern Variations)
Hugo Spritz
Limoncello Spritz
Blood Orange Negroni
Cold Brew Italiano
Iced Matcha Affogato
Sparkling Lavender Lemonade
Oat Milk Cappuccino
Rose Espresso Martini`;

const lines = rawList.split('\n').map(l => l.trim()).filter(l => l);

let currentStyle = 'Traditional';
let currentCategory = 'Food';

const dishes = [];

for (const line of lines) {
  if (line.includes('Traditional Snacks & Desserts')) {
    currentStyle = 'Traditional';
    currentCategory = 'Food'; // or Dessert, but schema only allows Food | Beverage
    continue;
  }
  if (line.includes('Traditional Beverages')) {
    currentStyle = 'Traditional';
    currentCategory = 'Beverage';
    continue;
  }
  if (line.includes('Modern & Trending Food')) {
    currentStyle = 'Modern';
    currentCategory = 'Food';
    continue;
  }
  if (line.includes('Modern & Trending Desserts')) {
    currentStyle = 'Modern';
    currentCategory = 'Food';
    continue;
  }
  if (line.includes('Modern & Trending Beverages')) {
    currentStyle = 'Modern';
    currentCategory = 'Beverage';
    continue;
  }

  let emoji = '🍝';
  if (currentCategory === 'Beverage') emoji = '🍷';
  if (line.toLowerCase().includes('pizza')) emoji = '🍕';
  if (line.toLowerCase().includes('gelato') || line.toLowerCase().includes('ice')) emoji = '🍨';
  if (line.toLowerCase().includes('coffee') || line.toLowerCase().includes('espresso') || line.toLowerCase().includes('caff')) emoji = '☕';
  
  const formattedName = encodeURIComponent(line);

  dishes.push({
    id: `it-${line.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: line,
    desc: `Delicious ${line} from Italy.`,
    image: `https://image.pollinations.ai/prompt/${formattedName}?width=600&height=400&nologo=true`,
    emoji: emoji,
    country: 'Italy',
    style: currentStyle,
    category: currentCategory,
    scientificNames: [],
    recipe: `### Instructions\n1. Prepare ${line}.`,
    nutrition: {
      calories: '300 kcal',
      carbohydrates: '30g',
      protein: '10g',
      fat: '15g'
    },
    healthBenefits: 'Provides energy and nutrients.',
    excessRisks: 'Consume in moderation.',
    servings: 1,
    prepTime: 10,
    cookTime: 20
  });
}

const fileContent = `import { Dish } from './dishes';\n\nexport const ITALY_RAW_DISHES: Dish[] = ${JSON.stringify(dishes, null, 2)};\n`;
fs.writeFileSync('src/data/italyRawDishes.ts', fileContent);
console.log('Generated ' + dishes.length + ' dishes.');
