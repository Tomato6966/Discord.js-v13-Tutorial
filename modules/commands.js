const Discord = require("discord.js");
const config = require("../config.json");

module.exports = client => {
    
    const { escapeRegex, generateHelpEmbed } = require("../utils/functions.js");

    client.on("messageCreate", async (message) => {
        if(!message.guild || message.author.bot) return; //STOP THE CODE RIGTHT HERE
        

        client.settings.ensure(message.guild.id, {
            prefix: config.prefix
        });
        let prefix = client.settings.get(message.guild.id, `prefix`);
        
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if(!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        let args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        let cmd = args.shift()?.toLowerCase(); //PinG --> ping;
        if(cmd.length == 0){
            if(matchedPrefix.includes(client.user.id))
            {
                return message.reply({embeds: [
                    new Discord.MessageEmbed().setColor("BLURPLE").setTitle(`:white_check_mark: **My Prefix is: \`${prefix}\`**`)
                ]}).catch(console.error);
            }
        }
        if(cmd){
            switch(cmd){
                case "prefix": 
                {
                    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)){
                        return message.reply({embeds: [
                            new Discord.MessageEmbed().setColor("RED").setTitle(`:x: **You are not allowed to run this Command**`)
                        ]}).catch(console.error);
                    }
                    
                    if(!args[0]){
                        return message.reply({embeds: [
                            new Discord.MessageEmbed().setColor("RED").setTitle(`:x: **You need to tell me what the new prefix should be!**`)
                        ]}).catch(console.error);
                    }
                    //change the prefix settings
                    client.settings.set(message.guild.id, args[0], "prefix");
                    //Send success message
                    return message.reply({embeds: [
                        new Discord.MessageEmbed().setColor("BLURPLE").setTitle(`:white_check_mark: **Successfully changed the Prefix to: \`${args[0]}\`**`)
                    ]}).catch(console.error);
                    
                } 
                break;
                case "ping":
                    {
                        message.reply("Pinging the API...").then((msg)=>{
                            msg.edit({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - msg.createdTimestamp) - (2 * client.ws.ping)}\``}).catch(console.error);
                        }).catch(console.error);
                    }
                break;
                case "help":
                    {
                        const embeds = generateHelpEmbed(message.guild)
                        message.reply({
                            embeds: embeds
                        }).catch(console.error);
                    }
                break;
                case "deploy": {
                    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)){
                        return message.reply({embeds: [
                            new Discord.MessageEmbed().setColor("RED").setTitle(`:x: **You are not allowed to run this Command**`)
                        ]}).catch(console.error);
                    }
                    message.guild.commands.set(client.allSlashCommands).catch(console.error);
                    message.reply(`:white_check_mark: Deployed ${client.allSlashCommands.length} Commands to ${message.guild.name}`).catch(console.error)
                }break;
                default: 
                    {
                        message.reply(`:x: **Unknown Command**`).catch(console.error);
                    }
                break
            }
        }
        //!embed Title Description .. 
        //["Title", "Description", ".."]
    })


    client.on("interactionCreate", async (interaction) => {
        if(!interaction.isCommand()) return;
        const { member, channelId, guildId, applicationId, 
            commandName, deferred, replied, ephemeral, 
            options, id, createdTimestamp 
        } = interaction; 
        const { guild } = member;
        let channel = guild.channels.cache.get(channelId);
        switch(commandName){
            case "ping": {
                let choice = interaction.options.getString("what_ping");
                if(!choice){
                    interaction.reply({content: "Pinging the API...", ephemeral: true}).then((inter)=>{
                        interaction.editReply({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - createdTimestamp) - (2 * client.ws.ping)}\``, ephemeral: true}).catch(console.error);
                    }).catch(console.error);
                } else if(choice == "apiping"){
                    interaction.reply({content: `**API PING:** \`${client.ws.ping}\``, ephemeral: true}).catch(console.error);
                } else {
                    interaction.reply({content: "Pinging the API...", ephemeral: true}).then((inter)=>{
                        interaction.editReply({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - createdTimestamp) - (2 * client.ws.ping)}\``, ephemeral: true}).catch(console.error);
                    }).catch(console.error);
                }

            } break;
            case "help":
                {
                    const embeds = generateHelpEmbed(guild);
                    interaction.reply({
                        embeds: embeds, ephemeral: true
                    }).catch(console.error);
                }
            break;
            
        }
    })
}