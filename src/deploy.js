const { REST, Routes } = require('discord.js')
const dotenv = require('dotenv')
const fs =  require('fs')
const path = require('path')
//config
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env
// Import dos comandos
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const commands = []

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

// instancia rest
const rest = new REST({version: '10'}).setToken(TOKEN);

// deploy dos cmd
(async () => {
    try {
        console.log('resetando comandos')
        const data = await rest.put(
            Routes.applicationGuildCommand(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
        console.log('comandos carregados')
    } catch (error){
        console.error(error)
    }
})()
