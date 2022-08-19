module.exports.run = (bot, message, args) => {
    const reason = args.slice(1).join(' ');
    bot.unbanReason = reason;
    bot.unbanAuth = message.author;
    const user = args[0];
    const modlog = bot.channels.cache.find(c => c.name === 'server-logs');
    if (!modlog) return message.reply('I cannot find a mod-log channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
    if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
    message.guild.members.unban(user);
    message.reply(`Successfuly unbanned <@${user}>!`);
};

module.exports.help = {
    name: 'unban'
};