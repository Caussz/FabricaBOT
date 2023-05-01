// modulos 
const { Client, Events, Collection, IntentsBitField} = require('discord.js')
const dotenv = require('dotenv')
const fs =  require('fs')
const path = require('path')
//config
dotenv.config()
const { TOKEN, TOKEN_GPT, PREFIX } = process.env
let prefix = PREFIX
// config openai > chatgpt
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: TOKEN_GPT,
});
const openai = new OpenAIApi(configuration);
// inicio bot
const client = new Client({
    intents: [
     IntentsBitField.Flags.Guilds,
     IntentsBitField.Flags.GuildMembers,
     IntentsBitField.Flags.GuildMessages,
     IntentsBitField.Flags.MessageContent,
    ]
  });
  
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

client.on('messageCreate', async (message) => {

    const reply = async (text) => {
        await message.reply(text)
    }
     const commandNotPrefix = message.content
     if (!message.content.startsWith(prefix)) return;
     const args = message.content.slice(prefix.length).trim().split(/ +/g);

     switch (commandNotPrefix) {
        case 'hey':
            reply('heyy')
            break;
     
        default:
            break;
     }

})

client.on(Events.InteractionCreate, async (interacao) => {

    const command = interacao.commandName;
    const pushname = interacao.user.username;
    const pushtag = interacao.user.discriminator;
    const pushAvatar = interacao.user.avatar;
    const pushID = interacao.user.id;
    const grupName = interacao.guild.name
    const idCmd = interacao.commandId
// log dos comandos 
    if (command) console.log(`>> [ Discord ] - C: ${command} de ${pushname}`);
    else console.log(`>> [ Discord ] - CN: ${command} de ${pushname}`);
    // defs globais
    const reply = async (text) => {
        await interacao.reply(text)
    }

    switch (command) {
            case 'gpt':
                const pergunta = await interacao.options.get('pergunta').value
               interacao.deferReply(`➩ Carregando, por favor espere...`)
               const completion = await openai.createCompletion({
                   model: "text-davinci-003",
                   prompt: pergunta,
                   max_tokens: 2000,
                 });
                 await interacao.editReply(`➩ Resposta para a pergunta: "${pergunta}"\n${completion.data.choices[0].text}`)
                break
    case 'fabrica':
        const ilhas = await interacao.options.get('-ilhas').value
        console.log(ilhas)
        reply(`➩ ${ilhas}`)

        break
        default:
            if (!interacao.isChatInputCommand()) return
            const comando = interacao.client.commands.get(interacao.commandName)
            if(!comando) {
                reply("Comando nao encontrado...")
                return
            } try {
                await comando.execute(interacao)
            }  catch (error) {
                console.error(error)
                await reply("Houve um erro ao executar esse comando!")
            }
            break;
    }
})