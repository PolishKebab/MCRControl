const{color,RCONport,RCONpassword,serverIp} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'pardon-ip',
	description: '/pardon-ip command',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        if(!args[0]) return message.channel.send('No ip adress provided!');
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password: RCONpassword });
        client.on('output', (message) => console.log(message));
        client.connect()
        .then(async () => {
            if(!args[0]) return message.channel.send(`\`Unban-ip <ip-adress>\``)
            client.on('output',msg=>{
                const embed = new discord.MessageEmbed()
                .setTitle('Unban-ip')
                .setColor(color)
                .setDescription(`Executed: \`${command}\`\nOutput\`${msg}\``)
                message.channel.send(embed);
            })
            await client.run(command)
        })
    }   
}