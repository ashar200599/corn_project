import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const INGREDIENT_SYSTEM_PROMPT = `
You are a master sous-chef and nutritionist.
Given an image of a food or ingredients, perform the following:
1. Identify all visible ingredients.
2. Provide the scientific/binomial name if the ingredient comes from a plant or animal.
3. Provide a detailed recipe based on what you see, including:
   - Ingredient list (with estimated amounts)
   - Step-by-step instructions
4. List the health benefits for these ingredients.
5. List related diseases or negative effects that could be caused by excessive intake of this food/beverage.

Return your response strictly as a JSON object matching this TypeScript interface without any markdown blocks:
{
  name: string; // The appetizing name of the dish
  desc: string; // A short description
  emoji: string; // A relevant single unicode emoji
  country: string; // Origin country (or "Unknown")
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
            text: "Please analyze this food image and break down the recipe and ingredients.",
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
        systemInstruction: `You are an expert grocery shopping assistant.
Given a list of ingredients, provide the estimated online market prices.
Format the response using a clean Markdown table with columns: Ingredient, Estimated Price, and Action.
For the Action, provide a real markdown link to search for the ingredient on Tokopedia (e.g., [Buy on Tokopedia](https://www.tokopedia.com/search?q=ingredient)).
Keep the response strictly to the markdown table and limit it to the top 3 most important ingredients. Do not include any extra text.`,
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
      model: 'gemini-3.1-pro-preview',
      contents: `Provide health insights for ${dishName} which contains these key ingredients: ${ingredients.join(', ')}.`,
      config: {
        systemInstruction: `You are an expert nutritionist and dietitian.
Provide AI-powered health insights for the given recipe.
Specifically, your response MUST include these exact sections:
### Benefits
### Risks
### Chronic Illness Prevention Tips

Format the response using clean Markdown with clear headings and bullet points.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching health insights:", error);
    throw new Error("Failed to fetch health insights.");
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
