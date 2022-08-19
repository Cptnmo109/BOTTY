const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('You need the ADMINISTRATOR permission to run this comamnd!');
    const text = args.join(' ').split(' | ');
    if (text.length < 2) return message.channel.send('You have to announce something.');
    const embed = new Discord.MessageEmbed()
        .setColor(text[2].toUpperCase() || '#1dd3f4')
        .setTitle(text[0])
        .setDescription(text[1]);
    if (message.attachments.size > 0) {
        embed.setImage(message.attachments.array()[0].url);
    }
    embed.setFooter('Announced By ' + message.author.tag);
    embed.setTimestamp();

    if (text[3] == 'everyone') {
        message.channel.send('@everyone', { embed: embed });
    } else
    if (text[3] == 'here') {
        message.channel.send('@here', { embed: embed });
    } else
    if (text[3] == 'noping' || text[3] == 'no ping' || text[3] == undefined || text[3] == null) {
        message.channel.send(embed);
    }
    message.delete(100);

};

module.exports.help = {
    name: 'announce'
};