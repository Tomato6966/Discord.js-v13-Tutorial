const Discord = require("discord.js");
function escapeRegex(str){
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
function generateHelpEmbed(guild){
    let embeds = []
    embeds.push(new Discord.MessageEmbed()
        .setColor("BLURPLE")
        .setTitle(`This is my Help Information!`)
        .setDescription(`Hello I am ${guild.me.user.username} and i am a cool bot!\n\n**These are my Commands:**`)
        .setThumbnail(guild.me.user.displayAvatarURL())
        .setFooter(guild.name, guild.iconURL({dynamic: true})))
    embeds.push(new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`💯 My Utility Commands!`)
        .setThumbnail(guild.me.user.displayAvatarURL())
        .addFields([
            {name: "**ping**", value: `> *Shows the Ping of me.*`, inline: true},
            {name: "**help**", value: `> *Gives you help!*`, inline: true},
        ])
        .setFooter(guild.name, guild.iconURL({dynamic: true})))
    embeds.push(new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`🚫 The Administration Commands!`)
        .setThumbnail(guild.me.user.displayAvatarURL())
        .addFields([
            {name: "**deploy**", value: `> *Adds the Slash Commands to this Server*`, inline: true},
            {name: "**prefix**", value: `> *Changes the Prefix of your Server*`, inline: true},
        ])
        .setFooter(guild.name, guild.iconURL({dynamic: true})))
    return embeds;
}

module.exports.escapeRegex = escapeRegex;
module.exports.generateHelpEmbed = generateHelpEmbed;