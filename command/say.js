const{color,RCONpassword,RCONport,serverIp,prefix} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'say',
	description: '/say command',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        if(!args[0]) return message.channel.send('Brak wiadomości!');
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, {port:Number(RCONport),password:RCONpassword });
        const command = message.content.replace(prefix, '')
        client.connect()
            .then(async () => {
            client.on('output', (msg) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Say')
                .setColor(color)
                .setDescription(`Executed: \`${command}\`\nOutput\`${msg}\``)
                message.channel.send(embed);
            });
            await client.run(command)
        })
    }

}