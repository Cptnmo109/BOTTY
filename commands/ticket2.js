module.exports.run = async (client, message) => {

    /**
 * Make a file called config.json and store your token in there!
 */

    const userTickets = new Map();


    /**
     * This first conditional statement is used to give reactions to the embed messages our bot sends.
     * Please note everything here is hard-coded, you are responsible for modifying it to fit your needs.
     */
    if(message.author.bot) {
        if(message.embeds.length === 1 && message.embeds[0].description.startsWith('React')) {
            message.react(':ticketreact:625925895013662721')
                .then(() => console.log('Reacted.'))
                .catch(err => console.log(err));
        }
        if(message.embeds.length === 1 && message.embeds[0].title === 'Ticket Support') {
            message.react(':checkreact:625938016510410772')
                .then(reaction => console.log('Reacted with ' + reaction.emoji.name))
                .catch(err => console.log(err));
        }
    }
    /**
     *  Check to see if the command and the message was sent in the correct channel. In the video, I had a channel
     * called "Support" and that will serve as our channel to create tickets in. Make sure you change it to fit your needs or
     * get rid of it.
     */
    if(message.content.toLowerCase() === '?createticket' && message.channel.id === '724524755260145694') {

        /**
         * Check if the map has the user's id as a key
         * We also need to check if there might be another channel the bot made that it did not delete, (could've been from an old ticket but the bot crashed so the channel was not closed/deleted.)
         */
        if(userTickets.has(message.author.id) ||
        message.guild.channels.some(channel => channel.name.toLowerCase() === message.author.username + 's-ticket')) {
            message.author.send('You already have a ticket!');
        } else {
            const guild = message.guild;
            /**
             * Create the channel, pass in params.
             * Make sure you assign appropriate permissions for each role.
             * If you have additional roles: e.g Moderator, Trial Mod, etc. each of them needs permissions for it.
             * You can choose to set up additional permissions.
             */
            guild.channels.create(`${message.author.username}s-ticket`, {
                type: 'text',
                permissionOverwrites: [
                    {
                        allow: 'VIEW_CHANNEL',
                        id: message.author.id
                    },
                    {
                        deny: 'VIEW_CHANNEL',
                        id: guild.id
                    },
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '625907626303160354'
                    }
                ]
            }).then(ch => {
                userTickets.set(message.author.id, ch.id);
            }).catch(err => console.log(err));
        }
    } else if(message.content.toLowerCase() === '?closeticket') {
        if(userTickets.has(message.author.id)) {
            if(message.channel.id === userTickets.get(message.author.id)) {
                message.channel.delete('closing ticket')
                    .then(channel => {
                        console.log('Deleted ' + channel.name);
                        userTickets.delete(message.author.id);
                    })
                    .catch(err => console.log(err));
            }
        }
        /**
         * Here we will check the server to see if there were additional tickets created that the bot may have missed due to
         * either crashing, restarting, etc.. This part will delete ALL of the tickets that follow the format of
         * "<username>s-ticket" because that was the way we hard-coded. You can modify this obviously.
         */
        if(message.guild.channels.some(channel => channel.name.toLowerCase() === message.author.username + 's-ticket')) {
            message.guild.channels.forEach(channel => {
                if(channel.name.toLowerCase() === message.author.username + 's-ticket') {
                    channel.delete().then(ch => console.log('Deleted Channel ' + ch.id))
                        .catch(err => console.log(err));
                }
            });
        }
    }
    module.exports.help = {
        name:'ticket2'
    };
};