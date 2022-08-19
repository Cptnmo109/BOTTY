module.exports.run = async (bot, message, args) => {

    // if (message.author.id == "353251700183793664") {
    const argresult = args.join(' ');
    if (!argresult) return;
    bot.user.setActivity(argresult, { type: 'PLAYING' });
    message.reply(argresult + ' has been set..');
    // } else {
    // message.reply("You don't have the permissions to run this command!");
};

module.exports.help = {
    name:'setgame'
};