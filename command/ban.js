const{color,RCONport,RCONpassword,serverIp} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'ban',
	description: 'Banuje',
	guildOnly: true,
	dev:true,
	aliases: ['',''],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        if(!args[0]) return message.channel.send('Brak nazwy użytkownika!');
        if(!args[1]) args[1] = 'Zbanowany przez operatora.'
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password: RCONpassword });
        client.connect()
        .then(async () => {
            client.on('output', (message) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Ban')
                .setColor(color)
                .setDescription(`Zbanowano \`${args[0]}\` za \`${args[1]}\``)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed);
            });
            await client.run(`ban ${args[0]} ${args[1]}`)
            
        })
    }   
}