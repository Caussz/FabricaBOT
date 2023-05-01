const { SlashCommandBuilder } = require('discord.js')
const speed = require("performance-now");
const os = require("os");

const { formatp, runtime } = require(`../utils/func`)

module.exports = {
        data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Info do bot'),

        async execute(interaction) {
            //await interaction.reply('Pong!')
            let timestamp = speed();
            let latensi = speed() - timestamp;
            interaction.reply(`➩ Tempo Ativo: ${runtime(process.uptime())}\n➩ Tempo Resp: ${latensi.toFixed(3)} seg\n➩ RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}`);
        }
}
