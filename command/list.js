const{color,RCONpassword,RCONport,serverIp,prefix} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'list',
	description: '/list command',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        const command = message.content.replace(prefix, '')
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password:RCONpassword});
        client.on('output', (message) => console.log(message));
        client.connect()
        .then(async () => {
            client.on('output', (msg) => {
                const embed = new discord.MessageEmbed()
                .setTitle('List')
                .setColor(color)
                .setDescription(`Executed: \`${command}\`\nOutput\`${msg}\``)
                message.channel.send(embed);
            });
            await client.run(command)            
        })
    }   
}