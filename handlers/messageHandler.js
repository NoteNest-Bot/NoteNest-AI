const { getGeminiResponse } = require('../config/gemini');
const { Collection } = require('discord.js');

const conversationHistories = new Collection();
const interactionTimeout = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

async function handleMessage(message) {
    if (message.author.bot) return;

    const userId = message.author.id;
    const mentionRegex = new RegExp(`^<@!?${message.client.user.id}>`);

    if (mentionRegex.test(message.content)) {
        const mentionContent = message.content.replace(mentionRegex, '').trim() || 'Hello, how can I assist you today?';

        if (!conversationHistories.has(userId)) {
            conversationHistories.set(userId, []);
        }

        const userHistory = conversationHistories.get(userId);
        userHistory.push({ role: 'user', content: mentionContent });

        try {
            const response = await getGeminiResponse(userHistory);
            if (response) {
                userHistory.push({ role: 'assistant', content: response });
                await message.reply(response);
            } else {
                await message.reply("Sorry, I couldn't answer you right now.");
            }
        } catch (error) {
            await message.reply('An error occurred while processing your request.');
        }

        setTimeout(() => {
            conversationHistories.delete(userId);
        }, interactionTimeout);
    }
}

module.exports = { handleMessage };
