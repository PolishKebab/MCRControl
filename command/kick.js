const{RCONport,color,RCONpassword,serverIp} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'kick',
	description: 'Wyrzuca gracza',
	guildOnly: true,
	dev:true,
	aliases: ['',''],
	cooldown:5,
    execute(message, args) {
        if(!args[0]) return message.channel.send('Brak nazwy użytkownika!');
        if(!args[1]) args[1] = 'Wyrzucony przez operatora';
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password:RCONpassword });
        client.connect()
        .then(async () => {
            client.on('output', (message) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Kick')
                .setColor(color)
                .setDescription(`\`${args[0]}\` Został wyrzucony za \`${args[1]}\``)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed);
            });
             await client.run(`kick ${args[0]} ${args[1]}`)
        })
    }   

}