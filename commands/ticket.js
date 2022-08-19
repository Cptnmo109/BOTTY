const Config = require('../botconfig.json');
const data = require('../tickets.json');
module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    const fs = require('fs');

    if (args[0]) {
        message.channel.send(new Discord.MessageEmbed().setColor(Config.ticketcolor).setDescription('Your ticket has been created!\nWe will contact you in the ticket shortly!').setTimestamp().setAuthor('Tickets'));
        message.guild.channels.create(`ticket-${data.id}`, { type: 'text' }).then(async c => {
            const reason = args.join(' ');
            if (message.guild.channels.cache.find(f => f.name.toLowerCase() === '-= tickets =-')) {
                if (message.guild.channels.cache.find(f => f.name.toLowerCase() === '-= tickets =-').type === 'category') {
                    c.setParent(message.guild.channels.cache.find(f => f.name.toLowerCase() === '-= tickets =-').id);
                } else {
                    c.setParent(message.guild.channels.cache.find(f => f.name.toLowerCase() === '-= tickets =-').id);
                }
                const role = message.guild.roles.cache.find(f => f.name === 'Owner');
                const role2 = message.guild.roles.cache.find(f => f.name === '@everyone');
                c.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });
                c.createOverwrite(role2, {
                    SEND_MESSAGES: false,
                    READ_MESSAGES: false
                });
                c.createOverwrite(message.author, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });
                message.delete();

            }
            await c.send(new Discord.MessageEmbed().addField('Subject', `${reason}`).addField('Explain', 'Explain in detail what you need for a faster response!').setDescription('Thank you for creating a ticket.\nThe support team will assist you soon!').setColor(Config.ticketcolor));
        });
        data.id++;
        fs.writeFile('./tickets.json', '{\n"id":' + data.id + '\n}', (err) => {
            if (!err) return;
            console.error(err);
        });

    }
};
module.exports.help = {
    name:'ticket'
};