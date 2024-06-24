const fs = require('fs');
const path = require('path');
const commands = new Map();

fs.readdirSync(path.join(__dirname, '../commands')).forEach(file => {
    if (file.endsWith('.js')) {
        const command = require(`../commands/${file}`);
        commands.set(command.name, command);
    }
});

async function handleCommand(message) {
    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commands.has(commandName)) return;

    const command = commands.get(commandName);

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply('There was an error executing that command.');
    }
}

module.exports = { handleCommand };
