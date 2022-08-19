const Discord = require('discord.js');
const mongoose = require('mongoose');
const Cases = require('../models/infractions.js');

mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports.run = async (bot, message, args) => {
//  if (message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You cannot execute this command! :x:");
    const User = message.mentions.users.first();
    const Num = args[1];
    if (!User) return message.channel.send('Provide a user!');
    if (!Num) return message.channel.send('Provide a number!');
    //  console.log(Num)
    if (Num == 'all') {
        const user = await Cases.find({ id: User.id });
        // await Cases.find({ id: User.id }), async function(err, user) {
        //     console.log(user[0]);
        const Embed = new Discord.MessageEmbed();
        for (let i = 0; i < user.length; i++) {
            Embed.addField(`**Case ${user[i].number}**`, `Type: **${user[i].type}**\nReason: **${user[i].reason}**\nCase Number: **#${user[i].number}**`);
        }
        // user.forEach(field => Embed.addField(`Case ${field.number}`, `Type: ${field.type}\nReason: ${field.reason}\nCase Number: #${field.number}`))
        Embed.setTitle(`${User.username}'s Infractions`);
        Embed.setAuthor(message.author.username, message.author.avatarURL());
        Embed.setThumbnail(message.guild.iconURL());
        Embed.setTimestamp();
        Embed.setColor('#fffff0');

        message.channel.send(`**${User.username} has ${user.length} infractions.**`, { embed: Embed });
        message;
        //    }
    } else {

        Cases.findOne({ id: User.id, number: Num }, async function(err, user) {
            if (user == null) return message.channel.send('That case does not seem to exist!');
            const embed = new Discord.MessageEmbed()
                .setTitle('Case #' + Num)
                .addField('**User**', `<@${User.id}>`)
                .addField('**Type**', user.type)
                .addField('**Reason**', user.reason)
                .addField('**Case Number**', '#' + user.number)
                .setColor('#fffff0')
                .setTimestamp()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setThumbnail(message.guild.iconURL());
            message.channel.send(embed);
        });
    }
};
// O_O
module.exports.help = {
    name: 'case'
};
