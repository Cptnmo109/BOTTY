const Discord = require('discord.js');
module.exports.Run = async (bot, message) => {
    const emoji = message.guild.emojis.cache.get('539814697076260865');
    const emoji2 = message.guild.emojis.cache.get('539850609243717663');

    try {
        const merchembed = new Discord.MessageEmbed()
            .setDescription('**Roblox Developers Merch**')
            .addField('RD Blue Jacket Hoodie', '[Click here](https://www.roblox.com/catalog/2784209867/RD-Blue-Jacket-Hoodie) Price: 5 ' + emoji)
            .addField('RD Green Jacket Hoodie', '[Click here](https://www.roblox.com/catalog/2784330762/RD-Green-Jacket-Hoodie) Price: 5 ' + emoji)
            .addField('RD Blue Shirt', '[Click here](https://www.roblox.com/catalog/2784332426/RD-Blue-Shirt) Price: 5 ' + emoji)
            .addField('RD Red Shirt', '[Click here](https://www.roblox.com/catalog/2784333062/RD-Red-Shirt) Price: 5 ' + emoji)
            .addField('RD White Shirt', '[Click here](https://www.roblox.com/catalog/2784333767/RD-White-Shirt) Price: 5 ' + emoji)
            .addField('RD Black Jeans', '[Click here](https://www.roblox.com/catalog/2796227287/RD-Black-Jeans) Price: 5 ' + emoji)
            .addField(emoji2 + ' Roblox Group', '[Click here](https://www.roblox.com/my/groups.aspx?gid=2690922)')
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter('WILLBEUPDATED', bot.user.displayAvatarURL());
        message.author.send(merchembed);
        message.channel.send('Check your Direct Messages.');
        console.log('Worked. ' + message.author.username);
    } catch (error) {
        message.channel.send('An error.');
        console.error(error);
    }

};

module.exports.help = {
    name: 'merch'
};