module.exports.run = async (bot, message, args) => {
    // PERMISSIONS GRANT
    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You cannot execute this command! :x:');
    // VARIABLES
    const rMember = await message.guild.members.fetch(message.mentions.users.first().id) || message.guild.members.cache.get(args[0]);
    // IF THERE IS NO USER ARGUMENT
    if(!rMember) return message.reply('Couldn\'t find that user.');
    const role = args.slice(1).join(' ').split(', ');
    // console.log(role);
    // IF THE ROLE ARGUMENT DOESNT EXIST
    if(!role[0]) return message.reply('Specify a role!');
    // NON-EXISTENT ROLES ARRAY
    const wrongroles = [];
    // ALREADY ROLES ARRAY;
    const alreadyroles = [];
    // GOTTEN ROLES ARRAY
    const gottenroles = [];

    // GOES THROUGH EVERY ROLE
    for (let i = 0; i < role.length; i++) {

        const gRole = message.guild.roles.cache.find(r => r.name.startsWith(role[i]));

        if (!gRole) {
            wrongroles.push(gRole.name);
        } else if (rMember.roles.has(gRole.id)) {
            alreadyroles.push(gRole.name);
        } else {

            rMember.roles.add(gRole.id);
            gottenroles.push(gRole.name);
        }
    }
    // console.log(wrongroles.length)
    // console.log(alreadyroles.length)
    if (wrongroles.length > 0) {
        const strjoin = wrongroles.join(', ');
        message.channel.send(`The role(s), \`${strjoin}\`, do not exist! :x:`);
    }
    if (alreadyroles.length > 0) {
        const strjoin = alreadyroles.join(', ');
        message.channel.send(`${rMember.user.username} already has the role(s), \`${strjoin}\`! :x:`);
    }
    if (gottenroles.length > 0) {
        const strjoin = gottenroles.join(', ');
        message.channel.send(`Successfully added the role(s), \`${strjoin}\`, to ${rMember.user.username}.`);
        rMember.send(`Congratulations, ${rMember.user.username}, you have received the role(s), \`${strjoin}\`, from ${message.author.toString()}!`).catch(() => {
            message.channel.send(`${rMember.user.toString()} has just received the role(s), \`${strjoin}\`, from ${message.author.toString()}. This message was originally sent to the user's DMs but they were locked!`);
        });
    }
};

module.exports.help = {
    name: 'addrole'
};
