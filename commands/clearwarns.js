// let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const warns = require('../warnings.json');

module.exports.run = async (bot, message) => {
    if(!message.member.id == '224665237469528064') return message.reply('You\'re a noob. c:');

    const wUser = message.guild.member(message.mentions.users.first());

    if(!wUser) return message.channel.send('Ah, I couldn\'t find them...');

    delete warns[wUser.id];

    message.channel.send(`<@${wUser.id}> warnings has been cleared.`);

};

module.exports.help = {
    name: 'clearwarns'
};