const { REST, Routes, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js')
const dotenv = require('dotenv')
const fs =  require('fs')
const path = require('path')
//config
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env
// Import dos comandos
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const commands = [
    {
        name: 'gpt',
        description: 'Responde a pergunta',
        options: [
            {
                name: 'pergunta',
                description: 'Digite sua pergunta',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'ilhas',
        description: 'ilhas da fabrica',
        options: [
            {
                name: '-A',
                description: 'ilhas da fabrica',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'a1',
                        value: '-a1'
                    },
                    {
                        name: 'a2',
                        value: '-a2'
                    },
                    {
                        name: 'a3',
                        value: '-a3'
                    },

                    {
                        name: 'Ilha C',
                        value: '-ic'
                    },
                    {
                        name: 'Ilha D',
                        value: '-id'
                    },
                    {
                        name: 'Ilha E',
                        value: '-ie'
                    },

                ],
            }, 
             {
                name: '-estoque',
                description: 'Estoque da fabrica',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'Estoque completo',
                        value: '-es'
                    },
                    {
                        name: 'Estoque RAM',
                        value: '-e-ram'
                    },
                    {
                        name: 'Estoque HDD/SSD',
                        value: '-e-hdd'
                    },
                    {
                        name: 'Estoque PC',
                        value: '-e-pc'
                    },
                    {
                        name: 'Estoque Monitor',
                        value: '-e-m'
                    },
                ],
            },
            
            {
                name: '-chamado',
                description: 'Estoque da fabrica',
                type: ApplicationCommandOptionType.String,
            },
        ]
    },

]

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

// instancia rest
const rest = new REST({version: '10'}).setToken(TOKEN);

// deploy dos cmd
(async () => {
    try {
        console.log(`Resentando ${commands.length} comandos...`)
    
        // PUT
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
            console.log("Comandos registrados com sucesso!")
    }
    catch (error){
        console.error(error)
    }
})()
