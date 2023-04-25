const { SlashCommandBuilder } = require('discord.js')

module.exports = {
        data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pongkkj'),

        async execute(interaction) {
            await interaction.reply('Pong!')
        }
}
