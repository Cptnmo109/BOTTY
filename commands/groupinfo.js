const Discord = require('discord.js');
const Bloxy = require('bloxy');
const bclient = new Bloxy();

module.exports.run = async (client, message, args) => {

    try{

        const groupID = args[1];
        const group = await bclient.getGroup(groupID);

        const info = new Discord.MessageEmbed()
            .addField('Group Name:', group.name)
            .setThumbnail(group.logo)
            .addField('Description:', group.description)
            .addField('Owner:', group.owner.username, true)
            .addField('Members:', group.memberCount, true)
            .addField('Current Shout:', group.shout.body, true)
            .addField('Group Roles:', (await group.getRoles()).map(x=>x.name).join(', '));
        message.channel.send(info);

    } catch (e) {

        console.log(e);
        const error = new Discord.MessageEmbed()
            .setTitle('Error Grabbing information!');
        message.channel.send(error);
    }

};

module.exports.help = {
    name: 'groupinfo',
};