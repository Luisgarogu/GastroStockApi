import { OpenAI } from 'openai';
import 'dotenv/config';

/* ─────────────── 1.  Nueva instancia apuntando a Together ─────────────── */
const openai = new OpenAI({
  apiKey : process.env.TOGETHER_API_KEY,                 // 👈 tu clave Together
  baseURL: process.env.TOGETHER_BASE_URL                 // 👈 https://api.together.xyz/v1
});

/* ─────────────── 2.  Handler ─ POST /api/ai/suggest-meal ─────────────── */
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
      /*  Usa cualquiera de los modelos gratuitos de Together  */
      /*  Ej.: 'togethercomputer/llama-3-8b-chat'              */
      model   : process.env.TOGETHER_MODEL
                ?? 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const suggestion = chat.choices[0]?.message?.content?.trim() ?? '';
    res.json({ suggestion });
  } catch (err) {
    console.error(err);
    res.status(err.status ?? 500).json({ msg: err.message });
  }
};
