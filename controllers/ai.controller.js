import { OpenAI } from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* POST /api/ai/suggest-meal
   body: { "ingredients": ["arroz", "huevo", "cebolla"] }
*/
export const suggestMeal = async (req, res) => {
  const { ingredients } = req.body ?? {};
  if (!Array.isArray(ingredients) || !ingredients.length) {
    return res.status(400).json({ msg: 'ingredients[] requerido' });
  }

  try {
    const prompt = `
Eres un chef creativo. Propón **1** plato que pueda elaborarse
exclusivamente con esta lista de ingredientes y condimentos básicos
(sal, aceite, especias comunes). El plato debe:
• ser sencillo (máx. 5 pasos)
• indicar cantidades aproximadas para 2 raciones
• resaltar en **negrita** el nombre del plato.

Ingredientes disponibles:
${ingredients.join(', ')}

Devuelve el resultado en Markdown.
`.trim();

    const chat = await openai.chat.completions.create({
      model   : process.env.OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
    });

    const suggestion = chat.choices[0]?.message?.content?.trim() ?? '';
    res.json({ suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error generando sugerencia' });
  }
};
