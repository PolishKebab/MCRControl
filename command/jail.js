const{color} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'jail',
	description: 'Wsadza do więzienia',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
	category:'plugins',
    execute(message, args) {
        if(!args[0]) return message.channel.send('Brak nazwy użytkownika!');
        if(!args[1]) return message.channel.send('Brak nazwy więzienia!');
        if(!args[2]) return message.channel.send('Musisz określić czas pobytu!');
        const util = require('minecraft-server-util');
        const client = new util.RCON('medievalcraft.gq', { port:25689,password: 'Musztarda1' });
        client.connect()
        .then(async () => {
            client.on('output', (message) =>{
                const embed = new discord.MessageEmbed()
                .setTitle('Jail')
                .setColor(color)
                .setDescription(`Uwięziono: \`${args[0]}\` w \`${args[1]}\` na \`${args[2]}\``)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed);
            });
            await client.run(`jail ${args[0]} ${args[1]} ${args[2]}`)
        })
    }

}