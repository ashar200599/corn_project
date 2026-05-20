import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
const getAI = () => {
  if (!aiClient) {
    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing");
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
};

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  app.post("/api/gemini/analyzeFoodImage", async (req, res) => {
    try {
      const ai = getAI();
      const { base64Image, mimeType } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Image, mimeType: mimeType } },
            { text: "Please analyze this food or beverage image with high precision. Based solely on the visual evidence in the photo, identify the exact dish and break down the recipe, ingredients, and nutritional profile accurately." },
          ],
        },
        config: { systemInstruction: INGREDIENT_SYSTEM_PROMPT, responseMimeType: 'application/json' },
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/getIngredientPrices", async (req, res) => {
    try {
      const ai = getAI();
      const { ingredients } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `Find the estimated online market prices for these 3 main ingredients: ${ingredients.slice(0, 3).join(', ')}. Keep the list concise.`,
        config: {
          maxOutputTokens: 150,
          systemInstruction: `Provide a 3-row Markdown table. The headers must be | Ingredient | Price | Market |. For the Market column in each row, provide a link like [Tokopedia](https://tokopedia.com/search?q=Ingredient). No other text.`,
        },
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/getHealthInsights", async (req, res) => {
    try {
      const ai = getAI();
      const { dishName, ingredients } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `Provide health insights for ${dishName} which contains these key ingredients: ${ingredients.join(', ')}.`,
        config: {
          maxOutputTokens: 150,
          systemInstruction: `Provide 3 concise sections: ### Benefits, ### Risks, ### Prevention Tips. Use bullet points. No other text.`,
        },
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/getCheckupStatus", async (req, res) => {
    try {
      const ai = getAI();
      const { conditions } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `User conditions: ${conditions.join(', ')}. Generate a JSON block with: "status" (short 2-5 word uppercase status summary for a cyberpunk UI health bar) and "maxHealth", "maxEnergy", "maxShield" (numbers between 50 and 100 representing maximum capacity penalties due to these conditions. 100 means no penalty).`,
        config: {
          maxOutputTokens: 100,
          responseMimeType: "application/json",
          systemInstruction: `You return only valid JSON, for example: {"status": "HIGH BP WARNING", "maxHealth": 80, "maxEnergy": 90, "maxShield": 75}`,
        },
      });
      res.json({ json: response.text ? JSON.parse(response.text) : null });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/getVariationRecipe", async (req, res) => {
    try {
      const ai = getAI();
      const { dishName, variationName, ingredients } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `Provide a recipe for the variation "${variationName}" of the dish "${dishName}". Some base ingredients: ${ingredients.join(', ')}.`,
        config: {
          maxOutputTokens: 500,
          systemInstruction: `Provide a clean markdown string of ONLY the ingredients list and instructions block for the requested variation. Do not include any other text.`,
        },
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/generateRecipeFromIngredients", async (req, res) => {
    try {
      const ai = getAI();
      const { ingredients, preferences } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: `Available ingredients: ${ingredients}. User preferences: ${preferences}. Please generate a recipe.`,
        config: {
          systemInstruction: RECIPE_GENERATION_PROMPT,
          responseMimeType: 'application/json'
        },
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/generateDishReview", async (req, res) => {
    try {
      const ai = getAI();
      const { dishName } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [{ role: 'user', parts: [{ text: `Generate a short (1-2 sentences), slightly game-themed review for the dish "${dishName}". It should sound like a player logging their findings. Include a rating from 1 to 5. Format your response exactly like this: "RATING: X\nREVIEW: [your review text]"` }] }],
      });
      const text = response.text || "";
      const ratingMatch = text.match(/RATING:\s*([1-5])/);
      const reviewMatch = text.match(/REVIEW:\s*(.+)$/is);
      const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 5;
      const reviewText = reviewMatch ? reviewMatch[1].trim() : "Tastes like code. Needs more polygons.";
      res.json({ rating, text: reviewText });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/getVitalsRecommendation", async (req, res) => {
    try {
      const ai = getAI();
      const { vitals } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [{ role: 'user', parts: [{ text: `The user's vitals are depleted: HP: ${vitals.health}%, Energy: ${vitals.energy}%, Shield: ${vitals.shield}%. Generate a short, minecraft-themed alert for what they should synthesize. IMPORTANT: Do NOT suggest Golden Apples, potions, or standard Minecraft items. Instead, advise them to craft a healthy, high-protein, or hydrating food/beverage from the available biomes in the CORN menu (such as Italy, Mexico, Thailand, Indonesia, USA, India, South Korea, France, or China) to restore their status bars (2-3 sentences max).` }] }],
      });
      res.json({ text: response.text || "RECOMMENDATION: SYNTHESIZE NUTRITIOUS DISHES FROM THE MENU IMMEDIATELY." });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/getVitalsStatus", async (req, res) => {
    try {
      const ai = getAI();
      const { vitals } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `Determine the overall system status based on these vitals: HP: ${vitals.health}, Energy: ${vitals.energy}, Shield: ${vitals.shield}. Return ONLY ONE WORD: 'OPTIMAL', 'WARNING', or 'CRITICAL'.`,
        config: { maxOutputTokens: 5 },
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/chatStream", async (req, res) => {
    try {
      const ai = getAI();
      const { message, history } = req.body;
      const formattedHistory = history.map((h: any) => ({
        role: h.role,
        parts: [{ text: h.text }]
      }));
      formattedHistory.push({ role: 'user', parts: [{ text: message }] });

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.1-flash-lite',
        contents: formattedHistory,
        config: {
          systemInstruction: 'You are a helpful AI assistant in a Minecraft-themed food and recipe app called CORN. Adopt a slightly playful, game-like persona, briefly dropping Minecraft or gaming references. Focus on synthesizing dishes from the app biomes (Italy, Mexico, Thailand, Indonesia, USA, India, South Korea, France, China) for healing. EXTREMELY IMPORTANT: Keep responses very short and concise (1-2 sentences maximum). Do not write long paragraphs.',
        },
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (e: any) {
      console.error("Stream error:", e);
      if (!res.headersSent) {
          res.status(500).json({ error: e.message });
      } else {
          res.write(`data: ${JSON.stringify({ error: e.message })}\n\n`);
          res.end();
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
