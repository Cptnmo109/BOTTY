const Ranks = require('../models/ranks.js');
module.exports.run = async (bot, message) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return;
    const user = message.mentions.users.first();

    const newUser = new Ranks({
        id: user.id
    });

    newUser.save().catch(err => console.log(err));
    message.channel.send('Created data for ' + user.username);
    module.exports.help = {
        name:'createdata'
    };
};