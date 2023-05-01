const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
   IntentsBitField.Flags.Guilds,
   IntentsBitField.Flags.GuildMembers,
   IntentsBitField.Flags.GuildMessages,
   IntentsBitField.Flags.MessageContent,
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    let prefix = '.';
    let cmd = message.content.startsWith(prefix)

    const args = message.content.slice(cmd).trim().split(/ +/g);

   
console.log(args)
});

client.login('MTEwMDIwODk0NDEyNDc4ODc5Nw.GOMl9s.Z_S7fvRUp2Ej7OUc1JojgZVrkLpoSaqogAWTps');