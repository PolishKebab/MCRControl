const{color,RCONport,RCONpassword,serverIp} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'ban',
	description: '/ban command',
	guildOnly: true,
	dev:true,
	aliases: ['',''],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        if(!args[0]) return message.channel.send('No username provided!');
        if(!args[1]) args[1] = 'Banned by an operator.'
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password: RCONpassword });
        client.connect()
        .then(async () => {
            client.on('output', (msg) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Ban')
                .setColor(color)
                .setDescription(`Executed: \`${command}\`\nOutput\`${msg}\``)
                message.channel.send(embed);
            });
            await client.run(`ban ${args[0]} ${args[1]}`)
            
        })
    }   
}