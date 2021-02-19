const{color,RCONport,RCONpassword,serverIp,prefix,worldSeed} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'seed',
	description: 'pokazuje ziarno świata',
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
            client.on('output', (message) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Seed')
                .setColor(color)
                .setDescription(`Seed: \`${String(worldSeed)}\``)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed);
            });
            
        })
    }   
}