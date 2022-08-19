const roblox = require('noblox.js');
const discord = require('discord.js');
const request = require('request');


module.exports.run = async (bot, message, args) => {
    bot.extractDate = dateObj => {
        const month = dateObj.getMonth();
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        return {
            month: month + 1,
            day: day,
            year: year
        };
    };

    const username = args[0];
    if (username) {
        roblox
            .getIdFromUsername(username)
            .then(id => {
                // gets user id for the specific part of the embed
                if (id) {
                    roblox.getPlayerInfo(parseInt(id)).then(function(info) {
                        request.get({
                            url: `https://www.roblox.com/users/profile?username=${info.username}`,
                            json: false
                        }, (err, res, body) => {

                            const getPremium = /<span class=icon-premium-medium>/;
                            let hasPremium = body.match(getPremium);

                            if (hasPremium) {
                                hasPremium = true .then;
                                hasPremium = 'Premium';
                            } else {
                                hasPremium = false .then;
                                hasPremium = 'Non-Premium';
                            }

                            console.log(hasPremium);

                            const date = new Date(info.joinDate);
                            const dateInfo = bot.extractDate(date);
                            const embed = new discord.MessageEmbed()
                                .setColor('#f9ae00')
                                .setURL(`https://roblox.com/users/${id}/profile`)
                                .setTimestamp()
                                .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)

                                .addField('Username', info.username || 'Unresolvable', true)
                                .addField('User ID', id || 'Unresolvable', true)
                                .addField('Status', info.status || 'Nothing', true)
                                .addField('Blurb', info.blurb || 'Nothing', true)
                                .addField('Account Age', `${info.age} days old` || 'Unresolvable')
                                .addField(
                                    'Register Date',
                                    `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` ||
                    'Unresolvable'
                                )
                                .addField('Membership', hasPremium)
                                .addField('User Link', `https://roblox.com/users/${id}/profile`)
                                .setFooter('Made By GoBlox#5423.', bot.user.avatarURL());
                            message.channel.send({ embed });

                        });
                    });
                }
            }).catch(function() {
                message.channel.send(
                    'Sorry, that user doesn\'t seem to exist, double check your spelling and try again!'
                );
            });
    } else {
        message.channel.send(
            'Please provide a valid username, e.g. \'?search ROBLOX\'.'
        );
    }
};

module.exports.help = {
    name: 'search'
};