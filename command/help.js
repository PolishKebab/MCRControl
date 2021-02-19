const fs = require('fs');
const { prefix,color } = JSON.parse(fs.readFileSync('./config.json'));
const discord=require('discord.js');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	dev:false,
	cooldown: 5,
	category:'basic',
	execute(message, args) {
		const embed = new discord.MessageEmbed().setColor(color);
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			embed.setTitle('Here\'s a list of all my commands:');
			const categories=['vanilla','bukkit','spigot','plugins','dev'];
			categories.forEach(cat=>{
				const names=[];
				commands.forEach(ele => {
					if(ele.category==cat){
						names.push('`'+`${ele.name}`+'`');
					}
				});
				if(names.length!=0)data.push({name:`**${cat}:**`,value:`${names.join(`, `)}`});
			});
			embed.addFields(data);
			embed.setFooter(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(embed)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.channel.send('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.channel.send('it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.channel.send('that\'s not a valid command!');
		}
		data.push({name:`**Name:**`,value:`${command.name}`});
		if	(command.category)data.push({name:`**Category:**`,value:`${command.category}`});
		if (command.aliases.length) data.push({name:`**Aliases:**`,value:`${command.aliases.join(', ')}`});
		if (command.description) data.push({name:`**Description:**`,value:`${command.description}`});
		if (command.usage) data.push({name:`**Usage:**`,value:`${prefix}${command.name} ${command.usage}`});

		data.push({name:`**Cooldown:**`,value:`${command.cooldown || 3} second(s)`});
		embed.addFields(data);
		if(message.channel.type!='dm'){message.channel.send(embed);}
		else{ message.channel.send(embed);}
		//message.channel.send(data, { split: true });
	},
};