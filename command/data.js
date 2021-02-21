const{color,RCONport,RCONpassword,serverIp,prefix} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'data',
	description: '/data command',
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
            if(!args[0]) return message.channel.send(`\`\`\`If getting data from block entity:\ndata <get - merge - remove> <block> <pos> [<path>] [<scale>]\nIf getting data from mobile entity (mob):\n/data <get - merge - remove> <block> <target> [<path>] [<scale>]\`\`\``)
            client.on('output', (msg) =>{
                const embed = new discord
                .MessageEmbed()
                .setTitle('Data')
                .setColor(color)
                .setDescription(`Executed: \`${command}\`\nOutput\`${msg}\``)
                message.channel.send(embed)
            });
            await client.run(command)
        })
    }   
}