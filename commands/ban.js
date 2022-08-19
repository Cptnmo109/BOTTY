const mongoose = require('mongoose');
const Case = require('../models/infractions.js');
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!message.member.permissions.has('BAN_MEMBERS')) {
        message.channel.send('You don\'t have the permissions to use this command!');
    } else{
        if(!member) {return message.channel.send('Please mention a valid member of this server');}
        if(!member.bannable) {return message.channel.send('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');}

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'No reason provided';

        member.send(`You've been banned from ${message.guild.name}, for ${reason} \nModerator: ${message.member.user.tag} (${message.author.id})`);
        setTimeout(function() {
            member.ban(reason);
        }, 1000)
            .catch(() => message.channel.send(`Sorry ${message.author} I couldn't ban the user`));
        message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);


        await new Case({
            id: member.id,
            type: 'Ban',
            reason: reason,
            duration: 'Permanent',
            number: ''
        }).save();
    }
};
module.exports.help = {
    name:'ban'
};