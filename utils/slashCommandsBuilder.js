const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = (client) => {
    const pingCommand = new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription("Shows the Ping of me.")
    .addStringOption(option => {
        option.setName("what_ping")
        .setDescription("What type of ping do you want me to get?")
        .setRequired(false)
        .addChoices([
            ["Api Ping", "apiping"],
            ["Bot Ping", "botping"],
        ])
        return option;
    })
    client.allSlashCommands.push(pingCommand.toJSON());
    const helpCommand = new SlashCommandBuilder()
        .setName(`help`)
        .setDescription("Gives you help about me!")
    client.allSlashCommands.push(helpCommand.toJSON());
    return true;
}