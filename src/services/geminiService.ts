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
   - Estimated nutritional information (Calories, Macros)
4. List the health benefits for these ingredients.
5. List related diseases or negative effects that could be caused by excessive intake of this food/beverage.
6. Provide an estimated online market price for these ingredients (or standard supermarket cost).
Format the response cleanly in Markdown.
`;

const RECIPE_GENERATION_PROMPT = `
You are a master nutritionist and chef specializing in traditional and modern dishes (especially Indonesian cuisine).
Given a list of available ingredients and user preferences (e.g., allergies, diet type), generate:
1. A delicious, healthy recipe utilizing those ingredients. Give this recipe a clear and appetizing Name.
2. At the very beginning of your response, output an image of the dish using this exact markdown format: \`![Dish Name](https://image.pollinations.ai/prompt/delicious%20food%20photography%20of%20[URL_ENCODED_DISH_NAME]?width=800&height=400&nologo=true)\`, where [URL_ENCODED_DISH_NAME] is the generated dish name properly URL-encoded.
3. Step-by-step instructions.
4. Nutritional information.
5. Health benefits.
6. Risks of overconsumption.
Format the response cleanly in Markdown.
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
      model: 'gemini-3.1-pro-preview',
      contents: `Find the estimated online market prices for these ingredients: ${ingredients.join(', ')}. Provide a brief summary of the prices.`,
      config: {
        systemInstruction: `You are an expert grocery shopping assistant.
Given a list of ingredients, provide the estimated online market prices for each ingredient.
Format the response using a clean Markdown table with columns: Ingredient, Estimated Price (e.g., per lb, per piece), and Online Shop Link.
For the Online Shop Link, provide a real markdown link to search for the ingredient on a major online grocer (e.g., [Amazon Fresh](https://www.amazon.com/s?k=ingredient) or [Walmart](https://www.walmart.com/search?q=ingredient)).
Do not include any extra text before or after the table. Only output the markdown table.`,
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
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe.");
  }
};
