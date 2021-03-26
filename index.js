const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const db = require('quick.db')
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});
})
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`✬┊GAMING EMPIRE`);
  bot.user.setStatus('dnd');

  bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    let prefix = db.get(`prefix_${message.guild.id}`)

    if(prefix === null) {

	    prefix = botconfig.prefix;

	    }
	if(message.content === `<@${bot.user.id}>`) {
            return message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.displayAvatarURL({dynamic:true})).setColor(`BLUE`).setDescription(`My Prefix Is \**${prefix}\**`).setTitle(`\**${message.author.username}\**`).setFooter(`MYPREFIX`, bot.user.displayAvatarURL()))
    };
    const [, matchedPrefix] = message.content.match(prefixRegex);
    let messageArray = message.content.split(" ");
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;

    if (bot.commands.has(cmd)) {
      commandfile = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    commandfile = bot.commands.get(bot.aliases.get(cmd));
  }
  
      if (!message.content.startsWith(prefix)) return;

          
  try {
    commandfile.run(bot, message, args);
  
  } catch (e) {
  }}
  )})


bot.login(process.env.token);
