const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Displays information about the bot',
    async execute(message) {
        const embed = new MessageEmbed()
            .setTitle('Bot Information')
            .setDescription('Here is some information about the bot.')
            .setColor('#0099ff');
        
        await message.channel.send({ embeds: [embed] });
    }
};
