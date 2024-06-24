require('dotenv').config();
const axios = require('axios');

const geminiAPIKey = process.env.GEMINI_API_KEY;
const geminiAPIUrl = process.env.GEMINI_API_URL;

async function getGeminiResponse(conversationHistory) {
    try {
        const response = await axios.post(
            geminiAPIUrl,
            {
                model: "gemini-model",
                messages: conversationHistory,
                max_tokens: 2000,
                temperature: 0.5
            },
            {
                headers: {
                    "Authorization": `Bearer ${geminiAPIKey}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error in getGeminiResponse:', error);
        return null;
    }
}

module.exports = { getGeminiResponse };
