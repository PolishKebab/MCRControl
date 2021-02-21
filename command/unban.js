const {color,RCONpassword,RCONport,serverIp} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'pardon',
	description: '/pardon command',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        if(!args[0]) return message.channel.send('No username provided!');
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password:RCONpassword});
            client.on('output', (message) => console.log(message));
            client.connect()
            .then(async () => {
                if(!args[0]) return message.channel.send(`\`unban <player>\``)
                client.on('output',msg=>{
                    const embed = new discord.MessageEmbed()
                    .setTitle('Unban')
                    .setColor(color)
                    .setDescription(`Executed: \`${command}\`\nOutput\`${msg}\``)
                    message.channel.send(embed);
                })
                await client.run(command)
            })
                }

}