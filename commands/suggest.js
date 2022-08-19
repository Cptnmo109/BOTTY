const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    const suggestmessage = args.join(' ');
    const suggestchannel = message.guild.channels.cache.find(c => c.name === 'suggestions');

    if (!suggestmessage) return message.reply('Please give a suggestion!');

    const embed = new Discord.MessageEmbed()
        .addField('**SUGGESTION**', `${suggestmessage}`)
        .setFooter(`Suggestion By ${message.author.tag}`)
        .setColor('#1dd3f4')
        .setTimestamp();

    suggestchannel.send(embed).then(msg => msg.react('✅').then(() => msg.react('🚫')));

    message.reply('Your suggestion has been sent!');
};

module.exports.help = {
    name: 'suggest'
};