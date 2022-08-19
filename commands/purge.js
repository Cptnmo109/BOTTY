const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    const deleteCount = parseInt(args[0], 10);
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('No no no.');
    if (!args[0] || args[0 == 'help']) return message.reply('Please Usage: rens!prefix <new prefix here>"');

    if(!deleteCount || deleteCount < 2 || deleteCount > 100) {return message.reply('Please provide a number between 2 and 100 for the number of messages to delete.');}

    const fetched = await message.channel.messages.fetch({ limit: deleteCount });
    message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

    const purgeEmbed = new Discord.MessageEmbed()
        .setAuthor(' Action | Purge')
        .setColor('RANDOM')
        .addField('Executor', `<@${message.author.id}>`)
        .addField('Purged', `${args[0]}`)
        .setFooter('Bot Version 1.0.1 | Made by GoBlox#1265, DevLevii#0098', bot.user.displayAvatarURL());
    const purgeChannel = message.guild.channels.cache.find(c => c.name === 'mod-log');
    if(!purgeChannel) return message.channel.send('Can\'t find mod-logs channel.');

    purgeChannel.send(purgeEmbed);
};
module.exports.help = {
    name: 'purge'
};

exports.conf = {
    Aliases: [ 'delete', 'prune' ]
};