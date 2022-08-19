const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    const ChatMsg = args[0];

    if (!ChatMsg) return message.channel.send('Please specify a valid argument to view ranks. Because we think about phone users you can use `?levelranks mobile` or `?levelranks pc`');

    if (ChatMsg.toLowerCase() == 'pc') {
        const RolesEmbed = new Discord.MessageEmbed()
            .addField('Level 1', 'Bronze', true)
            .addField('Level 5', 'Silver', true)
            .addField('Level 10', 'Gold', true)
            .addField('Level 25', 'Emerald', true)
            .addField('Level 50', 'Crystal', true)
            .addField('Level 65', 'Legend', true)
            .addField('Level 70', 'Veteran', true)
            .addField('Level 80', 'Exclusive', true)
            .addField('Level 100', 'Champion', true)
            .setColor('#00AE86');
        message.channel.send(RolesEmbed);
    } else if (ChatMsg.toLowerCase() == 'mobile') {
        const RolesPhoneEmbed = new Discord.MessageEmbed()
            .addField('Level 1', 'Bronze', true)
            .addField('Level 5', 'Silver', true)
            .addField('Level 10', 'Gold', true)
            .addField('Level 25', 'Emerald', true)
            .addField('Level 50', 'Crystal', true)
            .addField('Level 65', 'Legend', true)
            .addField('Level 70', 'Veteran', true)
            .addField('Level 80', 'Exclusive', true)
            .addField('Level 100', 'Champion', true)
            .setColor('#00AE86');
        message.channel.send(RolesPhoneEmbed);
    }
};
module.exports.help = {
    name:'levelranks'
};