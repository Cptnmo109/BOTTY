const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if (!message.member.roles.cache.find(c => c.name === 'Owner' || c.name === 'Co-Owner')) {
        message.channel.send('Invalid permissions.');
        return;
    }

    // Check for input
    if (!args[0]) return message.channel.send('Proper usage: ?poll <question>');

    // Create Embed
    const embed = new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setFooter('React to Vote.')
        .setDescription(args.join(' '))
        .setTitle(`Poll Created By ${message.author.username}`);

    message.channel.send(embed).then(function(msg) {
        msg.react('🚫');
        msg.react('✅');
        message.delete({ timeout: 1000 });
    }).catch(function(error) {
        console.log(error);
    });
};

module.exports.help = {
    name: 'poll'
};