const{color,RCONpassword,RCONport} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'unjail',
	description: 'Uwalnianie z więzienia',
	guildOnly: true,
	dev:true,
	aliases: ['',''],
	cooldown:5,
	category:'plugins',
    execute(message, args) {
        if(!args[0]) return message.channel.send('Brak nazwy użytkownika!');
        const util = require('minecraft-server-util');
        const client = new util.RCON('medievalcraft.gq', { port:Number(RCONport),password:RCONpassword });
            client.on('output', (message) => console.log(message));
            client.connect()
            .then(async () => {
                if(!args[0]) return message.channel.send(`\`unjail <player>\``)
                client.on('output',msg=>{
                    const embed = new discord.MessageEmbed()
                    .setTitle('Unjail')
                    .setColor(color)
                    .setDescription(`Wykonano: \`${command}\`\nWyjście:\`${msg}\``)
                    .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                    message.channel.send(embed);
                })
                await client.run(command)
            })
                }

}