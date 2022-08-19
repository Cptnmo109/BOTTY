const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const warns = require('../warnings.json');
const moment = require('moment');
module.exports.run = async (bot, message, args) => {

    // !warn @daeshan <reason>
    if(message.member.permissions.has('KICK_MEMBERS')) {
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('You don\'t have permissions!');
        // has one of the roles
        const wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        if(!wUser) return message.reply('Couldn\'t find them.');
        const reason = args.slice(1).join(' ');

        if(!warns[wUser.id]) {
            warns[wUser.id] = {
                warns: 0
            };
        }

        warns[wUser.id].warns++;

        fs.writeFile('./warnings.json', JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });

        const warnEmbed = new Discord.MessageEmbed()
            .setDescription('Warns')
            .setAuthor(message.author.username)
            .setColor('#fc6400')
            .addField('Warned User', `<@${wUser.id}>`)
            .addField('Warned In', message.channel)
            .addField('Number Of Warnings', warns[wUser.id].warns)
            .addField('Reason', reason);

        const warndm = new Discord.MessageEmbed()
            .setDescription('**Warning**')
            .addField('Reason', reason)
            .addField('Moderator', message.member.user.tag)
            .addField('Date', moment().format('LL'));

        const warnchannel = message.guild.channels.cache.find(c => c.name === 'warnings');
        if(!warnchannel) return message.reply('Couldn\'t find channel');

        warnchannel.send(warnEmbed);
        message.channel.bulkDelete(1);
        message.channel.send(`<@${wUser.id}> has been warned!`);
        wUser.user.send(warndm);
        const muterole = message.guild.roles.cache.find(c => c.name === 'Muted');

        if(warns[wUser.id].warns == 3) {
            if(!muterole) return message.reply('You should create that role dude.');

            const mutetime = '1h';
            await (wUser.roles.add(muterole.id));
            message.channel.send(`<@${wUser.id}> has been temporarily muted`);

            setTimeout(function() {
                wUser.roles.remove(muterole.id);
                message.reply(`<@${wUser.id}> has been unmuted.`);
            }, ms(mutetime));
        }

        if (warns[wUser.id].warns == 4) {
            const mutetime = '1d';
            await (wUser.roles.add(muterole.id));
            message.channel.send(`<@${wUser.id}> has been temporarily muted`);


            setTimeout(function() {
                wUser.roles.remove(muterole.id);
                message.reply(`<@${wUser.id}> has been unmuted.`);
            }, ms(mutetime));
        }

        if (warns[wUser.id].warns == 5) {
            message.guild.member(wUser).kick(reason);
            message.reply(`<@${wUser.id}> has been kicked.`);

        }


        if (warns[wUser.id].warns == 7) {
            const bantime = '10s';
            message.guild.member(wUser).ban(reason);
            message.channel.send(`<@${wUser.id}> has been banned.`);
            setTimeout(function() {
                message.guild.members.unban(wUser);
                message.reply(`<@${wUser.id}> has been unbanned.`);
            }, ms(bantime));
        }

        if (warns[wUser.id].warns == 10) {
            message.guild.member(wUser).ban(reason);
            message.reply(`<@${wUser.id}> has been banned.`);

        }

    }


    module.exports.help = {
        name: 'warn'
    };
};