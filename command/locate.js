const{color,RCONport,RCONpassword,serverIp,prefix} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'locate',
	description: 'Znajduje strukture',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        const command = message.content.replace(prefix, '')
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password: RCONpassword });
        client.connect()
        .then(async () => {
            if(!args[0]) return message.channel.send(`\`locate <structurename>\``)
            client.on('output', (message) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Locate')
                .setColor(color)
                .setDescription(`Wykonano: \`${command}\``)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed);
            });
            await client.run(command)
        })
    }   
}