const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {

    if (message.author.id !== '601155182755184650') return message.reply('You cannot execute this command! :x:');
    const Rargs = message.content.split(' ').slice(2).join(' ');
    const userID = args[1];
    if (isNaN(args[1])) return message.reply('Please provide a valid user ID! :x:');
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Direct Message')
        .setDescription(Rargs)
        .setFooter('Sender: ' + message.guild.name);
    bot.users.cache.get(userID).send(embed);
    message.channel.send('Sent!').catch(console.error);
    // it may be that if the user has blocked your bot that it does not work
};


module.exports.help = {
    name: 'reply'
};