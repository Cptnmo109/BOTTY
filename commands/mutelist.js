const Discord = require('discord.js');

module.exports.Run = async (bot, message) => {
    const muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
    if(!muterole) return message.reply('Couldn\'t find role.');
    const serverembed = new Discord.MessageEmbed()
        .setDescription('**The Mute List**')
        .setColor('#66ff99')
        .addField('Number of Members', muterole.members.size)
        .addField('Users Muted', muterole.members.map(u => u.user).join('\n'));
    message.channel.send(serverembed);
};
module.exports.help = {
    name: 'mutelist'
};
