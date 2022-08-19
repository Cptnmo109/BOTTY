const Discord = require('discord.js');
module.exports.run = async (bot, message) => {

    const newemb = new Discord.MessageEmbed()
        .setColor(0xFFBF00)
        .setDescription(':ping_pong: Pong! API Latency `' + `${bot.ws.ping}` + 'ms`')
        .setTimestamp();
    message.channel.send(newemb);

};

module.exports.help = {
    name: 'ping'
};