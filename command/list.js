const{color} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'list',
	description: 'Wyświetla liste graczy',
	guildOnly: true,
	dev:true,
	aliases: ['lista',''],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        const util = require('minecraft-server-util');
        const client = new util.RCON('medievalcraft.gq', { port:25689,password: 'Musztarda1' });
        client.on('output', (message) => console.log(message));
        client.connect()
        .then(async () => {
            client.on('output', (message) => {
                const embed = new discord.MessageEmbed()
                .setTitle('Lista')
                .setColor(color)
                .setDescription(`Jeszcze nie działa, użyj \`!serwer\``)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed);
            });
            await client.run(`list`)            
        })
    }   
}