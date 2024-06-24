require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { handleMessage } = require('./handlers/messageHandler');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', handleMessage);

client.login(process.env.DISCORD_BOT_TOKEN);
