const{color,RCONport,RCONpassword,serverIp,prefix} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'defaultgamemode',
	description: '/defaultgamemode command',
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
            if(!args[0]) return message.channel.send(`\`defaultgamemode <survival/spectator/creative/adventure>\``)
            client.on('output', (msg) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Debug')
                .setColor(color)
                .setDescription(`Executed: \`${command}\`\nOutput\`${msg}\``)
                message.channel.send(embed);
            });
            await client.run(command)
        })
    }   
}