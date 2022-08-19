const { Canvas } = require('canvas-constructor');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const Ranks = require('../models/ranks.js');

module.exports.run = async (bot, message, args) => {
    const User =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.author;

    Ranks.findOne({ id: User.id }, async function(err, user) {
        if (!user) {
            return message.channel.send(
                ':warning: **User isn\'t in the database. Please contact an administrator immediately to fix this issue!** :warning:'
            );
        }

        const curxp = user.xp;
        const curlvl = user.level;

        try {
            const buffer = await profile(message, User, curlvl, curxp);
            const filename = `profile-${User.id}.jpg`;
            const attachment = new MessageAttachment(buffer, filename);
            await message.channel.send(attachment);
        } catch (error) {
            return message.channel.send(`An error ocurred: **${error.message}**`);
        }

        async function profile(msg, Member, lvl, xp) {
            const imageUrlRegex = /\?size=2048$/g;
            try {
                const result = await fetch(
                    Member.displayAvatarURL().replace(imageUrlRegex, '?size=128')
                );
                if (!result.ok) throw new Error('Failed to get the avatar!');
                const avatar = await result.buffer();

                const name =
          Member.username.length > 30
              ? Member.username.substring(0, 17) + '...'
              : Member.username;
                console.log(name);
                return new Canvas(400, 180)
                    .setColor('#ebeb1e')
                    .addRect(84, 0, 316, 180)
                    .setColor('#232526')
                    .addRect(0, 0, 84, 180)
                    .addRect(169, 26, 231, 46)
                    .addRect(224, 108, 176, 46)
                    .setShadowColor('rgba(22, 22, 22, 1)')
                    .setShadowOffsetY(5)
                    .setShadowBlur(10)
                    .addCircle(84, 90, 62)
                    .addCircularImage(avatar, 85, 90, 64)
                    .save()
                    .createBeveledClip(20, 138, 128, 32, 5)
                    .setColor('#232526')
                    .fill()
                    .restore()
                    .setTextAlign('center')
                    .setTextFont('18pt Klavika Regular')
                    .setColor('#FFFFFF')
                    .addText(name, 285, 57)
                    .addText(`Level: ${lvl}`, 80, 161)
                    .setTextAlign('left')
                    .addText(`XP: ${xp}`, 235, 140)
                    .toBuffer();
            } catch (error) {
                await msg.channel.send(`An error occurred: **${error.message}**`);
            }
        }
    });
};

module.exports.help = {
    name: 'rank'
};
