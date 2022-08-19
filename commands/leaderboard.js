const Discord = require('discord.js');
const mongoose = require('mongoose');
const Ranks = require('../models/mongoose.js');
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports.run = async (bot, message) => {
/*    let money = db.all();
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = ''

        content += `${i+1}. ${user} - ${money[i].data} XP\n`
    }

  console.log(db.all())

    const embed = new Discord.MessageEmbed()
    .setAuthor(`XP Leaderboard`, message.guild.iconURL())
    .setDescription(content)
    .setColor([255,255,0])
    .setTimestamp()

    message.channel.send(embed)*/


    const money = await Ranks.find().sort({ level: 'descending', xp: 'descending' });
    console.log(money);
    let content = '';

    for (let i = 0; i < 10; i++) {
        let user = '<@' + money[i].id + '>';
        if (user == null || user == undefined || !user) user = 'unknown';
        // console.log(money[i].ID.split(' '))
        content += `${i + 1}. ${user} - ${money[i].xp} XP | Level ${money[i].level}\n`;
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} Leaderboard`, message.guild.iconURL())
        .setDescription(content)
        .setColor([255, 255, 0]);

    message.channel.send(embed);


};

module.exports.help = {
    name: 'leaderboard'
};
