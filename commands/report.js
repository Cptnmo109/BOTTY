const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    const rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!rUser) return message.channel.send('Couldn\'t find user.');
    const rreason = args.join(' ').slice(22);

    const reportEmbed = new Discord.MessageEmbed()
        .setDescription('Reports')
        .setColor(0xFF9900)
        .addField('Reported User', `${rUser} with ID: ${rUser.id}`)
        .addField('Reported By', `${message.author} with ID: ${message.author.id}`)
        .addField('Channel', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reason', rreason);

    const reportschannel = message.guild.channels.cache.find(c => c.name === 'reports');
    if(!reportschannel) return message.channel.send('Couldn\'t find reports channel.(needs a channel called reports)');


    message.delete().catch(() => null);
    reportschannel.send(reportEmbed);

};

module.exports.help = {
    name: 'report'
};

