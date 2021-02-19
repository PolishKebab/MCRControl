const{color,serverIp,RCONpassword,RCONport} = require('../config.json')
const discord = require('discord.js');
const { RCON } = require('minecraft-server-util');
module.exports = {
	name: 'give',
	description: 'Daje item graczowi',
	guildOnly: true,
	dev:true,
	aliases: ['',''],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        if(!args[0]) return message.channel.send('Brak nazwy użytkownika!');
        if(!args[1]) return message.channel.send('Brak nazwy itemu!');
        if(!args[2]) args[2] = 1;
        if(args[2] == NaN) return message.channel.send('Jebnięty jesteś? ilość przedmiotu musi być liczbą')
        const util = require('minecraft-server-util');
        const client = new util.RCON(serverIp, { port:Number(RCONport),password:RCONpassword });
        client.connect()
        .then(async () => {
            client.on('output', (message) => {
                 const embed = new discord.MessageEmbed()
                .setTitle('Give')
                .setColor(color)
                .setDescription(`\`${args[0]}\` otrzymał \`${args[2]} ${args[1]}\``)
                .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                message.channel.send(embed);
            });
            await client.run(`give ${args[0]} ${args[1]} ${args[2]}`)
        })
    }   
}