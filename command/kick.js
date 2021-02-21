const{RCONport,color,RCONpassword,serverIp,prefix} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'kick',
	description: '/kick command',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
    execute(message, args) {
        if(!args[0]) return message.channel.send('No username provided!');
        if(!args[1]) args[1] = 'Kicked by an operator';
        const command = message.content.replace(prefix, '')
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password:RCONpassword });
        client.connect()
        .then(async () => {
            client.on('output', (msg) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Kick')
                .setColor(color)
                .setDescription(`Executed: \`${command}\`\nOutput\`${msg}\``)
                message.channel.send(embed);
            });
             await client.run(command)
        })
    }   

}