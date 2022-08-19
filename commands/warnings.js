const fs = require('fs');
const warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8'));
module.exports.run = async (bot, message, args) => {
    const wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(!warns[wUser.id]) {
        warns[wUser.id] = {
            warns: 0
        };
    }

    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You can\'t do that.');
    if(!wUser) return message.reply('Couldn\'t find them yo');
    const warnlevel = warns[wUser.id].warns;

    message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`);

};

module.exports.help = {
    name: 'warnings'
};