export const analyzeFoodImage = async (base64Image: string, mimeType: string) => {
  const res = await fetch("/api/gemini/analyzeFoodImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64Image, mimeType })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.text;
};

export const getIngredientPrices = async (ingredients: string[]) => {
  const res = await fetch("/api/gemini/getIngredientPrices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.text;
};

export const getHealthInsights = async (dishName: string, ingredients: string[]) => {
  const res = await fetch("/api/gemini/getHealthInsights", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dishName, ingredients })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.text;
};

export const getCheckupStatus = async (conditions: string[]) => {
  const res = await fetch("/api/gemini/getCheckupStatus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conditions })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data.json || { status: "STATUS: CAUTION", maxHealth: 85, maxEnergy: 85, maxShield: 85 };
};

export const getVariationRecipe = async (dishName: string, variationName: string, ingredients: string[]) => {
  const res = await fetch("/api/gemini/getVariationRecipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dishName, variationName, ingredients })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.text;
};

export const generateRecipeFromIngredients = async (ingredients: string, preferences: string) => {
  const res = await fetch("/api/gemini/generateRecipeFromIngredients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients, preferences })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.text;
};

export const generateDishReview = async (dishName: string) => {
  const res = await fetch("/api/gemini/generateDishReview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dishName })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return { rating: data.rating, text: data.text };
};

export const getVitalsRecommendation = async (vitals: { health: number, energy: number, shield: number }) => {
  const res = await fetch("/api/gemini/getVitalsRecommendation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vitals })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.text;
};

export const getVitalsStatus = async (vitals: { health: number, energy: number, shield: number }) => {
  const res = await fetch("/api/gemini/getVitalsStatus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vitals })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.text;
};
