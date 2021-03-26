const Discord = require('discord.js')
const botconfig = require("../botconfig.json");
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m!'))return;  
    if(prefix === null) {

	    prefix = botconfig.prefix;

	    }

    let embed = new Discord.RichEmbed()
    .setTitle("Money Man Help Centre [Prefix **${prefix}**]")
    .addField("Economy Commands", "`work` `beg` `rob` `pay` `balance` `profile` `withdraw` `deposit` `daily` `weekly` `store` `buy` `sell` `prefix` `embed`")
    .addField("Gambling Commmands", "`roulette` `slots`")
    .addField("Economy Extra Commands", "`storeinfo [item]`")
    .setColor("#FFFFFF")
    message.channel.send(embed)




}

module.exports.help = {
  name:"help",
  aliases: [""]
}
