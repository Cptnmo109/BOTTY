const Discord = require('discord.js');
const db = require('quick.db');
const status = new db.table('AFKs');

module.exports.run = async (bot, message) => {
    const afk = await status.get(message.author.id);
    // Check if author is AFK
    if (afk == null) {
        status.set(message.author.id, true);
        console.log('Added');
        return;
    }

    if (afk) {

        const embed = new Discord.MessageEmbed()
            .setColor(0xffffff)
            .setFooter(`${message.author.username} is no longer AFK.`);

        // Send a 'You are no longer AFK message'
        message.channel.send(embed).then(i => i.delete({
            timeout: 5000
        }));

        // This will delete the user from the AFK pool in the database
        afk.delete(message.author.id);

    }

    const mentioned = message.mentions.members.first();
    if (mentioned) {

        // Access AFK Status
        const userStatus = await afk.get(mentioned.id);

        if (userStatus) {

            // Form Embed
            const embed = new Discord.MessageEmbed()
                .setColor(0xffffff)
                .setFooter(userStatus);

            // Send Embed
            message.channel.send(embed);
        }

    }
};

module.exports.help = {
    name:'afk',
};