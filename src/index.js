// modulos 
const { Client, Events, GatewayIntentBits} = require('discord.js')
const dotenv = require('dotenv')
//config
dotenv.config()
const { TOKEN } = process.env
// inicio bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
// defs globais
global.reply = async (text) => {
    await interaction.reply(text)
}
// Login do bot
client.once(Events.ClientReady, c => {
	console.log(`FabricaBOT esta rodando no user: ${c.user.tag}`)
});
client.login(TOKEN)