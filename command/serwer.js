const discord = require('discord.js')
const {color,serverIp,serverPort,} = require('../config.json')
module.exports = {
	name: 'server',
	description: 'Server Information',
	guildOnly: true,
	dev:false,
	aliases: ['serwer','status'],
	cooldown:5,
	category:'basic',
    execute(message, args) {
        const util = require('minecraft-server-util');
    if(serverPort == '') serverPort = 25565;
        util.status(serverIp, { port: Number(serverPort), enableSRV: true, timeout: 5000, protocolVersion: 47 })
            .then((response) => {
                const embed = new discord.MessageEmbed()
                .setColor(color)
                .setTitle('Server Status')
                .addFields(
                    { name: 'Ip Adres', value:`\`${response.host}\``},
                    { name: 'Version', value: `\`${response.version}\``, inline: false },
                    { name: 'Players', value: `\`${response.onlinePlayers}/${response.maxPlayers}\``, inline: false },
                )
                message.channel.send(embed)
            })
            }
    }
}
