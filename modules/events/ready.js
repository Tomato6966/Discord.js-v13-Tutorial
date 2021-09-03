module.exports = client => {
    client.on("ready", () => {
        console.log(`Logged into: ${client.user.tag}`);
    })
}