const {prefix,color,RCONport,RCONpassword,serverIp} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'team',
	description: 'komenda /team',
	guildOnly: true,
	dev:true,
	aliases: ['',''],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        const command = message.content.replace(prefix, '/')
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password:RCONpassword });
        client.connect()
        .then(async () => {
            client.on('output', (msg) => {
                const embed = new discord.MessageEmbed()
                embed.setTitle('Team')
                embed.setDescription(`Wykonano:\`${command}\``)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed)
            });
            if(!args[0]) message.channel.send('Brak warunku!'); //wdym? why i need to change desc?
            if(args[0] == 'add') {
            // Team add <teamName> [<displayName>] [] = optional
                if(!args[1]) return message.channel.send(`\`Team add <teamName> [<displayName>]\``)
                client.run(command)
            }
            if(args[0] == 'empty') {
            // Team empty <teamName>
                if(!args[1]) return message.channel.send(`\`Team empty <teamName>\``)
                client.run(command)
            }
            if(args[0] == 'join') {
                // Team join <teamName> [<playerName>]
                if(!args[1]) return message.channel.send(`\`Team join <teamName> [<playerName>]\``)
                client.run(command)
            }
            if(args[0] == 'leave') {
                // Team leave <playerName>
                if(!args[1]) return message.channel.send(`\`Team leave <playerName>\``)
                client.run(command)
            }
            if(args[0] == 'list') {
                // Team list [<teamName>]
                if(!args[1]) return message.channel.send(`\`Team list [<teamName>]\``)
                client.run(command)
            }
            if(args[0] == 'modify') {
                // Team modify <teamName> <Option> <Value>
                if(!args[1]) return message.channel.send(`\`Team modify <teamName> <Option> <Value>\``)
                client.run(command)
            }
            if(args[0] == 'remove') {
                // Team remove <teamName>
                if(!args[1]) return message.channel.send(`\`Team remove <teamName>\``)
                client.run(command)
            }    
        })
    }
}