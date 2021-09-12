const Discord = require("discord.js");
function escapeRegex(str){
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
function generateHelpEmbed(guild){
    return new Discord.MessageEmbed()
    .setColor("BLURPLE")
    .setTitle(`My very First Embed`)
    .setDescription(`Hello I am ${client.user.username} and i am a cool bot!\n\n**These are my Commands:**`)
    .setThumbnail(client.user.displayAvatarURL())
    .addFields([
        {name: "**ping**", value: `> *Shows the Ping of me.*`, inline: true},
        {name: "**help**", value: `> *Gives you help!*`, inline: true},
        {name: "**deploy**", value: `> *Adds the Slash Commands to this Server*`, inline: true},
        {name: "**prefix**", value: `> *Changes the Prefix of your Server*`, inline: true},
    ])
    .setFooter(guild.name, guild.iconURL({dynamic: true}));
}

module.exports.escapeRegex = escapeRegex;
module.exports.generateHelpEmbed = generateHelpEmbed;
