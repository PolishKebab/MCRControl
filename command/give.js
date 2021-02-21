const{color,serverIp,RCONpassword,RCONport,prefix} = require('../config.json')
const discord = require('discord.js');
module.exports = {
	name: 'give',
	description: '/give command',
	guildOnly: true,
	dev:true,
	aliases: ['',''],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        if(!args[0]) return message.channel.send('No username provided!');
        if(!args[1]) return message.channel.send('No item name provided!');
        if(!args[2]) args[2] = 1;
        if(args[2] == NaN) return message.channel.send('Amount must be a number')
        const command = message.content.replace(prefix,'')
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password:RCONpassword });
        client.connect()
        .then(async () => {
            client.on('output', (msg) => {
                 const embed = new discord.MessageEmbed()
                .setTitle('Give')
                .setColor(color)
                .setDescription(`Executed: \`${command}\`\nOutput\`${msg}\``)
                message.channel.send(embed);
            });
            await client.run(command)
        })
    }   
}