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
        description: 'Retorna informações do computador selecionado',
        options: [
            {
                name: 'ilha-a',
                description: 'Ilha A da fabrica',
                type: ApplicationCommandOptionType.String,
                choices: [
                   { 
                    name: 'a1',
                    value: '-a1',
                },
                { 
                    name: 'a2',
                    value: '-a2',
                },
                { 
                    name: 'a3',
                    value: '-a3',
                },
                { 
                    name: 'a4',
                    value: '-a4',
                },
                { 
                    name: 'a5',
                    value: '-a5',
                },
                { 
                    name: 'a6',
                    value: '-a6',
                },
                ]
            },
            {
                name: 'ilha-b',
                description: 'Ilha B da fabrica',
                type: ApplicationCommandOptionType.String,
                choices: [
                   { 
                    name: 'b1',
                    value: '-b1',
                
                }
                ]
            },
            {
                name: 'ilha-c',
                description: 'Ilha C da fabrica',
                type: ApplicationCommandOptionType.String,
                choices: [
                   { 
                    name: 'c1',
                    value: '-c1',
                  
                }
                ]
            },
            {
                name: 'ilha-d',
                description: 'Ilha D da fabrica',
                type: ApplicationCommandOptionType.String,
                choices: [
                   { 
                    name: 'd1',
                    value: '-d1',
                  
                }
                ]
            },
            {
                name: 'ilha-e',
                description: 'Ilha E da fabrica',
                type: ApplicationCommandOptionType.String,
                choices: [
                   { 
                    name: 'e1',
                    value: '-e1',
              
                }
                ]
            }
        ]
    }
            

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
