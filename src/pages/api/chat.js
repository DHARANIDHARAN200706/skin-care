// /pages/api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      `Suggest skincare products based on this customer input: "${message}".
      Give product type, purpose, and if possible, brand suggestions.`
    ]);

    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ reply: 'Something went wrong. Please try again.' });
  }
}
