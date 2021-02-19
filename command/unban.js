const {color,RCONpassword,RCONport} = require('../config.json')
const discord = require('discord.js')
module.exports = {
	name: 'pardon',
	description: 'Banuje',
	guildOnly: true,
	dev:true,
	aliases: [],
	cooldown:5,
	category:'vanilla',
    execute(message, args) {
        if(!args[0]) return message.channel.send('Brak nazwy użytkownika!');
        const util = require('minecraft-server-util');
        const client = new util.RCON('medievalcraft.gq', { port:Number(RCONport),password:RCONpassword});
            client.on('output', (message) => console.log(message));
            client.connect()
            .then(async () => {
                if(!args[0]) return message.channel.send(`\`unban <player>\``)
                client.on('output',msg=>{
                    const embed = new discord.MessageEmbed()
                    .setTitle('Unban')
                    .setColor(color)
                    .setDescription(`Wykonano: \`${command}\`\nWyjście:\`${msg}\``)
                    .setFooter('Ta wiadomość nie gwarantuje, że komenda zadziałała, jest ona wysyłana automatycznie')
                    message.channel.send(embed);
                })
                await client.run(command)
            })
                }

}