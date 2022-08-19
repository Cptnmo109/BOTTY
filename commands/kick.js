const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>['Administrators', 'Onwer', ].includes(r.name))) {return message.reply('Sorry, you don\'t have permissions to use this!');}
    const moderation = message.guild.channels.cache.find(c => c.name === 'mod-log');
    if(!moderation) return message.reply('Couldn\'t find channel');

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {return message.reply('Please mention a valid member of this server');}
    if(!member.kickable) {return message.reply('I cannot kick this user! Do they have a higher role? Do I have kick permissions?');}

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = 'No reason provided';

    const Kickembed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.username} Kicked`, member.user.avatarURL())
        .setColor(0xFF9900)
        .addField('Kicked User:', `<@${member.id}>`, true)
        .addField('Moderator:', `${message.member.user.tag}`, true)
        .addField('Reason', `${reason}`, true)
        .addField('Time', message.createdAt, true);


    // Now, time for a swift kick in the nuts!
    member.send(`You've been kicked from ${message.guild.name} \nModerator: ${message.member.user.tag} (${message.author.id}) \nReason: ${reason}`)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    setTimeout(function() {
        member.kick(reason);
    }, 1000);
    message.reply(`Successfully kicked ${member.user.tag}.`);
    moderation.send(Kickembed);


};


module.exports.help = {
    name:'kick'
};
