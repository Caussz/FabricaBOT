// modulos 
const { Client, Events, GatewayIntentBits, Collection} = require('discord.js')
const dotenv = require('dotenv')
const fs =  require('fs')
const path = require('path')
//config
dotenv.config()
const { TOKEN } = process.env
// inicio bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()
// Import dos comandos
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
        console.log('teste')
    } else {
        console.log('erro')
    }
}
// Login no discord
client.once(Events.ClientReady, c => {
	console.log(`FabricaBOT esta rodando no user: ${c.user.tag}`)
});
client.login(TOKEN)

// Interacoes 
client.on(Events.InteractionCreate, async interacao => {
    // defs globais
    global.reply = async (text) => {
        await interacao.reply(text)
    }
    if (!interacao.isChatInputCommand()) return
    const comando = interacao.client.commands.get(interacao.commandName)
    if(!comando) {
        console.error(`comando nao encontrado`)
        return
    } try {
        await comando.execute(interacao)
    }  catch (error) {
        console.error(error)
        await interacao.reply("Houve um erro ao executar esse comando!")
    }
     console.log(interacao)

})

