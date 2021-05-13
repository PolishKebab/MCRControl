const Discord = require('discord.js');
const { prefix, token, status } = require('./config.json');
const fs = require('fs');
const { on } = require('process');
const { time, timeStamp } = require('console');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./command').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./command/${file}`);
    client.commands.set(command.name, command);
}

fs.readdir(`./events/`, (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
	  let eventFunction = require(`./events/${file}`);
	  let eventName = file.split(".")[0];
	  client.on(eventName, (...args) => eventFunction.run(client, ...args));
	});
});

client.on('message', message => {
    const dev=JSON.parse(fs.readFileSync('./devs.json'))
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if(message.channel.type=='dm')return message.channel.send('DM commands are turned off.');
// Code to turn off DM command, be aware that if you delete it, the bot may crash on some commands in DM's.
    const args = message.content.slice(prefix.length).trim().split(/ +/); 
    const commandName = args.shift().toLowerCase();
    var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command)return;
//
    const d=new Date().toLocaleDateString().replace('/','@').replace('/','@');
    const time=new Date();
    var zero = "";
        if(time.getMinutes() >= 0 &&  time.getMinutes() <= 9) {
    var zero = "0";
        };
    const msg=`${time.getHours()}:${zero}${time.getMinutes()} [${message.channel.guild.id}] ${message.author.tag}: ${message.content}`;
	if(fs.existsSync(`./logs/${d}.txt`)){
		fs.writeFileSync(`./logs/${d}.txt`,fs.readFileSync(`./logs/${d}.txt`)+'\n' +msg);
	}else{ 
		fs.writeFileSync(`./logs/${d}.txt`,'---logs---:\n'+msg);
	}
// Code to log commands used in a txt file every day
    if(command.dev){
        if(!dev.devs.includes(message.author.id))return;
    }
    if(command.args){
        if(args.length==0)return message.channel.send('you didn\'t add any arguments')
    }
    if(command.guildOnly){
        if(message.channel.type=='dm')return message.channel.send('```This command does not support dm```');
    }
    if(command.permissions){
        if(!message.member.hasPermission(command.permissions)){
            message.channel.send('You dont have permission');
            return;
        }
    }
    console.log(`${message.author.tag}: ${message.content}`)
    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.reply('there was an error trying to execute that command!');
    }          
});

client.login(token);
