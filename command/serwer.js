const discord = require('discord.js')
const {color} = require('../config.json')
module.exports = {
	name: 'serwer',
	description: 'Informacje o serwerze',
	guildOnly: true,
	dev:false,
	aliases: ['server','status'],
	cooldown:5,
	category:'basic',
    execute(message, args) {
        const util = require('minecraft-server-util');
    if(!args[1]) {
        util.status('medievalcraft.gq', { port: 25723, enableSRV: true, timeout: 5000, protocolVersion: 47 })
            .then((response) => {
                const embed = new discord.MessageEmbed()
                .setColor(color)
                .setTitle('Status Serwera')
                .addFields(
                    { name: 'Adres Serwera', value:`\`${response.host}\``},
                    { name: 'Wersja', value: `\`${response.version}\``, inline: false },
                    { name: 'Gracze', value: `\`${response.onlinePlayers}/${response.maxPlayers}\``, inline: false },
                )
                message.channel.send(embed)
            })
            }
    }
}