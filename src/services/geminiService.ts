import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const INGREDIENT_SYSTEM_PROMPT = `
You are a master sous-chef and expert food scientist specializing in highly accurate visual dish identification.
Given an image of a real food dish, beverage, or ingredient, perform the following with the utmost accuracy based ONLY on the visual evidence:
1. Identify the exact dish, beverage, or food items. Do not guess or hallucinate ingredients that are not visible or logical for the dish.
2. Provide the scientific/binomial name for the natural ingredients.
3. Provide a detailed, realistic recipe based on the identified dish, including:
   - Ingredient list (with realistic estimated amounts)
   - Step-by-step instructions
4. List the precise health benefits for these items.
5. List related diseases or negative effects that could be caused by excessive intake of this exact food/beverage.

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
            text: "Please analyze this food or beverage image with high precision. Based solely on the visual evidence in the photo, identify the exact dish and break down the recipe, ingredients, and nutritional profile accurately.",
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
        systemInstruction: `Provide a 3-row Markdown table. The headers must be | Ingredient | Price | Market |. For the Market column in each row, provide a link like [Tokopedia](https://tokopedia.com/search?q=Ingredient). No other text.`,
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

export const getVariationRecipe = async (dishName: string, variationName: string, ingredients: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Provide a recipe for the variation "${variationName}" of the dish "${dishName}". Some base ingredients: ${ingredients.join(', ')}.`,
      config: {
        maxOutputTokens: 500,
        systemInstruction: `Provide a clean markdown string of ONLY the ingredients list and instructions block for the requested variation. Do not include any other text.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating variation recipe:", error);
    throw new Error("Failed to generate variation recipe.");
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

export const chatWithAIStream = async function*(message: string, history: {role: 'user' | 'model', text: string}[]) {
  try {
    const formattedHistory = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));
    
    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.1-flash-lite',
      contents: formattedHistory,
      config: {
        systemInstruction: 'You are a helpful AI assistant in a Minecraft-themed food and recipe app called CORN. Adopt a slightly playful, game-like persona, briefly dropping Minecraft or gaming references. Focus on synthesizing dishes from the app biomes (Italy, Mexico, Thailand, Indonesia, USA, India, South Korea, France, China) for healing. EXTREMELY IMPORTANT: Keep responses very short and concise (1-2 sentences maximum). Do not write long paragraphs.',
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Error chatting with AI:", error);
    throw new Error("Failed to get response from AI.");
  }
};

export const generateDishReview = async (dishName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{ role: 'user', parts: [{ text: `Generate a short (1-2 sentences), slightly game-themed review for the dish "${dishName}". It should sound like a player logging their findings. Include a rating from 1 to 5. Format your response exactly like this: "RATING: X\nREVIEW: [your review text]"` }] }],
    });
    const text = response.text || "";
    
    // Parse rating and review
    const ratingMatch = text.match(/RATING:\s*([1-5])/);
    const reviewMatch = text.match(/REVIEW:\s*(.+)$/is); // /s allows dot to match newlines if any

    const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 5;
    const reviewText = reviewMatch ? reviewMatch[1].trim() : "Tastes like code. Needs more polygons.";

    return { rating, text: reviewText };
  } catch (error) {
    console.error("Gemini API Error (generateDishReview):", error);
    return { rating: 4, text: "Data corrupted. Default rating applied." };
  }
}

export const getVitalsRecommendation = async (vitals: { health: number, energy: number, shield: number }) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{ role: 'user', parts: [{ text: `The user's vitals are depleted: HP: ${vitals.health}%, Energy: ${vitals.energy}%, Shield: ${vitals.shield}%. Generate a short, minecraft-themed alert for what they should synthesize. IMPORTANT: Do NOT suggest Golden Apples, potions, or standard Minecraft items. Instead, advise them to craft a healthy, high-protein, or hydrating food/beverage from the available biomes in the CORN menu (such as Italy, Mexico, Thailand, Indonesia, USA, India, South Korea, France, or China) to restore their status bars (2-3 sentences max).` }] }],
    });
    return response.text || "RECOMMENDATION: SYNTHESIZE NUTRITIOUS DISHES FROM THE MENU IMMEDIATELY.";
  } catch (error) {
    console.error("Error getting vitals recommendation:", error);
    return "RECOMMENDATION: SYNTHESIZE NUTRITIOUS DISHES FROM THE MENU IMMEDIATELY.";
  }
};

export const getVitalsStatus = async (vitals: { health: number, energy: number, shield: number }) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{ role: 'user', parts: [{ text: `Analyze these vitals: HP: ${vitals.health}%, Energy: ${vitals.energy}%, Shield: ${vitals.shield}%. You MUST STRICTLY reply with exactly one of these strings based on the severity of the vitals: "NORMAL CONDITION", "MILD CONDITION", "RISK CONDITION", or "SEVERE". Do not output anything else. ALL CAPS.` }] }],
    });
    return response.text?.replace(/["\n]/g, '').trim().toUpperCase() || "NORMAL CONDITION";
  } catch (error) {
    console.error("Error getting vitals status:", error);
    return "NORMAL CONDITION";
  }
};
