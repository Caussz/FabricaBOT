// modulos 
const { Client, Events, Collection, IntentsBitField} = require('discord.js')
const dotenv = require('dotenv')
const fs =  require('fs')
const path = require('path')
// importação das ilhas
const ilhaA = require('./utils/json/ilhaA.json');
const ilhaB = require('./utils/json/ilhaB.json');
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
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) client.commands.set(command.data.name, command);
    else console.log('erro');
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
    const comando = interacao.client.commands.get(interacao.commandName)
    const command = interacao.commandName;
    const pushname = interacao.user.username;
    const pushtag = interacao.user.discriminator;
    const pushAvatar = interacao.user.avatar;
    const pushID = interacao.user.id;
    const totalNameId = pushname + '#' + pushtag;
    const ownerName = '@Causs';
    const grupName = interacao.guild.name;
    const idCmd = interacao.commandId;
// log dos comandos 
    if (command) console.log(`>> [ Discord ] - C: ${command} de ${totalNameId}`);
    else console.log(`>> [ Discord ] - CN: ${command} de ${totalNameId}`);
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
    case 'ilhas':
        const fabrica_ilhaA = await interacao.options.get('ilha-a').value || await interacao.options.get('ilha-b').value;

        for (const local of ilhaA) {
            if( local.local == fabrica_ilhaA){
                (local.notebook) ? reply(`Olá ${totalNameId}\nO aluno ${local.aluno.nome} esta usando seu notebook na posição ${fabrica_ilhaA}.`)
                : (!local.aluno.locado) ? reply(`Olá ${totalNameId}\nAtualmente nenhum aluno esta ultilizando o pc ${fabrica_ilhaA}.`)
                : (!local.pc.perifericos.all) ? reply(`Olá ${totalNameId}\nAparentemente o aluno ${local.aluno.nome} locado na posição ${fabrica_ilhaA} esta com problemas nos perifericos ou no hardware.\nPara resolver entre em contato com ${ownerName} ou com outros alunos ADM.`)
                : (!local.aluno.locado && !local.pc.perifericos.all) ? reply(`Atualmente não possui nenhum aluno locado na posição ${fabrica_ilhaA}.\nE tambem, o computador apresenta falhas nos perifericos ou hardware.`)
                : (local.notebook && !local.pc.perifericos.all) ? reply(`O aluno ${local.aluno.nome} esta usando seu notebook na posição ${fabrica_ilhaA}.\nPorem seus perifericos apresentão problemas.`)
                : (!local.aluno.locado && !local.notebook) ? reply(`Olá ${totalNameId}\nAtualmente, nehum aluno esta locado na posição ${fabrica_ilhaA}.\nEsse lugar é apenas para alunos com notebooks`)
                : reply('a')
                }
               // reply(`Olá ${pushname} 👋🏼\nSegue as informações sobre o computador na posição ${ilhas} da ilha A da fábrica.\nO aluno: ${local.aluno.nome} da turma: ${local.aluno.turma} esta em um total de ${local.aluno.totalprojetos} projetos.\nEmail do aluno:${local.aluno.email}\nInformações importantes do computador:\nMarca: ${local.pc.marca}\ncpu: ${local.pc.cpu}\nram: ${local.pc.ram}\nHDD/SSD: ${local.pc.HDD}\nWIFI: ${local.pc.wifi}\nPatrimonio: ${local.pc.patrimonio}\n Informações dos periféricos:\nMonitor: ${local.pc.perifericos.monitor.monitor1.marca}\npatrimônio:${local.pc.perifericos.monitor.monitor1.patrimonio}`)
        }
        //reply()
        break
        default:
            if(!command) {
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