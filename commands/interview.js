const Discord = require('discord.js');
module.exports.run = async (client, msg) => {
    const question1 = new Discord.MessageEmbed();
    const question1error = new Discord.MessageEmbed();
    const question2 = new Discord.MessageEmbed();
    const question2error = new Discord.MessageEmbed();
    const finish = new Discord.MessageEmbed();

    question1.setDescription('Select an application, `Graphics`  `Composer` `Scripter`').setColor('#00BFFF');

    const answer1 = ['Graphics', 'Composer', 'Scripter'];

    const options = {
        max: 1,
        time: 10000,
        errors: ['time'],
    };
    msg.channel.send({ embed: question1 }).then(async () => {

        const collector1 = await msg.channel.awaitMessages(() => answer1.includes(answer1.content.toLowerCase()), options);
        collector1.on('collect', cmsg1 => {
            if (cmsg1.content.includes('<' && '>')) {
                question2.setDescription('owo')
                    .setColor('#00BFFF');
                msg.channel.send({ embed: question2 }).then(() => {
                    const collector2 = msg.channel.createMessageCollector(newmsg => newmsg.author.id === msg.author.id);
                    collector2.on('collect', cmsg2 => {
                        if (cmsg2.content.includes('roblox')) {
                            finish.setDescription('process complete. ')
                                .setColor('#00FA9A');
                            msg.channel.send({ embed: finish });
                            collector2.stop();
                            const embed = new Discord.MessageEmbed()
                                .setDescription('An application has arrived!')
                                .setColor('#001df1')
                                .addField('By:', `${msg.author.tag} with ID: ${msg.author.id}`)
                                .addField('Question 1:', cmsg1);

                            const logs = msg.guild.channels.cache.find('name', 'applications');
                            logs.send(embed);
                        } else {
                            question2error.setDescription('owo')
                                .setFooter('Please re-run the ?interview command and try again.')
                                .setColor('#FF6347');
                            msg.channel.send({ embed: question2error });
                            collector2.stop();
                        }
                    });
                });
                collector1.stop();
            } else {
                question1error.setDescription('You didn\'t mention a user!')
                    .setFooter('Please re-run the ?interview command and try again.')
                    .setColor('#FF6347');
                msg.channel.send({ embed: question1error });
                collector1.stop();

            }
        });
    });
};
