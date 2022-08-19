const ms = require('ms');

module.exports.run = async (bot, message, args) => {

    // !tempmute @user 1s/m/h/d

    const tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!tomute) return message.reply('Couldn\'t find user.');
    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('You don\'t have permissions!');
    if(tomute.permissions.has('MANAGE_MESSAGES')) return message.reply('Can\'t mute them!');
    let muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
    // start of create role
    if(!muterole) {
        try{
            muterole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#000000',
                    permissions:[]
                }
            });
            message.guild.channels.forEach(async (channel) => {
                await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e) {
            console.log(e.stack);
        }
    }
    // end of create role
    const mutetime = args[1];
    let reason = args[2];
    if(!mutetime) return message.reply('You didn\'t specify a time!');
    if (!reason) reason = 'N/A';
    const Muted = (`You've been muted in ${message.guild.name} \nTime: ${mutetime} \nReason: ${reason} \nModerator: ${message.member.user.tag} (${message.member.id})`);


    await (tomute.roles.add(muterole.id));
    tomute.user.send(Muted);

    setTimeout(function() {
        tomute.roles.remove(muterole.id);
        tomute.user.send('You\'ve been unmuted!');
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));


// end of module
};

module.exports.help = {
    name: 'mute'
};