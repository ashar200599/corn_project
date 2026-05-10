import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const INGREDIENT_SYSTEM_PROMPT = `
You are a master sous-chef and nutritionist specializing in culinary synthesis and forged items.
Given an image of food, beverages, ingredients, or forged items (culinary creations forged via synthesis), perform the following:
1. Identify all visible ingredients, forged foods, and beverages.
2. Provide the scientific/binomial name for natural ingredients.
3. Provide a detailed recipe or synthesis guide based on what you see, including:
   - Ingredient list (with estimated amounts)
   - Step-by-step instructions
4. List the health benefits for these items.
5. List related diseases or negative effects that could be caused by excessive intake of this food/beverage.

Return your response strictly as a JSON object matching this TypeScript interface without any markdown blocks:
{
  name: string; // The appetizing name of the dish or forged item
  desc: string; // A short description
  emoji: string; // A relevant single unicode emoji
  country: string; // Origin country (or "Unknown")
  style: "Traditional" | "Modern" | "Synthesized";
  category: "Food" | "Beverage";
  scientificNames: { ingredient: string; name: string; }[];
  recipe: string; // Clean markdown string of ONLY the ingredients list and instructions block.
  servings: number; // e.g. 2
  prepTime: number; // e.g. 15
  cookTime: number; // e.g. 30
  nutrition: {
    calories: string; // e.g. "450"
    protein: string; // e.g. "30"
    carbohydrates: string; // e.g. "40"
    fat: string; // e.g. "20"
  };
  healthBenefits: string; // 1-2 sentences
  excessRisks: string; // 1-2 sentences
}
`;

const RECIPE_GENERATION_PROMPT = `
You are a master nutritionist and chef specializing in traditional and modern dishes.
Given a list of available ingredients and user preferences, generate a recipe.

Return your response strictly as a JSON object matching this TypeScript interface without any markdown blocks:
{
  name: string; // The appetizing name of the dish
  desc: string; // A short description
  emoji: string; // A relevant single unicode emoji
  country: string; // Origin country related to the style
  style: "Traditional" | "Modern";
  category: "Food" | "Beverage";
  scientificNames: { ingredient: string; name: string; }[];
  recipe: string; // Clean markdown string of ONLY the ingredients list and instructions block.
  servings: number; // e.g. 2
  prepTime: number; // e.g. 15
  cookTime: number; // e.g. 30
  nutrition: {
    calories: string; // e.g. "450"
    protein: string; // e.g. "30"
    carbohydrates: string; // e.g. "40"
    fat: string; // e.g. "20"
  };
  healthBenefits: string; // 1-2 sentences
  excessRisks: string; // 1-2 sentences
}
`;

export const analyzeFoodImage = async (base64Image: string, mimeType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: "Please analyze this food or forged culinary item image and break down the recipe, ingredients, or synthesis process.",
          },
        ],
      },
      config: {
        systemInstruction: INGREDIENT_SYSTEM_PROMPT,
        responseMimeType: 'application/json'
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze food image.");
  }
};

export const getIngredientPrices = async (ingredients: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Find the estimated online market prices for these 3 main ingredients: ${ingredients.slice(0, 3).join(', ')}. Keep the list concise.`,
      config: {
        maxOutputTokens: 150,
        systemInstruction: `Provide a 3-row Markdown table: | Ingredient | Price | [Search](https://tokopedia.com/search?q=Ingredient) |. No other text.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching ingredient prices:", error);
    throw new Error("Failed to fetch ingredient prices.");
  }
};

export const getHealthInsights = async (dishName: string, ingredients: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Provide health insights for ${dishName} which contains these key ingredients: ${ingredients.join(', ')}.`,
      config: {
        maxOutputTokens: 150,
        systemInstruction: `Provide 3 concise sections: ### Benefits, ### Risks, ### Prevention Tips. Use bullet points. No other text.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching health insights:", error);
    throw new Error("Failed to fetch health insights.");
  }
};

export const getCheckupStatus = async (conditions: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `User conditions: ${conditions.join(', ')}. Generate a JSON block with: "status" (short 2-5 word uppercase status summary for a cyberpunk UI health bar) and "maxHealth", "maxEnergy", "maxShield" (numbers between 50 and 100 representing maximum capacity penalties due to these conditions. 100 means no penalty).`,
      config: {
        maxOutputTokens: 100,
        responseMimeType: "application/json",
        systemInstruction: `You return only valid JSON, for example: {"status": "HIGH BP WARNING", "maxHealth": 80, "maxEnergy": 90, "maxShield": 75}`,
      },
    });
    if (response.text) {
      return JSON.parse(response.text);
    }
    return { status: "STATUS: CAUTION", maxHealth: 85, maxEnergy: 85, maxShield: 85 };
  } catch (error) {
    console.error("Error generating checkup status:", error);
    return { status: "STATUS: CAUTION", maxHealth: 85, maxEnergy: 85, maxShield: 85 };
  }
};

export const generateRecipeFromIngredients = async (ingredients: string, preferences: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Available ingredients: ${ingredients}. User preferences: ${preferences}. Please generate a recipe.`,
      config: {
        systemInstruction: RECIPE_GENERATION_PROMPT,
        responseMimeType: 'application/json'
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe.");
  }
};
