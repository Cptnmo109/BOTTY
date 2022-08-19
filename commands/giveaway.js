const Discord = require('discord.js');
const Ms = require('ms');

module.exports.run = async (bot, message) => {

    console.log(`${message.member} ran the "Giveaway" command`);

    let item = '';
    const messageArray = message.content.split(' ');
    for (let i = 3; i < messageArray.length; i++) {
        item += (messageArray[i] + ' ');
    }
    const winnerCount = Number(messageArray[2]);
    const time = Ms(messageArray[1]);


    const giveEmbed = new Discord.MessageEmbed();
    giveEmbed.setDescription(item);
    const embedSent = await message.channel.send(giveEmbed);
    console.log(time);
    embedSent.react('🎉');
    setTimeout(function() {

        const winners = [];
        let winnerMsg = '';
        for (let i = 0; i < winners.length; i++) {
            winnerMsg += (winners[i].toString() + ' ');
        }
        let haveHas = 'has';
        if (winnerCount == 1) {
            haveHas = 'has';
        } else{
            haveHas = 'have';
        }

        message.channel.send(winnerMsg + `<@${message.author.id}> ` + haveHas + ` won the **giveaway**: ${item}`);
    }, time);

};

module.exports.help = {
    name: 'giveaway'
};