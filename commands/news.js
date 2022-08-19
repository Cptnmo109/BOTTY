const Discord = require('discord.js');
module.exports.Run = (bot, message, args) => {
    const guilds = bot.guilds.array();
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('You need the ADMINISTRATOR permission to run this comamnd!');
    const text = args.join(' ');
    if (text.length < 1) return message.channel.send('I can\'t announce anything.');

    for (let i = 0; i < guilds.length; i++) {
        const guild = guilds[i];
        if (!guild.channels.cache.find(c => c.name === 'roblox-feed')) {
            guild.channels.create('roblox-feed', { type: 'text' });
        }
        const embed = new Discord.MessageEmbed()
            .setColor('#1dd3f4')
            .setTitle('Roblox News')
            .setDescription(text)
            .setFooter('Announced By ' + message.author.tag)
            .setThumbnail(bot.user.avatarURL());

        guild.channels.cache.find(c => c.name === 'roblox-feed').send(embed);
    }


};

module.exports.help = {
    name: 'news'
};