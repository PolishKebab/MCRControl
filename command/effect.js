const{color,RCONport,RCONpassword,serverIp,prefix} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'effect',
	description: 'Daje/Zabiera efekt graczowi',
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
            if(!args[0]) return message.channel.send(`\`effect <player> <effect_name> [Time(seconds)] [amplifier] [(show particles) true - false]\``)
            const embed = new discord.MessageEmbed()
            .setTitle('Effect')
            .setColor(color)
            .setDescription(`Wykonano: \`${command}\``)
            .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
            await client.run(command)
            message.channel.send(embed);
        })
    }   
}