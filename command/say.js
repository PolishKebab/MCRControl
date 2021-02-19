const{color,RCONpassword,RCONport,serverIp} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'say',
	description: 'Pisanie na serwerze',
	guildOnly: true,
	dev:true,
	aliases: ['broadcast','me'],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        if(!args[0]) return message.channel.send('Brak wiadomości!');
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password:RCONpassword });
        client.connect()
            .then(async () => {
            const msg = args.join(' ')
            client.on('output', (message) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Say')
                .setColor(color)
                .setDescription(`Wyjście: \`${msg}\` `)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed);
            });
            await client.run(`say ${msg}`)
        })
    }

}