const Discord = require('discord.js');
module.exports.run = async (bot, message) => {
    try {
        const groupembed = new Discord.MessageEmbed()
            .setDescription('**Roblox Developers Official Links.**')
            .addField('Twitter', '[Click here](https://twitter.com/RD_Developers_)')
            .addField('Roblox Group', '[Click here](https://www.roblox.com/my/groups.aspx?gid=2690922)')
            .setColor('#3ba8b3')
            .setFooter('Bot Version 1.0.1 | Made by GoBlox#0001, DevLevii#0098', bot.user.displayAvatarURL());
        message.author.send(groupembed);
        message.channel.send('Check your DMs.');
        console.log('Worked. ' + message.author.username);
    } catch (error) {
        console.error(error);
    }

};
module.exports.help = {
    name: 'links'
};
