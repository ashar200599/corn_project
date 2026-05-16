const fs = require('fs');

const getIngredients = (name) => {
  let ing = [];
  const n = name.toLowerCase();
  
  if (n.includes('pizza') || n.includes('focaccia')) {
    ing.push('* Pizza dough (Flour, Water, Yeast)');
    ing.push('* Tomato Sauce');
    ing.push('* Mozzarella Cheese');
    if (n.includes('napoletana')) ing.push('* Fresh Basil (Ocimum basilicum) & Olive Oil');
    if (n.includes('truffle')) ing.push('* Truffle oil or fresh truffles');
  } else if (n.includes('pasta') || n.includes('spaghetti') || n.includes('lasagne') || n.includes('penne') || n.includes('tagliatelle') || n.includes('pappardelle') || n.includes('orecchiette') || n.includes('linguine') || n.includes('macaroni')) {
    ing.push('* Pasta/Noodles (Durum wheat flour)');
    if (n.includes('carbonara')) {
      ing.push('* Guanciale or Pancetta');
      ing.push('* Eggs');
      ing.push('* Pecorino Romano cheese');
      ing.push('* Black pepper');
    }
    if (n.includes('amatriciana')) {
      ing.push('* Tomato Sauce');
      ing.push('* Guanciale');
      ing.push('* Pecorino Romano');
    }
    if (n.includes('arrabbiata')) {
      ing.push('* Tomato Sauce');
      ing.push('* Garlic & Chili peppers');
    }
    if (n.includes('pesce') || n.includes('squid ink') || n.includes('lobster')) {
      ing.push('* Fresh Seafood or Lobster');
    }
  } else if (n.includes('risotto')) {
    ing.push('* Arborio or Carnaroli Rice');
    ing.push('* Broth');
    ing.push('* Butter and Parmesan cheese');
    if (n.includes('milanese')) ing.push('* Saffron strands');
  } else if (n.includes('bistecca') || n.includes('wagyu') || n.includes('osso buco') || n.includes('vitello')) {
    ing.push('* Premium Beef or Veal cut');
    ing.push('* Olive Oil, Salt, Black Pepper');
  } else if (n.includes('gelato') || n.includes('panna cotta') || n.includes('tiramisu') || n.includes('cannoli') || n.includes('sfogliatella') || n.includes('crostata') || n.includes('bomboloni') || n.includes('biscotti') || n.includes('cake') || n.includes('dessert')) {
    ing.push('* Sugar and Heavy Cream/Milk');
    if (n.includes('tiramisu') || n.includes('caffè')) {
      ing.push('* Espresso Coffee');
      ing.push('* Mascarpone cheese & Ladyfingers');
    }
    if (n.includes('pistachio')) ing.push('* Pistachio nuts/paste');
  } else if (n.includes('espresso') || n.includes('cappuccino') || n.includes('caffè') || n.includes('americano') || n.includes('macchiato') || n.includes('shakerato')) {
    ing.push('* Espresso Coffee beans');
    if (!n.includes('espresso') && !n.includes('americano')) ing.push('* Milk or Cream');
  } else if (n.includes('spritz') || n.includes('wine') || n.includes('prosecco') || n.includes('negroni') || n.includes('campari') || n.includes('limoncello')) {
    ing.push('* Prosecco or Wine base');
    if (n.includes('spritz')) ing.push('* Aperol or Campari');
  } else {
    ing.push('* Olive oil');
    ing.push('* Garlic and Onions');
    ing.push('* Traditional Italian spices (Basil, Oregano)');
    if (n.includes('funghi')) ing.push('* Fresh Mushrooms');
    if (n.includes('burrata') || n.includes('stracciatella')) ing.push('* Fresh Burrata or Stracciatella Cheese');
  }

  if (ing.length === 0) {
    ing.push('* Base authentic Italian ingredients for ' + name);
  }
  
  return ing.join('\\n');
};

let content = fs.readFileSync('src/data/italyRawDishes.ts', 'utf8');

content = content.replace(/\{\s*"id":\s*"[^"]+",[^]*?"name":\s*"([^"]+)"[^]*?"recipe":\s*"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, name, oldRecipe) => {
  const newIng = getIngredients(name);
  const fixedRecipe = '### Ingredients\\n' + newIng + '\\n\\n### Instructions\\n1. Prepare ' + name + '.';
  return match.replace(/"recipe":\s*"(?:[^"\\]*(?:\\.[^"\\]*)*)"/, '"recipe": "' + fixedRecipe + '"');
});

fs.writeFileSync('src/data/italyRawDishes.ts', content, 'utf8');
console.log('Fixed recipes properly');
