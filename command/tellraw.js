const{color,RCONport,RCONpassword,serverIp,prefix} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'tellraw',
	description: 'Wysyła czysty tekst',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        const command = message.content.replace(prefix, '')
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password: RCONpassword });
        client.on('output', (message) => console.log(message));
        client.connect()
        .then(async () => {
            if(!args[0]) return message.channel.send(`\`tellraw <player> <Raw JSON text>\``)
            client.on('output',msg=>{
                const embed = new discord.MessageEmbed()
                .setTitle('Tellraw')
                .setColor(color)
                .setDescription(`Wykonano: \`${command}\`\nWyjście:\`${msg}\``)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed);
            })
            await client.run(command)
        })
    }   
}