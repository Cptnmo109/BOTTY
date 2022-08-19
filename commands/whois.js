const roblox = require('roblox-js');
const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    const username = args[0];
    const groupId = '2690922';

    roblox.getIdFromUsername(username).then(function(id) {
        roblox.getUsernameFromId(id).then(function(username2) {
            roblox.getRankNameInGroup(groupId, id).then(function(rank) {
                roblox.getBlurb(id).then(function(blurb) {
                    roblox.getStatus(id).then(function(status) {
                        if (blurb) {
                            if (!status) {
                                const rickembed = new Discord.MessageEmbed()
                                    .setTitle(username2)
                                    .setColor('#00FF27')
                                    .setImage(
                                        `https://www.roblox.com/Thumbs/BCOverlay.ashx?username=${username}`
                                    )
                                    .setThumbnail(
                                        `https://www.roblox.com/headshot-thumbnail/image?userId=${id}&width=100&height=100&format=png `
                                    )
                                    .addField('Username', username2)
                                    .addField('ID', id)
                                    .addField('Group Rank', rank);
                                message.channel.send({ embed: rickembed });
                                return;
                            }
                            const rickembed = new Discord.MessageEmbed()
                                .setTitle(username2)
                                .setColor('#00FF27')
                                .setImage(
                                    `https://www.roblox.com/Thumbs/BCOverlay.ashx?username=${username}`
                                )
                                .setThumbnail(
                                    `https://www.roblox.com/headshot-thumbnail/image?userId=${id}&width=100&height=100&format=png `
                                )
                                .addField('Username', username2)
                                .addField('ID', id)
                                .addField('Status', status)
                                .addField('About', blurb)
                                .addField('Group Rank', rank);
                            message.channel.send({ embed: rickembed });
                            return;
                        }
                        if (!status) {
                            const rickembed = new Discord.MessageEmbed()
                                .setTitle(username2)
                                .setColor('#00FF27')
                                .setImage(
                                    `https://www.roblox.com/Thumbs/BCOverlay.ashx?username=${username}`
                                )
                                .setThumbnail(
                                    `https://www.roblox.com/headshot-thumbnail/image?userId=${id}&width=100&height=100&format=png `
                                )
                                .addField('Username', username2)
                                .addField('ID', id)
                                .addField('Group Rank', rank);
                            message.channel.send({ embed: rickembed });
                            return;
                        }
                        const rickembed = new Discord.MessageEmbed()
                            .setTitle(username2)
                            .setColor('#00FF27')
                            .setImage(
                                `https://www.roblox.com/Thumbs/BCOverlay.ashx?username=${username}`
                            )
                            .setThumbnail(
                                `https://www.roblox.com/headshot-thumbnail/image?userId=${id}&width=100&height=100&format=png `
                            )
                            .addField('Username', username2)
                            .addField('ID', id)
                            .addField('Status', status)
                            .addField('Group Rank', rank);
                        // ("Rank", rankname + " (" + rank + ")")
                        message.channel.send({ embed: rickembed }).catch(function() {
                            message.channel
                                .send(`Can't Find ${username}`)
                                .catch(console.error);
                        });
                    });
                });
            });
            // http://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&userId=
            // https://www.roblox.com/Thumbs/BCOverlay.ashx?username=${username}
        });
    });
};

module.exports.help = {
    name: 'whois'
};
