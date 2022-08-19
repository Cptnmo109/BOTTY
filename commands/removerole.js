module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has('MANAGE_MEMBERS')) return message.reply('Sorry, you don\'t have permissions to do that.');
    const rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(!rMember) return message.reply('Couldn\'t find that user.');
    const role = args.splice(1, args.length).join(' ');
    if(!role) return message.reply('Specify a role!');
    const gRole = message.guild.roles.cache.find(c => c.name === role);
    if(!gRole) return message.reply('Couldn\'t find that role.');

    if(!rMember.roles.has(gRole.id)) return message.reply('They don\'t have that role.');
    await (rMember.roles.remove(gRole.id));

    try{
        await rMember.send(`You lost the ${gRole.name} role, In **[RD] Roblox Developers**`);
    }catch(e) {
        message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. We tried to DM them, but their DMs are locked.`);
    }
};

module.exports.help = {
    name: 'removerole'
};
