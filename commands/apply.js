const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
    name: 'apply',
    description: 'Mostafa tbh',
    enabled: true,
    developer: true,
    usage: 'This is not a public command.',
    cat: 'misc',
    run: async (client, message) => {

        const questions = ['Select an application. \nOptions: `Beginner Developers`, `Artists`, `SFX Artists`, `UI Designers`, `Modelers`, `Scripters`, `Traders`, `Builders`, `Legend Artists`, `YouTubers`, `Translators`, `Off-site Developers`, `Clothing Designers`, `Animators`', 'Please say your roblox username.', 'Are you in the Roblox group? This is mandatory as we need to rank you there as well. If you are not in the group, then please join via the link below: [fill in]'];

        const embed = new Discord.MessageEmbed()
            .setTitle('Interactive Prompt')
            .setAuthor(`${message.author.username}(${message.author.id})`, message.author.avatarURL())
            .setFooter('Interactive Message Prompt')
            .setThumbnail(client.user.avatarURL());


        // Filters
        const personFilter = m => m.author.id === message.author.id;

        const filter = m => {
            const arr = ['beginner developers', 'artists', 'sfx artists', 'ui designers', 'modelers', 'scripters', 'traders', 'builders', 'legend artists', 'youtubers', 'translators', 'off-site developers', 'clothing designers', 'animators'];
            if (m.author.id === message.author.id && arr.includes(m.content)) return true;
            if (m.author.id === message.author.id && !arr.includes(m.content)) {
                m.channel.send(`The prompt got an invalid response. Proper prompt responses are \`${arr.join(', ')}\``);
            }
        };

        // End filters

        // Question 1
        embed.setDescription(questions[0]);
        message.channel.send(embed);
        const question1 = await message.channel.awaitMessages(filter, { max: 1 });

        const positionApplyingFor = question1.first().content;


        // End question 1
        embed.setDescription(questions[1]);


        // Question 2
        message.channel.send(embed);
        const question2 = await message.channel.awaitMessages(personFilter, { max: 1 });
        const robloxName = question2.first().content;

        // End question 2


        // Question 3
        embed.setDescription(questions[2]);
        message.channel.send(embed);
        const question3 = await message.channel.awaitMessages(personFilter, { max: 1 });

        const imageFilter = m => {
            if (m.attachments.size > 0 && m.author.id === message.author.id) return true;

            if (m.author.id === message.author.id && m.content) {
                if (m.content.toLowerCase() === 'cancel' || m.content.toLowerCase() === 'done' && message.author.id === m.author.id) return true;
                const url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;
                if (url.test(m.content)) return true;
                m.channel.send(
                    'Invalid prompt response: The prompt content did not match an http(s) link or an attachment. Please try again or say skip.'
                );
            }
        };

        const imgEmbed = new Discord.MessageEmbed()
            .setTitle('Interactive image collector')
            .setDescription('Please reply with up to **5** image attachments or links. \n > Your submissions are limited to 5 images, and can only submit http(s) links or Discord attachments \nOnce finished say `done`.')
            .setColor('BLUE')
            .setFooter('Prompt expects HTTPS LINK or DISCORD.ATTACHMENT');
        message.channel.send(imgEmbed);
        const collector = new Discord.MessageCollector(message.channel, imageFilter, { time: ms('5m'), max: 5 });

        const imgs = [];
        collector.on('collect', collect => {
            if (collect.content.toLowerCase() === 'cancel') return collector.stop('cancelled');
            if (collect.content.toLowerCase() === 'done') {
                if (!imgs.length > 0) return message.channel.send('You have to submit your work.');
                else return collector.stop();
            }
            if (collect.content) {
                imgs.push(collect.content);
            } else if (!collect.content) {
                imgs.push(collect.attachments.first().url);
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'cancelled') return message.channel.send('Prompt cancelled.');

            const finalEmbed = new Discord.MessageEmbed()
                .setTitle('Here is your application.')
                .setDescription(`**Applying for:** ${positionApplyingFor} \n\n**Question 1: ${questions[1]}** \n -- ${robloxName} \n\n**Question 2: ${questions[2]}** \n -- ${question3.first().content}`)
                .setColor('BLUE')
                .setFooter(`Mostafa's application command | Ran by ${message.author.tag}`);
            imgs.forEach(i => {
                finalEmbed.addField('Image', `[press here](${i})`);
            });
            message.channel.send(finalEmbed);

        });


    }
};
module.exports.help = {
    name:'apply'
};