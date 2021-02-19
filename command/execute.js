const{color,RCONport,RCONpassword,serverIp,prefix} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'execute',
	description: 'Wykonuje komendy',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        message.channel.send('Komenda zbyt skomplikowana do zaprogramowania, WIP')
    }   
}